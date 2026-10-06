# Independent TVM assessment — 6 October 2026

## Executive assessment

Do not merge these pinned PRs or infer client authorization from current CI. Useful governance foundations and a materially improved local parser exist, but the review reproduced session-loss, shared-load and false-export-success paths. Source SQL would allow anonymous enumeration if deployed with the expected grants; deployment was not inspected. Current dependency audit evidence also differs from the dated baseline. These are advisory judgments, not approvals.

| Decision | Verdict | Criteria, evidence and conditions |
|---|---|---|
| Parent PR 1 merge readiness | **NOT READY** | Direct-push updater conflicts with main PR control; no independent review evidence. Correct/disable updater and obtain required actual review/checks. [F02, L01, R42] |
| Foundation PR 12 merge readiness | **NOT READY** | Actual required contexts absent and sole author-codeowner cannot provide independent approval. Resolve legitimate bootstrap and deployment separation first. [F01, L01, L02] |
| Increment PR 13 merge readiness | **NOT READY** | Reproduced persistence/export failures and current production audit failure; underlying foundation/base controls unresolved. Repair and rerun at actual retargeted base. [F03, F04, F05, F06, F08, L01] |
| Management/enforcement rollout completeness | **NOT READY** | Useful local controls exist, but promotion evidence can be fabricated and operational/deployment binding remains incomplete. [F01, F07, T11, U01, U02] |
| Synthetic facilitator rehearsal | **READY WITH CONDITIONS** | Only isolated synthetic/local exercise: no cloud/client records; explicitly include known failures and verify output; qualified facilitator observes, no efficacy claim. This is not permission for production rehearsal. [R23, O05, T05] |
| Real executive pilot | **NOT READY** | Privacy, persistence, accessibility, export, deployment and human approval gates remain unresolved. Critical missing evidence is not waived. [R29, F03, F09, U01, U03, U04] |
| Evidence of service efficacy | **INSUFFICIENT EVIDENCE** | Provisional mechanisms and feasibility protocol are not outcome data or causal/psychometric validation. [R02, R24, R35, R36, X13] |

## Scope, configuration and integrity

GPT-6 Astra Medium is user-reported; no UI/model configuration evidence was available. No recommendation to increase effort or add agents is justified by measured incremental value here. No prior-chat memory or subagents were used. FIRST-PASS.md was written before prior validation/optimization narratives were considered. That ordering reduces exposure to suggestions; it does not make this model statistically independent. No ASTRA-OPTIMIZATION.md or OPTIMIZATIONS.json was supplied/found, so there are no identifiable Astra proposals to accept or reject individually.

The target file selects the same heads as the brief. Actual Git objects and detached checkout identities were verified; supplied text bytes match Git. Live public PR heads/bases also match. Parent PR1: 82646a5… → 3a4f208…; canonical PR12: a460c6f… → 68f5654…; PR13: 68f5654… → 08a05a6…. Full identities and hashes are in EVIDENCE.json/INVENTORY.json. No moving tip was substituted. All 419 supplied blobs passed length/SHA256/Git-blob checks. Five safe snapshots were reconstructed, with binary/gitlink omissions recorded. No original tracked source or lockfile changed: 404 tracked files hashed before/after, both Git statuses clean. [A01,T01,T10]

Python 3.12.14, Git 2.51.1, Node 24.19.0 and npm 11.9.0 were available on Linux x64. gh was absent. Anonymous Git/npm/public HTTP worked. Original Playwright browser download failed; a separately installed/extracted Chromium 153.0.8010.0 ran real browser scenarios. Its font configuration required a local runtime correction. Additional adversarial browser scenarios used a separate app copy with only external next/font loading removed, served through webpack; provenance and the exact diff are preserved. These are synthetic, not deployed observations. No production credentials or client fixtures were used. Git push URLs and hooks were disabled; these are limited guardrails, not proof of comprehensive isolation. [T02,T04,T05,T16]

## Criteria and evidence rules

Assess privacy/authorization and release integrity first, then recoverable persistence and truthful outputs, accessibility, service consent/inference boundaries and measurable learning. The charter, success measures, 13 registered requirements and open release gates supply product/service criteria. Current NIST SSDF 1.1 (final; 1.2 draft), ASVS 5.0.0 and WCAG 2.2 are scoped review lenses, not certifications. SSDF PO.4.1/2, PW.7.2/PW.8.2 concern criteria and testing; ASVS v5.0.0-8.2.2/8.3.1 concern data authorization and trusted enforcement. WCAG focus criteria and informative APG modal guidance support the focus review; no complete conformance audit was performed. [R01–02,R29,R43–44,X04–07]

