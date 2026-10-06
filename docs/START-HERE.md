# Start here — authoritative TVM context

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

Read in this order: root AGENTS.md and AGENTS.local.md; [CURRENT-STATE](CURRENT-STATE.md); [charter](strategy/PRODUCT-SERVICE-CHARTER.md); relevant [requirements](requirements/REQUIREMENTS-REGISTER.md), [decisions](decisions/DECISION-REGISTER.md), [evidence](evidence/EVIDENCE-REGISTER.md), [risks](risk/RISK-REGISTER.md); then task code.

Authority is scoped: current strategy/specifications describe intended direction; code at a named commit describes implementation; tests describe verified behavior; research findings describe evaluated outcomes. A proposal or source abstract must never silently become a verified outcome.

The structured index is [registry.json](governance/registry.json). Detailed records are at indexed paths. Add new IDs; preserve superseded rationale and link replacements. Lifecycle status and document currency are different fields. No application release has been approved by these governance documents.

Current work: Phase 0 foundation and source/security baseline. Next: security and persistence remediation before client pilot. See [roadmap](strategy/ROADMAP.md), [release gates](quality/RELEASE-GATES.md), [legacy authority map](governance/LEGACY-AUTHORITY-MAP.md) and [captured brief](TVM-PROJECT-HANDOFF.md).

Use `python3 scripts/check-governance.py` for local structure checks; use `--base <merge-base> --head HEAD` to validate a change set. Detailed rationale is captured; private internal AI reasoning is neither requested nor stored.

Phase 1: read [ENFORCEMENT](governance/ENFORCEMENT.md) and [remediation backlog](product/REMEDIATION-BACKLOG.md). Work packages/lifecycle checks supplement traceability. GitHub rules and client release are separately verified.
