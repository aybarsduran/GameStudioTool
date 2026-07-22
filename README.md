# Game Studio Tool — LiveOps Desk

Dense LiveOps desk for build triage and playtest feedback. A Design Engineering portfolio case: audit a weak SaaS screen, then ship polished, accessible UI in Next.js + TypeScript.

**Live demo:** _add your Vercel URL here after deploy_

| Baseline (before) | Polished (after) |
| --- | --- |
| [/before](/before) | [/](/) |

## Case study

### Problem
Game teams triage playtest feedback in dense tables every day. A first-pass UI often ships with weak hierarchy, color-only status, cramped filters, and no keyboard path — fine for a prototype, not for daily use.

### Audit (what was wrong on `/before`)
- Flat typography — title, meta, and chrome compete at the same size
- Severity communicated by color alone
- Filters look interactive but do nothing; empty/loading states missing
- No skip link, drawer, focus trap, or focus return
- Uneven spacing and low-contrast secondary text

### After (what shipped)
- Product shell with sidebar navigation (LiveOps, Builds, Patch Notes, Settings)
- Dense feedback inbox with URL-driven search / status / severity / platform filters
- Detail drawer for triage (status + assignee) with toast confirmation
- Skeleton loading, empty state with clear-filters action
- Keyboard row navigation, drawer focus trap, Esc + focus restore
- EN / TR UI language switcher (persisted in `localStorage`), including localized mock feedback copy
- Shared design tokens (Figtree + IBM Plex Mono, teal accent, AA-minded contrast)

### Accessibility notes
- Skip link to main content on desk routes
- Status/severity always include text labels, not color alone
- Filter chips expose `aria-pressed`
- Drawer uses `role="dialog"`, `aria-modal`, labelled title, Tab cycle trap
- Table caption documents keyboard usage for screen readers

### Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Mock fixtures only (no backend)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production check:

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Framework preset: **Next.js** (default). Build command `npm run build`, output detected automatically
4. Paste the deployment URL into the **Live demo** line above


## Build steps completed

1. App shell — tokens, sidebar, page chrome
2. Mock feedback data, dense table, URL-driven filters
3. Detail drawer, status/assignee triage, toasts
4. Skeleton, empty state, keyboard nav, focus trap
5. Builds, Patch Notes, Settings stub pages
6. `/before` baseline + case write-up + deploy-ready build