Evidence IDs resolve in EVIDENCE.json to actual numbered source excerpts, pinned commits, hashes, command logs or dated primary-source summaries. OBSERVED is direct inspection; REPRODUCED is bounded execution; SUPPORTED ANALYSIS states a warrant and alternatives; PROPOSED EXPERIMENT is unmeasured; UNKNOWN/NOT TESTED is not a defect. Finding severity is review priority, not CVSS. External advisory severity is not automatically application exposure.

## Prioritized findings

### F01 — Medium: Canonical merge-control rollout is unsatisfiable for the frozen foundation PR

**Class / origin:** SUPPORTED ANALYSIS

**Origin:** New rollout/configuration interaction; sole-owner CODEOWNERS pre-existing

**Decisive evidence and actual behavior:** Main requires TVM governance/process/application; PR12 emits context. Only rhart696 owns affected paths and rhart696 authored PR12/13. Zero reviews observed.

**Warrant:** Direct live/source comparison plus GitHub base-owner/self-approval rules supports a blocked normal merge path.

**Trigger:** Compare main effective required checks to foundation check runs; compare PR author to base CODEOWNERS.

**Limits / counterevidence:** PR13 emits all three checks; its current non-main base has no effective rules. Public bypass actors are unknown; no merge attempt was made.

**Correction:** Prepare a separately scoped, legitimately authored/reviewed bootstrap change that installs real required checks and an eligible second code owner on the base; preserve no-self-approval and do not manufacture success contexts. Re-pin and review changed candidates.

**Regression acceptance:** An independent eligible reviewer is available; exact required checks run genuine scoped commands at the new reviewed head; deny/allow exercise under separately granted authority.

Evidence: R15, R16, L01, L02, T12, X01, X02, X03. Owner: Repository owner and qualified maintainer.

### F02 — Medium: Parent canonical updater still pushes directly to protected main

**Class / origin:** SUPPORTED ANALYSIS

**Origin:** Direct-push pattern pre-existing, retained in rewritten PR1 updater

**Decisive evidence and actual behavior:** Workflow creates a bot commit on checkout then directly pushes main.

**Warrant:** Source operation conflicts with observed PR/review requirement; no-bypass assumption is supplied rather than independently proven.

**Trigger:** Canonical reference needs to advance; workflow ends with git push origin main.

**Limits / counterevidence:** No update push executed. Integrity checks preserve seven pins; policy already forbids unreviewed direct pushes.

**Correction:** Smallest correction: disable this automatic write job pending a reviewed PR-based updater; retain read-only integrity checks and manual reviewed reference changes.

**Regression acceptance:** No direct protected-main write in updater; seven reference pins unchanged; canonical change arrives through an approved PR.

Evidence: R18, R42, L01, X01. Owner: Repository maintainer.

### F03 — High: Keyboard navigation bypasses the resume decision and removes saved data

**Class / origin:** REPRODUCED

**Origin:** Pre-existing modal gap; incomplete repair in PR13

**Decisive evidence and actual behavior:** Focus leaves dialog; background Start Session sets canSave and empty state is persisted as removal; storedAfter is null.

**Warrant:** Original app logic reproduced in font-only fixture; source mutator and remove branch explain result.

**Trigger:** Seed a valid saved map and welcome-complete flag. Focus Resume, Shift+Tab three times to background Start Session, press Enter.

**Limits / counterevidence:** SavedSession remains in memory and can still be restored before page closes; original ordinary resume tests pass. No client data used.

**Correction:** Use a real modal with focus containment/inert background, and guard destructive persistence in the state layer until a deliberate resolution of saved data.

**Regression acceptance:** Keyboard/mouse cannot mutate background while choice pending; Tab/Shift+Tab stay contained; Escape behavior is explicitly safe; reload preserves original bytes until explicit replacement.

Evidence: R03, R04, T05, T16, R26, X06, X07. Owner: Frontend engineer with accessibility reviewer.

### F04 — Medium: Accepting an incoming shared map leaves a stale resume decision active

**Class / origin:** REPRODUCED

**Origin:** Pre-existing stale savedSession mechanism retained/exposed by PR13 consent flow

**Decisive evidence and actual behavior:** Incoming map is saved while old Resume last session dialog remains visible.

**Warrant:** Browser observation matches loadDemo not clearing savedSession and render condition allowing old prompt.

**Trigger:** Saved map exists; open synthetic ?share=ABCDEF; choose Load session.

**Limits / counterevidence:** Dismissal path passes existing test; initial shared replacement asks consent; no silent database update.

**Correction:** Resolve savedSession and pendingShared in one explicit replace action; preserve prior bytes until validation and choice complete.

