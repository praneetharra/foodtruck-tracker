# Food Truck Launch Tracker — Salt Lake County

An interactive, phase-by-phase tracker for planning and launching a food truck in
Salt Lake County, Utah. Static site, no backend, hosted on GitHub Pages.

## What it does

- **12 ordered phases** from the licensing-path decision through growth, pre-loaded
  with researched Salt Lake County / Salt Lake City / Utah state requirements.
- **Cities tab** — all 24 Salt Lake County jurisdictions, read from their municipal
  codes: does each allow a towed food trailer, where may a mobile unit operate,
  annual day caps, fees, reciprocity, and what to confirm by phone. Filterable and
  searchable, with 66 links to primary sources.
- **Path Decision tab** — a side-by-side comparison of the three ways a food trailer
  can be licensed in Salt Lake County, built around how wastewater is handled:
  self-contained tanks, a sewer-connected mobile unit, or a permanent food
  establishment. Includes an interactive fit-finder and the exact questions to ask
  the health department and the city.
- **Every step opens a detail panel** with: status, owner, target date, actual cost,
  a sub-checklist, official links and forms, agency contacts, a running notes log,
  and a next-steps list.
- **Dashboard** — overall and per-phase progress, open next steps, recent activity.
- **Contacts** — every agency phone number and address in one directory, plus any
  contacts you add yourself.
- **Budget** — estimated vs. actual permitting/licensing cost.
- **Search and filters** across steps, notes and contacts. Star the steps you care about.
- **Citations throughout.** Every step has a *Where this comes from* section listing the
  statutes, administrative rules and agency documents behind its claims — 184 citations
  across 43 source documents. A step with no citations says so plainly, so operational
  judgment is never mistaken for a regulation. The **How to use** tab lists every source
  grouped by issuing body, with a note on what each document is good for and how many
  steps rely on it.

## Your data

Everything you type saves instantly to this browser's `localStorage`.

**Cross-device sync is optional and off until configured.** Fill in
`assets/config.js` with a Supabase project URL and anon key and the top-bar chip
becomes **Sign in to sync**: enter your email, type the one-time code, and every
device you sign in on shares the same plan. See **[SUPABASE-SETUP.md](SUPABASE-SETUP.md)**
— one-time, about 15 minutes, free tier.

Merging is per-step rather than whole-file. Whichever device edited a step most
recently wins on status, owner, date and cost, but **notes are unioned**, so a note
written on your phone and one written on your laptop both survive. Deletions are
tombstoned so they don't reappear from the other device.

Until sync is set up — or if you never bother — the tracker works exactly as before,
and **Export** / **Import** move a JSON backup between machines. Worth exporting
occasionally either way.

## Publishing to GitHub Pages

```bash
git init
git add .
git commit -m "Food truck launch tracker"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch: `main`, folder: `/ (root)` → Save**.

The site goes live at `https://<your-username>.github.io/<repo-name>/` within a
minute or two.

## Editing the content

| File | What's in it |
|---|---|
| `assets/data.js` | All phases, steps, checklists, agency contacts, the `REFS` citation registry, path comparison, cost estimates |
| `assets/app.js` | Application logic, state, local persistence, cross-device merge |
| `assets/sync.js` | Supabase transport — auth and read/write of the plan blob |
| `assets/cities.js` | City-by-city mobile food rules for all 24 SLCo jurisdictions |
| `assets/config.js` | Your Supabase URL and anon key (empty = local-only mode) |
| `assets/styles.css` | Styling and light/dark theme |
| `index.html` | Page structure |

To add or change steps for everyone who loads the site, edit `assets/data.js` and
push. To cite a source, add it once to the `REFS` object and reference it by key from
any step: `refs:[["r392_102_7","what this establishes here"]]`. A build check validates
that every key resolves. Personal notes and status are stored separately in the browser, so they survive
content updates. Steps you add through the **+ Add a step** button live only in your
browser.

## Accuracy caveat

Phone numbers, fees, and rules were gathered in August 2026 from the Salt Lake County
Health Department, Salt Lake City, and Utah state sources. Amounts marked *est.* come
from third-party guides and are **not** official quotes. Requirements differ between
Salt Lake City, West Valley City, Sandy, Murray and unincorporated county areas.

**Confirm everything with the issuing agency before spending money or making plans.**
This is a planning tool, not legal, tax, or financial advice.
