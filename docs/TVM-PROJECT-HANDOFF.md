# True Valence Mapper: project capture and execution handoff

Captured: 2026-10-05. Owner: Richard Hart / ProActive ReSolutions.
Status: proposed programme and execution brief; not a completed implementation.

## Provenance and limitations

This record synthesizes the conversation excerpts supplied in this session. The supplied conversation explicitly omits earlier material. It is therefore not a complete verbatim transcript. Preserve the original full conversation separately if available. Prior assistant statements are proposals or unverified claims unless independently checked. Numerical maturity ratings were subjective opinions, not validated assessments.

Repository README independently retrieved on 2026-10-05:
https://github.com/rhart696/true-valence-mapper-claude/blob/main/README.md
Retrieved blob SHA: d3e51db5b7566d915c8078d8ca1d3e5838f8ff8d.
The README calls v1 canonical, describes a Next.js/Supabase app, a maximum of eight relationships, six-character sharing codes and 30-day expiry, and states that merges to main automatically deploy. These are verified descriptions in the README, not tested runtime capabilities. The earlier discussion's references to 25 relationships and later 8–12 pilot relationships require reconciliation with the documented maximum of eight. Security assertions in the README are not audit findings. No code, repository settings or deployments have been changed by this capture.

## User direction

Proceed with a canonical product specification and implementation plan. Establish transparent project governance so human and AI contributors can recover decisions, changes, rationale and relevant context. Anchor work in current, relevant standards, professional practice, academic research and empirical learning. Capture the programme durably and support continuation across sessions.

## Proposed governing model

Evidence-Governed Product–Service Development (EGPSD) is a proposed working name, not an established standard. Govern software, facilitation, consulting delivery, research and learning together. Every material decision should record rationale, evidence, assumptions, alternatives, consequences and validation status. Supply each task with sufficient relevant context and links to the full history. Documentation depth should be proportionate to consequence.

Traceability: source → claim → decision → requirement → implementation → verification → observation → revised knowledge. Distinguish verification of software behavior from evaluation of intervention value.

## Proposed product and service direction

TVM is a facilitated visual inquiry into a leader's current relational expectations. Ratings are situated judgments, not objective relationship properties, psychometric measures of trust, diagnoses or knowledge of another person's mental state. Proposed language: perceived approach confidence. The exact construct and wording need investigation; broadening the existing problem-with-this-person question to any difficult or consequential topic is a material methodological change.

Proposed session loop: map → notice → interpret → test assumptions → choose priorities → act → re-map. Begin with the executive's own noticing before presenting descriptive patterns. Detection must remain distinct from interpretation.

Proposed core fields: session purpose/context; directional High/Moderate/Low/Unconsidered ratings; observations/evidence; interpretation; confidence in inference; alternative explanation; desired shift; behavioral experiment/action; expectation; surprising result; due date; outcome. Inbound judgments must explicitly remain the executive's inference. Confidence in inference is separate from the approach rating.

Proposed facilitated session: approximately 30–45 minutes; a small relevant relationship set; select one to three relationships for action. Relationship count and duration are design hypotheses to validate, not empirical optimal values.

Retain subject to audit: existing Next.js/React/TypeScript implementation, radial map, directional representation, notes, local persistence, PDF/PNG exports, sharing, demo and accessibility work. Modify terminology, onboarding, session flow, pattern presentation, report and privacy explanation. Add evidence/inference fields, action capture, facilitator prompts and pilot feedback. Use a separate research consent/data mode if research data are collected.

Defer generative interpretation, automated recommendations, psychometric and diagnostic claims, normative scores, executive benchmarking, multi-user collaboration, organizational dashboards and sophisticated network analysis. Guided sense-making should precede AI insights. Future AI output must label its provenance as a hypothesis.

## Governance artifacts

Root: AGENTS.md and README.md.
Entry points: docs/START-HERE.md and docs/CURRENT-STATE.md.
Strategy: product-service charter, provisional theory of change, principles, success measures, roadmap.
Product: product specification, UX specification, data model.
Service: intervention specification, facilitator guide, executive journey.
Registries: requirements, decisions, sources/evidence, claims, research questions, experiments, observations, risks and verification results.
Quality/risk: security, privacy, AI governance, test strategy, release gates and quality management.
Archives: superseded documentation and prototype lineage, with preserved history.

Records should have stable identifiers, status, owner, dates, review date, linked records and supersession links. Separate artifact currency (authoritative/superseded/archival) from lifecycle status (proposed/accepted/implemented/etc.). Prior illustrative IDs must not be mistaken for existing records.

Evidence categories proposed in discussion: synthesis; empirical research; standards/guidance; ProActive observation; practitioner judgment; hypothesis/inference; design preference. These are source types, not an automatic quality ranking. Assess methodological quality, relevance, directness, limitations and certainty separately. Record contradictory and negative evidence. Separate certainty from the recommendation.

Agent read order: applicable AGENTS.md → current state → charter → relevant requirements → decisions → evidence → task files. Before material changes, identify conflicts, assumptions, acceptance criteria and validation. Afterwards, update requirement status, evidence/results, current state, change log and unresolved questions. Capture concise decision rationale and provenance, not private internal reasoning.

Mechanical governance: a change manifest links requirements, decisions, evidence, risks and verification where relevant. CI checks identifier existence, links and applicable completeness; it cannot establish whether an agent understood context or whether evidence is true. Allow a documented lightweight path for minor changes.

