# AI_POLICY.md — Data Governance for AI Tools

> **Purpose**: Define what AI tools can access and how they should handle sensitive data.
> **Scope**: All AI coding assistants (Claude, Copilot, Gemini, etc.) used on this repository.

---

## 1. AI Usage Mode

```yaml
AI_USAGE: [FULL | REVIEW_ONLY | RESTRICTED | NONE]
```

**Current Setting**: `FULL`

| Mode | Description |
|------|-------------|
| `FULL` | AI can generate code, review, and access all non-excluded paths |
| `REVIEW_ONLY` | AI can review and comment but **not** generate new code |
| `RESTRICTED` | AI can only access explicitly allowed paths (whitelist mode) |
| `NONE` | AI tools disabled for this repository (opt-out) |

**Decision Criteria**:
- `FULL`: Open source projects, low-risk internal tools
- `REVIEW_ONLY`: Projects with sensitive business logic but no PII/secrets
- `RESTRICTED`: Projects handling PII, financial data, or authentication
- `NONE`: Projects with strict compliance requirements (HIPAA, PCI-DSS, etc.)

---

## 2. Approved Vendors

This repository may send code to the following AI providers:

| Vendor | Products | Data Processing Location | Approved | Notes |
|--------|----------|-------------------------|----------|-------|
| Anthropic | Claude Code CLI, Claude API | US (SOC 2 Type II) | ✅ Yes | Preferred for deep analysis |
| GitHub/Microsoft | Copilot CLI, Copilot Code Review | US/EU (Azure) | ✅ Yes | Real-time IDE suggestions |
| Google | Gemini CLI, Gemini API | US (Google Cloud) | ✅ Yes | Second opinion, large context |
| OpenAI | GPT-4o (via Copilot) | US | ✅ Yes | Embedded in Copilot |

**Not Approved**: `[List any prohibited vendors, e.g., unauthorized SaaS tools, personal AI accounts]`

### Vendor Approval Process
1. Assess data handling practices and compliance certifications
2. Review Terms of Service and Data Processing Agreements
3. Document approval in this section with justification
4. Set expiration date for re-review (e.g., annually)

---

## 3. Tier 1 Paths (Sensitive / PII-Heavy)

AI tools must treat these paths with **elevated caution**:

```yaml
# True Valence Mapper - Tier 1 Sensitive Paths

# Database & RLS Policies (critical security)
supabase-*.sql                    # All Supabase SQL files
*-rls-*.sql                       # Row-Level Security policies
fix-rls-policy.sql                # RLS fixes
supabase-schema.sql               # Database schema

# Authentication Logic
supabase-auth-implementation.js   # Auth implementation

# Deployment & Infrastructure
deploy-*.py                       # Deployment scripts
*.env*                            # Environment variables (if any)

# Security Testing
test-rls-security*.js             # Security tests contain RLS bypass patterns
test-xss-protection.js            # XSS test vectors
verify-rls-deployment.sql         # RLS verification

# @security-critical annotations
# Any file containing @security-critical in comments
```

### Rules for Tier 1 Paths:
1. **Human Review Required**: AI-generated code **must** be reviewed line-by-line by a human with domain expertise
2. **Advisory Only**: AI suggestions are **advisory** — human makes final decision
3. **Test Coverage Mandatory**: All changes require corresponding unit tests and security tests
4. **Explicit Sign-Off**: No merge without documented human approval
5. **Audit Logging**: All AI tool usage on Tier 1 paths must be logged

---

## 4. Data Classification

| Classification | Examples | AI Access Rules | Retention |
|---------------|----------|----------------|-----------|
| **Public** | Open source code, public documentation | Full AI access | Permanent |
| **Internal** | Business logic, internal APIs, private docs | AI access with standard review | 90 days in AI logs |
| **Confidential** | PII, case data, auth logic, API keys | Tier 1 restrictions apply | 30 days, encrypted |
| **Restricted** | Production credentials, secrets, keys | AI must **never** see or generate | Not transmitted to AI |

### Handling Restricted Data
- **Never** commit secrets to version control (use environment variables or secret managers)
- **Never** paste actual production data into AI chat interfaces
- **Always** use placeholder/mock data when asking AI for code help
- **Redact** sensitive values before sharing code snippets with AI

---

## 5. Prohibited Actions

AI tools must **never**:

### Security Violations
- Generate or suggest hardcoded credentials, API keys, or passwords
- Bypass or weaken existing security controls (e.g., removing auth checks)
- Suggest disabling security features (CSRF protection, rate limiting, etc.)

### Data Privacy Violations
- Access or process actual production data (use mocks/fixtures only)
- Generate code that logs or transmits PII without proper safeguards
- Suggest storing sensitive data in plain text or insecure locations

### Compliance Violations
- Generate code that violates data protection regulations (GDPR, PIPEDA, CCPA, etc.)
- Suggest data processing practices that lack legal basis
- Create audit trails that are incomplete or tamperable

### Operational Violations
- Push code directly to production branches
- Merge code without required human approvals
- Disable or skip CI/CD checks

---

## 6. Compliance & Regulatory Requirements

