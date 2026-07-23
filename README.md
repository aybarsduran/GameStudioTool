# Game Studio Tool — LiveOps Desk

A dense LiveOps desk for playtest feedback triage: filterable inbox, detail drawer, build & patch context, and EN/TR UI — built as a Design Engineering portfolio case in Next.js and TypeScript.

| Baseline | Polished |
| --- | --- |
| [`/before`](/before) | [`/`](/) |

## Overview

Game teams review playtest reports in high-density tables every day. This project shows an audit-and-polish loop: start from a weak baseline UI, then ship a production-minded desk with clearer hierarchy, keyboard access, and consistent craft.

### Features

- Feedback inbox with search and status / severity / platform filters (URL-driven)
- Detail drawer for status and assignee triage, with toast confirmation
- Builds and Patch Notes context pages
- Workspace settings persisted in `localStorage`
- EN / TR language switcher, including localized mock feedback copy
- Accessible patterns: skip link, focus trap, focus restore, text + color status labels

### Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4
- Client-side mock data (no backend)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Case study

**Problem.** First-pass triage UIs often ship with flat typography, color-only severity, dead filters, and no keyboard path — usable as a prototype, not for daily ops.

**Baseline (`/before`).** Cramped layout, weak hierarchy, non-functional filters, and no focus management.

**After.** Product shell, dense readable table, working filters, triage drawer, loading/empty states, EN/TR, and accessibility pass (skip link, `aria-pressed` chips, dialog focus trap, labeled severity/status).
