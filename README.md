# Food Truck Launch Tracker — Salt Lake County

An interactive, phase-by-phase tracker for planning and launching a food truck in
Salt Lake County, Utah. Static site, no backend, hosted on GitHub Pages.

## What it does

- **12 ordered phases** from the licensing-path decision through growth, pre-loaded
  with researched Salt Lake County / Salt Lake City / Utah state requirements.
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

## Your data

Everything you type is saved in your browser's `localStorage` on the device you're
using. It is never uploaded anywhere and no one else can see it.

**Back it up.** Click **Export** to download a JSON file, and **Import** to restore it
or move your progress to another browser or computer. Clearing your browser data will
wipe the tracker.

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
| `assets/data.js` | All phases, steps, checklists, agency contacts, links, cost estimates |
| `assets/app.js` | Application logic, state, persistence |
| `assets/styles.css` | Styling and light/dark theme |
| `index.html` | Page structure |

To add or change steps for everyone who loads the site, edit `assets/data.js` and
push. Personal notes and status are stored separately in the browser, so they survive
content updates. Steps you add through the **+ Add a step** button live only in your
browser.

## Accuracy caveat

Phone numbers, fees, and rules were gathered in August 2026 from the Salt Lake County
Health Department, Salt Lake City, and Utah state sources. Amounts marked *est.* come
from third-party guides and are **not** official quotes. Requirements differ between
Salt Lake City, West Valley City, Sandy, Murray and unincorporated county areas.

**Confirm everything with the issuing agency before spending money or making plans.**
This is a planning tool, not legal, tax, or financial advice.
