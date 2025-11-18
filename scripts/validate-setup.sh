#!/usr/bin/env bash

set -euo pipefail

# Comprehensive validation script for multi-agent repository setup
# Tests all automation in dry-run mode and validates prerequisites

LOG_FILE="validate-setup.log"
PASSED=0
FAILED=0
WARNINGS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
  local level="$1"
  shift
  local message="$*"
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  echo "[${timestamp}] [${level}] ${message}" | tee -a "${LOG_FILE}"
}

# Test result functions
pass() {
  echo -e "${GREEN}✓ PASS${NC}: $*"
  log "PASS" "$*"
  ((PASSED++))
}

fail() {
  echo -e "${RED}✗ FAIL${NC}: $*"
  log "FAIL" "$*"
  ((FAILED++))
}

warn() {
  echo -e "${YELLOW}⚠ WARN${NC}: $*"
  log "WARN" "$*"
  ((WARNINGS++))
}

info() {
  echo -e "ℹ️  INFO: $*"
  log "INFO" "$*"
}

# Header
echo "========================================"
echo "Multi-Agent Setup Validation"
echo "========================================"
echo ""
log "INFO" "Starting validation suite"

# Test 1: Check prerequisites
info "Test 1: Checking prerequisites..."

if command -v gh &> /dev/null; then
  GH_VERSION=$(gh --version | head -1)
  pass "GitHub CLI installed: ${GH_VERSION}"
else
  fail "GitHub CLI not installed"
fi

if command -v git &> /dev/null; then
  pass "Git installed"
else
  fail "Git not installed"
fi

if gh auth status &> /dev/null; then
  pass "GitHub CLI authenticated"
else
  warn "GitHub CLI not authenticated (will need GH_TOKEN for automation)"
fi

if command -v op &> /dev/null; then
  pass "1Password CLI installed"
else
  warn "1Password CLI not installed (optional)"
fi

echo ""

# Test 2: Check repository state
info "Test 2: Validating repository state..."

CURRENT_DIR=$(pwd)
if [[ "${CURRENT_DIR}" == *"true-valence-mapper-claude"* ]]; then
  pass "Working directory has correct name"
else
  fail "Working directory name incorrect: ${CURRENT_DIR}"
fi

if git remote get-url origin | grep -q "true-valence-mapper-claude"; then
  pass "Git remote URL is correct"
else
  fail "Git remote URL still uses old name"
fi

if gh repo view rhart696/true-valence-mapper-claude &> /dev/null; then
  pass "GitHub repository exists with correct name"
else
  fail "GitHub repository not found or incorrectly named"
fi

# Check for old naming references
OLD_REFS=$(grep -r "true-value-mapper" --include="*.md" --include="*.html" --include="*.js" --include="*.css" . 2>/dev/null | grep -v ".git/" | wc -l)
if [[ "${OLD_REFS}" -eq 0 ]]; then
  pass "No old 'true-value-mapper' references found in code/docs"
else
  warn "Found ${OLD_REFS} references to old 'true-value-mapper' naming"
fi

echo ""

# Test 3: Validate scripts exist and are executable
info "Test 3: Checking automation scripts..."

if [[ -f "scripts/setup-multi-agent-repos.sh" ]]; then
  if [[ -x "scripts/setup-multi-agent-repos.sh" ]]; then
    pass "setup-multi-agent-repos.sh exists and is executable"
  else
    fail "setup-multi-agent-repos.sh exists but not executable"
  fi
else
  fail "setup-multi-agent-repos.sh not found"
fi

if [[ -f "scripts/bootstrap-parent-repo.sh" ]]; then
  if [[ -x "scripts/bootstrap-parent-repo.sh" ]]; then
    pass "bootstrap-parent-repo.sh exists and is executable"
  else
    fail "bootstrap-parent-repo.sh exists but not executable"
  fi
else
  fail "bootstrap-parent-repo.sh not found"
fi

if [[ -f "scripts/README.md" ]]; then
  pass "scripts/README.md exists"
else
  warn "scripts/README.md not found"
fi

echo ""

# Test 4: Test setup-multi-agent-repos.sh in dry-run mode
info "Test 4: Testing setup-multi-agent-repos.sh (dry-run)..."

if DRY_RUN=true PHASE=1 bash scripts/setup-multi-agent-repos.sh > /tmp/setup-test.log 2>&1; then
  pass "setup-multi-agent-repos.sh dry-run succeeded"

  # Check log file was created
  if [[ -f "setup-multi-agent-repos.log" ]]; then
    pass "setup-multi-agent-repos.log created"

    # Check log contents
    if grep -q "DRY-RUN" setup-multi-agent-repos.log; then
      pass "Log contains dry-run indicators"
    else
      fail "Log missing dry-run indicators"
    fi

    if grep -q "true-valence-mapper" setup-multi-agent-repos.log; then
      pass "Log references correct repository names"
    else
      fail "Log has incorrect repository names"
    fi

    # Check it would create correct repos
    if grep -q "Would create rhart696/true-valence-mapper " setup-multi-agent-repos.log; then
      pass "Would create parent repository"
    else
      fail "Parent repository creation not found in dry-run"
    fi

    if grep -q "Would create rhart696/true-valence-mapper-codex" setup-multi-agent-repos.log; then
      pass "Would create Codex edition repository"
    else
      fail "Codex repository creation not found in dry-run"
    fi

  else
    fail "setup-multi-agent-repos.log not created"
  fi