```yaml
# [CUSTOMIZE: Add relevant compliance frameworks for your organization]

Applicable Regulations:
  - PIPEDA: [Yes/No] - Personal Information Protection and Electronic Documents Act (Canada)
  - GDPR: [Yes/No] - General Data Protection Regulation (EU)
  - CCPA: [Yes/No] - California Consumer Privacy Act (US)
  - HIPAA: [Yes/No] - Health Insurance Portability and Accountability Act (US)
  - SOC 2: [Yes/No] - Service Organization Control 2
  - ISO 27001: [Yes/No] - Information Security Management

Data Residency Requirements:
  - All data processing must occur in: [Canada/US/EU/etc.]
  - Cross-border transfers: [Allowed/Restricted/Prohibited]

Audit & Logging:
  - AI tool usage logs: [Enabled/Disabled]
  - Retention period: [90 days / 1 year / permanent]
  - Log storage location: [Local/Cloud/Both]
  - Review frequency: [Monthly/Quarterly/Annually]

Data Subject Rights (if GDPR/PIPEDA applies):
  - Right to access: AI-generated code is version-controlled and auditable
  - Right to deletion: Remove AI conversation logs on request
  - Right to portability: Export AI interactions in machine-readable format
```

### AI-Specific Compliance Notes
- **Training Data**: Confirm AI vendors do not use your code for model training (check ToS)
- **Data Retention**: AI conversation logs retained for `[90 days]` then auto-deleted
- **Data Location**: All AI processing occurs in `[US/Canada/EU]` regions only
- **Vendor Audits**: Re-assess AI vendor compliance annually

---

## 7. Rate Limiting & Anti-Spam

To maintain code review quality and prevent AI overuse:

| Limit Type | Threshold | Rationale |
|-----------|-----------|-----------|
| Comments per file | 20 | Prevents overwhelming developers with noise |
| Comments per PR | 50 | Ensures focus on critical issues |
| API calls per hour | 100 | Prevents cost overruns and service degradation |
| Context window size | 200K tokens | Balances thoroughness with cost |

**Enforcement**:
- AI tools should self-limit based on these thresholds
- Humans can override limits for critical security reviews
- Exceeding limits triggers notification to team lead

---

## 8. Exception Process

To request an exception to this policy:

### Request Template
1. **Requestor**: [Name, Role, Date]
2. **Exception Type**: [Vendor Approval / Path Access / Usage Mode Change]
3. **Business Justification**: [Why is this exception necessary?]
4. **Risk Assessment**: [What are the specific risks?]
5. **Mitigations**: [What controls will reduce risk?]
6. **Duration**: [Temporary (with end date) / Permanent]
7. **Approver Required**: [Security Lead / Data Protection Officer / CTO]

### Approval Workflow
1. Submit request via [Issue Tracker / Email / Slack Channel]
2. Security review within 3 business days
3. Approval documented in table below
4. Re-review before expiration (if temporary)

### Active Exceptions

| Date | Exception | Justification | Expires | Approver | Status |
|------|-----------|---------------|---------|----------|--------|
| — | None | — | — | — | — |

**Example Entry**:
| 2025-01-15 | Allow Gemini access to `src/analytics/**` | Need large context for refactor | 2025-03-15 | Jane Doe (Security Lead) | Active |

---

## 9. Incident Response

If an AI tool:
- Generates code with a critical security vulnerability
- Exposes sensitive data in logs or outputs
- Violates this policy in any way

### Immediate Actions
1. **Stop**: Pause AI tool usage on affected paths
2. **Assess**: Determine scope of exposure (what data, how many files, etc.)
3. **Contain**: Revoke API keys if credentials were exposed, rotate secrets
4. **Notify**: Alert security team and affected stakeholders

### Investigation
1. Review AI interaction logs
2. Identify root cause (prompt engineering issue, model hallucination, policy gap)
3. Document findings in incident report

### Remediation
1. Update this policy to prevent recurrence
2. Retrain team on secure AI usage
3. Implement technical controls (e.g., secret scanning in CI/CD)

---

## 10. Training & Awareness

All developers using AI tools must:
- **Read this policy** before first use
- **Complete training** on secure AI usage (annually)
- **Acknowledge understanding** via signed attestation
- **Report violations** via [incident response process]

### Training Topics
- How to prompt AI securely (never paste real credentials)
- Recognizing AI-generated vulnerabilities
- Tier 1 path awareness
- Data classification and handling

---

## 11. Policy Review & Updates

| Review Frequency | Trigger Events |
|-----------------|---------------|
| Quarterly | Routine review for updates |
| Ad-hoc | New AI vendor adoption, regulatory change, security incident |

**Next Review Date**: `[YYYY-MM-DD]`

---

## 12. Changelog

| Date | Change | Author | Approver |
|------|--------|--------|----------|
| YYYY-MM-DD | Initial policy created from template | [Your Name] | [Approver Name] |

---

## Appendix A: Glossary

- **Tier 1 Paths**: High-risk code paths requiring mandatory human review
- **AI Usage Mode**: Policy setting controlling AI tool capabilities
- **Data Classification**: Security labeling system for code and data sensitivity
- **PII**: Personally Identifiable Information (names, emails, addresses, etc.)
- **Restricted Data**: Data that must never be transmitted to AI systems

---

## Appendix B: Quick Reference Card

```
┌─────────────────────────────────────────────┐
│ AI POLICY QUICK REFERENCE                   │
├─────────────────────────────────────────────┤
│ AI Usage Mode: [FULL/REVIEW_ONLY/etc.]     │
│ Approved Vendors: Claude, Copilot, Gemini  │
│ Tier 1 Paths: src/auth, src/security, ...  │
│ Max Comments: 20/file, 50/PR               │
│ Prohibited: Hardcoded secrets, PII logs    │
│ Compliance: [PIPEDA/GDPR/etc. if applicable]│
│ Questions: Contact [Security Team]          │
└─────────────────────────────────────────────┘
```

---

**Policy Owner**: `[Name, Title]`
**Last Reviewed**: `[YYYY-MM-DD]`
**Next Review**: `[YYYY-MM-DD]`
