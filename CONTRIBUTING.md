# Contributing to the canonical True Valence Mapper

Start with [AGENTS.md](AGENTS.md), [AGENTS.local.md](AGENTS.local.md) and [docs/START-HERE.md](docs/START-HERE.md). The application is in `v1/`, not root index.html. See CURRENT-STATE for the source-inspected stack and known issues.

Create a branch from main and keep changes reviewable. Link requirements, decisions, evidence, risks and validation in a new docs/governance/changes/CHG-xxxx.json record; the schema is illustrated by CHG-0001. Use exact paths. Small editorial changes may use the documented exemption with a reason; implementation/specification changes cannot.

Before a material feature or methodological change, define acceptance and separately define how value will be evaluated. Do not duplicate prototype functionality without evidence/applicability review. Keep sources and limitations explicit. Never commit client records or credentials.

Regenerate indexes after registry changes: `python3 scripts/check-governance.py --render`. Validate records with `python3 scripts/check-governance.py`; validate PR scope with `--base <merge-base> --head HEAD`. Run `python3 -m unittest discover -s scripts/tests -v` for governance tooling. For application changes, use actual package scripts and meaningful requirement-specific verification; see TEST-STRATEGY.

Open a PR with the current template. Main can auto-deploy and notify the parent, so no direct production push. Human review is required for authorization/security/PII changes; no sensitive live migration without approval. See AI_POLICY and RELEASE-GATES. The original contribution guide is preserved in docs/archive/governance-2026-10-05.
