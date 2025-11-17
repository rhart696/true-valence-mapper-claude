# Frontend Skills Testing - Quick Start Guide

## Immediate Actions Required

### 1. Move Test Script to Correct Location

```bash
# Create directory if it doesn't exist
mkdir -p ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre

# Move test script
mv /home/ichardart/dev/projects/true-valence-mapper/test-frontend-skills.py \
   ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/

# Move README
mv /home/ichardart/dev/projects/true-valence-mapper/FRONTEND-SKILLS-TESTING-README.md \
   ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/

# Make executable
chmod +x ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/test-frontend-skills.py
```

### 2. Wait for Skills Creation

The concurrent agent is creating these four skill YAML files:
- `frontend-typography.yaml`
- `frontend-themes.yaml`
- `frontend-animation.yaml`
- `frontend-backgrounds.yaml`

**Do NOT run tests until these files are in the skill registry!**

### 3. Run Tests

Once skills are created:

```bash
# Navigate to Tool & Skills Centre
cd ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre

# Run tests (standard output)
python3 test-frontend-skills.py

# Run tests (verbose for debugging)
python3 test-frontend-skills.py --verbose
```

## Expected Test Results

### Success Output
```
======================================================================
Frontend Skills Test Report
======================================================================

[Test execution details...]

======================================================================
Test Summary
======================================================================
Discovery Tests: ✅ PASSED
Positive Query Tests: ✅ PASSED
Negative Query Tests: ✅ PASSED
Policy Filtering Tests: ✅ PASSED
Ranking Quality Tests: ✅ PASSED
Metadata Validation Tests: ✅ PASSED

Total Tests: 23
Passed: 23
Failed: 0
Warnings: 0

======================================================================
OVERALL: ✅ PASS
All frontend design skills are working correctly!
======================================================================
```

### Failure Output
```
======================================================================
OVERALL: ❌ FAIL
Some tests failed. Review errors above.
======================================================================

❌ Errors:
  - Skill frontend-typography not found in recommendations
  - Expected skill frontend-themes not in recommendations
```

## Test Categories

### 1. Discovery (4 tests)
Verifies each skill is findable

### 2. Positive Queries (5 tests)
Checks that relevant queries match correctly:
- Typography query → typography skill
- Theme query → themes skill
- Animation query → animation skill
- Background query → backgrounds skill
- Generic query → multiple skills

### 3. Negative Queries (3 tests)
Ensures database/backend/DevOps queries don't match

### 4. Policy Filtering (1 test)
Validates `no_internet` policy includes all skills

### 5. Ranking Quality (3 tests)
Confirms appropriate skills rank highest

### 6. Metadata Validation (4+ tests)
Checks skill metadata is correct

## What to Do If Tests Fail

### Skills Not Found
```
❌ Found frontend-typography: NO - SKILL NOT DISCOVERED
```
**Fix**: Check that skill YAML file exists in registry and is valid

### Low Scores
```
❌ frontend-typography score too low: 0.45 < 0.6
```
**Fix**: Review skill keywords/embeddings to improve matching

### Wrong Ranking
```
⚠️  Expected frontend-themes, got frontend-typography
```
**Fix**: This is a warning, not a failure. Consider improving keyword specificity

### Policy Issues
```
❌ Policy ['no_internet']: Only 3/4 skills found
```
**Fix**: Add `policy_tags: ["no_internet"]` to missing skill YAML

### Metadata Errors
```
❌ frontend-animation: Missing fields: type
```
**Fix**: Add missing metadata fields to skill YAML

## Quick Validation Checklist

Before running tests, verify:

- [ ] Tool & Skills Centre is functional (`_recommend_capabilities` works)
- [ ] All 4 frontend skill YAML files exist
- [ ] Test script is in correct directory
- [ ] Test script is executable (`chmod +x`)
- [ ] Python 3.6+ is available

## Integration Timeline

1. **Now**: Test infrastructure created
2. **Next**: Skills created by concurrent agent
3. **Then**: Run validation tests
4. **Finally**: Iterate on any failures

## File Locations Summary

| File | Current Location | Target Location |
|------|-----------------|-----------------|
| `test-frontend-skills.py` | `/home/ichardart/dev/projects/true-valence-mapper/` | `~/DEV-ECOSYSTEM-OPTIMIZATION/.../tool-skills-centre/` |
| `FRONTEND-SKILLS-TESTING-README.md` | `/home/ichardart/dev/projects/true-valence-mapper/` | `~/DEV-ECOSYSTEM-OPTIMIZATION/.../tool-skills-centre/` |
| Skill YAMLs | TBD | Tool & Skills Centre registry |

## Command Reference

```bash
# Basic test run
python3 test-frontend-skills.py

# Verbose mode
python3 test-frontend-skills.py -v

# Help
python3 test-frontend-skills.py --help

# Check exit code
python3 test-frontend-skills.py && echo "PASSED" || echo "FAILED"
```

## Next Steps

1. Move files to correct location (see commands above)
2. Wait for skill YAML creation
3. Run initial validation
4. Address any failures
5. Document results

For detailed information, see `FRONTEND-SKILLS-TESTING-README.md`
