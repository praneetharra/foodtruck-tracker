/* =========================================================================
   Food Truck Launch Tracker — app logic
   State lives in localStorage. Seed content lives in data.js.
   ========================================================================= */
(function () {
  "use strict";

  const KEY = "ft-tracker-v1";
  const STATUSES = {
    todo:    { label: "Not started", cls: "todo" },
    doing:   { label: "In progress", cls: "doing" },
    blocked: { label: "Blocked",     cls: "blocked" },
    done:    { label: "Done",        cls: "done" },
    na:      { label: "N/A",         cls: "na" }
  };

  /* ---------------- state ---------------- */
  let state = load();
  let ui = { view: "board", status: "all", q: "", onlyStar: false, openStep: null };

  function blank() {
    return { version: SEED_VERSION, steps: {}, customSteps: {}, theme: null, updated: null };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      const p = JSON.parse(raw);
      return Object.assign(blank(), p);
    } catch (e) {
      console.warn("Could not read saved data", e);
      return blank();
    }
  }
  function save(opts) {
    state.updated = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      toast("Could not save — browser storage may be full or blocked.");
    }
    stamp();
    if (!(opts && opts.noPush)) schedulePush();
  }

  /* -------- cloud push, debounced so typing doesn't hammer the network -------- */
  let pushTimer = null;
  function schedulePush() {
    if (!window.FTSync || !FTSync.configured || !FTSync.isSignedIn()) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushNow, 1500);
  }
  function pushNow() {
    if (!window.FTSync || !FTSync.configured || !FTSync.isSignedIn()) return Promise.resolve();
    return FTSync.push(state).catch(function () { /* status UI already reflects it */ });
  }

  /* ---------------- cross-device merge ----------------
     Step-level last-write-wins on `updated`, except notes and next-steps which
     are unioned so work done on two devices at once isn't silently dropped.
     Deletions are respected via small tombstone lists. */
  function uniq(arr, keyFn) {
    const seen = {}, out = [];
    arr.forEach(function (x) {
      const k = keyFn(x);
      if (seen[k]) return;
      seen[k] = 1; out.push(x);
    });
    return out;
  }

  function mergeStep(a, b) {
    if (!a) return b;
    if (!b) return a;
    const newer = (a.updated || 0) >= (b.updated || 0) ? a : b;
    const older = newer === a ? b : a;
    const m = Object.assign({}, newer);

    const noteTomb = {};
    (a.delNotes || []).concat(b.delNotes || []).forEach(function (t) { noteTomb[t] = 1; });
    m.delNotes = Object.keys(noteTomb).map(Number);
    m.notes = uniq((newer.notes || []).concat(older.notes || []), function (n) { return n.ts + "|" + n.text; })
      .filter(function (n) { return !noteTomb[n.ts]; })
      .sort(function (x, y) { return y.ts - x.ts; });

    const nextTomb = {};
    (a.delNext || []).concat(b.delNext || []).forEach(function (t) { nextTomb[t] = 1; });
    m.delNext = Object.keys(nextTomb);
    const byText = {};
    (older.next || []).forEach(function (n) { byText[n.text] = n; });
    (newer.next || []).forEach(function (n) { byText[n.text] = n; });
    m.next = Object.keys(byText).filter(function (t) { return !nextTomb[t]; }).map(function (t) { return byText[t]; });

    const cKey = function (c) { return (c.name || "") + "|" + (c.phone || "") + "|" + (c.email || ""); };
    m.contacts = uniq((newer.contacts || []).concat(older.contacts || []), cKey);

    m.checked = Object.assign({}, older.checked || {}, newer.checked || {});
    m.updated = Math.max(a.updated || 0, b.updated || 0);
    return m;
  }

  function mergeStates(local, remote) {
    const out = blank();
    out.theme = local.theme || remote.theme || null;
    const ids = {};
    Object.keys(local.steps || {}).forEach(function (k) { ids[k] = 1; });
    Object.keys(remote.steps || {}).forEach(function (k) { ids[k] = 1; });
    Object.keys(ids).forEach(function (id) {
      out.steps[id] = mergeStep((local.steps || {})[id], (remote.steps || {})[id]);
    });
    const pids = {};
    Object.keys(local.customSteps || {}).forEach(function (k) { pids[k] = 1; });
    Object.keys(remote.customSteps || {}).forEach(function (k) { pids[k] = 1; });
    Object.keys(pids).forEach(function (pid) {
      const byId = {};
      ((remote.customSteps || {})[pid] || []).forEach(function (s) { byId[s.id] = s; });
      ((local.customSteps || {})[pid] || []).forEach(function (s) { byId[s.id] = s; });
      out.customSteps[pid] = Object.keys(byId).map(function (k) { return byId[k]; });
    });
    out.updated = new Date().toISOString();
    return out;
  }
  /* exposed for the test harness */
  window.__ftMerge = mergeStates;
  function stamp() {
    const el = document.getElementById("savedAt");
    if (!el) return;
    el.textContent = state.updated
      ? "Last saved " + new Date(state.updated).toLocaleString()
      : "Nothing saved yet — your changes will save automatically.";
  }

  /* Per-step record, created lazily */
  function rec(id) {
    if (!state.steps[id]) {
      state.steps[id] = { status: "todo", owner: "", due: "", actual: "", star: false,
                          checked: {}, notes: [], next: [], contacts: [],
                          delNotes: [], delNext: [], updated: 0 };
    }
    const r = state.steps[id];
    r.checked = r.checked || {};
    r.notes = r.notes || [];
    r.next = r.next || [];
    r.contacts = r.contacts || [];
    r.delNotes = r.delNotes || [];
    r.delNext = r.delNext || [];
    r.updated = r.updated || 0;
    return r;
  }

  /* Stamp a step as changed. Cross-device merging is decided by these. */
  function touch(id) { rec(id).updated = Date.now(); }

  /* Merged view of seed phases + user-added steps */
  function phases() {
    return PHASES.map(function (p) {
      const extra = (state.customSteps[p.id] || []);
      return Object.assign({}, p, { steps: p.steps.concat(extra) });
    });
  }
  function allSteps() {
    const out = [];
    phases().forEach(function (p) {
      p.steps.forEach(function (s) { out.push({ phase: p, step: s }); });
    });
    return out;
  }
  function findStep(id) {
    return allSteps().filter(function (x) { return x.step.id === id; })[0] || null;
  }

  /* ---------------- helpers ---------------- */
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  const money = function (n) {
    return "$" + Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }
  function tel(p) {
    return p ? p.split("/")[0].replace(/[^0-9]/g, "") : "";
  }

  /* Renders a step's or path's citation list from the REFS registry. */
  function refBlock(refs) {
    if (!refs || !refs.length) {
      return '<p class="no-rule">No regulation behind this one — it\'s operational judgment. ' +
             "Anything cost- or compliance-related here still needs checking yourself.</p>";
    }
    return '<ul class="reflist">' + refs.map(function (r) {
      const key = Array.isArray(r) ? r[0] : r;
      const note = Array.isArray(r) ? r[1] : "";
      const d = REFS[key];
      if (!d) return "";
      return '<li><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.title) + "</a>" +
        '<span class="rkind">' + esc(d.kind) + "</span>" +
        (note ? '<span class="rnote">' + esc(note) + "</span>" : "") + "</li>";
    }).join("") + "</ul>";
  }

  /* Counts a step as complete for progress. N/A steps drop out of the denominator. */
  function progressOf(steps) {
    let total = 0, done = 0;
    steps.forEach(function (s) {
      const st = rec(s.id).status;
      if (st === "na") return;
      total++;
      if (st === "done") done++;
    });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }

  /* ---------------- board ---------------- */
  function matches(s) {
    const r = rec(s.id);
    if (ui.status !== "all" && r.status !== ui.status) return false;
    if (ui.onlyStar && !r.star) return false;
    if (ui.q) {
      const hay = [
        s.title, s.why, s.tips,
        (s.checklist || []).join(" "),
        r.notes.map(function (n) { return n.text; }).join(" "),
        r.next.map(function (n) { return n.text; }).join(" "),
        r.contacts.map(function (c) { return [c.name, c.org, c.phone, c.email].join(" "); }).join(" "),
        (s.contacts || []).map(function (k) {
          const a = AGENCIES[k]; return a ? [a.name, a.org, a.phone].join(" ") : "";
        }).join(" "),
        r.owner
      ].join(" ").toLowerCase();
      if (hay.indexOf(ui.q.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function renderBoard() {
    const ps = phases();

    // rail
    $("#phaseRail").innerHTML = ps.map(function (p, i) {
      const pr = progressOf(p.steps);
      return '<button class="rail-item" data-goto="' + p.id + '">' +
        '<span class="rn">Phase ' + (i + 1) + '</span>' +
        '<span class="rt">' + p.icon + " " + esc(p.name) + "</span>" +
        '<span class="rail-bar"><i style="width:' + pr.pct + '%"></i></span>' +
        "</button>";
    }).join("");

    // phases
    let html = "";
    let shown = 0;
    ps.forEach(function (p, i) {
      const visible = p.steps.filter(matches);
      shown += visible.length;
      const pr = progressOf(p.steps);
      html += '<section class="phase" id="' + p.id + '">' +
        '<div class="phase-head">' +
          '<span class="phase-num">' + (i + 1) + "</span>" +
          "<h2>" + p.icon + " " + esc(p.name) + "</h2>" +
          '<span class="pill">' + pr.done + "/" + pr.total + " done</span>" +
          '<p class="sub">' + esc(p.sub) + "</p>" +
        "</div>" +
        '<div class="steps">' +
        (visible.length ? visible.map(stepCard).join("")
                        : '<p class="empty">No steps match the current filter.</p>') +
        "</div>" +
        '<div style="margin-top:8px"><button class="btn tiny" data-addstep="' + p.id + '">+ Add a step to this phase</button></div>' +
        "</section>";
    });
    if (!shown) html = '<div class="panel"><p class="empty">Nothing matches. Clear the search or filter.</p></div>' + html;
    $("#phaseList").innerHTML = html;

    // overall
    const pr = progressOf(allSteps().map(function (x) { return x.step; }));
    $("#overallPct").textContent = pr.pct + "%";
    $("#overallCount").textContent = pr.done + " of " + pr.total + " steps";
    const C = 2 * Math.PI * 19;
    $("#ringFg").style.strokeDashoffset = C - (C * pr.pct / 100);
  }

  function stepCard(s) {
    const r = rec(s.id);
    const st = STATUSES[r.status] || STATUSES.todo;
    const tags = [];
    if (r.owner) tags.push('<span class="tag">👤 ' + esc(r.owner) + "</span>");
    if (r.due) tags.push('<span class="tag">📅 ' + esc(r.due) + "</span>");
    if (r.notes.length) tags.push('<span class="tag note">📝 ' + r.notes.length + " note" + (r.notes.length > 1 ? "s" : "") + "</span>");
    const openNext = r.next.filter(function (n) { return !n.done; }).length;
    if (openNext) tags.push('<span class="tag note">➡️ ' + openNext + " next step" + (openNext > 1 ? "s" : "") + "</span>");
    const cc = (s.contacts || []).length + r.contacts.length;
    if (cc) tags.push('<span class="tag">☎️ ' + cc + "</span>");
    if (s.est) tags.push('<span class="tag">~' + money(s.est) + " est.</span>");
    if (r.actual) tags.push('<span class="tag">💵 ' + money(r.actual) + " actual</span>");
    if ((s.refs || []).length) tags.push('<span class="tag cite">📖 ' + s.refs.length + " cited</span>");
    const ck = (s.checklist || []).length;
    if (ck) {
      const n = Object.keys(r.checked).filter(function (k) { return r.checked[k]; }).length;
      tags.push('<span class="tag">☑︎ ' + n + "/" + ck + "</span>");
    }

    return '<article class="step" data-s="' + r.status + '" data-open="' + s.id + '">' +
      '<button class="star ' + (r.star ? "on" : "") + '" data-star="' + s.id + '" title="Star this step">' +
        (r.star ? "★" : "☆") + "</button>" +
      '<div class="step-main">' +
        '<div class="step-title"><span class="t">' + esc(s.title) + "</span>" +
          '<span class="badge ' + st.cls + '">' + st.label + "</span></div>" +
        (s.why ? '<p class="step-why">' + esc(s.why) + "</p>" : "") +
        (tags.length ? '<div class="step-meta">' + tags.join("") + "</div>" : "") +
      "</div></article>";
  }

  /* ---------------- drawer ---------------- */
  function openStep(id) {
    const hit = findStep(id);
    if (!hit) return;
    ui.openStep = id;
    const s = hit.step, r = rec(id);

    $("#drawerPhase").textContent = hit.phase.icon + " " + hit.phase.name;
    $("#drawerTitle").textContent = s.title;

    let h = "";

    if (s.why) h += '<div class="sec"><h3>Why this matters</h3><p style="margin:0">' + esc(s.why) + "</p></div>";

    /* status block */
    h += '<div class="sec"><h3>Your tracking</h3>' +
      '<div class="field-row">' +
        '<div class="field"><label>Status</label><select id="fStatus">' +
          Object.keys(STATUSES).map(function (k) {
            return '<option value="' + k + '"' + (r.status === k ? " selected" : "") + ">" + STATUSES[k].label + "</option>";
          }).join("") + "</select></div>" +
        '<div class="field"><label>Owner</label><input type="text" id="fOwner" value="' + esc(r.owner) + '" placeholder="Who\'s doing this?"></div>' +
      "</div><div class='field-row' style='margin-top:10px'>" +
        '<div class="field"><label>Target date</label><input type="date" id="fDue" value="' + esc(r.due) + '"></div>' +
        '<div class="field"><label>Actual cost ($)' + (s.est ? " · est. " + money(s.est) : "") + '</label>' +
          '<input type="number" id="fActual" min="0" step="1" value="' + esc(r.actual) + '" placeholder="0"></div>' +
      "</div></div>";

    /* checklist */
    if ((s.checklist || []).length) {
      h += '<div class="sec"><h3>Checklist</h3>' + s.checklist.map(function (c, i) {
        const on = !!r.checked[i];
        return '<label class="checkline' + (on ? " done" : "") + '">' +
          '<input type="checkbox" data-ck="' + i + '"' + (on ? " checked" : "") + ">" +
          "<span>" + esc(c) + "</span></label>";
      }).join("") + "</div>";
    }

    if (s.tips) h += '<div class="sec"><h3>Watch out for</h3><div class="callout">' + esc(s.tips) + "</div></div>";

    /* contacts */
    const seeded = (s.contacts || []).map(function (k) { return AGENCIES[k]; }).filter(Boolean);
    h += '<div class="sec"><h3>Contacts</h3>';
    if (!seeded.length && !r.contacts.length) h += '<p class="empty">No contacts yet.</p>';
    seeded.concat(r.contacts).forEach(function (c, i) {
      const custom = i >= seeded.length;
      h += '<div class="card" style="margin-bottom:8px">' +
        "<h3>" + esc(c.name || "(unnamed)") + "</h3>" +
        (c.org ? '<p class="org">' + esc(c.org) + "</p>" : "") +
        (c.phone ? '<p>☎ <a href="tel:' + tel(c.phone) + '">' + esc(c.phone) + "</a></p>" : "") +
        (c.email ? '<p>✉ <a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></p>" : "") +
        (c.address ? '<p>📍 ' + esc(c.address) + "</p>" : "") +
        (c.url ? '<p>🔗 <a href="' + esc(c.url) + '" target="_blank" rel="noopener">Website</a></p>' : "") +
        (c.note ? '<p class="muted small" style="margin-top:5px">' + esc(c.note) + "</p>" : "") +
        (custom ? '<p style="margin-top:6px"><button class="btn tiny danger" data-delcontact="' + (i - seeded.length) + '">Remove</button></p>' : "") +
        "</div>";
    });
    h += '<button class="btn tiny" id="btnAddContact">+ Add contact</button></div>';

    /* links */
    if ((s.links || []).length) {
      h += '<div class="sec"><h3>Official links & forms</h3><ul class="linklist">' +
        s.links.map(function (l) {
          return '<li><a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + "</a></li>";
        }).join("") + "</ul></div>";
    }

    /* references — where the claims in this step come from */
    h += '<div class="sec"><h3>Where this comes from</h3>' + refBlock(s.refs) + "</div>";

    /* next steps */
    h += '<div class="sec"><h3>Next steps</h3>' +
      (r.next.length ? r.next.map(function (n, i) {
        return '<label class="checkline' + (n.done ? " done" : "") + '">' +
          '<input type="checkbox" data-nx="' + i + '"' + (n.done ? " checked" : "") + ">" +
          "<span>" + esc(n.text) + "</span>" +
          '<button class="del" data-delnx="' + i + '" title="Delete">✕</button></label>';
      }).join("") : '<p class="empty">Nothing queued.</p>') +
      '<div class="addrow"><input type="text" id="nxInput" placeholder="e.g. Call 385-468-3845 to book the class"><button class="btn primary" id="btnAddNx">Add</button></div></div>';

    /* notes */
    h += '<div class="sec"><h3>Notes log</h3>' +
      (r.notes.length ? r.notes.map(function (n, i) {
        return '<div class="note"><div class="when"><span>' +
          esc(new Date(n.ts).toLocaleString()) + "</span>" +
          '<button data-delnote="' + i + '" title="Delete">✕</button></div>' + esc(n.text) + "</div>";
      }).join("") : '<p class="empty">No notes yet. Log what an agency told you, who you spoke to, and when.</p>') +
      '<div class="addrow"><textarea id="noteInput" rows="2" placeholder="What did you learn? Who did you talk to?"></textarea></div>' +
      '<button class="btn primary" id="btnAddNote" style="margin-top:8px">Add note</button></div>';

    if (s.custom) {
      h += '<div class="sec"><button class="btn danger" id="btnDelStep">Delete this custom step</button></div>';
    }

    $("#drawerBody").innerHTML = h;
    wireDrawer(s, r);
    $("#drawer").classList.remove("hidden");
    $("#overlay").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function wireDrawer(s, r) {
    const body = $("#drawerBody");

    $("#fStatus").onchange = function () { r.status = this.value; touch(s.id); save(); renderBoard(); };
    $("#fOwner").oninput  = function () { r.owner = this.value; touch(s.id); save(); };
    $("#fOwner").onblur   = renderBoard;
    $("#fDue").onchange   = function () { r.due = this.value; touch(s.id); save(); renderBoard(); };
    $("#fActual").oninput = function () { r.actual = this.value; touch(s.id); save(); };
    $("#fActual").onblur  = renderBoard;

    body.addEventListener("change", function (e) {
      const t = e.target;
      if (t.dataset.ck !== undefined) {
        r.checked[t.dataset.ck] = t.checked;
        t.closest(".checkline").classList.toggle("done", t.checked);
        touch(s.id); save(); renderBoard();
      }
      if (t.dataset.nx !== undefined) {
        r.next[t.dataset.nx].done = t.checked;
        t.closest(".checkline").classList.toggle("done", t.checked);
        touch(s.id); save(); renderBoard();
      }
    });

    body.addEventListener("click", function (e) {
      const t = e.target.closest("[data-delnx],[data-delnote],[data-delcontact]");
      if (!t) return;
      if (t.dataset.delnx !== undefined) {
        const gone = r.next.splice(+t.dataset.delnx, 1)[0];
        if (gone) r.delNext.push(gone.text);
      }
      if (t.dataset.delnote !== undefined) {
        const gone = r.notes.splice(+t.dataset.delnote, 1)[0];
        if (gone) r.delNotes.push(gone.ts);
      }
      if (t.dataset.delcontact !== undefined) { r.contacts.splice(+t.dataset.delcontact, 1); }
      touch(s.id); save(); openStep(s.id); renderBoard();
    });

    $("#btnAddNx").onclick = function () {
      const v = $("#nxInput").value.trim();
      if (!v) return;
      r.next.push({ text: v, done: false });
      r.delNext = r.delNext.filter(function (x) { return x !== v; });
      touch(s.id); save(); openStep(s.id); renderBoard();
    };
    $("#nxInput").onkeydown = function (e) { if (e.key === "Enter") $("#btnAddNx").click(); };

    $("#btnAddNote").onclick = function () {
      const v = $("#noteInput").value.trim();
      if (!v) return;
      r.notes.unshift({ ts: Date.now(), text: v });
      touch(s.id); save(); openStep(s.id); renderBoard();
    };

    $("#btnAddContact").onclick = function () {
      const name = prompt("Contact name (person or role):");
      if (!name) return;
      r.contacts.push({
        name: name,
        org: prompt("Organization / agency:") || "",
        phone: prompt("Phone:") || "",
        email: prompt("Email:") || "",
        address: prompt("Address:") || "",
        url: prompt("Website URL:") || ""
      });
      touch(s.id); save(); openStep(s.id); renderBoard(); renderContacts();
    };

    const del = $("#btnDelStep");
    if (del) del.onclick = function () {
      if (!confirm("Delete this custom step and its notes?")) return;
      Object.keys(state.customSteps).forEach(function (pid) {
        state.customSteps[pid] = state.customSteps[pid].filter(function (x) { return x.id !== s.id; });
      });
      delete state.steps[s.id];
      save(); closeDrawer(); renderAll();
    };
  }

  function closeDrawer() {
    ui.openStep = null;
    $("#drawer").classList.add("hidden");
    $("#overlay").classList.add("hidden");
    document.body.style.overflow = "";
  }

  /* ---------------- dashboard ---------------- */
  function renderDashboard() {
    const all = allSteps();
    const counts = { todo: 0, doing: 0, blocked: 0, done: 0, na: 0 };
    all.forEach(function (x) { counts[rec(x.step.id).status]++; });
    const pr = progressOf(all.map(function (x) { return x.step; }));

    let openNext = 0, notes = 0, overdue = 0;
    const today = new Date().toISOString().slice(0, 10);
    all.forEach(function (x) {
      const r = rec(x.step.id);
      openNext += r.next.filter(function (n) { return !n.done; }).length;
      notes += r.notes.length;
      if (r.due && r.due < today && r.status !== "done" && r.status !== "na") overdue++;
    });

    $("#statTiles").innerHTML = [
      ["Overall progress", pr.pct + "%", pr.done + " of " + pr.total + " active steps"],
      ["In progress", counts.doing, "steps you've started"],
      ["Blocked", counts.blocked, counts.blocked ? "needs attention" : "nothing stuck"],
      ["Open next steps", openNext, "across all phases"],
      ["Past due", overdue, overdue ? "target date passed" : "all on schedule"],
      ["Notes logged", notes, "research captured"]
    ].map(function (t) {
      return '<div class="stat"><div class="k">' + t[0] + '</div><div class="v">' + t[1] + '</div><div class="d">' + t[2] + "</div></div>";
    }).join("");

    $("#phaseBars").innerHTML = phases().map(function (p, i) {
      const q = progressOf(p.steps);
      return '<div class="bar-row"><div class="lbl"><span>' + p.icon + " " + esc(p.name) +
        "</span><span class='muted'>" + q.done + "/" + q.total + "</span></div>" +
        '<div class="bar"><i style="width:' + q.pct + '%"></i></div></div>';
    }).join("");

    const feed = [];
    all.forEach(function (x) {
      rec(x.step.id).next.forEach(function (n) {
        if (!n.done) feed.push({ text: n.text, step: x.step, phase: x.phase });
      });
    });
    $("#nextStepsFeed").innerHTML = feed.length ? feed.slice(0, 40).map(function (f) {
      return '<div class="feed-item"><span class="ctx">' + esc(f.phase.name) + " · " + esc(f.step.title) +
        '</span><a href="#" data-open="' + f.step.id + '">' + esc(f.text) + "</a></div>";
    }).join("") : '<p class="empty">No open next steps. Open a step and add one.</p>';

    const acts = [];
    all.forEach(function (x) {
      rec(x.step.id).notes.forEach(function (n) {
        acts.push({ ts: n.ts, text: n.text, step: x.step, phase: x.phase });
      });
    });
    acts.sort(function (a, b) { return b.ts - a.ts; });
    $("#activityFeed").innerHTML = acts.length ? acts.slice(0, 25).map(function (a) {
      return '<div class="feed-item"><span class="ctx">' + esc(new Date(a.ts).toLocaleString()) +
        " · " + esc(a.phase.name) + " · " + esc(a.step.title) +
        '</span><a href="#" data-open="' + a.step.id + '">' + esc(a.text.slice(0, 160)) + "</a></div>";
    }).join("") : '<p class="empty">No notes yet.</p>';
  }

  /* ---------------- contacts ---------------- */
  function renderContacts() {
    const q = ($("#contactSearch").value || "").toLowerCase();
    const seen = {}, list = [];
    allSteps().forEach(function (x) {
      (x.step.contacts || []).forEach(function (k) {
        if (seen[k] || !AGENCIES[k]) return;
        seen[k] = 1;
        list.push(Object.assign({ _where: x.phase.name }, AGENCIES[k]));
      });
      rec(x.step.id).contacts.forEach(function (c) {
        list.push(Object.assign({ _where: x.phase.name + " · " + x.step.title, _mine: true }, c));
      });
    });
    Object.keys(AGENCIES).forEach(function (k) {
      if (!seen[k]) { seen[k] = 1; list.push(Object.assign({ _where: "Reference" }, AGENCIES[k])); }
    });

    const shown = list.filter(function (c) {
      if (!q) return true;
      return [c.name, c.org, c.phone, c.email, c._where].join(" ").toLowerCase().indexOf(q) !== -1;
    });

    $("#contactList").innerHTML = shown.length ? shown.map(function (c) {
      return '<div class="card"><h3>' + esc(c.name) + (c._mine ? " ✎" : "") + "</h3>" +
        (c.org ? '<p class="org">' + esc(c.org) + "</p>" : "") +
        (c.phone ? '<p>☎ <a href="tel:' + tel(c.phone) + '">' + esc(c.phone) + "</a></p>" : "") +
        (c.email ? '<p>✉ <a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></p>" : "") +
        (c.address ? '<p>📍 ' + esc(c.address) + "</p>" : "") +
        (c.url ? '<p>🔗 <a href="' + esc(c.url) + '" target="_blank" rel="noopener">Website</a></p>' : "") +
        (c.note ? '<p class="muted small" style="margin-top:5px">' + esc(c.note) + "</p>" : "") +
        '<p class="muted small" style="margin-top:6px">' + esc(c._where) + "</p></div>";
    }).join("") : '<p class="empty">No contacts match.</p>';
  }

  /* ---------------- path decision ---------------- */
  let quizAnswers = {};

  /* Short inline citation label, e.g. "R392-102-7" or "SLCoHD guidelines" */
  const SHORT_CITE = {
    code1156: "§11-56-102", code1156_103: "§11-56-103",
    r392_102: "R392-102", r392_102_2: "R392-102-2", r392_102_3: "R392-102-3",
    r392_102_4: "R392-102-4", r392_102_5: "R392-102-5", r392_102_7: "R392-102-7",
    r392_102_11: "R392-102-11", r392_102_16: "R392-102-16",
    slcohdMobile: "SLCoHD mobile page", slcohdMobileGuide: "SLCoHD guidelines",
    slcohdPlanReview: "SLCoHD plan review", slcohdPermits: "SLCoHD permits",
    slcohdPermanent: "SLCoHD permanent", slcohdFoodHandlers: "SLCoHD food handlers",
    slcFogRef: "SLC FOG program", slcPretreatment: "SLC pretreatment",
    slcGuidePdf: "SLC guide (PDF)", slcGuide: "SLC guide",
    slcMobileLicense: "SLC license page", slcFeeSchedule: "SLC fee schedule",
    slcOrd569: "SLC Code 5.69", slcOrd21A: "SLC Code 21A.36.160",
    slcZoningMap: "SLC zoning map", slcDevServicesRef: "SLC Dev Services"
  };
  function shortCite(k) { return SHORT_CITE[k] || (REFS[k] ? REFS[k].kind : k); }

  function renderPaths() {
    if ($("#pathCards").dataset.done) return;
    $("#pathCards").dataset.done = "1";

    $("#pathCards").innerHTML = PATHS.map(function (p) {
      return '<article class="path-card" id="path-' + p.id + '">' +
        '<div class="path-head"><span class="path-badge">Path ' + p.id + "</span>" +
          "<h3>" + esc(p.name) + "</h3></div>" +
        '<p class="path-tag">' + esc(p.tagline) + "</p>" +
        '<p class="path-verdict">' + esc(p.verdict) + "</p>" +
        '<div class="path-sew"><span class="k">Sewage</span>' + esc(p.sewage) + "</div>" +
        '<h4>The specifics</h4><dl class="spec">' +
          p.numbers.map(function (n) {
            const d = n[2] ? REFS[n[2]] : null;
            return "<dt>" + esc(n[0]) + "</dt><dd>" + esc(n[1]) +
              (d ? ' <a class="citelink" href="' + esc(d.url) + '" target="_blank" rel="noopener" title="' +
                   esc(d.title) + '">' + esc(shortCite(n[2])) + "</a>" : "") + "</dd>";
          }).join("") + "</dl>" +
        "<h4>You'll also need</h4><ul>" + p.also.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        '<div class="pc-split">' +
          '<div><h4 class="up">Works for you</h4><ul>' + p.pros.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
          '<div><h4 class="down">Costs you</h4><ul>' + p.cons.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
        "</div>" +
        '<h4>Source documents for this path</h4>' + refBlock(p.refs) +
        "</article>";
    }).join("");

    const rows = [
      ["Permit type", ["Mobile food business", "Mobile food business", "Permanent food establishment"]],
      ["Sewage handling", ["Onboard holding tank, hauled out", "Direct to public sanitary sewer", "Direct to public sewer or approved treatment system"]],
      ["Water ceiling", ["~30 gal per service", "None", "None"]],
      ["Commissary required", ["Yes", "Confirm with SLCoHD — assume yes", "No"]],
      ["Restroom agreement", ["Yes — within 500 ft, open all operating hours", "Confirm with SLCoHD", "No — on-site restrooms instead"]],
      ["Grease interceptor", ["No", "Very likely, per sewer authority", "Yes, sized by sewer district"]],
      ["Statewide reciprocity", ["Yes (Utah Code 11-56-103)", "Yes", "No"]],
      ["Can work festivals & catering", ["Yes", "Yes — unhook and go", "No"]],
      ["Building permit", ["No", "Plumbing permit only", "Yes"]],
      ["Plan review", ["Mobile plan review", "Mobile plan review", "Full permanent-facility plan review"]],
      ["Relative upfront cost", ["Lowest", "Moderate", "Highest by far"]],
      ["Ongoing burden", ["Daily commissary trip", "Interceptor cleaning contract", "Full restaurant compliance"]]
    ];
    $("#pathCompare").innerHTML =
      "<thead><tr><th></th><th>Path A — tanks</th><th>Path B — sewer-connected mobile</th><th>Path C — permanent</th></tr></thead><tbody>" +
      rows.map(function (r) {
        return "<tr><th scope='row'>" + esc(r[0]) + "</th>" +
          r[1].map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody>";

    function askItem(q) {
      const d = q[1] ? REFS[q[1]] : null;
      return "<li>" + esc(q[0]) +
        (d ? '<a class="citelink" href="' + esc(d.url) + '" target="_blank" rel="noopener" title="' +
             esc(d.title) + '">' + esc(shortCite(q[1])) + "</a>" : "") + "</li>";
    }
    $("#askHealth").innerHTML = ASK_HEALTH.map(askItem).join("");
    $("#askCity").innerHTML = ASK_CITY.map(askItem).join("");

    $("#quiz").innerHTML = PATH_QUIZ.map(function (item, qi) {
      return '<div class="quiz-q"><p class="qt">' + (qi + 1) + ". " + esc(item.q) + "</p>" +
        item.opts.map(function (o, oi) {
          return '<label class="quiz-opt"><input type="radio" name="q' + qi + '" value="' + oi + '">' +
            "<span>" + esc(o[0]) + "</span></label>";
        }).join("") + "</div>";
    }).join("") + '<button class="btn ghost tiny" id="quizReset" style="margin-top:6px">Clear answers</button>';

    $("#quiz").addEventListener("change", function (e) {
      if (e.target.name && e.target.name.charAt(0) === "q") {
        quizAnswers[e.target.name.slice(1)] = +e.target.value;
        scoreQuiz();
      }
    });
    $("#quizReset").onclick = function () {
      quizAnswers = {};
      Array.prototype.forEach.call($("#quiz").querySelectorAll("input"), function (i) { i.checked = false; });
      $("#quizResult").innerHTML = "";
    };
  }

  function scoreQuiz() {
    const answered = Object.keys(quizAnswers).length;
    if (answered < PATH_QUIZ.length) {
      $("#quizResult").innerHTML = '<p class="muted small" style="margin-top:10px">' +
        answered + " of " + PATH_QUIZ.length + " answered.</p>";
      return;
    }
    const score = { A: 0, B: 0, C: 0 };
    Object.keys(quizAnswers).forEach(function (qi) {
      const w = PATH_QUIZ[qi].opts[quizAnswers[qi]][1];
      score.A += w.A; score.B += w.B; score.C += w.C;
    });
    const order = ["A", "B", "C"].sort(function (a, b) { return score[b] - score[a]; });
    const win = PATHS.filter(function (p) { return p.id === order[0]; })[0];
    const runner = PATHS.filter(function (p) { return p.id === order[1]; })[0];
    const close = (score[order[0]] - score[order[1]]) <= 2;

    const max = Math.max(Math.abs(score.A), Math.abs(score.B), Math.abs(score.C), 1);
    $("#quizResult").innerHTML =
      '<div class="quiz-out"><p class="qo-lead">Leaning toward <strong>Path ' + win.id + " — " + esc(win.name) + "</strong></p>" +
      "<p>" + esc(win.verdict) + "</p>" +
      ["A", "B", "C"].map(function (k) {
        const pct = Math.round(Math.max(0, score[k]) / max * 100);
        return '<div class="bar-row"><div class="lbl"><span>Path ' + k + "</span><span class='muted'>" +
          score[k] + "</span></div><div class='bar'><i style='width:" + pct + "%'></i></div></div>";
      }).join("") +
      (close ? "<p class='muted small'>Path " + runner.id + " scores close behind — worth pricing both before you commit.</p>" : "") +
      "<p class='muted small'>This weighs your answers against the trade-offs above. It is not a substitute for the phone call to 385-468-3845 — that call is what actually decides it.</p></div>";
  }

  /* ---------------- budget ---------------- */
  function renderBudget() {
    let est = 0, act = 0, rows = "";
    phases().forEach(function (p) {
      p.steps.forEach(function (s) {
        const r = rec(s.id);
        if (!s.est && !r.actual) return;
        if (r.status !== "na") est += Number(s.est || 0);
        act += Number(r.actual || 0);
        const st = STATUSES[r.status] || STATUSES.todo;
        rows += "<tr><td>" + esc(p.name) + "</td><td>" + esc(s.title) + "</td><td>" +
          (s.est ? money(s.est) + " <span class='muted small'>est.</span>" : "—") + "</td><td>" +
          (r.actual ? money(r.actual) : "—") + '</td><td><span class="badge ' + st.cls + '">' + st.label + "</span></td></tr>";
      });
    });

    $("#budgetTiles").innerHTML = [
      ["Estimated permitting & licensing", money(est), "rough ballpark, not quotes"],
      ["Actual spent so far", money(act), "from your entries"],
      ["Variance", (act - est >= 0 ? "+" : "−") + money(Math.abs(act - est)), act > est ? "over estimate" : "under estimate"]
    ].map(function (t) {
      return '<div class="stat"><div class="k">' + t[0] + '</div><div class="v">' + t[1] + '</div><div class="d">' + t[2] + "</div></div>";
    }).join("");

    $("#budgetTable").querySelector("tbody").innerHTML =
      rows || '<tr><td colspan="5" class="empty">Nothing costed yet.</td></tr>';
  }

  /* ---------------- export / import ---------------- */
  function doExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "foodtruck-tracker-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    toast("Backup downloaded");
  }
  function doImport(file) {
    const fr = new FileReader();
    fr.onload = function () {
      try {
        const p = JSON.parse(fr.result);
        if (!p || typeof p !== "object" || !p.steps) throw new Error("not a tracker file");
        if (!confirm("Replace everything currently in this browser with the imported file?")) return;
        state = Object.assign(blank(), p);
        save(); renderAll(); toast("Progress restored");
      } catch (e) {
        alert("That file doesn't look like a tracker backup.");
      }
    };
    fr.readAsText(file);
  }

  /* ---------------- sources ---------------- */
  function renderSources() {
    /* how many steps cite each document */
    const uses = {};
    allSteps().forEach(function (x) {
      (x.step.refs || []).forEach(function (r) {
        const k = Array.isArray(r) ? r[0] : r;
        uses[k] = (uses[k] || 0) + 1;
      });
    });
    PATHS.forEach(function (p) {
      (p.refs || []).forEach(function (k) { uses[k] = (uses[k] || 0) + 1; });
    });

    const order = ["Utah statute", "Utah administrative rule", "Salt Lake County Health Dept",
                   "Salt Lake County", "Salt Lake City", "Utah state agency", "Federal", "Business support"];
    const groups = {};
    SOURCES.forEach(function (s) { (groups[s.kind] = groups[s.kind] || []).push(s); });

    $("#sourceList").innerHTML = order.filter(function (k) { return groups[k]; }).map(function (k) {
      return '<div class="src-group"><h3>' + esc(k) + "</h3>" +
        groups[k].map(function (s) {
          const n = uses[s.key] || 0;
          return '<div class="src"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a>" +
            (n ? '<span class="rkind">cited in ' + n + " step" + (n > 1 ? "s" : "") + "</span>" : "") +
            '<p class="rnote">' + esc(s.what) + "</p></div>";
        }).join("") + "</div>";
    }).join("");
  }

  /* ---------------- views ---------------- */
  function setView(v) {
    ui.view = v;
    ["board", "paths", "dashboard", "contacts", "budget", "help"].forEach(function (n) {
      $("#view-" + n).classList.toggle("hidden", n !== v);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
      t.classList.toggle("active", t.dataset.view === v);
    });
    if (v === "paths") renderPaths();
    if (v === "dashboard") renderDashboard();
    if (v === "contacts") renderContacts();
    if (v === "budget") renderBudget();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderAll() {
    renderBoard();
    if (ui.view === "dashboard") renderDashboard();
    if (ui.view === "contacts") renderContacts();
    if (ui.view === "budget") renderBudget();
    stamp();
  }

  /* ---------------- cloud sync UI ---------------- */
  let syncState = "unconfigured";

  function paintSync(st, detail) {
    syncState = st;
    const chip = $("#syncChip");
    if (!chip) return;
    const map = {
      unconfigured: ["·", "Local only", "This browser only — set up sync in SUPABASE-SETUP.md"],
      connecting:   ["…", "Connecting", "Reaching the sync service"],
      signedout:    ["↯", "Sign in to sync", "Sync across your devices"],
      sending:      ["…", "Sending code", ""],
      sent:         ["✉", "Check your email", ""],
      verifying:    ["…", "Verifying", ""],
      signedin:     ["✓", "Synced", FTSync.email()],
      saving:       ["⟳", "Saving…", FTSync.email()],
      synced:       ["✓", "Synced", FTSync.email()],
      offline:      ["!", "Offline", detail || "Changes are saved here and will sync when you reconnect"],
      error:        ["!", "Sync error", detail || ""]
    };
    const m = map[st] || map.signedout;
    chip.className = "btn ghost sync-chip s-" + st;
    chip.innerHTML = '<span class="sdot">' + m[0] + "</span>" + esc(m[1]);
    chip.title = m[2];
    chip.classList.toggle("hidden", false);
  }

  function openAuth() {
    if (!FTSync.configured) {
      alert("Cloud sync isn't set up for this site yet.\n\n" +
            "Open SUPABASE-SETUP.md in the repository — it's a one-time, roughly 15 minute job. " +
            "Until then everything saves in this browser and Export / Import moves it between devices.");
      return;
    }
    if (FTSync.isSignedIn()) {
      if (confirm("Signed in as " + FTSync.email() + ".\n\nSync now and stay signed in? (Cancel to sign out.)")) {
        doSync();
      } else {
        FTSync.signOut().then(function () { paintSync("signedout"); toast("Signed out — this browser's copy is untouched"); });
      }
      return;
    }
    $("#authModal").classList.remove("hidden");
    $("#authOverlay").classList.remove("hidden");
    $("#authStep2").classList.add("hidden");
    $("#authMsg").textContent = "";
    $("#authEmail").focus();
  }
  function closeAuth() {
    $("#authModal").classList.add("hidden");
    $("#authOverlay").classList.add("hidden");
  }

  /* Pull remote, merge into local, push the result back. */
  let syncing = null;
  function doSync() {
    if (!FTSync.configured || !FTSync.isSignedIn()) return Promise.resolve();
    if (syncing) return syncing;          /* onAuthStateChange and getSession can both fire */
    syncing = runSync().then(function (v) { syncing = null; return v; },
                            function (e) { syncing = null; throw e; });
    return syncing;
  }

  function runSync() {
    paintSync("saving");
    return FTSync.pull().then(function (remote) {
      if (remote && remote.data && remote.data.steps) {
        const before = JSON.stringify(state);
        state = mergeStates(state, remote.data);
        if (JSON.stringify(state) !== before) {
          toast("Merged changes from your other devices");
          renderAll();
        }
        save({ noPush: true });
      }
      return FTSync.push(state);
    }).then(function () {
      renderAll();
    }).catch(function (e) {
      paintSync("offline", e && e.message);
    });
  }

  function initSync() {
    if (!window.FTSync) return;
    FTSync.init({
      onStatus: paintSync,
      onSession: function (s) { if (s) doSync(); }
    });

    $("#syncChip").onclick = openAuth;
    $("#authClose").onclick = closeAuth;
    $("#authOverlay").onclick = closeAuth;

    /* Turn Supabase's terse errors into something actionable. */
    function authError(e) {
      const raw = (e && e.message) || "";
      const m = raw.toLowerCase();
      if (m.indexOf("not authorized") !== -1 || m.indexOf("not allowed") !== -1) {
        return "That address isn't allowed to receive mail from this project yet. " +
               "Supabase's built-in email only delivers to your project's team members — " +
               "use your own Supabase account email, add this person under Organization → Team, " +
               "or set up custom SMTP. See SUPABASE-SETUP.md, step 3.";
      }
      if (m.indexOf("rate") !== -1 || m.indexOf("limit") !== -1 || m.indexOf("too many") !== -1) {
        return "Rate limited — the built-in email service allows only about 2 messages an hour. " +
               "Wait a while, or set up custom SMTP (SUPABASE-SETUP.md, step 3).";
      }
      if (m.indexOf("redirect") !== -1 || m.indexOf("url") !== -1) {
        return "The redirect URL isn't allowed. Add this site's exact URL under " +
               "Authentication → URL Configuration (SUPABASE-SETUP.md, step 4).";
      }
      return raw || "Couldn't send the email. Your work is still saved in this browser.";
    }

    $("#authSend").onclick = function () {
      const em = $("#authEmail").value.trim();
      if (!em || em.indexOf("@") === -1) { $("#authMsg").textContent = "That doesn't look like an email address."; return; }
      $("#authMsg").textContent = "Sending…";
      FTSync.sendCode(em).then(function () {
        $("#authStep2").classList.remove("hidden");
        $("#authMsg").innerHTML = "<strong>Check your email.</strong> Click the sign-in link and you'll " +
          "land back here signed in — this tab can stay open or be closed, either is fine.";
      }).catch(function (e) { $("#authMsg").textContent = authError(e); });
    };
    $("#authVerify").onclick = function () {
      const em = $("#authEmail").value.trim();
      const code = $("#authCode").value.trim();
      if (!code) return;
      $("#authMsg").textContent = "Verifying…";
      FTSync.verifyCode(em, code).then(function () {
        closeAuth();
        toast("Signed in — syncing");
        doSync();
      }).catch(function (e) {
        $("#authMsg").textContent =
          "That code didn't work. If your email only contained a link, click the link instead — " +
          "most projects can't send codes. (" + ((e && e.message) || "invalid code") + ")";
      });
    };
    $("#authEmail").onkeydown = function (e) { if (e.key === "Enter") $("#authSend").click(); };
    $("#authCode").onkeydown  = function (e) { if (e.key === "Enter") $("#authVerify").click(); };

    /* flush pending changes when the tab is backgrounded or closed */
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") { clearTimeout(pushTimer); pushNow(); }
    });
    window.addEventListener("beforeunload", function () { clearTimeout(pushTimer); pushNow(); });
    /* pick up other devices' changes when you come back to the tab */
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && FTSync.isSignedIn()) doSync();
    });
  }

  /* ---------------- boot ---------------- */
  function init() {
    // theme
    const t = state.theme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", t);
    $("#btnTheme").onclick = function () {
      const cur = document.documentElement.getAttribute("data-theme");
      const nxt = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nxt);
      state.theme = nxt; save();
    };

    renderSources();

    $("#tabs").addEventListener("click", function (e) {
      const t = e.target.closest(".tab"); if (t) setView(t.dataset.view);
    });

    $("#search").addEventListener("input", function () { ui.q = this.value.trim(); renderBoard(); });
    $("#contactSearch").addEventListener("input", renderContacts);
    $("#onlyMine").addEventListener("change", function () { ui.onlyStar = this.checked; renderBoard(); });
    $("#statusFilters").addEventListener("click", function (e) {
      const c = e.target.closest(".chip"); if (!c) return;
      ui.status = c.dataset.status;
      Array.prototype.forEach.call(this.querySelectorAll(".chip"), function (x) { x.classList.remove("active"); });
      c.classList.add("active");
      renderBoard();
    });

    document.addEventListener("click", function (e) {
      const star = e.target.closest("[data-star]");
      if (star) {
        e.stopPropagation();
        const r = rec(star.dataset.star); r.star = !r.star; touch(star.dataset.star); save(); renderBoard();
        return;
      }
      const go = e.target.closest("[data-goto]");
      if (go) { const el = document.getElementById(go.dataset.goto); if (el) el.scrollIntoView({ behavior: "smooth" }); return; }

      const add = e.target.closest("[data-addstep]");
      if (add) {
        const title = prompt("What's the step?");
        if (!title) return;
        const pid = add.dataset.addstep;
        state.customSteps[pid] = state.customSteps[pid] || [];
        state.customSteps[pid].push({
          id: "custom-" + Date.now(),
          title: title,
          why: prompt("Short note on why it matters (optional):") || "",
          custom: true, checklist: [], contacts: [], links: []
        });
        save(); renderAll();
        return;
      }

      const op = e.target.closest("[data-open]");
      if (op) { e.preventDefault(); openStep(op.dataset.open); }
    });

    $("#btnCloseDrawer").onclick = closeDrawer;
    $("#overlay").onclick = closeDrawer;
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

    $("#btnExport").onclick = doExport;
    $("#btnImport").onclick = function () { $("#fileImport").click(); };
    $("#fileImport").onchange = function () { if (this.files[0]) doImport(this.files[0]); this.value = ""; };

    renderAll();
    initSync();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
