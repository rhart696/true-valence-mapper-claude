# Roadmap V2 Candidates

Feature candidates for v1.x / v2, informed by v0 implementations.

---

## Toast Notification System

**What v0 had:**
- Standalone `toast-notifications.js` + `toast-notifications.css` (vanilla JS)
- 4 types: success, error, warning, info
- Auto-dismiss after 3 seconds; manual dismiss via X or Escape key
- Queue management: max 5 visible toasts, additional ones queued
- Slide-in animation from top-right
- Demo page: `TOAST-DEMO.html` (now archived in `docs/archive/v0/`)

**What a v1/v2 implementation would look like:**
- React component using a toast library (e.g., `sonner` or `react-hot-toast`) — no custom vanilla JS
- Hook: `useToast()` for triggering from any component
- Integrate with Save & Share flow: success toast on save, error toast on failure
- Integrate with PDF/PNG export: progress and completion feedback
- Replace current silent failures with user-visible feedback

**Priority:** Medium — app currently has no user-facing feedback on async actions (save, export).

---

## Version History

**What v0 had:**
- `version-history.js` (371 lines) — vanilla JS class managing localStorage snapshots
- Up to 10 versions stored; auto-cleanup of oldest on overflow
- UI: timeline modal, version comparison (added/removed/modified visual diff), restore
- Auto-save triggers: on add-person, before clear, on import/export, on demo load
- Manual save with optional custom description
- Export version history as JSON
- Full docs: `VERSION-HISTORY-IMPLEMENTATION.md` (archived)
- Test suite: 10 automated tests (archived)

**What a v1/v2 implementation would look like:**
- Server-side snapshots stored in Supabase alongside the share session — persistence across devices
- Share-code-scoped: a session's version history lives with its `share_code` record
- UI: timeline drawer panel (React), restore from any snapshot
- Auto-snapshot triggers: on first save, on score change (debounced 60s), on explicit re-save
- Diff view: show relationship adds/removes and score changes between snapshots
- No localStorage dependency — history follows the session, not the browser

**Priority:** Low for v1.x (nice-to-have); High for v2 if app targets multi-session coaching workflows.

---

*Archived source files: `docs/archive/v0/`*
*Created: 2026-02-22*
