#!/usr/bin/env bash
# justfile — AI Code Review Task Automation
# Install: cargo install just (or sudo apt install just on Ubuntu 24.04+)
# Usage: just <recipe>
# Docs: https://github.com/casey/just

# Default recipe: show available commands
default:
    @just --list

# ============================================
# LAYER 0: Developer Self-Review
# ============================================

# Run all pre-commit checks (linters, tests, type checks)
check:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🔍 Running pre-commit checks..."

    # [CUSTOMIZE: Add your project's lint/test/typecheck commands]

    # Example for Node.js/TypeScript:
    # npm run lint || echo "⚠️  Linting failed"
    # npm run typecheck || echo "⚠️  Type checking failed"
    # npm test -- --passWithNoTests || echo "⚠️  Tests failed"

    # Example for Python:
    # ruff check src/ || echo "⚠️  Linting failed"
    # mypy src/ || echo "⚠️  Type checking failed"
    # pytest || echo "⚠️  Tests failed"

    echo "✅ Pre-commit checks complete"

# Stage changes interactively and show summary
stage:
    #!/usr/bin/env bash
    git add -p
    echo ""
    echo "📋 Staged changes:"
    git diff --cached --stat
    echo ""
    echo "💡 Tip: Run 'just review' to get AI feedback before committing"

# ============================================
# LAYER 1: AI Review (Pre-Push)
# ============================================

# Quick AI review of staged changes (Claude Code)
review:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🤖 Asking Claude to review staged changes..."

    if ! git diff --cached --quiet; then
        git diff --cached > /tmp/review-diff.txt
        claude code -p "Review this diff against standards/REVIEW_STANDARDS.md. High-certainty issues only. Use the output format from Section 5. Focus on security, correctness, and architecture." < /tmp/review-diff.txt
        rm /tmp/review-diff.txt
    else
        echo "⚠️  No staged changes to review. Run 'git add' first."
    fi

# Red Team security review (adversarial Claude)
red-team:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🔴 Running Red Team security review..."

    if ! git diff --cached --quiet; then
        git diff --cached > /tmp/redteam-diff.txt
        claude code -p "Act as a hostile security reviewer. Read standards/REVIEW_STANDARDS.md. Attack this diff for: SQL/NoSQL injection vectors, authentication bypasses, authorization failures, race conditions, secrets exposure, PII leaks. Be brutal. Output CRITICAL/HIGH/MEDIUM findings only." < /tmp/redteam-diff.txt
        rm /tmp/redteam-diff.txt
    else
        echo "⚠️  No staged changes to review."
    fi

# Architecture review (pattern compliance)
arch-review:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🏗️  Running architecture review..."

    if ! git diff --cached --quiet; then
        git diff --cached > /tmp/arch-diff.txt
        claude code -p "Review this diff for architecture violations per standards/REVIEW_STANDARDS.md Section 3. Flag pattern violations, wrong-layer code, unnecessary duplication, and architectural drift." < /tmp/arch-diff.txt
        rm /tmp/arch-diff.txt
    else
        echo "⚠️  No staged changes to review."
    fi

# Full review (all three perspectives: standard, red-team, architecture)
full-review: review red-team arch-review
    @echo ""
    @echo "✅ Full review complete (standard + red-team + architecture)"

# Copilot CLI review (alternative to Claude)
copilot-review:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🤖 Asking Copilot CLI to review..."

    if command -v gh >/dev/null 2>&1; then
        if ! git diff --cached --quiet; then
            git diff --cached | gh copilot -p "Review this diff against standards/REVIEW_STANDARDS.md. Focus on security and correctness. High-certainty only."
        else
            echo "⚠️  No staged changes to review."
        fi
    else
        echo "❌ GitHub CLI (gh) not installed. Install: https://cli.github.com/"
        exit 1
    fi

# ============================================
# LAYER 2: Tier 1 Verification
# ============================================

