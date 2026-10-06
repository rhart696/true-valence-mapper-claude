# Product–service development enforcement

Owner: Richard Hart. Reviewed: 2026-10-05. DEC-0007; REQ-0013; WP-0001.

The controls support the EGPSD management cycle. They can check completeness, linkage, lifecycle order and executable behavior. They cannot establish the truth of research, quality of judgment, competence of reviewers or efficacy of the intervention.

## Change management

Every increment has a work package under `work-packages/`, a linked requirement/decision/evidence/risk/test set, exact changed paths, product and service impact dispositions, acceptance, uncertainty, alternatives, rollback and review requirements. Both domains must be considered even if one does not change. A no-change rationale cannot disguise an implementation/specification change in the same domain.

Stages are framed → specified → implemented → verified → evaluated. Each transition carries date, actor and evidence. Verified requires all scoped checks to have passing evidence; a requirement can be marked verified only with a named full-acceptance test result, exact tested commit and existing verification artifacts; evaluated additionally requires service outcomes. A synthetic rehearsal is not an executive pilot or efficacy result. Work packages cannot authorize releases. Existing historical packages remain records; each new increment gets a new ID and manifest. Manifests already present at the comparison baseline cannot be rewritten.

Commands:

- `python3 scripts/check-governance.py --base <merge-base> --head HEAD`
- `python3 scripts/check-process.py --base <merge-base> --head HEAD`
- `python3 -m unittest discover -s scripts/tests -v`
- In v1: `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run build`, `npm run test:browser`.

All PRs run stable checks **TVM governance**, **TVM process**, **TVM application**, with no path-based skip. Application CI executes tests, builds and production audit. Merge-group events are supported. Workflow changes themselves need human review; the PR workflow executes candidate code with a read-only token and no supplied secrets. Required checks plus trusted Actions source and human review protect the control plane. The governance code is not a tamper-proof external auditor.

## Merge control activation

Repository file checks become enforceable merge gates only when GitHub rules are active. Import `github-ruleset.json` in the repository Settings → Rules → Rulesets after the three checks have run. It requires PRs, one code-owner approval, dismissal of stale approval, approval of the latest push, resolved discussions, current-base checks, no force pushes/deletions and no bypass actors. Required checks are restricted to GitHub Actions (integration 15368). For the parent repository, import `parent-github-ruleset.json` after its provenance check has run: require its `provenance` Actions check and an independent current-push reviewer, without claiming a parent CODEOWNERS configuration exists. Validate the parent with `python3 scripts/check-enforcement-activation.py --parent`. Validate the canonical repository with `python3 scripts/check-enforcement-activation.py` using an authenticated gh session. This verifier is read-only and fails if rules cannot be read or are weaker.

**Native rulesets activated on 2026-10-05 under explicit user authorization.** Canonical ruleset 24546668 and parent 24546683 are active, target refs/heads/main, and have empty bypass lists; API reports current_user_can_bypass=never. All prepared required checks are bound to GitHub Actions integration 15368, with strict current-base checks and required review settings. GitHub's default additional approval for unattributed Copilot PRs was retained. See [activation evidence](../quality/phase1/github-ruleset-activation.json). Browser save confirmation and independent connector ruleset-detail GET agree. The effective branch-rules endpoint is outside the connector allowlist; the gh command was not run because gh is unavailable. No deliberate blocked push/merge was attempted. This establishes active settings, not full rollout or client release readiness.

The owner must arrange a second qualified reviewer: a PR author cannot approve their own PR. CODEOWNERS currently names Richard for routing, not independent security competence. No fake reviewer or approval has been added.

Because foundation PR #12 is still unmerged, this increment is stacked on its branch. Human merge order: parent #1 → canonical foundation #12 → this increment. Retarget the increment to main after #12 merges and rerun checks. Do not mark the governance rollout complete until reviewed policy/workflows are merged, effective-rule verification and a controlled deny/allow test pass.

## Release control

`release.json` is the exact gate inventory. Structural validation permits blocked/pending gates so engineering can continue. `--authorize-release` fails unless every gate has existing evidence bound to the exact 40-character build SHA and SHA256 of a sanitized configuration inventory, with distinct designated sponsor/security approvers and authenticated current GitHub approval reviews. Use a dedicated release-decision PR containing evidence for an already-built application commit. Reviews must quote `TVM release build: <sha>` and `TVM release configuration: <digest>` and refer to the latest release-decision PR head. The decision PR must be merged to main, and the application build must be an ancestor of that main. This separates approval metadata from the built commit and avoids requiring a commit to contain its own SHA. Latest changes-requested/dismissed review overrides prior approval. Self-written approval fields are not accepted. The release PR author cannot be one of its approvers.

The manual TVM release readiness workflow runs reviewed main policy, reads GitHub reviews, verifies live merge rules and has no deployment credentials. This is a readiness decision check, not a deployer. Future deployment automation must depend on successful readiness at the same build/config and use an environment with human approval. The retired v0 manual Pages workflow is disabled in this proposal. Vercel automatic deployment settings are uninspected and cannot be constrained by these files; the owner must configure staging versus production and prevent unapproved client releases there. Do not claim platform enforcement until a deliberate deny/allow test is witnessed.

No governance exception waives client privacy/security gates here. Other exceptions need a new decision with affected scope, approver, rationale, expiry, residual risk and compensating checks. Change manifests and CI results preserve auditability without storing private AI reasoning or client records.

## Operating cadence

At increment start: review current state, select highest-risk backlog item, define acceptance and linked service impact. At PR: verify exact coverage and real checks, inspect risks and unresolved questions, human review sensitive paths. Weekly: review work in progress, source currency, risk treatment and evaluation findings. Before client use: test release denial with an open gate, verify deployment configuration and review all gate evidence. After a pilot: record outcomes, unintended effects, revisions and limits before promoting to evaluated.

Official basis: GitHub [ruleset rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) describes required checks, source restrictions, code-owner review and stale approvals. These project controls are tailored implementations, not ISO/PMI conformity certification.
