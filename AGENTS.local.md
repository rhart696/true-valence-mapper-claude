# AGENTS.local.md - Edition-Specific Governance (Claude Code)

<!-- =================== START-HERE BANNER =================== -->
> ## ▶ START HERE — PENDING DIRECTION DECISION (captured 2026-06-06)
>
> **Agent: when a session starts in this project, surface this to the human FIRST, before other work.**
>
> TVRM (Claude edition) development is **paused awaiting a direction decision**. The PRD core is DONE
> (canvas, bidirectional trust scoring, Supabase Save & Share, PNG/PDF export — live on Vercel).
> Open question — **what to build next:**
> - **A. AI-Powered Insights** ⭐ *recommended* — auto-name trust asymmetries/patterns (needs Claude API → ask-first)
> - **B. Guided interpretation / exercises** — fast, likely no new deps
> - **C. Historical tracking** — snapshots over time
> - **D. Core polish** — accessibility, mobile, multiple named maps
>
> **Action:** present A/B/C/D to the human and ask which. Full analysis + flip-thresholds:
> [`docs/NEXT-SESSION.md`](./docs/NEXT-SESSION.md). **Remove this banner once a direction is chosen.**
<!-- ========================================================= -->

> **This file contains edition-specific guidance that extends or overrides [AGENTS.md](./AGENTS.md).**
> Unlike AGENTS.md, this file is NOT auto-synced from the parent repository.
> Edit this file directly in this edition's repository.

## Edition Context

| Key | Value |
|-----|-------|
| Edition | Claude Code |
| Focus | Reference implementation, security-first development, baseline architecture |
| Last Updated | 2026-06-06 |

## Stack & Commands (authoritative — overrides AGENTS.md)

> ⚠️ The parent-template `AGENTS.md` / root `CLAUDE.md` describe a **Vite + Jest** stack on port 5173.
> That is **stale/incorrect** for this edition. The actual app (`v1/`) is:

| | |
|---|---|
| Framework | **Next.js 16.1.6** + **React 19.2.3** + TypeScript (strict) + Tailwind |
| Backend | Supabase (`@supabase/supabase-js`) — Save & Share |
| E2E tests | **Playwright** (`v1/playwright/`) — *not* Jest/RTL |
| Dev | `cd v1 && npm run dev` → Next.js at **http://localhost:3000** |
| Build / start | `npm run build` / `npm run start` |
| Lint | `npm run lint` (eslint) |

(`npm test` does not exist — use Playwright for e2e.)

## Deployment Context

| Version | Host | URL | Status |
|---------|------|-----|--------|
| v1 (Next.js) | Vercel | https://v1-rhart696s-projects.vercel.app/ | **Canonical — active** |
| v0 (vanilla HTML/JS) | GitHub Pages | https://rhart696.github.io/true-valence-mapper/ | Pending retirement |

v1 is deployed from `v1/` via Vercel. The GitHub Pages deploy workflow (`deploy.yml`) has been disabled
as part of v0 retirement — it deployed root-level files that no longer represent the canonical app.

## Approved Dependencies

Dependencies specifically approved for THIS edition (in addition to shared dependencies):

| Package | Version | Approved By | Date | Reason |
|---------|---------|-------------|------|--------|
| @supabase/supabase-js | ^2.97.0 | rhart696 | 2026-02-22 | Feature #005: Save & Share via Supabase |

## Edition-Specific Exceptions

Exceptions to global governance that apply ONLY to this edition:

_None documented yet._

## Architecture Decisions

Edition-specific architectural decisions and their rationale:

### Feature #005 — Save & Share (Supabase-backed sessions)

| Decision | Detail |
|----------|--------|
| **Supabase client pattern** | Lazy singleton (`lib/supabase.ts`) — client created once on first use, not at module load |
| **Auth model** | Anonymous insert/select only; no user accounts. RLS policies allow anon insert + select by `share_code` |
| **Share code format** | 6-character alphanumeric, unambiguous charset (no 0/O, 1/l/I). Codes are case-insensitive on lookup |
| **Key format** | `sb_publishable_*` (new Supabase format, not legacy `eyJ...` JWT anon key). Set via `NEXT_PUBLIC_SUPABASE_ANON_KEY` env var |
| **Share URL** | `?share=<CODE>` query param on the same origin (no separate route needed) |
| **Expiry** | Sessions expire after 30 days (set at insert time, enforced by Supabase scheduled delete or TTL) |

## Contact

For questions about this edition's governance:
- **Edition Lead:** Claude Code AI Agent
- **Human Coordinator:** rhart696
- **Parent Repo:** https://github.com/rhart696/true-valence-mapper

---

*This file is edition-specific and will NOT be overwritten by parent repo syncs.*
*Create date: 2025-12-02*
