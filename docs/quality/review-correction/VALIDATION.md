# Corrective validation — TEST-0003

2026-10-06; WP-0002; original review baseline 08a05a6660694e468d25f110e9598b476a422f2e; local implementation parent ea6016d. The trees at these starting heads are identical. Synthetic Linux/browser verification, not deployed/client observations or human acceptance.

## Actual results

- All 44 repository evidence entries in the uploaded EVIDENCE.json matched the exact named commit/path SHA256. Hashes of six input files retained. Execution log/fixture references in the report were not supplied; their contents were not verified.
- Five new corrective browser scenarios failed before runtime edits (browser-before-restored.txt). This demonstrates missing acceptance behavior, not all reproduction details alleged by the earlier reviewer.
- Twelve final Playwright scenarios passed (browser-verified.txt): six original cases, modal focus/Escape and background programmatic navigation guard, accepted replacement clears stale resume, invalid shared null row rejected visibly, quota replacement retains prior bytes and decision, injected PDF failure stays on map, genuine successful download has PDF header and nonempty content. Successful download test does not establish long-note/Unicode fidelity or user filesystem retention.
- Five Node schema/storage tests passed. ESLint, TypeScript and Next build passed; final logs identify exact commands. No package manifest/lockfile or dependency version changed.
- Forty-two governance/process regression tests passed. Process structure remains release NOT AUTHORIZED. No requirement promoted to full acceptance, no service evaluation claimed.
- Current npm audit --package-lock-only --omit=dev reports one high production affected entry (source-map-js); full audit six high entries. These are dated advisory inventory findings, not proof of exploitability. F08 remains open; old zero-production findings must not be represented as current.
- Synthetic F07 promotion accepted nonexistent evidence (empty error list); captured in F07-reproduction.json. No live release bypass demonstrated. F07 remains open.

## Environment issues and boundaries

The prior scratch Chromium binary was truncated (57 MB with absent expected sections) and crashed before tests; restored a fresh executable from the existing compressed @sparticuz runtime outside the product. Early browser-before.txt is an environment failure, not a product reproduction. browser-before-restored.txt is the actual baseline run. A later mixed dev/build run showed a transient 404 for one original test; isolated restart passed twelve cases. Final browser execution was sequenced before final build. No original app/font source was changed to make tests run.

F03–F06 have scoped corrections and passing regressions, pending qualified human/source review. F01/F02 bootstrap/updater, F07 typed promotion evidence, F08 dependencies/full SBOM, F09 server authorization and staging policies remain open. Broader assistive technology, cross-browser/mobile, multi-tab, export fidelity and synthetic facilitator observation remain open. Local stage is implemented; all client and deployment permissions remain blocked.

## Implementation rationale and current primary sources

Native showModal supplies modal/background-inert semantics; explicit Tab wrapping also keeps page focus on the two choice actions. Escape resumes existing data or dismisses an incoming replacement. A shared bounded parser validates every nested input before state mutation. Replacement writes before consuming old state; failure remains recoverable. PDF save promise success means generation/save initiation, not proof of disk retention, so UI says PDF prepared.

HTML Living Standard, dialog: https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element (opened 2026-10-06). W3C APG dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (opened 2026-10-06; informative guidance, not conformance certification). Installed jsPDF types at v1/node_modules/jspdf/types/index.d.ts:872 specify save returnPromise true; inspected against existing 4.2.1 dependency. Local Next docs accessibility guidance inspected; no framework migration.
