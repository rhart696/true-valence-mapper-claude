# TVRM (Claude Edition) — STATUS / "Where do I look?"

**One-line:** Trust-mapping web app. Core is DONE and live; paused awaiting a direction decision.
**Updated:** 2026-06-06.

## ▶ If you're picking this up
Read **[`NEXT-SESSION.md`](./NEXT-SESSION.md)** — it has the current state + the pending **A/B/C/D direction decision**.
(An agent opening this project also surfaces it automatically via the banner in `../AGENTS.local.md`.)

## State at a glance
| | |
|---|---|
| Status | Core complete; next-feature decision pending |
| Live | https://v1-rhart696s-projects.vercel.app/ (Vercel) |
| Stack | Next.js 16 + React 19 + TS + Tailwind · Supabase · Playwright (see `../AGENTS.local.md` → "Stack & Commands") |
| Run locally | `cd v1 && npm run dev` → http://localhost:3000 |

## Where things live
- **What/why (product):** [`../PRODUCT_REQUIREMENTS_DOCUMENT.md`](../PRODUCT_REQUIREMENTS_DOCUMENT.md)
- **Pick-up point + decision:** [`NEXT-SESSION.md`](./NEXT-SESSION.md)
- **Edition governance / stack / approvals:** [`../AGENTS.local.md`](../AGENTS.local.md)
- **Planning & reviews:** `UX-OPTIMIZATION-PLAN.md`, `REVISED-UX-OPTIMIZATION-PLAN.md`, `CRITICAL-REVIEW-AND-OPTIMIZATIONS.md`, `REVIEW_LOG.md`, plus `planning/`, `architecture/`, `reports/`.
- **The app code:** `../v1/src/` (Next.js App Router: `app/`, `components/`, `lib/`, `context/`, `hooks/`).

## Known issues / watch-list
- ⚠️ **55 dependabot vulnerabilities** on the repo (1 critical, 20 high) — dependency updates need approval (this is 1 of 7 coordinated editions; ask-first on deps). Address when feature work resumes.

## Governance reminder
This is **1 of 7 coordinated editions**. Ask before: adding npm packages, changing build config, or architectural changes. Docs/features within existing deps are fine.
