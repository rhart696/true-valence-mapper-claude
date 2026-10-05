# Risk-first remediation backlog

Owner: Richard Hart. Reviewed: 2026-10-05. Product and service develop together; executive pilot NOT READY.

| Priority | Increment | Product acceptance | Service counterpart | Status |
|---|---|---|---|---|
| P0 | Governance activation — REQ-0013 | Exact path/lifecycle checks, required CI, human review; witness failed check prevents merge | Sponsor/reviewer responsibilities and cadence | Implemented branch proposal; GitHub activation unverified |
| P0 | Dependency assurance — REQ-0009 | Current full/production audit, compatible updates, build/tests and SBOM; disposition remaining risks | Document permitted use and limits | Updates under verification; no blanket safety claim |
| P0 | Saved-map recovery — REQ-0006 | Initial render never removes saved data; resume/reload/clear work; nested malformed/future schema retained; failure guidance | Confirm retain/erase choices and recovery before ending session | Implemented; results in Phase 1 validation |
| P0 | Sharing architecture — REQ-0007/8 | No anonymous direct listing; server-issued capability, owner revocation, expiry/cleanup bounds, rate limits, synthetic allow/deny | Explicit recipient/consent and retention disclosure | Design proposal; not implemented or deployed |
| P0 | Privacy inventory — REQ-0008 | Region/vendors/logs/backups documented at staging config; deletion proven | Pseudonyms, confidentiality limits, incident/sensitive disclosure procedure | Blocked on owner configuration review |
| P1 | Accessible mapping/report fidelity — REQ-0010 | Keyboard, focus, labels, text alternative, mobile; export fidelity/errors | Facilitator can accommodate participant needs and explain exports | Pending |
| P1 | One complete facilitated journey — REQ-0003/4/5 | Versioned prompts, interpretation boundaries, one safe action and follow-up | Rehearsal script and paired acceptance checklist | Synthetic rehearsal package prepared; user observation pending |
| P1 | Formative understanding study — REQ-0011 | Observe terminology and task use before expanding UI | Consent, interview prompts and unintended-effect capture | Planned, no participants recruited |
| P2 | Bounded executive pilot — EXP-0001 | All applicable release gates; named exact build/config | Approved protocol, stop rules, sponsor/security decisions | Not authorized/run |

Work one coherent increment at a time. Reduce safety/data-loss risk before adding analytics or AI. Priority is a project judgment based on the recorded baseline, not a quantified risk calculation. Dependencies and persistence fixes do not remediate the deployed sharing database.
