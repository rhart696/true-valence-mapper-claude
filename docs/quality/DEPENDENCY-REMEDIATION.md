# Dependency remediation — OBS-0005

Reviewed: 2026-10-05. WP-0001; DEC-0009; REQ-0009. Local branch only, no deployment.

Next16.1.6 →16.3.8; eslint-config-next matched16.3.8; jsPDF4.1.0 →4.2.1. React19.2.3 unchanged. Playwright1.63.0 added for development regression verification. Compatible npm audit fix --ignore-scripts updated 35 transitive entries without force. Consult the actual lockfile for exact versions.

Baseline full lockfile audit: 23 affected package entries (2 critical/15 high/5 moderate/1 low). New full audit: 5 high affected entries, no critical/moderate/low. Production-only audit: zero findings. Raw scope/results are phase1/npm-audit-full.json and npm-audit-production.json. These counts are affected package entries, not independent exploitable vulnerabilities. Audit services can change; rerun at release.

Residual chain: eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces3.0.3, development tooling. GitHub-reviewed GHSA-vfj7-8cjw-p6xm lists no patched braces version. A crafted deeply nested glob can crash the parser; repository-controlled lint configuration currently uses fixed patterns. This is a source-based applicability assessment, not a complete proof of unreachable input. Run CI with read-only tokens/no production credentials, constrain untrusted config review and execution time. npm suggests a breaking downgrade to eslint-config-next14; rejected. Human reviewer must disposition residual risk with expiry before release; no sponsor acceptance invented.

Full npm CycloneDX generation failed on an existing optional Tailwind WASI dependency mismatch: @napi-rs/wasm-runtime0.2.12 versus ^1.1.0. Production/nonoptional CycloneDX succeeded with69 components; it excludes development and optional packages and is not a complete installed/runtime SBOM. A supplemental exact lockfile package inventory is in baseline/lockfile-inventory-phase1.json (custom format, not CycloneDX). Complete-SBOM release criterion remains open.

Primary sources: https://nextjs.org/blog/september-2026-security-release ; https://github.com/parallax/jsPDF/security/advisories/GHSA-wfv2-pwc8-crg5 ; https://github.com/advisories/GHSA-vfj7-8cjw-p6xm . Source scope is recorded in SRC-0022/23/25. Production audit success does not prove application sharing/privacy is safe.
