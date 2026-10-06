# Coverage and exclusions

Coverage is bounded, not exhaustive. Status distinguishes source reading, machine validation, synthetic execution and unavailable human/deployed evidence.

| Domain | Status | Evidence / exclusions |
|---|---|---|
| Source integrity and frozen scope | REVIEWED / TESTED | T01, A01; all 419 supplied blobs; all actual trees |
| Parent diff and submodule process | REVIEWED selectively / TESTED | R18–19,R42; parent eight tests; archive semantics excluded |
| Foundation diff and charter | REVIEWED selectively / TESTED | R01–02,R15–17; nine tests and exact 100-path checker |
| Increment and combined result | REVIEWED selectively / TESTED | R03–14,R20; exact range check; runtime tests |
| Governance lifecycle and evidence | REVIEWED / TESTED | R11–17,R30,R43–44,T03,T11–15 |
| Live CI and main/stacked controls | REVIEWED public read | L01–02; bypass actors and entitlements BLOCKED |
| Release and deployment | PARTIAL / BLOCKED | R13,R29–30,R41,T13; real hosting/config UNKNOWN |
| Persistence and shared replacement | REVIEWED / TESTED scoped | R03–07,R20,T04–05; multi-tab/quota E2E incomplete |
| Dependencies and inventory | REVIEWED / TESTED | T06–09; SBOM failed, documented |
| Authentication/privacy/retention | SOURCE REVIEWED; deployment NOT TESTED | R07–08,R25,X05,X08 |
| Accessibility and output fidelity | PARTIAL / TESTED scoped | T05; no full WCAG/AT or export fidelity assessment |
| Facilitation and participant safety | SPECIFICATIONS REVIEWED | R21–24,R35–36; human rehearsal and field outcomes NOT TESTED |
| Research and external claims | SELECTIVE PRIMARY SOURCES REVIEWED | X01–14; not all registered studies reopened |
| Turn/session/project optimization | PROPOSED / NOT EVALUATED | O01–07, REPLAY-EVAL.json |
| Astra proposal reconciliation | UNAVAILABLE | No named proposal packet; prior validation claims reconciled in REVIEW |
| Tracked file preservation | TESTED | T10; 404 tracked files unchanged |

## Changed-path denominator

27 parent + 151 combined canonical = 178 repository-distinct changed paths; the three separate diffs contain 195 path occurrences (27 + 100 + 68). Every path below was inventoried against actual Git; this is not 178 semantic reviews. Unchanged source needed for runtime/governance was also inspected. Binary omissions and gitlinks were identity-checked, not reconstructed as text.

