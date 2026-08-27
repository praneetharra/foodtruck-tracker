/* =========================================================================
   FTSync — cloud persistence transport for the Food Truck Launch Tracker.

   Thin wrapper over Supabase: auth (email one-time code), plus read/write of
   a single JSON blob per plan. All merge logic lives in app.js — this file
   only moves bytes and reports status.

   If config.js is empty this module reports unconfigured and does nothing,
   so the page keeps working as a local-only tracker.
   ========================================================================= */
window.FTSync = (function () {
  "use strict";

  const CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const CDN_FALLBACK = "https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js";

  let client = null;
  let planId = null;
  let session = null;
  let onStatus = function () {};
  let loading = null;

  const cfg = window.FT_CONFIG || {};
  const configured = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);

  function status(state, detail) { onStatus(state, detail || ""); }

  /* Load the Supabase browser bundle on demand, with a second CDN as backup. */
  function loadFrom(url) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      s.src = url;
      s.async = true;
      s.onload = function () {
        window.supabase && window.supabase.createClient
          ? resolve()
          : reject(new Error("library loaded but createClient is missing"));
      };
      s.onerror = function () { reject(new Error("could not reach " + url)); };
      document.head.appendChild(s);
    });
  }

  function loadSdk() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    if (loading) return loading;
    loading = loadFrom(CDN).catch(function () { return loadFrom(CDN_FALLBACK); })
      .catch(function () {
        throw new Error("Couldn't load the sync library — your work is still saved in this browser.");
      });
    return loading;
  }

  /* -------------------- public API -------------------- */
  const api = {
    configured: configured,

    /* hooks: { onStatus(state, detail), onSession(session), onRemote(data) } */
    init: function (hooks) {
      onStatus = (hooks && hooks.onStatus) || onStatus;
      if (!configured) { status("unconfigured"); return Promise.resolve(false); }

      status("connecting");
      return loadSdk().then(function () {
        client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            /* implicit so a magic link opened on a different device than the one
               that requested it still works; the code path below is primary. */
            flowType: "implicit",
            detectSessionInUrl: true
          }
        });

        client.auth.onAuthStateChange(function (_evt, s) {
          session = s;
          if (hooks && hooks.onSession) hooks.onSession(s);
        });

        return client.auth.getSession().then(function (r) {
          session = (r && r.data && r.data.session) || null;
          /* strip auth tokens out of the address bar after a magic-link landing */
          if (location.hash && location.hash.indexOf("access_token") !== -1) {
            history.replaceState(null, "", location.pathname + location.search);
          }
          status(session ? "signedin" : "signedout");
          if (hooks && hooks.onSession) hooks.onSession(session);
          return !!session;
        });
      }).catch(function (e) {
        status("error", e.message);
        return false;
      });
    },

    isSignedIn: function () { return !!session; },
    email: function () { return session && session.user ? session.user.email : ""; },

    /* Send a one-time code (and a link, depending on your email template). */
    sendCode: function (email) {
      if (!client) return Promise.reject(new Error(
        configured ? "Not connected to the sync service yet — reload the page and try again."
                   : "Cloud sync isn't configured for this site."));
      status("sending");
      return client.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: location.origin + location.pathname
        }
      }).then(function (r) {
        if (r.error) throw r.error;
        status("sent");
        return true;
      }).catch(function (e) { status("error", e.message); throw e; });
    },

    verifyCode: function (email, token) {
      if (!client) return Promise.reject(new Error(
        configured ? "Not connected to the sync service yet — reload the page and try again."
                   : "Cloud sync isn't configured for this site."));
      status("verifying");
      return client.auth.verifyOtp({ email: email, token: String(token).trim(), type: "email" })
        .then(function (r) {
          if (r.error) throw r.error;
          session = r.data.session;
          status("signedin");
          return session;
        }).catch(function (e) { status("error", e.message); throw e; });
    },

    signOut: function () {
      if (!client) return Promise.resolve();
      return client.auth.signOut().then(function () {
        session = null; planId = null;
        status("signedout");
      });
    },

    /* Resolve (creating on first run) the plan this account belongs to. */
    ensurePlan: function () {
      if (planId) return Promise.resolve(planId);
      if (!client || !session) return Promise.reject(new Error("Not signed in"));
      return client.rpc("ensure_plan").then(function (r) {
        if (r.error) throw r.error;
        planId = r.data;
        return planId;
      });
    },

    /* Returns { data, updated_at } or null when the row is empty. */
    pull: function () {
      return api.ensurePlan().then(function (pid) {
        return client.from("plan_state").select("data, updated_at").eq("plan_id", pid).maybeSingle();
      }).then(function (r) {
        if (r.error) throw r.error;
        if (!r.data) return null;
        const d = r.data.data;
        if (!d || !Object.keys(d).length) return null;
        return { data: d, updated_at: r.data.updated_at };
      });
    },

    push: function (stateObj) {
      status("saving");
      return api.ensurePlan().then(function (pid) {
        return client.from("plan_state").upsert(
          { plan_id: pid, data: stateObj }, { onConflict: "plan_id" }
        ).select("updated_at").maybeSingle();
      }).then(function (r) {
        if (r.error) throw r.error;
        status("synced", r.data ? r.data.updated_at : "");
        return true;
      }).catch(function (e) {
        status("offline", e.message);
        throw e;
      });
    },

    planId: function () { return planId; }
  };

  return api;
})();
