# Google Opal Workflow Optimization Guide
## True Valence Mapper Multi-Step Workflow Analysis & Next Steps

**Date:** 2025-01-15
**Project:** ProActive True Valence Mapper

---

## 🔍 Workflow Analysis Framework

Since I cannot directly access your Opal workflow at the shared URL, here's a structured approach to analyze and optimize it:

### Step 1: Workflow Health Check

**Check These Elements in Your Opal Visual Editor:**

#### ✅ Input Steps
- [ ] Input fields are clearly labeled
- [ ] Input validation is specified (e.g., max 20 characters for names)
- [ ] Default values are set where appropriate
- [ ] Data types are correctly defined (text, number, boolean)

#### ✅ Generate Steps (AI Model Calls)
- [ ] Prompts are clear and specific
- [ ] Appropriate AI model selected (Gemini 2.5 Flash vs Pro)
- [ ] Token limits are reasonable
- [ ] Temperature settings are appropriate for task
- [ ] System instructions are defined

#### ✅ Output Steps
- [ ] Output format is well-structured (JSON, text, etc.)
- [ ] Data is properly formatted for next step or final display
- [ ] Error messages are user-friendly

#### ✅ Flow Connections
- [ ] All steps are connected (no orphaned nodes)
- [ ] Data flows logically from input → processing → output
- [ ] @ references are used correctly to pass data between steps
- [ ] Parallel processing is used where appropriate

---

## 🚀 Recommended Optimization Steps

### Phase 1: Debugging & Testing (Do This First)

#### Use Console View
1. Click **Console** in Opal interface
2. Run your workflow with test data
3. Watch each step execute in real-time
4. Look for:
   - ⚠️ Steps that fail or timeout
   - 🐌 Steps that take unusually long
   - ❌ Incorrect data being passed between steps
   - 💬 AI responses that don't match expectations

#### Step-by-Step Debugging
1. Click **"Run step-by-step"** in visual editor
2. Execute one step at a time
3. Inspect output of each step before proceeding
4. Fix issues immediately when found

#### Test Edge Cases
Run workflow with:
- Empty inputs
- Maximum length inputs (20 characters)
- Special characters (test XSS prevention)
- Duplicate names
- All 8 relationship slots filled
- Mixed trust scores (0, 1, 2, 3)

---

### Phase 2: Workflow Structure Optimization

Based on your AI-PLATFORM-PROMPTS.md specifications, here's the **ideal workflow structure**:

```
┌─────────────────────────────────────────────────────────────┐
│ WORKFLOW: True Valence Mapper                               │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│ INPUT STEP 1         │
│ User Inputs          │
│ - Person names       │
│ - Trust scores       │
│ - Map name           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ VALIDATION STEP 2    │
│ Gemini 2.5 Flash     │
│ - Validate names     │
│ - Check duplicates   │
│ - Sanitize XSS       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ GENERATE STEP 3      │
│ Create Visualization │
│ - SVG structure      │
│ - Node positions     │
│ - Arrow colors       │
└──────┬───────────────┘
       │
       ├──────────────────────────────┐
       │                              │
       ▼                              ▼
┌──────────────────────┐    ┌──────────────────────┐
│ PARALLEL STEP 4A     │    │ PARALLEL STEP 4B     │
│ AI Analysis          │    │ Cloud Storage        │
│ Gemini 2.5 Pro       │    │ Save to Supabase     │
│ - Pattern insights   │    │ - Generate share code│
│ - Asymmetry detect   │    │ - Store map data     │
│ - Suggestions        │    │ - Create shareable   │
└──────┬───────────────┘    └──────┬───────────────┘
       │                              │
       └──────────────┬───────────────┘
                      │
                      ▼
               ┌──────────────────────┐
               │ OUTPUT STEP 5        │
               │ Final Response       │
               │ - Visualization JSON │
               │ - AI insights        │
               │ - Share link         │
               │ - Success message    │
               └──────────────────────┘
```

#### Key Optimizations:

**1. Use Parallel Processing (Steps 4A & 4B)**
- AI analysis and cloud storage can run simultaneously
- Reduces total workflow time by ~50%
- Set in visual editor: Drag both steps to same vertical level

**2. Smart Model Selection**
- **Gemini 2.5 Flash** for validation (fast, cheap)
- **Gemini 2.5 Pro** for AI insights (better analysis)
- Saves tokens and improves quality

