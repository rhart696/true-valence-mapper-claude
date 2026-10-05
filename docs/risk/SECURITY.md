# Security baseline and remediation plan

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

Pilot gate: NOT READY. OBS-0002 and OBS-0004 are source/audit findings; no live penetration test or database configuration audit performed.

Sharing: current checked-in policy filters only expiry; the client .eq(share_code) can be omitted by another client. Establish server-enforced authorization and deny direct enumeration. Candidate architectures: owner-authenticated access with explicit recipient grants; or secure capability retrieval through a bounded server/RPC surface with direct table access revoked, strong random capabilities, rate limiting, expiry and revocation. Choose in a security decision record before implementation. Client-set expiry/payload must be constrained server-side. Do not fix this by pretending a client filter is RLS authorization.

Test in isolated synthetic staging: anon/auth roles, unfiltered reads, known/wrong/missing capability, altered fields, expired/revoked records, insert abuse, update/delete ownership and bypass paths. Confirm grants alongside policies. Deployed policy and retention configuration unknown; do not query real maps to demonstrate exposure.

Dependencies: raw npm report includes direct critical next/jspdf findings and transitive/build-only issues. Validate applicable primary advisories and reachability, update compatible packages, record any exception with rationale/owner/expiry. Do not downgrade Next/ESLint based on npm's broad automated suggestion or run fix --force blindly.

Also verify public vs privileged key handling, build-time NEXT_PUBLIC behavior, request error logging, analytics/network destinations, content security settings, schema validation/size limits and abuse controls. A publishable key is not a privileged secret; service-role keys must stay server-side. Source checks and CI grep scans cannot prove secure deployment.

AI_POLICY's security-sensitive human review and no production-data boundaries remain in force; the Phase 0 PR does not modify SQL or sensitive application authorization. Required release decision includes qualified human security review.
