# Current state — intended, implemented and verified

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

## Baseline

Inspected app commit: `a460c6f589b712e66a973b123678cec9e68bbc3c`.
Inspected parent commit: `82646a5f6a40a76f9a579f98f2960ebae4372c56`.
Status: **Phase 0 branch prepared; executive pilot NOT READY**. Branch documents become repository policy when merged; accepted user direction is already recorded. Phase 0 left runtime unchanged; Phase 1 branch adds scoped persistence fixes and compatible dependency updates.

| Area | Source-inspected implementation | Verification / intended change |
|---|---|---|
| Canonical app | `v1/`, Next.js 16.1.6, React 19.2.3, TypeScript, Tailwind, Supabase | Keep path; product/service pilot governs future work |
| Relationship count | `MAX_RELATIONSHIPS = 25`, contrary to README/old PRD eight | Pilot default 8–12 is a design hypothesis; max remains 25 pending usability evidence |
| Map | Hub-spoke; only executive-to-person and inferred reverse edges | No between-alter edges; do not infer clusters, isolation or network centrality |
| Ratings | String enum high/medium/low/unscored; brand colors and dash cues | Approach confidence; unconsidered remains missing data |
| Persistence | localStorage auto-save/restore | Static overwrite-before-resume issue OBS-0003; browser test pending |
| Share | six-character Math.random code; direct anon table access | SQL source permits unexpired-row listing OBS-0002; live grants/RLS unknown |
| Expiry | 30-day database default and date checks | Physical cleanup optional in SQL; deletion/revocation not implemented in inspected path |
| Exports | PDF/PNG and optional relationship note | No verified round-trip/report fidelity results here |
| Tests | No committed v1/playwright directory, test script or Playwright dependency found | Old local instruction claim is superseded; build/lint/browser checks pending |
| Dependencies | npm lockfile audit: 23 affected entries, 2 critical/15 high | Raw report committed; not a runtime exploit assessment or current Dependabot count |
| Governance | phase records, specifications, traceability/process checkers | Phase 1 branch; parent convergence #1 and foundation #12 unmerged, native main rulesets active; effective-rule command/deny test open |

## Next task

Read REQ-0006, REQ-0007, REQ-0008 and REQ-0009, their evidence and risks. Inspect current advisories and choose minimal compatible remediation. Reproduce persistence loss using synthetic data. Design sharing authorization/revocation in a decision record before changing SQL/API. Run build/lint and meaningful regression tests. Deployed policies must be inspected by an authorized owner; no real client data should be retrieved for tests.

Unresolved: designated security/privacy reviewers; hosting/database location and backups; pilot cohort and protocol approval; wording cognitive interviews; actual Vercel configuration and protected branch settings; further appraisal of abstract/snippet-only research. No efficacy or compliance claim.

See [continuation](NEXT-SESSION.md) for exact resumption instructions. Update this page with every material work package; link verification outcomes instead of declaring the core done.

## Publication status

User explicitly authorized publication and paired draft PRs on 2026-10-05 after the initial automatic review block. Both branches are published and paired draft PRs are open; review links are recorded in delivery status. See [delivery status](governance/DELIVERY-STATUS.md).

## Phase 1 increment — WP-0001

Enforcement mechanisms, compatible dependencies, safe persistence and paired service protocol implemented on a stacked review branch. Read [enforcement](governance/ENFORCEMENT.md), [remediation backlog](product/REMEDIATION-BACKLOG.md), [validation](quality/PHASE-1-VALIDATION.md). Native main rulesets active (2026-10-05 browser + API evidence); sharing/database/retention/accessibility/pilot still open. Do not promote full requirements or pilot readiness from partial checks.

Phase 1 results: 42 stdlib tests, five Node tests and six browser scenarios passed; lint/typecheck/build passed. Production audit zero findings; full audit five high development-chain entries. Next16.3.8/jsPDF4.2.1 proposed versions; deployed app remains uninspected. Sharing load now prompts before replacing a map; this is not database authorization remediation. Full SBOM, professional review, accessibility/report testing and staging privacy/sharing remain open.

Phase 1 review: https://github.com/rhart696/true-valence-mapper-claude/pull/13 (draft, stacked on #12). Reviewable changes are published; native GitHub rules are active; client release remains not authorized. See docs/quality/phase1/github-ruleset-activation.json for scoped settings verification and remaining tests.

## Astra review intake and corrective batch — 2026-10-06

Received six Astra review/evaluation files; Claude independent evaluation remains outstanding. All 44 pinned source hashes match. Missing referenced logs/fixtures prevented validating their contents; independently reproduced corrective acceptance failures. WP-0002 repairs resume focus/background mutation, stale shared-resume state, nested shared parsing and export completion; 12 browser, 5 schema and 42 governance tests plus lint/type/build passed. See docs/quality/review-correction/VALIDATION.md. No full requirement or human/service acceptance promoted.

Current audit supersedes earlier zero-production status: one high production source-map-js affected entry, six high full entries; exploitability not established. F07 nonexistent promotion evidence reproduced. F01/F02 bootstrap/updater, F07, F08, F09 remain open. No merge, deployment, SQL migration, risk acceptance or real pilot authorization.