**Regression acceptance:** After accept, only incoming map is active and no stale resume prompt; dismiss retains old map; quota/invalid payload leaves prior data available.

Evidence: R04, R05, R06, R37, T05, T16. Owner: Frontend engineer.

### F05 — Medium: Shared payload validation stops at the top level

**Class / origin:** REPRODUCED

**Origin:** Pre-existing loadSession validator; unchanged by PR13

**Decisive evidence and actual behavior:** Top-level load accepts it; applySharedSession reads null.name and throws.

**Warrant:** Reproduction and validation branches agree; shared path bypasses new robust local parser.

**Trigger:** Synthetic API returns coacheeName string and relationships:[null]; choose Load session.

**Limits / counterevidence:** Existing persistent map survived the tested error; network response was synthetic, not a real server payload.

**Correction:** Use a shared bounded parser at every ingress and handle fetch/validation failures visibly; keep original map until validated replacement.

**Regression acceptance:** Null/wrong types/oversize/future schema/duplicate IDs invalid at shared ingress; errors visible, no state loss; valid legacy and versioned data supported deliberately.

Evidence: R07, R05, T05, T16, R20. Owner: Frontend and security engineer.

### F06 — Medium: Failed PDF export reports a successful download

**Class / origin:** REPRODUCED

**Origin:** Pre-existing export hook and completion behavior

**Decisive evidence and actual behavior:** No download observed; print fallback invoked; UI shows PDF Downloaded.

**Warrant:** Hook catches error and returns normally; caller unconditionally completes.

**Trigger:** Synthetic resumed map; remove SVG in DOM to force export failure; stub print to record fallback; click Export PDF.

**Limits / counterevidence:** Print may allow a user to save a document; it is not guaranteed and the fixture deliberately did not produce one. Protocol tells facilitators to verify files.

**Correction:** Return an explicit success/failure outcome, separate print fallback state and retain map; add long-note pagination and note-inclusion controls as separate acceptance tasks.

**Regression acceptance:** Injected export failure never claims download or auto-clears; cancellation stays on map; successful download contains required fields and long notes without clipping.

Evidence: R09, R10, R06, R26, R39, T05, T16. Owner: Frontend engineer and facilitator lead.

### F07 — Medium: Work-package verification and evaluation accept nonexistent evidence

**Class / origin:** REPRODUCED

**Origin:** Introduced by PR13 check-process.py

**Decisive evidence and actual behavior:** All four adverse fixtures return an empty error list.

**Warrant:** Checker tests nonempty strings but does not resolve transition/verification evidence or validate temporal sequence.

**Trigger:** Set stage verified/evaluated with passed verification and nonexistent file string; fabricate evaluation text; reverse transition dates.

**Limits / counterevidence:** Record stages must remain ordered; requirement full-acceptance and release checks impose additional constraints; truth still requires human appraisal. Not a proven release authorization bypass.

**Correction:** Use typed resolvable artifact/record references, hashes and execution provenance; enforce ordered dates and minimum evaluation schema. Keep human appraisal of relevance and authenticity.

**Regression acceptance:** Missing/unsafe/stale evidence and reversed chronology fail; genuine scoped artifacts pass; placeholders cannot promote evaluated status.

Evidence: R11, R12, R44, T03, T11, R17. Owner: Governance tooling maintainer and evaluation lead.

### F08 — Medium: Current audit no longer reproduces zero production findings

**Class / origin:** REPRODUCED

**Origin:** Pre-existing source-map-js1.2.1 remains; advisory data changed since supplied audit

**Decisive evidence and actual behavior:** One high production affected entry source-map-js1.2.1; six high full entries; full SBOM ESBOMPROBLEMS.

**Warrant:** Lockfile path and advisory affected range agree; patched1.2.2 exists.

**Trigger:** Run current npm audit --package-lock-only --omit=dev on frozen candidate lockfile.

**Limits / counterevidence:** No attacker-controlled indexed-source-map consumption demonstrated in TVM. Five other full entries are one dev braces chain. Older zero audit may have been accurate then.

**Correction:** Implementation agent should propose compatible source-map-js update and rerun audit/build/regressions; separately resolve optional SBOM mismatch and obtain time-bound dev-risk disposition. No dependency changed in this review.

**Regression acceptance:** Current production high gate passes or a separately authorized applicable disposition exists; full inventory generated or explicitly reconciled; no blind major downgrade.

Evidence: T06, T07, T08, T09, R27, R28, X12. Owner: Dependency maintainer and security reviewer.

### F09 — High: Checked-in sharing policy does not restrict reads to possession of a share code

**Class / origin:** SUPPORTED ANALYSIS