**3. Proper Error Handling**
Add conditional branches:
```
IF validation_fails THEN
  → Show error message
  → Return to input
ELSE
  → Continue to visualization
END IF
```

---

### Phase 3: Prompt Optimization

#### Current vs. Optimized Prompts

**❌ AVOID (Too Generic):**
```
Analyze this trust map and give insights
```

**✅ BETTER (Specific Instructions):**
```
You are a relationship coaching expert. Analyze this trust map data:

Relationships: {{relationships}}
Trust Scores: {{trustScores}}

Provide exactly 3-5 insights in this format:

1. **Pattern Name**: Description
   - Why this matters: [explanation]
   - Suggested action: [specific recommendation]

Focus on:
- Asymmetric relationships (where inward ≠ outward scores)
- Low trust zones (scores of 3)
- Balanced high-trust relationships (both scores = 1)
- One-way trust patterns

Keep each insight to 2-3 sentences. Be supportive and solution-focused.
```

#### Prompt Templates for Each Step

**STEP 2 - Validation Prompt:**
```
Validate this relationship name: "{{personName}}"

Rules:
- Max 20 characters
- No HTML tags or scripts
- No special symbols except: - ' space
- Cannot be empty

Return JSON:
{
  "isValid": true/false,
  "sanitized": "cleaned name",
  "error": "error message if invalid"
}
```

**STEP 3 - Visualization Prompt:**
```
Generate SVG trust map structure for these relationships:
{{relationships}}

For each relationship, create:
1. Node position in circle (radius: 150px from center)
2. Two arrows (outward and inward) with these colors:
   - Score 1: #22c55e (green, solid)
   - Score 2: #eab308 (yellow, dashed)
   - Score 3: #ef4444 (red, dotted)
   - Score 0: #d1d5db (gray, long-dash)

Return as JSON with node coordinates and arrow properties.
```

**STEP 4A - AI Analysis Prompt:**
```
Analyze this trust network for a coaching client:

People: {{relationships}}
Scores: {{trustScores}}

Provide 3-5 insights following these patterns:

1. **Asymmetric Relationships**: Identify where inward ≠ outward
   - Impact: How does this affect the relationship?
   - Action: What conversation might help?

2. **Trust Deserts**: Any scores of 3 (low/no trust)?
   - Safety: Is this a healthy boundary or area of concern?
   - Growth: What small step could improve this?

3. **Strong Foundations**: Highlight 1-2 balanced high-trust relationships
   - Appreciation: Why is this valuable?
   - Leverage: How can this support other relationships?

Keep tone: Warm, professional, non-judgmental, solution-focused.
Avoid: Clinical language, blame, assumptions about "right" answers.
```

---

### Phase 4: Performance Optimization

#### Reduce Latency

**1. Minimize Sequential Steps**
- Current: 6 sequential steps = ~30 seconds
- Optimized: 4 steps (2 parallel) = ~15 seconds

**2. Use Appropriate Models**
```
Fast tasks → Gemini 2.5 Flash
Complex analysis → Gemini 2.5 Pro
Image generation → Imagen (if needed)
```

**3. Cache Common Responses**
If certain prompts repeat (like validation rules), cache responses

**4. Set Reasonable Timeouts**
```
Validation: 5 seconds
Visualization: 10 seconds
AI Analysis: 20 seconds
Cloud Save: 10 seconds
```

#### Optimize Token Usage

**1. Shorter System Prompts**
- Remove unnecessary examples
- Use bullet points, not paragraphs
- Reference style guides instead of repeating them

**2. Structured Outputs**
Request JSON instead of long text:
```json
{
  "insights": [
    {"pattern": "...", "impact": "...", "action": "..."}
  ]
}
```

**3. Batch Processing**
Analyze all relationships in one AI call instead of 8 separate calls

---

### Phase 5: Testing Protocol

#### Test Suite Checklist

**Test Case 1: Happy Path**
- [ ] Add 3 people with mixed scores
- [ ] All steps execute successfully
- [ ] AI insights are relevant and helpful
- [ ] Cloud save generates share link
- [ ] Can reload from share link

**Test Case 2: Edge Cases**
- [ ] Add person with 20-character name (max length)
- [ ] Try adding duplicate name (should reject)
- [ ] Add person with special characters
- [ ] Fill all 8 relationship slots
- [ ] Score all relationships as 0 (not scored)