## Evidence and standards verification backlog

The previous assistant asserted current editions and publication states without those findings being independently verified in this session. Do not promote them into authoritative baseline records yet.
Verify on official primary sources: PMI PMBOK edition; ISO 9001 edition/publication status; ISO 9241-210 and draft ISO 27502; WCAG and ISO/IEC 40500; ISO 31000; ISO/IEC 27001; NIST SSDF final/draft versions; OWASP ASVS stable version; ISO/IEC 42001; NIST AI RMF and GenAI Profile. Record applicability and access limitations, not just edition numbers. In particular, recheck the assertion that ISO 9001:2026 replaced the 2015 edition.
Validate and summarize the actual cited research: Hevner et al. design science; Rousseau evidence-based management; updated MRC complex-intervention framework; OECD trust measurement; relevant evidence-certainty methods. Do not infer TVM efficacy from adjacent literature.
Each source record: title, author/issuer, URL/DOI, edition/date, exact supported claim, limitations, verification date, review trigger and review due date. Reviews must be prioritized by volatility and consequence. No recurring monitoring task has yet been scheduled.

## Research programme

Provisional theory: elicitation externalizes expectations; visualization supports noticing; facilitation makes assumptions discussable; alternatives support experiment design; interaction generates information; expectations and behavior may change. Each causal link is a hypothesis.
Research questions: what respondents mean by ratings; additional value of visualization; value of directional asymmetry; actionability of structured interpretation/experiment prompts; longitudinal usefulness.
Proposed developmental mixed-method pilot: 3–4 facilitators, 8–12 executives, approximately 15–25 uses. Earlier excerpt suggested 12–20 sessions; choose and document one feasible protocol. This sample explores feasibility and learning, not efficacy or population generalizability.
Capture completion, session time, errors/friction, relationship count, patterns explored, actions and reuse intention; qualitative participant and facilitator feedback; follow-up at 1–3 weeks on what changed in behavior. Address consent, privacy, research/service distinction, access, retention and analysis before collecting research data. Keep client records out of the source repository.

## Delivery phases and acceptance

Phase 0: inventory current repositories, refs, instructions, deployment and documentation; preserve provenance; confirm canonical implementation; create authoritative governance and reconcile conflicts. Avoid moving v1 merely to match a proposed directory diagram. Do not freeze sibling projects, tag remote repositories or alter automations until their identity and impact are established.
Phase 1: verify/remediate dependencies and security; revise construct language and privacy UX; add evidence/inference/action support; align exports and facilitator guide. Pilot gate covers share authorization/guessability, Supabase RLS, expiry, deletion, exports, persistence, logs/analytics, secrets and accessibility. Reassess historical vulnerability counts; they are not current findings. Target WCAG 2.2 AA, subject to a documented evaluation rather than an untested compliance claim.
Phase 2: run the real-world pilot and maintain findings; separate defects from methodological discoveries.
Phase 3: refine guided sense-making using pilot evidence.
Phase 4: engagement snapshots, comparisons and experiment follow-up with provenance and context.
Phase 5: consider assisted intelligence only when evidence and governance justify it.

Lightweight gates: relevance; evidence; decision; design; engineering; pilot; adoption. Initial governance can be drafted before every literature uncertainty is settled, provided uncertainties are explicit. Do not describe the client pilot as release-ready until gates pass.

## Recommended session configuration

Continue in the existing session while repository access and context are available. Start a new session when a fresh workspace or repository-backed development environment is needed. Neither option substitutes for durable project records. Use an environment with a writable checkout, git history, supported dependency installation/test execution, access to authoritative web sources and ability to prepare a reviewable branch/PR. Keep production secrets outside chat and version control. Use one canonical branch per work package. Do not merge/deploy as a side effect of documentation work; the README reports automatic deployment on main. No particular model or effort setting is asserted as optimal.

## Continuation prompt

Work on True Valence Mapper for Richard Hart / ProActive ReSolutions. Read this handoff and the actual repository's applicable AGENTS.md before editing. The candidate canonical app is rhart696/true-valence-mapper-claude/v1. First inspect repository history, deployment configuration, existing decisions, docs and code; distinguish verified implementation from README claims and prior proposals. Preserve history and avoid creating another edition or moving the application unnecessarily.

Implement Phase 0 of the captured Evidence-Governed Product–Service Development programme in a reviewable branch: current state, charter, provisional theory of change, source/claim/decision/requirement registries, product and intervention specifications, roadmap, agent context rules and proportionate pilot release gates. Capture unresolved disagreements rather than silently choosing. Independently verify current standards and academic sources on primary sources before labeling them verified; record exactly which claim each supports and its limits. Record rationale, assumptions, alternatives and consequences for material decisions.

Then proceed to the security/dependency baseline and prioritized pilot work using linked acceptance criteria and meaningful validation. Keep directional ratings framed as the executive's situated perceptions; prioritize guided sense-making and behavioral experiments over AI interpretation. Keep client data and secrets out of source control. Do not claim efficacy, psychometric validity, accessibility compliance, privacy/security readiness or completed work without evidence. Update current state and a continuation record at each work-package boundary. Prepare changes for review; do not merge, deploy, delete repositories or rewrite history without explicit authorization. At handoff, report exactly what changed, validation performed, blockers and the next task.
