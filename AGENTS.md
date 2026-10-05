# TVM agent instructions — canonical product

Reviewed: 2026-10-05 · Authority: DEC-0001/2/6 and Richard Hart's current project direction.
Read [AGENTS.local.md](AGENTS.local.md) immediately after this file. Its local authority is preserved even if a legacy parent template overwrites this entry point.

## Mandatory task context

1. [Current state](docs/CURRENT-STATE.md) and [start here](docs/START-HERE.md).
2. [Product–service charter](docs/strategy/PRODUCT-SERVICE-CHARTER.md).
3. Relevant requirements, decisions, evidence scope, risks and code.
4. [AI_POLICY.md](AI_POLICY.md) before handling security-sensitive paths; no production data/secrets.

Canonical app: `v1/` in this repository. Parent repository preserves reference lineage; it is not a second application. No new edition, unnecessary path migration or prototype feature development under the current programme.

Before material changes: identify linked requirements/decisions/evidence; state assumptions and conflicts; write acceptance/verification and service-evaluation methods separately; record alternatives and impacts when meaning/architecture changes. Sources support exact claims, not general authority. Partial source access and hypotheses remain explicit.

After changes: update current state, relevant records, generated indexes, immutable change manifest and validation/continuation record. Capture concise rationale, evidence and consequences; do not store private internal AI reasoning. Each change manifest names exact changed paths and record IDs. Use `python3 scripts/check-governance.py --render`, then validate with a merge base and meaningful tests.

## Working boundaries

Proceed within already-authorized work on branches, including Phase 0 governance/specifications, standard-library checks and read-only audits. Do not ask again for an action already authorized. Record why a genuinely new approval is needed. No dependency/build-tooling changes without a recorded decision and applicable authorization; read-only npm audit does not change dependencies. Follow the existing dependency stack unless a change is justified.

Never push directly to main, merge/deploy, rewrite history, remove client data, archive/delete repositories or apply live database migrations without explicit authorization. Security/PII/authorization changes require human review before merge per AI_POLICY. Use synthetic data for tests. A branch/PR is a reviewable proposal; pilot-ready requires release evidence.

## Product boundaries

TVM elicits one executive's current perceptions. Inbound arrow is inferred perspective. No diagnosis, psychometric validity, normative trust score, motive inference or network-centrality claim from a hub-only map. Guided sense-making precedes product generative AI.

## Verification

Use current package scripts and tracked tests, not legacy Vite/Jest/Playwright claims. For Phase 0, standard-library tooling checks are appropriate. For app changes, run build/lint and meaningful schema/browser/security/accessibility checks linked to requirements. Report scope, commit and actual results; never claim live configuration was inspected when only SQL was read.
