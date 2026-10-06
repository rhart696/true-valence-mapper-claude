# Local authoritative TVM context

Reviewed: 2026-10-05. This file is not overwritten by legacy parent template sync.

## Resolved direction and precedence

Richard Hart authorized convergence, evidence-governed product–service development and continued execution in the October 5, 2026 session. The June A/B/C/D pause is superseded: guided sense-making before generative AI, with security/privacy/persistence remediation before an executive pilot (DEC-0001–0006).

Read [START-HERE](docs/START-HERE.md), [CURRENT-STATE](docs/CURRENT-STATE.md), the charter and task-specific records. Those records and this local file override stale edition-template commands, parallel-edition roadmaps, pending-direction banners and unconditional asks for work already authorized. Preserve the human review and no-secrets/production-data restrictions in AI_POLICY. Legacy copies remain in docs/archive/governance-2026-10-05.

## Source-inspected stack

- App: `v1/`; Next.js 16.1.6, React/React DOM 19.2.3, strict TypeScript, Tailwind 4, Supabase.
- `cd v1 && npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint`.
- No npm test script, committed Playwright directory or Playwright dependency in the inspected baseline. Do not claim existing tests ran.
- UI maximum 25 relationships (`src/constants.ts`); older documentation says eight. Pilot default 8–12 remains a design hypothesis.
- Dependency audit 2026-10-05: 23 affected package entries, two critical, fifteen high. See baseline report for scope.

## Existing approval preserved

`@supabase/supabase-js ^2.97.0`: approved by rhart696 on 2026-02-22 for Feature #005. This approval does not imply the sharing authorization/retention design is secure or deployed as documented.

## Deployment and convergence

README reports Vercel deployment from v1 and automatic deployment on main. Source disables push-triggered v0 Pages deployment but retains a manual workflow. Vercel account settings have not been inspected.

Paired parent convergence proposal pins eight edition references, stops noncanonical automatic advancement and stops template overwrites. Its operational effect requires merge; no remote repository archive/delete/tag was performed. Work on reviewable branches; no merge/deploy in this work package.

## Current authorization

Phase 0 docs/specification/governance checks and read-only source/dependency assessment are authorized. Record material implementation choices; no application dependencies or live database policies changed in Phase 0. Future sensitive runtime remediation still needs the recorded human review before merge. Detailed release gates apply before real client use.

## Phase 1 authorization and enforcement

Richard authorized proceeding with reliability/service development and governance enforcement on 2026-10-05. Compatible dependency remediation, a scoped browser regression harness, persistence fixes and paired service specifications are authorized as reviewable branch work. No merge/deploy/live migration authorization. Read docs/governance/ENFORCEMENT.md and docs/product/REMEDIATION-BACKLOG.md. Every new increment requires a work package, immutable manifest, coordinated impacts and actual validation. Client release remains blocked; GitHub main rulesets activated and verified by browser plus ruleset-detail API on 2026-10-05; see docs/quality/phase1/github-ruleset-activation.json. Effective-rules gh command and deliberate deny test remain unperformed.
