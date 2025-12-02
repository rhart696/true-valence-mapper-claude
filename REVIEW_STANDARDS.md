# AI Code Review Standards - Single Source of Truth

**Version:** 1.0.0
**Last Updated:** 2025-12-02
**Status:** Active

---

## Project Context

**Project Name:** `True Valence Mapper - Claude Edition`
**Technology Stack:** `Supabase (PostgreSQL + Auth + RLS), Vanilla JavaScript, HTML5`
**Primary Languages:** `JavaScript, SQL, HTML, CSS`
**Framework:** `None (Vanilla JS) + Supabase SDK`
**Repository Type:** `Edition repository (part of multi-agent ecosystem)`

---

## Review Philosophy

All AI code reviewers MUST adhere to these three immutable rules:

### RULE 1: Only Comment When CERTAIN an Issue Exists
- No speculation, hypotheticals, or "might" scenarios
- Evidence-based feedback only
- If uncertain, skip the comment
- Wrong code is better than noise

### RULE 2: Provide Actionable Fixes, Not Observations
- Every comment MUST include a specific fix
- No "consider refactoring" without showing how
- No "this could be improved" without concrete changes
- Format: Problem → Solution (with code)

### RULE 3: Risk-First Prioritization
Priority order (never deviate):
1. **Security** - Vulnerabilities, data exposure, auth bypass
2. **Correctness** - Bugs, crashes, data corruption
3. **Architecture** - Pattern violations, maintainability issues

Ignore everything else (formatting, style, preferences).

---

## Signal-to-Noise Framework

### Target Metrics
- **Resolution Rate:** >60% of comments result in fixes
- **Comment Limit:** Maximum 15 comments per review
- **False Positive Rate:** <20%

### Priority Weighting
- **Critical (P0):** Security vulnerabilities - BLOCK merges
- **High (P1):** Correctness issues - BLOCK merges
- **Medium (P2):** Architecture violations - Advisory only
- **Low (P3):** Never comment (handled by automation)

---

## Priority Areas (REVIEW THESE)

### 1. Security (Critical - P0)

**Always Review:**
- SQL/NoSQL/Command injection vulnerabilities
- Hardcoded secrets, API keys, credentials
- Authentication bypass or broken access control
- Insecure deserialization
- XSS (Cross-Site Scripting) vulnerabilities
- CSRF protection gaps
- Path traversal vulnerabilities
- Unsafe cryptography usage
- PII/sensitive data exposure
- OWASP Top 10 violations

**Example Comment:**
```
[CRITICAL] src/api/users.ts:45
Issue: SQL injection vulnerability - user input directly concatenated into query
Fix: Use parameterized query:
  const users = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

### 2. Correctness (High - P1)

**Always Review:**
- Null/undefined access without checks
- Async/await misuse (unhandled promises, race conditions)
- Resource leaks (unclosed connections, file handles, streams)
- Error swallowing (empty catch blocks, ignored errors)
- Off-by-one errors in loops/arrays
- Type coercion bugs
- Race conditions in concurrent code
- Memory leaks
- Infinite loops or recursion without base case

**Example Comment:**
```
[HIGH] src/services/processor.ts:23
Issue: Unhandled promise rejection - async call without await or .catch()
Fix: Add await and error handling:
  try {
    await processData(input);
  } catch (error) {
    logger.error('Process failed:', error);
    throw error;
  }
```

### 3. Architecture (Medium - P2)

**Review When Certain:**
- Obvious pattern violations (mixing layers, breaking encapsulation)
- Clear layer violations (UI calling database directly)
- Significant code duplication (3+ identical blocks)
- Circular dependencies
- God classes (1000+ lines doing everything)
- Missing abstraction for repeated complex logic

**Example Comment:**
```
[MEDIUM] src/controllers/order.ts:89
Issue: Controller directly accessing database - violates layered architecture
Fix: Extract to service layer:
  // In OrderService:
  async createOrder(data) { return db.orders.create(data); }
  // In Controller:
  const order = await orderService.createOrder(req.body);
```

---

## Negative Constraints (DO NOT Comment On)

### Automated Tool Territory (CI/Linters Handle)
- Code formatting (Prettier, Black, gofmt)
- Import sorting and organization
- Lint rule violations (ESLint, Pylint, Rubocop)
- Type errors (TypeScript, mypy)
- Missing semicolons, quotes, indentation
- Line length violations

### Low-Value Feedback (Noise)
- Naming preferences without clear confusion
- "Consider" or "might want to" suggestions
- Logging improvements (unless security-critical)
- Comment additions (unless complex algorithm)
- Performance micro-optimizations without profiling
- Refactoring suggestions without concrete benefits
- Style preferences not in linter config

### Already Covered by Tests
- Edge cases with existing test coverage
- Error handling with test verification
- Boundary conditions tested in spec files

**If CI flags it, DO NOT comment on it.**

---

## Risk Tiers

### Tier 1 (Critical) - Human Required
**Scope:** Authentication, authorization, security, PII handling
**AI Role:** Flag and block - human MUST review
**Approval:** Security team + senior engineer required

**Trigger Patterns:**
- `password`, `secret`, `token`, `auth`, `crypto`
- Database schema changes
- Permission/role checks
- Data encryption/decryption

### Tier 2 (Standard) - Approval Required
**Scope:** Business logic, data transformations, API contracts
**AI Role:** Primary reviewer - human approves
**Approval:** Team lead or senior engineer required

**Trigger Patterns:**
- Core business workflows
- Payment processing
- Data validation rules
- External API integrations

### Tier 3 (Support) - AI Primary
**Scope:** Tests, documentation, config, tooling
**AI Role:** Full autonomy with spot-check
**Approval:** AI auto-approve (human spot-check 10%)

**Trigger Patterns:**
- Test files (`*.test.*, *.spec.*`)
- Documentation (`*.md`)
- Configuration (`*.config.*, *.json`)
- Build scripts

---

## Output Format

### Standard Comment Format
```
[SEVERITY] path/to/file.ext:line_number
Issue: Clear description of the problem (one sentence)
Fix: Exact code or change needed (with example)
```

### Severity Levels
- `[CRITICAL]` - Security vulnerabilities (P0)
- `[HIGH]` - Correctness bugs (P1)
- `[MEDIUM]` - Architecture issues (P2)

### LGTM Response
When no actionable issues found:
```
LGTM - No critical, high, or medium priority issues detected.