**Origin:** Pre-existing source SQL; explicitly documented open limitation

**Decisive evidence and actual behavior:** Inspected policy tests only expires_at > now(); insert check true; cleanup optional; no owner/revocation in source.

**Warrant:** SQL predicate contains no identity/capability condition; current client filters do not add trusted authorization.

**Trigger:** In isolated staging with these policies and anon grants, omit the client .eq filter and select unexpired rows. This review did not execute that query.

**Limits / counterevidence:** Live schema/grants unknown; SQL may not be deployed; no client data accessed. Proposed server architecture addresses this but is not implemented.

**Correction:** Keep cloud sharing out of client use; qualified reviewer selects local-only or reviewed server authorization architecture; validate synthetic grants/policies/revocation/cleanup and actual disclosure.

**Regression acceptance:** Anon list/read/insert deny; valid owner/share cases allow; wrong/expired/revoked capabilities deny; delete/cleanup/backup semantics evidenced at exact build/config.

Evidence: R08, R07, R25, R29, X05, X08. Owner: Security/privacy reviewer and backend maintainer.

## Supported strengths and reconciliation

The new persistence parser bounds nested values, rejects malformed/future envelopes and supports a deliberate legacy path; initialization gates autosave. Scoped schema tests and six original browser tests pass. This is a real improvement, not proof that all session transitions are safe. [R20,R04,T02,T04]

The charter/service protocol explicitly treats the map as one executive's perceptions, not a validated measure of network properties, diagnosis or other people's intentions. It separates research consent, permits stopping, constrains coercive actions and proposes follow-up. The theory of change states hypotheses and alternatives. These are specification strengths; facilitator competence, usability and outcomes remain unevaluated. Reverse arrows require especially clear explanation as perceived effects, not independently observed reciprocal beliefs. [R01,R21–24,R35–36]

Local governance detects many structural, coverage and append-only errors; release denial works for the tested unapproved fixture. Read-only workflow permissions reduce token exposure. Candidate-controlled checker code can still be replaced with a no-op locally; GitHub's selected App restriction establishes status origin, not immutable checker logic. Independent protected review is a countercontrol, but the present sole author-codeowner configuration is not an operable approval path. This is not a demonstrated live malicious merge or forged status. [R11–17,T11,T13,X01–03]

The earlier 42 Python, 5 schema and 6 browser pass claims were independently reproduced, as were lint/typecheck/build. Foundation's 9 tests and exact 100-path check also passed. The earlier zero-production audit is dated evidence, not a current fact: current production audit reports source-map-js and full audit reports six high entries. The full SBOM mismatch was reproduced. Effective public main rules match the intended structural checks; detailed bypass actors were not returned. No independent human PR reviews appeared in the public review arrays. The stacked PR13 base has no effective rules; its green checks do not demonstrate protection of that base. [T02,T04,T06–09,T12,T14–15,L01–02]

MRC guidance supports feasibility/progression and context-sensitive evaluation, not TVM efficacy. It is a health/social-policy methodological framework, not a TVM experiment. The proposed small feasibility study cannot establish causality or psychometric validity. Only selected primary sources were reopened; the complete registered research corpus, all correction histories and specialist applicability remain open. Vendor evaluation guidance supplies candidate engineering methods, not measured benefits for this project. [R24,R35–36,X13–14]

## Executed checks and limits

| Check | Actual result / scope |
|---|---|
| Parent stdlib / reference checker | 8 tests pass; reference integrity passes |
| Foundation stdlib / exact Git range | 9 tests pass; 100 changed paths pass |
| Canonical stdlib / registry | 42 tests pass; 74 records / 8 manifests structural checks pass |
| Increment exact range | Governance/process pass on 68 changed paths |
| Combined canonical range | Governance passes 151; process rejects unmanaged foundation paths; stacked sequence explains scope mismatch, not treated as new runtime defect |
| Original npm checks | Install succeeds; lint, typecheck, 5 unit tests, production build pass |
| Original browser specs | 6 pass using separate Chromium runtime |
| Independent browser edges | Four behaviors reproduced; fixture differences documented |
| Independent process fixtures | Invalid evidence/date cases accepted; valid control also accepted |
| Production / full audit | 1 / 6 high affected entries; advisory applicability reviewed, exploit path unproven |
| Full SBOM | Fails optional @napi-rs/wasm-runtime version reconciliation |
| Release denial | Unapproved synthetic values rejected as expected |
| Live activation command | Blocked by missing gh; public GET effective-rule validation succeeds; bypass/entitlements unknown |
| Preservation | 404 tracked hashes unchanged; no tracked diffs |

