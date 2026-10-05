# Risks

Generated from `docs/governance/registry.json`; do not edit this index by hand.
Read detailed records for rationale, source access limits and validation.

| ID | Record | Lifecycle | Relevant context |
|---|---|---|---|
| RSK-0001 | Unintended disclosure through shared-session access — Inspect deployed grants/RLS with owner using synthetic data; prevent anonymous enumeration; do not use sensitive pilot maps before authorization tests pass. | open | OBS-0002, REQ-0007; severity critical; likelihood not-estimated |
| RSK-0002 | Vulnerable dependencies — Prioritize direct next/jspdf findings; inspect primary advisories and runtime reachability; maintain reviewable remediation and regression results. | open | OBS-0004, REQ-0009; severity high; likelihood not-estimated |
| RSK-0003 | Loss of local session before resume — Reproduce in browser, hydrate saved state safely, prevent initial erase and verify migration/reload/start-fresh paths. | open | OBS-0003, REQ-0006; severity high; likelihood not-estimated |
| RSK-0004 | Overinterpreting ratings or asymmetric arrows — State perception provenance and uncertainty; no diagnostic/normative score; facilitator notices before interpreting. | open | CLM-0001, REQ-0003; severity high; likelihood not-estimated |
| RSK-0005 | Unverified claims becoming canonical through repetition — Require source scope, claims records, explicit hypotheses and contradictory evidence; CI is only structural. | open | DEC-0006, REQ-0012; severity high; likelihood not-estimated |
| RSK-0006 | Parent sync overwrites canonical governance — Companion PR removes canonical/prototypes from template push automation and pins prototype refs; merge-order notes and local override preserve authority. | open | DEC-0001, REQ-0002; severity high; likelihood not-estimated |
| RSK-0007 | Incomplete deletion/retention promise — Verify physical cleanup and backups; add authorized deletion; disclosure must match runtime behavior. | open | OBS-0002, REQ-0008; severity high; likelihood not-estimated |
| RSK-0008 | Pilot data or AI records expose clients — Use pseudonyms, separate operational/research consent, restricted data store, minimal collection and no AI submission of client records. | open | REQ-0008, REQ-0011; severity high; likelihood not-estimated |