**Test Case 3: Error Handling**
- [ ] Submit empty name
- [ ] Submit name > 20 characters
- [ ] Submit HTML/script tags (XSS attempt)
- [ ] Lose internet during cloud save
- [ ] Invalid share code

**Test Case 4: Performance**
- [ ] Complete workflow in < 20 seconds
- [ ] Parallel steps execute simultaneously
- [ ] No timeout errors
- [ ] Console shows no warnings

**Test Case 5: AI Quality**
- [ ] Insights are specific to the data
- [ ] No generic/templated responses
- [ ] Tone is appropriate (warm, professional)
- [ ] Actionable recommendations provided
- [ ] 3-5 insights consistently generated

---

## 🔧 Specific Fixes for Common Issues

### Issue 1: "Steps execute sequentially when they should be parallel"

**Fix:**
1. In visual editor, drag both steps to same horizontal level
2. Ensure neither step depends on output of the other
3. Both should only reference earlier shared steps (e.g., both use `@input.relationships`)

**Verification:**
- Console should show both steps starting at same timestamp
- Total execution time should be ~= longest individual step

---

### Issue 2: "AI analysis is too generic"

**Fix:**
1. Edit the Generate step prompt
2. Add specific data references: `{{relationships}}`, `{{trustScores}}`
3. Provide output structure template
4. Add examples of good insights
5. Specify tone/style guidelines

**Before:**
```
Analyze this trust map
```

**After:**
```
You are a relationship coaching expert. Analyze trust map:
People: {{relationships}}
Scores: {{trustScores}}

Identify exactly 3 patterns:
1. [Pattern type]: [Specific observation] → [Suggested action]

Examples:
✓ "Asymmetry with Sarah: You scored her 1 (high trust) but scored yourself 3 (low trust in her eyes). This suggests you may underestimate how much she values your input. Consider: Have a conversation about mutual appreciation."
✗ "Some relationships need work." (too generic)
```

---

### Issue 3: "Cloud save fails intermittently"

**Fix:**
1. Add retry logic: Set "Max retries: 3" with "Backoff: exponential"
2. Add validation before save:
   ```
   IF data.relationships.length > 0 THEN
     → Proceed to save
   ELSE
     → Show error: "Cannot save empty map"
   ```
3. Provide user feedback:
   ```
   OUTPUT: "Saving to cloud..." (loading state)
   SUCCESS: "Saved! Share link: {{shareUrl}}"
   ERROR: "Save failed. Saved locally instead."
   ```

---

### Issue 4: "Workflow takes too long (>30 seconds)"

**Diagnose:**
1. Check Console execution times per step
2. Identify slowest step

**Common Culprits & Fixes:**

**If AI Analysis is slow (>20s):**
- Prompt is too long → Shorten to < 500 tokens
- Model is wrong → Switch Flash to Pro or vice versa
- Multiple AI calls → Batch into single call

**If Visualization is slow:**
- Complex SVG generation → Simplify structure
- Too many calculations → Pre-calculate node positions

**If Cloud Save is slow:**
- Large payload → Compress or reduce data
- Network latency → Add timeout and local fallback

---

### Issue 5: "Error: 'undefined' in output"

**Common Causes:**
1. Typo in @ reference: `@input.relationshps` (should be `relationships`)
2. Step not connected properly
3. Previous step returned null/undefined
4. JSON parsing error

**Fix:**
1. Check all @ references for typos
2. Verify step connections in visual editor
3. Add null checks:
   ```
   {{relationships ?? []}}  // Use empty array if undefined
   ```
4. Test each step individually in Console

---

## 📊 Workflow Metrics to Track

### Performance Metrics
- **Total execution time**: Target < 20 seconds
- **Per-step time**: No single step > 15 seconds
- **Success rate**: > 95% of runs complete successfully
- **Retry rate**: < 5% of steps need retries

### Quality Metrics
- **AI insight relevance**: User rating 4+ stars
- **Validation accuracy**: 100% catch invalid inputs
- **Visualization correctness**: All nodes/arrows render properly
- **Share link success**: 100% generate valid URLs

### User Experience Metrics
- **Time to first output**: < 5 seconds
- **Error message clarity**: Users understand what went wrong
- **Recovery from errors**: Clear path to fix and retry

---

## 🎓 Advanced Techniques

### Technique 1: Multi-Agent Coordination

