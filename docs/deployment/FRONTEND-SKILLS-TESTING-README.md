# Frontend Skills Testing Infrastructure

## Overview

This document describes the comprehensive testing infrastructure for validating frontend design skills in the Tool & Skills Centre.

## Location

**Test Script**: `test-frontend-skills.py`

This script should be placed in:
```
~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/test-frontend-skills.py
```

Currently created at: `/home/ichardart/dev/projects/true-valence-mapper/test-frontend-skills.py`

## Prerequisites

1. **Tool & Skills Centre must be functional** with `_recommend_capabilities()` working
2. **Four frontend design skills** must be created in the skill registry:
   - `frontend-typography`
   - `frontend-themes`
   - `frontend-animation`
   - `frontend-backgrounds`
3. **Python 3.6+** installed
4. **server.py module** accessible in the same directory

## Installation

1. Copy the test script to the Tool & Skills Centre directory:
```bash
cp test-frontend-skills.py ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/
```

2. Make it executable:
```bash
chmod +x ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre/test-frontend-skills.py
```

## Usage

### Basic Usage

Run all tests with standard output:
```bash
python3 test-frontend-skills.py
```

### Verbose Mode

Run with detailed output showing each test step:
```bash
python3 test-frontend-skills.py --verbose
# or
python3 test-frontend-skills.py -v
```

### Help

Display usage information:
```bash
python3 test-frontend-skills.py --help
```

## Test Coverage

The test suite validates six critical areas:

### 1. Skill Discovery Tests
Verifies that all four frontend design skills are discoverable in the registry:
- `frontend-typography` - Typography and font design
- `frontend-themes` - Color palettes and theme systems
- `frontend-animation` - Smooth animations and transitions
- `frontend-backgrounds` - Atmospheric background effects

**Pass Criteria**: All skills found with reasonable scores (>0.0)

### 2. Positive Query Tests
Tests that relevant queries correctly recommend the appropriate frontend skills:

| Query | Expected Skill | Min Score |
|-------|---------------|-----------|
| "How do I improve typography in my React app?" | frontend-typography | 0.6 |
| "Create a modern color theme system" | frontend-themes | 0.6 |
| "Add smooth animations to landing page" | frontend-animation | 0.6 |
| "Design atmospheric background effects" | frontend-backgrounds | 0.6 |
| "Build a distinctive frontend design system" | Multiple frontend skills | 0.5 |

**Pass Criteria**: Expected skills are recommended with scores above threshold

### 3. Negative Query Tests
Ensures that irrelevant queries do NOT incorrectly recommend frontend skills:

- "Set up PostgreSQL database with authentication"
- "Optimize API endpoint performance and caching"
- "Configure Docker containers for deployment"

**Pass Criteria**: No frontend skills appear in top 5 recommendations

### 4. Policy Filtering Tests
Validates that policy tag filtering works correctly:

