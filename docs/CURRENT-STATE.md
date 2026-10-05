# Current state — intended, implemented and verified

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

## Baseline

Inspected app commit: `a460c6f589b712e66a973b123678cec9e68bbc3c`.
Inspected parent commit: `82646a5f6a40a76f9a579f98f2960ebae4372c56`.
Status: **Phase 0 branch prepared; executive pilot NOT READY**. Branch documents become repository policy when merged; accepted user direction is already recorded. Application runtime has not been changed by this work package.

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
| Governance | phase records, specifications, traceability checker | Phase 0 validation report; parent convergence PR needed |

## Next task

Read REQ-0006, REQ-0007, REQ-0008 and REQ-0009, their evidence and risks. Inspect current advisories and choose minimal compatible remediation. Reproduce persistence loss using synthetic data. Design sharing authorization/revocation in a decision record before changing SQL/API. Run build/lint and meaningful regression tests. Deployed policies must be inspected by an authorized owner; no real client data should be retrieved for tests.

Unresolved: designated security/privacy reviewers; hosting/database location and backups; pilot cohort and protocol approval; wording cognitive interviews; actual Vercel configuration and protected branch settings; further appraisal of abstract/snippet-only research. No efficacy or compliance claim.

See [continuation](NEXT-SESSION.md) for exact resumption instructions. Update this page with every material work package; link verification outcomes instead of declaring the core done.

## Publication status

User explicitly authorized publication and paired draft PRs on 2026-10-05 after the initial automatic review block. Publication is in progress; PR links will be recorded in delivery status. See [delivery status](governance/DELIVERY-STATUS.md).