# Check if staged changes touch Tier 1 paths (requires human review)
tier1-check:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🔒 Checking for Tier 1 path changes..."

    # [CUSTOMIZE: Update these patterns to match AI_POLICY.md Section 3]
    TIER1_PATTERNS="src/auth/|src/security/|src/cases/|src/participants/|migrations/|\.env|secrets/|src/payments/"

    TIER1_FILES=$(git diff --cached --name-only | grep -E "$TIER1_PATTERNS" || true)

    if [ -n "$TIER1_FILES" ]; then
        echo ""
        echo "⚠️  TIER 1 PATHS DETECTED - Mandatory human review required:"
        echo "$TIER1_FILES" | sed 's/^/  - /'
        echo ""
        echo "📋 Requirements for Tier 1 changes:"
        echo "  1. Line-by-line human review by senior engineer"
        echo "  2. Explicit sign-off before merge (document in commit message)"
        echo "  3. Corresponding test coverage (unit + security tests)"
        echo "  4. AI suggestions are ADVISORY ONLY"
        echo ""
        echo "🚫 Do NOT merge without human approval."
        exit 1
    else
        echo "✅ No Tier 1 paths in staged changes"
    fi

# ============================================
# LAYER 2: Workflow Recipes (Composite)
# ============================================

# Pre-push workflow: check → review → tier1-check
pre-push: check review tier1-check
    @echo ""
    @echo "✅ Pre-push checks complete. Safe to push."

# Full workflow: stage → check → full-review → tier1-check
full: stage check full-review tier1-check
    @echo ""
    @echo "✅ Full workflow complete. Review output above."

# Quick commit workflow (for Tier 3 changes only - tests, docs, scripts)
quick: check review
    @echo ""
    @echo "✅ Quick review complete."
    @echo "💡 Note: Only use 'just quick' for Tier 3 changes (tests, docs, configs)."
    @echo "    For Tier 1/2 changes, run 'just pre-push' instead."

# ============================================
# LAYER 3: Information & Utilities
# ============================================

# Show review standards summary (first 100 lines)
standards:
    #!/usr/bin/env bash
    if [ -f "standards/REVIEW_STANDARDS.md" ]; then
        head -100 standards/REVIEW_STANDARDS.md
    elif [ -f "docs/REVIEW_STANDARDS.md" ]; then
        head -100 docs/REVIEW_STANDARDS.md
    else
        echo "❌ REVIEW_STANDARDS.md not found. Expected at standards/ or docs/"
        exit 1
    fi

# Show AI policy summary (governance rules)
policy:
    #!/usr/bin/env bash
    if [ -f "AI_POLICY.md" ]; then
        head -80 AI_POLICY.md
    else
        echo "❌ AI_POLICY.md not found in repository root"
        exit 1
    fi

# Display Tier 1 paths from policy
tier1-paths:
    #!/usr/bin/env bash
    if [ -f "AI_POLICY.md" ]; then
        echo "🔒 Tier 1 Paths (from AI_POLICY.md):"
        sed -n '/^## 3\. Tier 1 Paths/,/^## 4\./p' AI_POLICY.md | grep -E '^\S+/\*\*|^\*\*/' || echo "No Tier 1 paths configured yet"
    else
        echo "❌ AI_POLICY.md not found"
    fi

# Update Claude Code with latest context (re-sync configuration)
sync-claude:
    #!/usr/bin/env bash
    echo "🔄 Syncing Claude Code context..."
    claude code -p "Read CLAUDE.md, standards/REVIEW_STANDARDS.md, and AI_POLICY.md. Confirm you understand the project context, Tier 1 paths, and review standards."

# Show help for justfile recipes
help:
    @echo "AI Code Review Justfile - Available Commands"
    @echo ""
    @echo "Layer 0 (Developer Self-Review):"
    @echo "  just check          - Run linters, type checks, and tests"
    @echo "  just stage          - Interactively stage changes (git add -p)"
    @echo ""
    @echo "Layer 1 (AI Review):"
    @echo "  just review         - Quick AI review (Claude Code)"
    @echo "  just red-team       - Adversarial security review"
    @echo "  just arch-review    - Architecture pattern compliance"
    @echo "  just full-review    - All three reviews combined"
    @echo "  just copilot-review - Alternative review with Copilot CLI"
    @echo ""
    @echo "Layer 2 (Verification & Workflows):"
    @echo "  just tier1-check    - Check for Tier 1 path changes"
    @echo "  just pre-push       - Full pre-push workflow"
    @echo "  just full           - Complete workflow (stage + review + check)"
    @echo "  just quick          - Fast workflow (Tier 3 changes only)"
    @echo ""
    @echo "Layer 3 (Information):"
    @echo "  just standards      - Display review standards summary"
    @echo "  just policy         - Display AI policy summary"
    @echo "  just tier1-paths    - List Tier 1 paths"
    @echo "  just sync-claude    - Re-sync Claude Code context"
    @echo "  just help           - Show this help message"
    @echo ""
    @echo "WSL Compatibility: All recipes use bash shebang for cross-platform support."

