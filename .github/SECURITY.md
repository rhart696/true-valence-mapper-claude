# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of True Valence Mapper seriously. If you have discovered a security vulnerability, please report it to us responsibly.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Email the repository owner directly through GitHub
3. Include detailed information about the vulnerability:
   - Type of vulnerability (XSS, injection, authentication bypass, etc.)
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies based on severity (critical issues prioritized)

## Security Measures

### Current Protections

This application implements comprehensive security measures:

#### 1. XSS Protection
- Centralized input validation module (`input-validation.js`)
- HTML tag stripping and special character sanitization
- Context-aware output encoding (HTML, SVG, text)
- Safe DOM manipulation (textContent over innerHTML)

#### 2. Input Validation
- Person names: 50 character limit, alphanumeric + safe punctuation
- Map names: 100 character limit
- Trust scores: Numeric validation (0-3 range)
- JSON imports: Deep sanitization and structure validation

#### 3. Database Security (Supabase)
- Row Level Security (RLS) policies implemented
- User-based data isolation
- Anonymous authentication with proper scoping
- SQL injection prevention through parameterized queries

#### 4. Data Protection
- Client-side validation before storage
- Server-side RLS enforcement
- Sanitization on data load/import
- URL validation (prevents javascript: and data: protocols)

### Attack Scenarios Prevented

- HTML/Script injection in person names
- SQL injection attempts in map names
- Malicious JSON imports
- SVG text injection
- URL-based injection attacks

## Security Documentation

Detailed security documentation is available in the [`docs/security/`](../docs/security/) directory:

- **XSS Protection**: [SECURITY.md](../docs/security/SECURITY.md)
- **RLS Implementation**: [RLS-TESTING-PROCEDURE.md](../docs/security/RLS-TESTING-PROCEDURE.md)
- **Security Analysis**: [CRITICAL-SECURITY-ANALYSIS.md](../docs/security/CRITICAL-SECURITY-ANALYSIS.md)
- **Phase Reports**:
  - [PHASE-0-SECURITY-COMPLETION-REPORT.md](../docs/security/PHASE-0-SECURITY-COMPLETION-REPORT.md)
  - [PHASE-0-VALIDATION-RESULTS.md](../docs/security/PHASE-0-VALIDATION-RESULTS.md)

## Compliance

This implementation addresses:

- **OWASP Top 10 (2021)**
  - A03:2021 Injection
  - A07:2021 Cross-Site Scripting (XSS)
- **CWE Standards**
  - CWE-79: Improper Neutralization of Input During Web Page Generation
  - CWE-434: Unrestricted Upload of File with Dangerous Type

## Security Best Practices

When contributing to this project:

1. **Always use InputValidator** for any user input
2. **Never use innerHTML** with user data (use textContent)
3. **Validate on both client and server** (defense in depth)
4. **Test with malicious inputs** before submitting PRs
5. **Follow principle of least privilege** in database policies

## Third-Party Services

- **Supabase**: Backend as a Service (BaaS)
  - Authentication: Anonymous + future OAuth support
  - Database: PostgreSQL with RLS
  - Security: TLS encryption, secure API endpoints

## Security Audit Workflow

This repository includes automated security checks:

- **Weekly audits** scan for hardcoded secrets
- **SQL injection** patterns checked in database files
- **Dependency scanning** (Dependabot enabled)
- **Secret scanning** (GitHub Advanced Security)

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve the security of True Valence Mapper.

---

**Last Updated**: January 2025
**Security Status**: Production Ready
**Test Coverage**: Comprehensive XSS and injection tests included