| Repository | Path | Method / status |
|---|---|---|
| parent | `.github/workflows/auto-sync-submodules.yml` | Source excerpt/semantic review; see EVIDENCE repository locators |
| parent | `.github/workflows/convergence.yml` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `.github/workflows/notify-editions-on-shared-update.yml` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `.github/workflows/sync-governance-files.yml` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `.github/workflows/weekly-health-check.yml` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `AGENTS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `README.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/CONVERGENCE-VALIDATION.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/CONVERGENCE.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| parent | `docs/CURRENT-STATE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/GOVERNANCE-WORKFLOW.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/GOVERNANCE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/REPOSITORY-STRUCTURE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/archive/governance-2026-10-05/AGENTS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/archive/governance-2026-10-05/README.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/archive/governance-2026-10-05/docs/GOVERNANCE-WORKFLOW.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/archive/governance-2026-10-05/docs/GOVERNANCE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/archive/governance-2026-10-05/docs/REPOSITORY-STRUCTURE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `docs/governance/CHG-0001.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| parent | `docs/governance/CHG-0002.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| parent | `docs/governance/CHG-0003.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| parent | `docs/governance/CHG-0004.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| parent | `docs/governance/DELIVERY-STATUS.md` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| parent | `docs/governance/EDITION-SNAPSHOT.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| parent | `scripts/check-reference-integrity.py` | Source excerpt/semantic review; see EVIDENCE repository locators |
| parent | `scripts/tests/test_convergence.py` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| parent | `shared/templates/editions.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `.github/CODEOWNERS` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `.github/PULL_REQUEST_TEMPLATE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `.github/workflows/deploy.yml` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `.github/workflows/governance.yml` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `.github/workflows/release-readiness.yml` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `.github/workflows/security-audit.yml` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `.gitignore` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `AGENTS.local.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `AGENTS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `CONTRIBUTING.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `PRODUCT_REQUIREMENTS_DOCUMENT.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `README.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `REVIEW_STANDARDS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/CURRENT-STATE.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/NEXT-SESSION.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/START-HERE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/STATUS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/TVM-PROJECT-HANDOFF.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/AGENTS.local.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/AGENTS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/CONTRIBUTING.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/PRODUCT_REQUIREMENTS_DOCUMENT.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/REVIEW_STANDARDS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/docs/NEXT-SESSION.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/archive/governance-2026-10-05/docs/STATUS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0001.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0002.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0003.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0004.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0005.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0006.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0007.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0008.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DEC-0009.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/decisions/DECISION-REGISTER.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/CLAIMS-REGISTER.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/evidence/CONSTRUCTS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/EVIDENCE-REGISTER.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/STANDARDS-BASELINE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0002.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0003.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0004.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0005.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0006.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0007.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0008.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0009.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0010.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0011.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0012.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0013.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0014.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0015.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0016.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0017.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0018.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0019.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0020.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0021.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0022.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0023.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0024.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/evidence/sources/SRC-0025.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/governance/DELIVERY-STATUS.md` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/EDITION-SNAPSHOT.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/ENFORCEMENT.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/governance/LEGACY-AUTHORITY-MAP.md` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/REPOSITORY-INVENTORY.md` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0001.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0002.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0003.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0004.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0005.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0006.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0007.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/changes/CHG-0008.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/github-ruleset.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/parent-github-ruleset.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/governance/registry.json` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/governance/release.json` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/governance/work-packages/WP-0001.json` | Machine registry/checker validation; selective cross-record inspection; full semantic review NOT REVIEWED |
| canonical | `docs/product/DATA-MODEL.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/product/PRODUCT-SPEC.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/product/REMEDIATION-BACKLOG.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/product/SHARING-ARCHITECTURE.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/product/UX-SPEC.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/quality/DEPENDENCY-REMEDIATION.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/quality/PHASE-0-VALIDATION.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/PHASE-1-VALIDATION.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/QUALITY-MANAGEMENT.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/RELEASE-GATES.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/quality/TEST-STRATEGY.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/baseline/OBS-0001.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/baseline/OBS-0002.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/baseline/OBS-0003.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/baseline/OBS-0004.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/baseline/lockfile-inventory-phase1.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/baseline/npm-audit-2026-10-05.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/phase1/github-ruleset-activation.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/phase1/npm-audit-full.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/phase1/npm-audit-production.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/phase1/persistence-baseline-reproduction.txt` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/quality/phase1/sbom-production-nonoptional.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0001.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0002.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0003.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0004.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0005.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0006.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0007.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0008.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0009.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0010.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0011.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0012.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/requirements/REQ-0013.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/requirements/REQUIREMENTS-REGISTER.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/research/RESEARCH-AGENDA.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/research/protocols/EXP-0001.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/risk/AI-GOVERNANCE.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/risk/PRIVACY.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/risk/RISK-REGISTER.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/risk/SECURITY.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/service/EXECUTIVE-JOURNEY.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/service/FACILITATOR-GUIDE.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/service/INTERVENTION-SPEC.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/service/PERSISTENCE-PROTOCOL.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/service/REHEARSAL-001.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/strategy/PRINCIPLES.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/strategy/PRODUCT-SERVICE-CHARTER.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/strategy/ROADMAP.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `docs/strategy/SUCCESS-MEASURES.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `docs/strategy/THEORY-OF-CHANGE.md` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `scripts/check-enforcement-activation.py` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `scripts/check-governance.py` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `scripts/check-process.py` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `scripts/tests/test_activation.py` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `scripts/tests/test_governance.py` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `scripts/tests/test_process.py` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/AGENTS.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/CLAUDE.md` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/eslint.config.mjs` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/package-lock.json` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/package.json` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `v1/playwright.config.ts` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/src/app/page.tsx` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `v1/src/components/WelcomeModal.tsx` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |
| canonical | `v1/src/context/SessionContext.tsx` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `v1/src/lib/sessionStorage.ts` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `v1/tests/browser/persistence.spec.ts` | Source excerpt/semantic review; see EVIDENCE repository locators |
| canonical | `v1/tests/sessionStorage.test.mjs` | Diff/tree hash inventoried; detailed semantic review NOT REVIEWED |

## Acceptance domains

The 13 registered requirements were checked through registry/process validation and mapped to findings where relevant; document-level acceptance is not granted. Priorities: privacy and authorized release; loss-free map lifecycle; truthful output; then accessibility, facilitation fidelity and field learning. REQ-0006 persistence, REQ-0007 sharing, REQ-0008 data handling, REQ-0009 dependencies, REQ-0010 UX/output and REQ-0013 governance remain affected by findings. Requirement titles/IDs must be interpreted with the exact registry, not as external-standard identifiers.