**Setup:**
```
Agent 1 (Validator): Gemini Flash - Fast input checking
Agent 2 (Analyzer): Gemini Pro - Deep pattern analysis
Agent 3 (Communicator): Gemini Flash - Format insights for user
```

**Benefits:**
- Specialized agents = better quality
- Can optimize each agent's prompt independently
- Parallel execution where possible

---

### Technique 2: Workflow Versioning

**Best Practice:**
1. Save version after major changes
2. Name versions descriptively: "v1.2-add-parallel-processing"
3. Document changes in version description
4. Keep previous working version as backup

**How:**
- Click "Save" → "Save as new version"
- Add description of changes
- Test new version thoroughly before deleting old one

---

### Technique 3: A/B Testing Prompts

**Setup:**
1. Duplicate workflow
2. Change only the AI analysis prompt in version B
3. Run both with same test data
4. Compare quality of insights
5. Keep better version

**Example A/B Test:**
- **Version A**: Generic coaching language
- **Version B**: Specific trust pattern templates
- **Winner**: B (produces more actionable insights)

---

## 🚦 Next Steps Roadmap

### Immediate (Do Today)

1. **Run Console Debug**
   - Open Console view
   - Execute workflow with test data
   - Note any errors or warnings
   - Fix critical issues first

2. **Check Step Connections**
   - Verify all @ references are correct
   - Ensure no orphaned steps
   - Test data flow between steps

3. **Test Edge Cases**
   - Run through all test cases above
   - Document any failures
   - Prioritize fixes by severity

### Short-term (This Week)

4. **Optimize Prompts**
   - Review all Generate step prompts
   - Apply optimization patterns from this guide
   - Test improvements with real data

5. **Add Parallel Processing**
   - Identify independent steps
   - Configure to run in parallel
   - Verify time savings in Console

6. **Improve Error Handling**
   - Add validation checks
   - Provide user-friendly error messages
   - Implement retry logic where needed

### Medium-term (This Month)

7. **Performance Tuning**
   - Measure current metrics
   - Optimize slowest steps
   - Target < 20 second total execution

8. **Quality Improvements**
   - A/B test AI analysis prompts
   - Refine insight templates
   - Gather user feedback

9. **Documentation**
   - Document workflow structure
   - Create user guide
   - Add inline comments in prompts

### Long-term (Next Quarter)

10. **Advanced Features**
    - Multi-agent coordination
    - Workflow versioning strategy
    - Integration with other tools

11. **Scale & Share**
    - Share workflow with team
    - Create workflow templates
    - Build workflow library

---

## 📋 Workflow Review Checklist

Before sharing or deploying your Opal workflow:

### Functionality
- [ ] All steps execute without errors
- [ ] Data flows correctly between steps
- [ ] Outputs match expected format
- [ ] Edge cases are handled gracefully

### Performance
- [ ] Total execution time < 20 seconds
- [ ] Parallel processing is used where appropriate
- [ ] Appropriate AI models selected for each task
- [ ] No unnecessary sequential bottlenecks

### Quality
- [ ] AI insights are specific and actionable
- [ ] Validation catches all invalid inputs
- [ ] Error messages are user-friendly
- [ ] Output format is consistent

### User Experience
- [ ] Clear instructions for users
- [ ] Loading states/progress indicators
- [ ] Graceful error recovery
- [ ] Success confirmations

### Maintenance
- [ ] Workflow is documented
- [ ] Version is saved with description
- [ ] Test cases are documented
- [ ] Known issues are tracked

---

## 🔗 Resources

- **Opal Documentation**: developers.google.com/opal
- **Google Developers Blog**: developers.googleblog.com/en/introducing-opal/
- **Community Examples**: Search "Google Opal workflow" for real examples
- **Debugging Guide**: Use Console view for step-by-step debugging

---

## 💬 Sharing Your Workflow

When you're ready to share:

1. **Click Share button** in Opal interface
2. **Set permissions**: "Anyone with link can view/use"
3. **Copy share link**: It should look like `opal.google/?flow=drive:/[ID]&shared&mode=app`
4. **Test in incognito**: Verify others can access and run it
5. **Document usage**: Add instructions in workflow description

**Note:** The URL you shared appears to be a valid share link. If you can describe what you're seeing in the workflow or copy/paste the visual structure, I can provide more specific optimization recommendations.

---

**Version:** 1.0
**Last Updated:** 2025-01-15
**Next Review:** After implementing Phase 1 optimizations
