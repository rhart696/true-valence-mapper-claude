# Phase 1 validation — TEST-0002

Reviewed: 2026-10-05. WP-0001. Scope: implemented review proposal, not full requirement verification or client release. Parent #1 and foundation #12 remain unmerged at preparation.

| Check | Actual result and scope |
|---|---|
| Governance/process/activation regression | 42 stdlib tests passed; includes lifecycle, change coverage, immutable manifests, impacts, freshness, full acceptance promotion and release refusal |
| Session schema/storage unit | Five Node tests passed; legacy/envelope, nested invalid/unknown schema, bounded fields/unique IDs, quota/blocked storage and clear semantics |
| App lint/typecheck/build | Passed with Next16.3.8 and current committed dependency lockfile |
| Real browser | Six Playwright tests passed using Chromium153.0.8010.0 acquired through temporary @sparticuz/chromium153.0.0; package is not a product dependency |
| Before/after reproduction | Original SessionProvider at a460c6f fails the same mount/resume test: stored map is null while resume prompt is visible; restored proposal passes. Only provider swapped temporarily, remainder of harness/current app unchanged; this is a focused reproduction, not a complete old-build test |
| Dependency full audit | Five high affected entries in one development-tool chain; zero critical/moderate/low; unresolved human disposition |
| Production-only audit | Zero reported findings; does not prove security/privacy or absence of unknown vulnerabilities |
| SBOM | Production/nonoptional CycloneDX69 components passed; full generation blocked by existing optional Tailwind WASI mismatch; complete supplemental custom lockfile inventory saved |
| Client release denial | check-process --authorize-release with a synthetic build/config and no release PR returns nonzero for open gates and absent authenticated approvals (expected refusal) |
| Live enforcement verification | Cannot pass: gh absent locally; connected API reports no repository rulesets and403 for legacy branch protection; no admin write API available |
| Deployed database/pilot/accessibility/exports | Not inspected/run in this increment; remaining acceptance open |

Browser scenarios: mount/resume/reload/start fresh; malformed bytes retained; unavailable browser storage visible; welcome preserves map; quota failure preserves previous bytes with guidance; synthetic shared response prompts before replacement and dismissal restores resume choice. Sharing API test intercepts requests to synthetic.invalid using dummy public environment values; no database writes or client data. Browser download from Playwright CDN failed repeatedly; alternative temporary binary worked. CI uses the normal Playwright installation path and must report its own outcome.

Process tests deliberately reject missing/hidden impacts, skipped stages, overdue linked evidence, historical manifest edits, false verified promotions, unpassed/stale build/config gates, missing evidence, absent/stale human reviews and weaker merge rules. Fixture approvals are test data; no real approvals fabricated.

Evidence: phase1/persistence-baseline-reproduction.txt; phase1/npm-audit-full.json; phase1/npm-audit-production.json; phase1/sbom-production-nonoptional.json; baseline/lockfile-inventory-phase1.json; tracked test sources. Commit identity is recorded by the containing Git commit and remote CI head, without a self-referential commit field. Passing local tests applies to scoped changes, not all REQ-0006/9/13 acceptance. No application release, merge, live migration or pilot authorized.