Reviewed:
- Security: No vulnerabilities found
- Correctness: No bugs identified
- Architecture: Patterns followed

CI checks will validate formatting and linting.
```

### Multi-Issue Example
```
Review Summary: 3 issues found

[CRITICAL] src/auth/login.ts:34
Issue: Password comparison using == instead of timing-safe compare
Fix: Use bcrypt.compare():
  const valid = await bcrypt.compare(password, user.passwordHash);

[HIGH] src/api/orders.ts:67
Issue: Promise rejection unhandled - network call without try-catch
Fix: Wrap in error handler:
  try {
    const result = await fetch(apiUrl);
  } catch (error) {
    logger.error('API call failed:', error);
    return { success: false, error: error.message };
  }

[MEDIUM] src/services/payment.ts:123
Issue: Business logic duplicated in 3 locations (lines 123, 456, 789)
Fix: Extract to shared method:
  private validatePayment(amount, currency) {
    return amount > 0 && VALID_CURRENCIES.includes(currency);
  }
```

---

## Environment Constraints

### Platform Requirements
- **OS:** WSL2 on Windows (Linux environment)
- **Shell:** Bash (native Linux commands)
- **Path Format:** Unix-style (`/home/user/...`)

### Node.js Environment
- **Version Management:** nvm (Node Version Manager)
- **Check version:** `nvm current` or `node --version`
- **Project version:** Read from `.nvmrc` if present
- **Switch version:** `nvm use` (respects .nvmrc)

### Python Environment
- **Binary:** `python3` (not `python`)
- **Package Manager:** `pip3`
- **Virtual Environments:** `python3 -m venv venv`

### Project-Specific Patterns

**True Valence Mapper Configuration:**
```yaml
custom_patterns:
  file_naming: "kebab-case for files, camelCase for variables"
  architecture: "Single-page app with Supabase backend"
  error_handling: "try-catch with user-facing toast notifications"
  testing_framework: "Manual + Python test scripts"

  # Security-critical (Tier 1) paths for this project
  tier_1_paths:
    - "supabase-*.sql"           # Database schema/RLS policies
    - "supabase-auth-*.js"       # Authentication logic
    - "*-rls-*.sql"              # Row-level security
    - "deploy-*.py"              # Deployment scripts
    - "test-rls-security*.js"    # Security tests

  # Project-specific forbidden patterns
  forbidden_patterns:
    - "anon key" in client-side code (use environment variables)
    - Direct DOM innerHTML without sanitization
    - SQL string concatenation (use parameterized queries)
    - Disabling RLS policies

  # Required patterns for this project
  required_patterns:
    - All Supabase queries must use RLS (no service_role bypass)
    - User inputs must be validated before database operations
    - Toast notifications for user-facing errors
    - Error logging to console for debugging
```

**Agent Adapters MUST:**
1. Read this file at review initialization
2. Load project-specific patterns from project root
3. Merge with base standards (this file takes precedence)
4. Cache for session duration

---

## Compliance and Updates

### Version Control
- All changes to this file MUST be versioned
- Breaking changes require major version bump
- Agents MUST specify which version they're using

### Agent Adapter Requirements
Every AI code review tool MUST:
1. Reference this file as primary authority
2. Implement all three rules (no exceptions)
3. Respect negative constraints (do not comment)
4. Use exact output format specified
5. Report metrics: resolution rate, false positives, review time

### Metrics Collection
Track and report monthly:
- Comments per review (target: ≤15)
- Resolution rate (target: >60%)
- False positive rate (target: <20%)
- Time to review (target: <5 minutes for <500 LOC)

### Continuous Improvement
- Review metrics quarterly
- Update standards based on resolution data
- Add patterns to negative constraints as CI improves
- Refine priority areas based on production incidents

---

## References

- **Parent Framework:** `/home/ichardart/dev/infrastructure/ai-governance/`
- **Agent Adapters:** `/home/ichardart/dev/infrastructure/ai-governance/templates/.claude/agents/`
- **Security Standards:** `/home/ichardart/dev/infrastructure/ai-governance/standards/` (OWASP)
- **Testing Framework:** `~/idp-projects/idp-discovery-documentation/IDP_TESTING_VALIDATION_FRAMEWORK.md`

---

**IMPORTANT:** This file is the single source of truth. All agent adapters, tooling configurations, and review processes MUST defer to this standard. Any conflicts between this file and agent-specific configurations MUST be resolved in favor of this file.

**END OF STANDARDS v1.0.0**