else
  fail "setup-multi-agent-repos.sh dry-run failed"
  cat /tmp/setup-test.log
fi

echo ""

# Test 5: Test bootstrap-parent-repo.sh in dry-run mode
info "Test 5: Testing bootstrap-parent-repo.sh (dry-run)..."

if DRY_RUN=true bash scripts/bootstrap-parent-repo.sh > /tmp/bootstrap-test.log 2>&1; then
  pass "bootstrap-parent-repo.sh dry-run succeeded"

  # Check log file was created
  if [[ -f "bootstrap-parent-repo.log" ]]; then
    pass "bootstrap-parent-repo.log created"

    # Check it would create correct structure
    if grep -q "Would create directory.*docs" bootstrap-parent-repo.log; then
      pass "Would create docs directory"
    else
      fail "docs directory creation not found in dry-run"
    fi

    if grep -q "Would create directory.*shared" bootstrap-parent-repo.log; then
      pass "Would create shared directory"
    else
      fail "shared directory creation not found in dry-run"
    fi

    if grep -q "Would create directory.*versions" bootstrap-parent-repo.log; then
      pass "Would create versions directory (for submodules)"
    else
      fail "versions directory creation not found in dry-run"
    fi

    if grep -q "Would create file.*GOVERNANCE.md" bootstrap-parent-repo.log; then
      pass "Would create GOVERNANCE.md"
    else
      fail "GOVERNANCE.md creation not found in dry-run"
    fi

    if grep -q "Would create file.*ARCHITECTURE.md" bootstrap-parent-repo.log; then
      pass "Would create ARCHITECTURE.md"
    else
      fail "ARCHITECTURE.md creation not found in dry-run"
    fi

  else
    fail "bootstrap-parent-repo.log not created"
  fi
else
  fail "bootstrap-parent-repo.sh dry-run failed"
  cat /tmp/bootstrap-test.log
fi

echo ""

# Test 6: Validate GitHub workflow
info "Test 6: Checking GitHub Actions workflow..."

if [[ -f ".github/workflows/setup-agent-repos.yml" ]]; then
  pass "setup-agent-repos.yml workflow exists"

  # Check workflow has required inputs
  if grep -q "GH_CLI_TOKEN" .github/workflows/setup-agent-repos.yml; then
    pass "Workflow references GH_CLI_TOKEN secret"
  else
    fail "Workflow missing GH_CLI_TOKEN reference"
  fi

  if grep -q "workflow_dispatch" .github/workflows/setup-agent-repos.yml; then
    pass "Workflow has manual trigger (workflow_dispatch)"
  else
    warn "Workflow missing manual trigger"
  fi

else
  fail "setup-agent-repos.yml workflow not found"
fi

echo ""

# Test 7: Check documentation
info "Test 7: Validating documentation..."

if [[ -f "docs/planning/MULTI-AGENT-VERSION-PLAN.md" ]]; then
  pass "Multi-agent version plan exists"
else
  warn "Multi-agent version plan not found"
fi

# Check scripts README has all sections
if [[ -f "scripts/README.md" ]]; then
  if grep -q "DRY_RUN" scripts/README.md; then
    pass "scripts/README.md documents DRY_RUN"
  else
    fail "scripts/README.md missing DRY_RUN documentation"
  fi

  if grep -q "PHASE" scripts/README.md; then
    pass "scripts/README.md documents PHASE control"
  else
    fail "scripts/README.md missing PHASE documentation"
  fi
fi

echo ""

# Test 8: Syntax check scripts
info "Test 8: Shell script syntax validation..."

if bash -n scripts/setup-multi-agent-repos.sh; then
  pass "setup-multi-agent-repos.sh syntax valid"
else
  fail "setup-multi-agent-repos.sh has syntax errors"
fi

if bash -n scripts/bootstrap-parent-repo.sh; then
  pass "bootstrap-parent-repo.sh syntax valid"
else
  fail "bootstrap-parent-repo.sh has syntax errors"
fi

echo ""

# Summary
echo "========================================"
echo "Validation Summary"
echo "========================================"
echo -e "${GREEN}Passed:${NC} ${PASSED}"
echo -e "${RED}Failed:${NC} ${FAILED}"
echo -e "${YELLOW}Warnings:${NC} ${WARNINGS}"
echo ""

log "INFO" "Validation complete: ${PASSED} passed, ${FAILED} failed, ${WARNINGS} warnings"

if [[ ${FAILED} -eq 0 ]]; then
  echo -e "${GREEN}✓ All critical tests passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Set up GitHub PAT in 1Password"
  echo "2. Add GH_CLI_TOKEN to repository secrets"
  echo "3. Run: DRY_RUN=false PHASE=1 ./scripts/setup-multi-agent-repos.sh"
  echo "4. Run: DRY_RUN=false ./scripts/bootstrap-parent-repo.sh"
  echo ""
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please review and fix issues above.${NC}"
  echo ""
  exit 1
fi