Exact commands, dates, exits and outputs are in logs/check-results.json and individual evidence locators. Earlier failed browser/font/server attempts remain in the bundle; they are not relabeled passes. No full accessibility review, deployed security test, real executive study or production authorization was performed.

## Material optimizations

All benefits below are hypotheses. The complete register in FINDINGS.json gives mechanism, both product and service effects, owner, rollback, dependencies, risks and proposed acceptance thresholds. No cost, latency saving or effectiveness percentage was invented.

- **O01 Generate a short current-context packet for each turn (P1)**: Generate head, diff scope, current acceptance criteria, evidence dates and unresolved gates from authoritative records; preserve historical sections. Validate: Replay two real status and two change-planning tasks using existing versus generated packet. [R31, R32, T01]
- **O02 Version a small replay evaluation set before changing model workflow (P1)**: Use REPLAY-EVAL.json with calibration cases and human-generated unseen variants; deterministic checks plus qualified adjudication. Keep user-reported Medium setting as baseline. Validate: Run one baseline on each case, preserve tool traces/outcomes; repeat only nondeterministic cases. Compare any later workflow on the same isolated variants. [T03, T05, X14]
- **O03 Validate typed evidence references at promotion boundaries (P1)**: Require resolvable artifact IDs, appropriate result/type and chronological transitions; bind artifacts to exact source/config; retain human acceptance. Validate: Use existing adversarial fixtures plus valid current records as negative and positive controls. [R11, R12, T03]
- **O04 Make replacement and export outcomes explicit transactions (P0)**: One validated replace action, modal focus containment, explicit export result and visible recovery. Validate: Implement in separate corrective PR; run the four saved browser scenarios and valid/dismiss/quota cases. [F03, F04, F05, F06, X07]
- **O05 Use an isolated local-only rehearsal to test the service protocol (P0)**: Qualified facilitators rehearse synthetic cases with cloud writes disabled, safe-stop cases and export verification. Validate: One complete synthetic rehearsal plus one stop/escalation case; record observed deviations, not simulated client research. [R21, R22, R23, R24, X13]
- **O06 Bind dependency disposition and inventory to date and build (P1)**: Try minimal compatible patch in implementation work; regenerate inventory in clean documented environment and reconcile optional targets. Validate: Separate patch candidate then build, persistence tests, production/full audits and platform inventory reconciliation. [R27, T06, T07, T08, T09, X12]
- **O07 Resolve reviewer/check bootstrap and verify deployment separation (P0)**: Owner verifies actual reviewer identities, required contexts and hosting configuration, then designs a legitimate independently reviewed rollout. Evaluate trusted checker source only against a stated threat. Validate: Read-only configuration inventory then synthetic checker-tamper and release-denial cases; authorized owner separately stages configuration correction. [R14, R15, R16, R17, L01, L02, T11, X01, X02, X03]

## Unresolved questions and human handoff

- **U01:** What is actually deployed, including hosting triggers, Supabase grants/policies, retention/backups and client accessibility? Needed: Owner-provided dated configuration and isolated staging evidence; no production queries authorized.
- **U02:** Does release authorization bind the approved decision content, build and configuration through the actual deployment path? Needed: Controlled staging proof for mismatched decision/config/commit; local denial alone does not establish all bypass resistance.
- **U03:** Do long notes, all arrow types, Unicode and pagination survive PDF/PNG export accurately? Needed: Rendered fixture comparison and human-readable fidelity review; long-note pagination is an unconfirmed source lead.
- **U04:** How do storage quota/unavailability, multi-tab races and assistive technologies behave end to end? Needed: Additional bounded real-browser scenarios and qualified accessibility review; no full WCAG conformance judgment.
- **U05:** Do the full research source register and service mechanisms withstand specialist appraisal and field evaluation? Needed: All consequential original studies, correction checks, population/method applicability and appropriately consented field data. Selected sources only reviewed here.
- **U06:** What account entitlements, bypass actors and deployment permissions exist? Needed: Owner-authorized dated settings export; public GET omits bypass actors; paid plan and security products not verified.
- **U07:** Were separate Astra recommendation files intended? Needed: ASTRA-OPTIMIZATION.md and OPTIMIZATIONS.json were not supplied/found; no proposal-by-proposal disposition can be invented.

Qualified human owners must decide privacy architecture, facilitator/safety competence, independent review configuration, risk dispositions and eventual release acceptance. This report cannot fulfill those approvals. Corrective work belongs in separately reviewed implementation changes, followed by exact-base retesting; do not silently retarget or merge the stack. See CONTINUATION.md for bounded next tasks and COVERAGE.md for every changed path and exclusions.
