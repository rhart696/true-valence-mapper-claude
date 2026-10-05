# Executive pilot release gates

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

Current pilot status: **NOT READY**. Gate owners/reviewers must be designated by Richard Hart before release. No gate is waived by this documentation.

| Gate | Required evidence | Current state |
|---|---|---|
| Dependencies | Current audit, applicability/remediation, build/regressions and SBOM | Blocked: 2 critical/15 high affected package entries |
| Authorization | Deployed grants/policies and synthetic allow/deny tests; no anonymous listing | Blocked: checked-in expiry-only read policy; deployed config unknown |
| Retention/delete | Server-bound expiry, physical cleanup, revocation/deletion and backup statement tested | Blocked: optional cleanup; deletion unverified |
| Persistence/schema | Reload/resume/clear/migrate/error recovery verified | Blocked: static overwrite-before-resume finding |
| Privacy/data flow | Accurate disclosure, opt-in sharing, logs/analytics and vendor/region inventory | Pending |
| Accessibility | Applicable WCAG 2.2 AA checks incl. keyboard/modal/mobile/text alternative | Pending |
| Reports | PDF/PNG/text fidelity, framing, field inclusion and failure handling | Pending |
| Facilitation | Approved framing, guide, question version and safe action protocol | Drafted; not field-validated |
| Pilot research | Consent, ethics applicability, minimal dataset, analysis, owners and stop rules | Drafted; not authorized/run |
| Release decision | Human sponsor/security review with linked evidence at build/config | Pending |

Local synthetic demonstrations can proceed during engineering; real executive pilot requires applicable gates to pass. Any exception must specify scope, rationale, owner, expiry and residual risk; a baseline audit is not a remediation report.
