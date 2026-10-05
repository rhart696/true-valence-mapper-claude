# Verification and evaluation strategy

Currency: authoritative · Owner: Richard Hart / ProActive ReSolutions · Created/reviewed: 2026-10-05
Related: See START-HERE and registry.

Phase 0: standard-library traceability/link/metadata checks, meaningful negative checker tests and parent automation regression tests. Documentation changes need no fabricated app browser test. No npm dependency installation or runtime build was performed for Phase 0.

Phase 1: build/lint/type checks after controlled dependency installation; meaningful unit schema/migration/pattern tests; browser reload/resume/share/export/error tests; synthetic database authorization/expiry/revocation tests; manual and automated accessibility; log/network/privacy review. Add the test harness through a documented dependency/tooling decision because none is currently committed.

Release assurance attaches results to exact app commit, dependency lockfile, staging config, roles and browser/device combinations. A source review is distinct from executed test. CI pattern scans do not prove RLS, injection or privacy safety. Failure reports include reproduced behavior and actionable fix; no unsupported LGTM.

Service evaluation: EXP-0001 and research agenda. Do not mistake a passing feature test for evidence of executive value or efficacy.