# ============================================
# LAYER 4: Advanced (Optional)
# ============================================

# Generate tests for staged changes (AI-assisted)
gen-tests:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🧪 Generating tests for staged changes..."

    if ! git diff --cached --quiet; then
        git diff --cached > /tmp/gen-tests-diff.txt
        echo "💡 Reading standards/REVIEW_STANDARDS.md Section 3 for patterns..."
        claude code -p "Read standards/REVIEW_STANDARDS.md Section 3 for established patterns. Write unit tests for these changes. Focus on: edge cases, error paths, boundary conditions, and security validations. Output only the test code in the appropriate test framework." < /tmp/gen-tests-diff.txt
        rm /tmp/gen-tests-diff.txt
    else
        echo "⚠️  No staged changes found."
    fi

# Generate security-focused tests (injection, auth, validation)
gen-security-tests:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🔐 Generating security tests..."

    if ! git diff --cached --quiet; then
        git diff --cached > /tmp/gen-sec-tests-diff.txt
        claude code -p "Write security-focused tests for these changes. Test for: SQL/NoSQL injection attacks, authentication bypasses, authorization failures, input validation failures, error information leakage, race conditions. Use the appropriate test framework." < /tmp/gen-sec-tests-diff.txt
        rm /tmp/gen-sec-tests-diff.txt
    else
        echo "⚠️  No staged changes found."
    fi

# Run security scan on staged changes (using trufflehog or similar)
security-scan:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🔍 Running security scan on staged changes..."

    # Check for secrets using trufflehog (if installed)
    if command -v trufflehog >/dev/null 2>&1; then
        git diff --cached | trufflehog --no-update
    else
        echo "⚠️  trufflehog not installed. Install: https://github.com/trufflesecurity/trufflehog"
        echo "    Falling back to basic secret detection..."

        # Basic regex-based secret detection
        PATTERNS="(password|secret|api_key|token|credential)[:=]\s*['\"][^'\"]{8,}|AKIA[0-9A-Z]{16}|ghp_[0-9a-zA-Z]{36}"

        if git diff --cached | grep -E -i "$PATTERNS"; then
            echo ""
            echo "❌ Potential secrets detected in staged changes!"
            echo "🚫 DO NOT COMMIT. Remove secrets and use environment variables instead."
            exit 1
        else
            echo "✅ No obvious secrets detected (basic check only)"
        fi
    fi

# ============================================
# Development & Debugging
# ============================================

# Test this justfile for syntax errors
test-justfile:
    @echo "🧪 Testing justfile syntax..."
    @just --summary >/dev/null && echo "✅ Justfile syntax valid"

# Show justfile variables and environment
debug:
    @echo "Justfile Debug Info:"
    @echo "  Working directory: {{justfile_directory()}}"
    @echo "  Justfile path: {{justfile()}}"
    @echo "  OS: {{os()}}"
    @echo "  Shell: bash (via shebang)"
    @echo ""
    @echo "Git Status:"
    @git status --short

# ============================================
# Notes for Customization
# ============================================

# [CUSTOMIZE THESE RECIPES FOR YOUR PROJECT]:
# 1. Update 'check' recipe with your lint/test/typecheck commands
# 2. Update TIER1_PATTERNS in 'tier1-check' to match AI_POLICY.md
# 3. Add project-specific recipes (e.g., deploy, docker-build, etc.)
# 4. Adjust paths if REVIEW_STANDARDS.md is in docs/ instead of standards/
# 5. Configure trufflehog or alternative secret scanning tool

# WSL Compatibility Notes:
# - All recipes use '#!/usr/bin/env bash' shebang
# - File paths use Linux conventions (forward slashes)
# - 'set -euo pipefail' for strict error handling
# - No Windows-specific commands (PowerShell, cmd.exe)
