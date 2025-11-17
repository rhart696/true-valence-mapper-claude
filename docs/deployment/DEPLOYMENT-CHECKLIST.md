# Frontend Skills Testing - Deployment Checklist

## Pre-Deployment Verification

### Phase 1: File Relocation
- [ ] Tool & Skills Centre directory exists
- [ ] Test script moved to target location
- [ ] Documentation moved to target location
- [ ] Test script is executable (`chmod +x`)

### Phase 2: Prerequisites Check
- [ ] Python 3.6+ is installed
- [ ] `server.py` exists in Tool & Skills Centre
- [ ] `_recommend_capabilities()` function is working
- [ ] Phase 0 testing completed successfully

### Phase 3: Skills Creation
- [ ] `frontend-typography.yaml` created
- [ ] `frontend-themes.yaml` created
- [ ] `frontend-animation.yaml` created
- [ ] `frontend-backgrounds.yaml` created
- [ ] All skills registered in registry
- [ ] Skills have required metadata fields
- [ ] Skills have appropriate keywords

---

## Deployment Commands

Copy and paste these commands in sequence:

```bash
# 1. Create target directory (if needed)
mkdir -p ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre

# 2. Move test script
cp /home/ichardart/dev/projects/true-valence-mapper/test-frontend-skills.py \
   ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/

# 3. Move documentation
cp /home/ichardart/dev/projects/true-valence-mapper/FRONTEND-SKILLS-TESTING-README.md \
   ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/

# 4. Make executable
chmod +x ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/test-frontend-skills.py

# 5. Navigate to directory
cd ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre

# 6. Verify files
ls -lh test-frontend-skills.py FRONTEND-SKILLS-TESTING-README.md

# 7. Test help output
python3 test-frontend-skills.py --help
```

---

## Initial Test Run

### Step 1: Verify Environment

```bash
# Check Python version
python3 --version  # Should be 3.6+

# Check server.py exists
ls -l server.py

# Verify in correct directory
pwd  # Should end with /tool-skills-centre/tool-skills-centre
```

### Step 2: First Test Run (Verbose)

```bash
python3 test-frontend-skills.py --verbose
```

### Step 3: Analyze Results

#### If PASS:
```
✅ All tests passed!
- Document results
- Notify team
- Mark task complete
```

#### If FAIL:
```
❌ Some tests failed
1. Review error messages
2. Check which skills failed
3. Follow troubleshooting guide
4. Fix issues
5. Re-run tests
```

---

## Troubleshooting Workflow

### Issue: "Cannot import server module"

```bash
# Check server.py exists
ls -l server.py

# Check Python path
python3 -c "import sys; print('\n'.join(sys.path))"

# Solution: Ensure test script in same directory as server.py
```

### Issue: "Skill not found in recommendations"

```bash
# Check skill YAML exists
ls -l *frontend*.yaml

# Check skill content
cat frontend-typography.yaml

# Solution: Create/fix skill YAML file
```

### Issue: "Score too low"

```
# Review skill keywords
# Expected: ["typography", "fonts", "text", ...]
# May need: More specific keywords, better embeddings

# Solution: Enhance skill YAML keywords section
```

### Issue: "Policy filtering incomplete"

```
# Check skill YAML has policy tags
grep -A 5 "policy_tags" frontend-typography.yaml

# Expected: policy_tags: ["no_internet"]

# Solution: Add missing policy tags to skill YAML
```

---

## Success Criteria

### All Tests Must Pass:

1. **Discovery Tests** (4/4)
   - frontend-typography found
   - frontend-themes found
   - frontend-animation found
   - frontend-backgrounds found

2. **Positive Query Tests** (5/5)
   - Typography query matches correctly
   - Theme query matches correctly
   - Animation query matches correctly
   - Background query matches correctly
   - Generic query returns multiple skills

3. **Negative Query Tests** (3/3)
   - Database query doesn't match
   - API query doesn't match
   - DevOps query doesn't match

4. **Policy Filtering Tests** (1/1)
   - All skills included with no_internet tag

5. **Ranking Quality Tests** (3/3)
   - Typography query ranks typography highest
   - Theme query ranks themes highest
   - Animation query ranks animation highest

6. **Metadata Validation Tests** (4/4)
   - All skills have complete metadata
   - All skills have correct type field
   - No missing required fields

---

## Post-Deployment

### Documentation

- [ ] Update project documentation with test results
- [ ] Document any issues encountered and solutions
- [ ] Note any threshold adjustments made
- [ ] Create runbook for future test runs

### Integration

- [ ] Add test script to CI/CD pipeline (if applicable)
- [ ] Set up automated test scheduling (if desired)
- [ ] Create monitoring alerts (if applicable)
- [ ] Document test maintenance procedures

### Communication

- [ ] Notify team of test infrastructure availability
- [ ] Share test results with stakeholders
- [ ] Document lessons learned
- [ ] Update project status

---

## Quick Command Reference

```bash
# Standard test run
python3 test-frontend-skills.py

# Verbose test run
python3 test-frontend-skills.py --verbose

# Help
python3 test-frontend-skills.py --help

# Check exit code
python3 test-frontend-skills.py && echo "PASSED" || echo "FAILED"

# Save output to file
python3 test-frontend-skills.py --verbose > test-results.txt 2>&1

# Run and check specific test
python3 test-frontend-skills.py --verbose | grep "Discovery Tests"
```

---

## Timeline Estimate

| Task | Estimated Time | Status |
|------|---------------|--------|
| File relocation | 2 minutes | ⏳ Pending |
| Skills creation (by other agent) | Unknown | ⏳ In Progress |
| Initial test run | 1 minute | ⏳ Pending |
| Troubleshooting (if needed) | 5-30 minutes | ⏳ Pending |
| Documentation | 5 minutes | ⏳ Pending |
| **Total** | **13-38 minutes** | ⏳ Pending |

---

## Final Verification

Before marking complete, verify:

- [x] Test infrastructure created
- [x] Documentation comprehensive
- [x] Script is well-structured
- [x] Error handling robust
- [ ] Files relocated to target directory
- [ ] Skills YAML files created
- [ ] Initial test run completed
- [ ] All tests passing
- [ ] Results documented

---

## Contact & Support

**Test Script**: `/test-frontend-skills.py`

**Documentation**:
- `FRONTEND-SKILLS-TESTING-README.md` (comprehensive)
- `TESTING-QUICK-START.md` (quick reference)
- `TESTING-INFRASTRUCTURE-SUMMARY.md` (delivery overview)
- `DEPLOYMENT-CHECKLIST.md` (this file)

**For Issues**:
1. Run with `--verbose` flag
2. Review error messages
3. Check troubleshooting guide
4. Verify prerequisites

---

**Checklist Version**: 1.0.0
**Created**: 2024-11-14
**Status**: Ready for deployment