- `policy_tags=["no_internet"]` should include all frontend skills (they don't require network access)

**Pass Criteria**: All 4 frontend skills are included when filtering by policy tags

### 5. Ranking Quality Tests
Checks that skills are ranked appropriately based on query relevance:

| Query | Expected Top Skill |
|-------|-------------------|
| "typography and font selection" | frontend-typography |
| "color palette and theme design" | frontend-themes |
| "smooth transitions and animations" | frontend-animation |

**Pass Criteria**: Expected skill ranks highest among frontend skills (warnings if not optimal)

### 6. Metadata Validation Tests
Verifies that skill metadata is correct and complete:

- All skills have required fields: `id`, `score`, `type`
- Type field is set to `"skill"`
- Metadata is properly structured

**Pass Criteria**: All frontend skills have valid, complete metadata

## Output Format

The script produces a comprehensive test report:

```
======================================================================
Frontend Skills Test Report
======================================================================

=== Testing Skill Discovery ===
✅  Found frontend-typography: YES (score: 0.85)
✅  Found frontend-themes: YES (score: 0.82)
✅  Found frontend-animation: YES (score: 0.79)
✅  Found frontend-backgrounds: YES (score: 0.77)

=== Testing Positive Query Matches ===
✅  ✓ Query: "How do I improve typography in my React app?..." → frontend-typography (score: 0.91)
✅  ✓ Query: "Create a modern color theme system for my ap..." → frontend-themes (score: 0.88)
...

=== Testing Negative Query Matches ===
✅  ✓ Query: "Set up PostgreSQL database with authenticati..." → No frontend skills (correct)
...

=== Testing Policy Filtering ===
✅  ✓ Policy ['no_internet']: All 4 frontend skills included

=== Testing Ranking Quality ===
✅  ✓ Query: "typography and font selection" → Top: frontend-typography (score: 0.92)
⚠️   Query: "color palette and theme design" → Expected frontend-themes, got frontend-typography

=== Testing Metadata Validation ===
✅  ✓ frontend-typography: Metadata valid
✅  ✓ frontend-themes: Metadata valid
...

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
Warnings: 1

⚠️  Warnings:
  - Ranking suboptimal: expected frontend-themes, got frontend-typography

======================================================================
OVERALL: ✅ PASS
All frontend design skills are working correctly!
======================================================================
```

## Exit Codes

- **0**: All tests passed successfully
- **1**: One or more tests failed

This allows the script to be used in automated pipelines:

```bash
python3 test-frontend-skills.py
if [ $? -eq 0 ]; then
    echo "✅ Frontend skills validated successfully"
else
    echo "❌ Frontend skills validation failed"
    exit 1
fi
```

## Error Handling

The script handles various error conditions gracefully:

1. **Missing server.py**: Reports import error and exits with code 1
2. **Skills not created yet**: Reports which skills are missing
3. **API errors**: Catches exceptions and reports detailed error messages
4. **Interrupted execution**: Handles Ctrl+C gracefully

## Integration with CI/CD

Add to your continuous integration pipeline:

```yaml
# Example GitHub Actions workflow
- name: Test Frontend Skills
  run: |
    cd ~/DEV-ECOSYSTEM-OPTIMIZATION/mcp-agents-and-tool-skills-centres-background/tool-skills-centre/tool-skills-centre
    python3 test-frontend-skills.py --verbose
```

## Troubleshooting

### Problem: "Cannot import server module"
**Solution**: Ensure `server.py` is in the same directory as the test script

### Problem: "Skill not found in recommendations"
**Solution**: Verify the skill YAML file exists in the registry and is properly formatted

### Problem: "Score too low"
**Solution**: Review the skill's keywords and embeddings to improve matching

### Problem: "Policy filtering incomplete"
**Solution**: Check that skills have correct policy tags in their YAML files

## Customization

### Adding New Test Cases

Add to `POSITIVE_QUERIES` list:
```python
{
    "query": "Your custom query here",
    "expected_skill": "skill-id",
    "min_score": 0.6,
    "description": "What this test validates"
}
```

Add to `NEGATIVE_QUERIES` list:
```python
{
    "query": "Query that should NOT match",
    "description": "Why this shouldn't match"
}
```

### Adjusting Score Thresholds

Modify `min_score` values in test cases to be more or less strict:
- **Strict**: 0.8+ (requires very close matches)
- **Standard**: 0.6+ (good semantic similarity)
- **Lenient**: 0.4+ (broader matches)

### Adding Policy Tests

Add to `POLICY_TESTS` list:
```python
{
    "policy_tags": ["your_policy_tag"],
    "description": "What this policy enforces",
    "should_include_all": True  # or False
}
```

## Best Practices

1. **Run tests after skill creation**: Validate immediately after adding new skills
2. **Use verbose mode during development**: Get detailed feedback while debugging
3. **Include in pre-commit hooks**: Prevent broken skills from being committed
4. **Monitor score trends**: Track if scores degrade over time
5. **Update test cases**: Add new queries as use cases evolve

## Future Enhancements

Potential improvements to the test suite:

- [ ] Performance benchmarking (response time measurements)
- [ ] Confidence metric validation
- [ ] Cross-skill similarity analysis
- [ ] Batch testing with multiple query variations
- [ ] Integration with monitoring systems
- [ ] Automated regression testing
- [ ] Test coverage reporting

## Support

For issues or questions about the testing infrastructure:

1. Review the script's inline documentation
2. Run with `--verbose` for detailed debugging output
3. Check that all prerequisites are met
4. Verify the Tool & Skills Centre is properly configured

## Version History

- **v1.0.0** (2024-11-14): Initial comprehensive test suite
  - Six test categories
  - Detailed reporting
  - Configurable verbosity
  - Exit code support for automation
