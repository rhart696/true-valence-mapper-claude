#!/usr/bin/env bash

# Quick validation of Phase 1 setup
set -euo pipefail

echo "=========================================="
echo " Phase 1 Quick Validation"
echo "=========================================="
echo ""

ERRORS=0

# Test 1: Scripts exist and are executable
echo "1. Checking scripts..."
if [[ -x "scripts/setup-multi-agent-repos.sh" ]]; then
  echo "   ✓ setup-multi-agent-repos.sh is executable"
else
  echo "   ✗ setup-multi-agent-repos.sh missing or not executable"
  ((ERRORS++))
fi

if [[ -x "scripts/bootstrap-parent-repo.sh" ]]; then
  echo "   ✓ bootstrap-parent-repo.sh is executable"
else
  echo "   ✗ bootstrap-parent-repo.sh missing or not executable"
  ((ERRORS++))
fi

# Test 2: Dry-run setup script
echo ""
echo "2. Testing setup-multi-agent-repos.sh (dry-run)..."
if DRY_RUN=true PHASE=1 bash scripts/setup-multi-agent-repos.sh >/dev/null 2>&1; then
  echo "   ✓ Dry-run completed successfully"
  if [[ -f "setup-multi-agent-repos.log" ]]; then
    echo "   ✓ Log file created"
    if grep -q "true-valence-mapper-codex" setup-multi-agent-repos.log; then
      echo "   ✓ Would create Codex repository"
    else
      echo "   ✗ Codex repository not in dry-run output"
      ((ERRORS++))
    fi
  else
    echo "   ✗ Log file not created"
    ((ERRORS++))
  fi
else
  echo "   ✗ Dry-run failed"
  ((ERRORS++))
fi

# Test 3: Dry-run bootstrap script
echo ""
echo "3. Testing bootstrap-parent-repo.sh (dry-run)..."
if DRY_RUN=true bash scripts/bootstrap-parent-repo.sh >/dev/null 2>&1; then
  echo "   ✓ Dry-run completed successfully"
  if [[ -f "bootstrap-parent-repo.log" ]]; then
    echo "   ✓ Log file created"
    if grep -q "GOVERNANCE.md" bootstrap-parent-repo.log; then
      echo "   ✓ Would create GOVERNANCE.md"
    else
      echo "   ✗ GOVERNANCE.md not in dry-run output"
      ((ERRORS++))
    fi
  else
    echo "   ✗ Log file not created"
    ((ERRORS++))
  fi
else
  echo "   ✗ Dry-run failed"
  ((ERRORS++))
fi

# Test 4: Repository naming
echo ""
echo "4. Checking repository state..."
if git remote get-url origin | grep -q "true-valence-mapper-claude"; then
  echo "   ✓ Git remote uses correct naming"
else
  echo "   ✗ Git remote still uses old naming"
  ((ERRORS++))
fi

# Test 5: Documentation
echo ""
echo "5. Checking documentation..."
if [[ -f "scripts/README.md" ]]; then
  echo "   ✓ scripts/README.md exists"
else
  echo "   ✗ scripts/README.md missing"
  ((ERRORS++))
fi

if [[ -f ".github/workflows/setup-agent-repos.yml" ]]; then
  echo "   ✓ GitHub workflow exists"
else
  echo "   ✗ GitHub workflow missing"
  ((ERRORS++))
fi

# Summary
echo ""
echo "=========================================="
if [[ ${ERRORS} -eq 0 ]]; then
  echo "✓ ALL TESTS PASSED"
  echo ""
  echo "Ready for Phase 2!"
  echo ""
  echo "Next steps:"
  echo "  1. Set up GitHub PAT"
  echo "  2. Add GH_CLI_TOKEN to repository secrets"
  echo "  3. Run automation to create repositories"
  echo ""
  exit 0
else
  echo "✗ ${ERRORS} TEST(S) FAILED"
  echo ""
  echo "Please review errors above"
  exit 1
fi
