---
title: UX/CX Review — ProActive True Valence Mapper (index-backup.html)
author: UX/CX Team (saved by assistant)
date: 2025-11-12T12:00:00Z
repo-path: docs/ux-review-index-backup.md
source-file-reviewed: index-backup.html
generated-by: assistant
---

# UX / CX Review — ProActive True Valence Mapper

Summary
---
This document is a UX/CX review of `index-backup.html`. It's written for a complete novice user who may arrive anxious and uncertain. The goal is to shape a calm, clear, and low-friction experience while preserving the elegant visual design the product already exhibits.

Metadata
---
- Report generated: 2025-11-12T12:00:00Z (UTC)
- Author: UX/CX Team (saved by assistant)
- Reviewed file: `index-backup.html`
- Saved location: `docs/ux-review-index-backup.md`

High-level assessment
---
- Visual tone: the app already uses a pleasing cyan → navy gradient and a spacious white card which supports a calm aesthetic. The centered "You" anchor provides an immediate mental model.
- Strengths: clear feature set (add people, score trust, save/load, import/export, demo), generous spacing, good legend and help content.
- Risks for novices: multiple primary actions on first view, blocking browser alerts/confirm dialogs, and a partly-cryptic interaction (click arrows to cycle scores). These increase friction for anxious users.
- Accessibility gaps: SVG interactive elements lack ARIA/keyboard affordances; color-only signals need text or pattern fallbacks.

Design goals for this user persona
---
1. Minimize decisions at first contact — offer a single recommended next step.
2. Use progressive disclosure — show advanced features only after the user is comfortable.
3. Remove jarring system dialogs — prefer in-context toasts and lightweight modals.
4. Reinforce safety — autosave and an undo affordance to reduce fear of mistakes.
5. Increase discoverability — make interactive affordances explicit (scoring controls) while keeping arrow clicks for power users.

Prioritized recommendations
---

Quick wins (low effort, high impact)
- Replace browser `alert()`/`confirm()` with in-app toasts and confirmations. Rationale: less jarring and preserves visual calm. Acceptance: no native alerts; all messages are styled toasts or modals.
- Add a single prominent first-time CTA: “Load Example (recommended)” with a secondary “Add someone” action. Rationale: novices need a single clear next step. Acceptance: first-run UI surfaces these two options, with demo the default.
- Provide inline validation for input instead of blocking alerts. Acceptance: empty/duplicate names show inline helper text.
- Autosave + short undo for destructive actions (clear/import). Acceptance: changes persist automatically and a 5–10s undo is shown.
- Add a persistent, subtle “Saved” indicator with a timestamp. Acceptance: indicator updates when autosave completes.

Medium effort (medium impact)
- Add explicit scoring popovers or small labeled score controls for each relationship (high/medium/low/not scored). Acceptance: each node/line has a visible control in addition to arrow clicks.
- Make SVG elements keyboard-focusable and add ARIA labels + aria-live announcements. Acceptance: keyboard navigation toggles scores and screen reader announces updates.
- Convert welcome slides to an interactive micro-onboarding that asks users to add one person and set one score. Acceptance: first-run guided tour completion rate metric.

Long-term / strategic
- Add tasteful animations that demonstrate trust flow with reduced-motion support. Acceptance: animations are subtle, optional, and respect OS-level preferences.
- Provide optional versioning/cloud backup as an opt-in feature with clear privacy controls. Acceptance: users can opt into cloud backup; privacy copy is explicit.

UX and interaction details
---

Landing & onboarding
- Show a calm empty-state hero inside the visualization area when no relationships exist:
  - Title: "Start mapping trust — it's simple."
  - Subtitle: "Try the example map or add someone to get started. You can always undo changes."
  - Primary CTA: "Load example (safe tour)"
  - Secondary CTA: "Add someone"
- Keep help available but de-emphasized: the floating help "?" stays in the corner and opens contextual help.

Scoring discovery and affordance
- Add a small scoring popover anchored to lines or nodes with explicitly labelled options: Not scored, High, Medium, Low. Keep arrow click-to-cycle for intermediate users.
- Show a microcopy hint on first hover/focus: "Click an arrow or pick a score".

Feedback & confirmations
- Replace native confirm(): use a soft modal for destructive actions with clear primary and secondary choices and an Undo toast after confirmation.
- Use toasts for non-blocking messages (saved, imported, demo loaded). Toasts should include brief, friendly copy and optional Undo.

Microcopy examples (drop-in)
---
- Empty state hero heading: "Start mapping trust — it’s simple."
- Add person placeholder: "Add a person (e.g., ‘Alex’)"
- Empty-validation: "Please enter a name." (inline beneath input)
- Add success toast: "Nice — [name] added. Click an arrow to score or pick a score." 
- Save confirmation toast: "Saved to this device — no account needed."
- Clear All confirmation header: "Clear your map?" body: "This will remove all people from this map. You can undo for 10s." buttons: "Clear" (primary), "Cancel" (secondary)
- Import preview heading: "Import preview — this will replace your current map." (show small preview before confirm)

Accessibility & responsiveness checklist
---

Keyboard
- Ensure all interactive nodes/arrows are in Tab order (tabindex="0").
- Enter/Space activate scoring; arrow keys move focus between nodes.

Screen reader
- Add aria-labels to nodes and arrows: e.g., aria-label="Alex — outward: High, inward: Not scored".
- Use an aria-live polite region for event announcements ("Saved", "Alex added", "Score updated").

Color and contrast
- Verify all color swatches and arrow strokes meet contrast ratios; add text labels (1/2/3) or small icons to indicate score if contrast is insufficient.
- Offer a colorblind-safe toggle or patterns for score lines.

Touch targets & mobile
- Make tap zones at least 44×44px for nodes and arrow controls.
- Move primary controls into a bottom sticky bar on small screens and collapse the legend into a panel.

Animations
- Respect prefers-reduced-motion (disable or reduce animations if user opts out).

Implementation roadmap (phased)
---

Phase 1 — Quick Wins (2–5 days):
- Replace alerts/confirms with toasts/modals; inline validation; add empty-state hero; autosave + Undo; persistent Saved indicator.

Phase 2 — Usability & Accessibility (3–7 days):
- Scoring popovers and arrow affordances; keyboard focus/ARIA; mobile layout improvements.

Phase 3 — Polish & Long-term (variable):
- Animations, versioning/cloud backup opt-in, analytics for first-run metrics.

Success metrics and testing suggestions
---
- Time to first interaction (click "Load Example" or "Add someone").
- Completion rate for a two-step task: add + score one arrow.
- Undo usage (indicates exploration willingness).
- Export/import usage (indicates trust in preserving work).
- Accessibility audit pass rate (keyboard + ARIA + contrast).

Suggested user test tasks
---
- Task 1 (Novice): "Add a person named ‘Sam’ and set your outward trust to High." Measure success/time.
- Task 2 (Anxious): "Clear the map and then undo." Observe whether Undo is noticed and used.
- Task 3 (Mobile): "Import the example map and score one relationship." Measure tap accuracy and clarity.

Concrete accessibility code checklist
---
- Add tabindex="0" to the interactive <g> wrappers and paths.
- role="button" and aria-label on arrow paths ("Outward to [name]. Current: [score]").
- Group nodes with role="group" and aria-labelledby connecting to visible text nodes.
- Add an aria-live region with id="announcer" to broadcast changes.
- Replace alert()/confirm() with showToast() and showModal() that also update the announcer text.

Next steps (recommended immediate order)
---
1. Replace alerts with toasts and add inline validation.
2. Add the empty-state hero and a prominent "Load Example (recommended)" CTA.
3. Add explicit scoring popovers; keep arrow cycling as a secondary affordance.
4. Autosave + Undo + Saved indicator.
5. Accessibility pass (ARIA + keyboard + contrast checks).

If you want, I can now:
- Create a small PR adding this markdown file (done), or create PR with the first Quick Wins implemented (toasts, empty state, autosave + undo).
- Generate exact HTML/JS/CSS patches to implement Quick Wins incrementally.

---
End of report
