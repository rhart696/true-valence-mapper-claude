# Google AI Studio App Review Guide
## True Valence Mapper - Optimization & Next Steps

**Date:** 2025-01-15
**Project:** ProActive True Valence Mapper
**App URL:** https://aistudio.google.com/apps/drive/1wtwHg1v5oPiur3s7hfhogrhUf06gAGaK

---

## 🔍 App Review Checklist

Since I cannot access your authenticated Google AI Studio app, here's a structured framework to review and optimize it yourself:

### Step 1: App Configuration Review

**Open your app and check these elements:**

#### ✅ Prompt Type Selection
- [ ] **Freeform Prompt**: For creative, open-ended tasks (UX recommendations, feature ideas)
- [ ] **Structured Prompt**: For consistent, repeatable outputs (analyzing trust maps, generating insights)
- [ ] **Chat Prompt**: For conversational interactions (coaching conversation starters)

**Recommendation for True Valence Mapper:**
- Use **Structured Prompt** for trust pattern analysis (consistent JSON output)
- Use **Freeform Prompt** for UX/design recommendations (creative responses)

---

#### ✅ Model Selection

**Check which model you're using:**
- [ ] Gemini 2.5 Pro (Best for complex analysis, 2M token context)
- [ ] Gemini 2.5 Flash (Best for speed, cost-effective)
- [ ] Gemini 2.5 Pro with Deep Think (Best for complex reasoning tasks)

**Recommendation:**
- **Gemini 2.5 Flash** for basic trust map analysis (fast, cheap)
- **Gemini 2.5 Pro** for deep pattern insights and coaching recommendations
- **Gemini 2.5 Pro Deep Think** if analyzing complex multi-relationship dynamics

---

#### ✅ System Instructions

**Review your system instructions:**

**❌ AVOID (Too Generic):**
```
You are a helpful AI assistant that analyzes relationship data.
```

**✅ BETTER (Specific Role & Constraints):**
```
You are an expert relationship coach and trust dynamics analyst specializing in bidirectional trust mapping.

CONTEXT:
- Users map 1-8 relationships with trust scores (1=high, 2=medium, 3=low, 0=not scored)
- Each relationship has TWO scores: Outward (their trust in others) and Inward (perceived trust from others)
- Asymmetric relationships (where inward ≠ outward) often indicate important dynamics

YOUR ROLE:
- Analyze trust patterns and identify meaningful insights
- Provide warm, non-judgmental, solution-focused guidance
- Suggest specific conversation starters for improving relationships
- Respect that low trust can be a healthy boundary, not always a problem

OUTPUT STYLE:
- 3-5 insights maximum (not overwhelming)
- Each insight: Pattern name + Why it matters + Suggested action
- Supportive tone suitable for therapy/coaching contexts
- No clinical jargon or assumptions about "right" relationships

CONSTRAINTS:
- Never shame users for low trust scores
- Focus on actionable steps, not diagnosis
- Respect privacy and confidentiality
- Acknowledge complexity and nuance in relationships
```

---

### Step 2: Input/Output Configuration

#### ✅ Input Variables (Structured Prompts)

**Check if you have these input fields defined:**

```
Input 1: relationships (array of objects)
Format: [{"id": 123, "name": "Person Name"}]
Description: List of people in the trust map

Input 2: trustScores (object)
Format: {"123": {"outward": 1, "inward": 2}}
Description: Trust scores for each relationship (outward = your trust in them, inward = their trust in you)

Input 3: mapName (string, optional)
Format: "My Trust Map"
Description: User-provided name for this trust map
```

---

#### ✅ Output Format

**For Structured Prompts, define expected output:**

**Option A: JSON Output (Best for App Integration)**
```json
{
  "insights": [
    {
      "pattern": "Asymmetric Trust with Sarah",
      "observation": "You scored Sarah 1 (high trust) but scored yourself 3 from her perspective (low trust).",
      "impact": "You may underestimate how much Sarah values your input and support.",
      "action": "Consider having a conversation about mutual appreciation. Ask Sarah: 'What do I bring to our relationship that you value?'"
    }
  ],
  "summary": {
    "totalRelationships": 5,
    "balancedHighTrust": 2,
    "asymmetric": 1,
    "lowTrustZones": 1
  }
}
```

**Option B: Markdown Output (Best for Display)**
```markdown
## Trust Map Insights

### 1. **Asymmetric Trust with Sarah**
**Observation:** You scored Sarah 1 (high trust) but scored yourself 3 from her perspective (low trust).

**Why This Matters:** You may underestimate how much Sarah values your input and support.

**Suggested Action:** Consider having a conversation about mutual appreciation. Ask Sarah: "What do I bring to our relationship that you value?"

---

### 2. **Strong Foundation with Alex**
...
```

---

### Step 3: Prompt Quality Review

**Review your main prompt against these criteria:**

#### ✅ Few-Shot Examples (Critical!)

**Google's #1 Recommendation:** Always include few-shot examples

**Without Examples (Poor):**
```
Analyze this trust map and provide insights:
{{relationships}}
{{trustScores}}
```

**With Examples (Good):**
```
Analyze this trust map and provide insights:

EXAMPLE INPUT 1:
Relationships: [{"id": 1, "name": "Sarah"}]
TrustScores: {"1": {"outward": 1, "inward": 3}}

EXAMPLE OUTPUT 1:
{
  "insights": [{
    "pattern": "Asymmetric Trust with Sarah",
    "observation": "You scored Sarah 1 (high trust) but scored yourself 3 from her perspective.",
    "impact": "You may underestimate how much Sarah values your support.",
    "action": "Ask Sarah: 'What do I bring to our relationship that you value?'"
  }]
}

---

EXAMPLE INPUT 2:
Relationships: [{"id": 1, "name": "Mike"}]
TrustScores: {"1": {"outward": 3, "inward": 3}}

EXAMPLE OUTPUT 2:
{
  "insights": [{
    "pattern": "Mutual Low Trust with Mike",
    "observation": "Both you and Mike scored each other at 3 (low trust).",
    "impact": "This relationship may have clear boundaries that work for both of you.",
    "action": "Reflect: Is this a healthy boundary or an area you'd like to improve? If the latter, start small with a low-stakes interaction."
  }]
}

---

NOW ANALYZE:
Relationships: {{relationships}}
TrustScores: {{trustScores}}
```

---

#### ✅ Clear Instructions

**Check if your prompt includes:**
- [ ] What format to return (JSON, markdown, etc.)
- [ ] How many insights to provide (3-5)
- [ ] What tone to use (supportive, non-judgmental)
- [ ] What to avoid (jargon, blame, assumptions)
- [ ] Specific output structure template

---

#### ✅ Variable References

**Ensure you're using proper variable syntax:**

**In Google AI Studio:**
```
{{variableName}}  ← Correct syntax
{variableName}    ← Wrong (single braces)
$variableName     ← Wrong (not supported)
```

**Test your variables:**
1. Click "Test" in AI Studio
2. Fill in sample data for each variable
3. Run and verify output matches expectations

---

### Step 4: Testing & Validation

#### Test Cases to Run

**Test Case 1: Balanced High Trust**
```json
{
  "relationships": [
    {"id": 1, "name": "Alex"},
    {"id": 2, "name": "Jordan"}
  ],
  "trustScores": {
    "1": {"outward": 1, "inward": 1},
    "2": {"outward": 1, "inward": 1}
  }
}
```
**Expected:** Insights should celebrate strong foundations, not invent problems

---

**Test Case 2: Asymmetric Relationships**
```json
{
  "relationships": [
    {"id": 1, "name": "Sarah"}
  ],
  "trustScores": {
    "1": {"outward": 1, "inward": 3}
  }
}
```
**Expected:** Identify asymmetry, explain impact, suggest conversation starter

---

**Test Case 3: Mutual Low Trust**
```json
{
  "relationships": [
    {"id": 1, "name": "Mike"}
  ],
  "trustScores": {
    "1": {"outward": 3, "inward": 3}
  }
}
```
**Expected:** Acknowledge this might be a healthy boundary, not automatically a problem

---

**Test Case 4: Not Scored (Edge Case)**
```json
{
  "relationships": [
    {"id": 1, "name": "NewPerson"}
  ],
  "trustScores": {
    "1": {"outward": 0, "inward": 0}
  }
}
```
**Expected:** Gracefully handle unscored relationships (skip or note "not yet evaluated")

---

**Test Case 5: Max Relationships**
```json
{
  "relationships": [
    {"id": 1, "name": "Person1"},
    {"id": 2, "name": "Person2"},
    {"id": 3, "name": "Person3"},
    {"id": 4, "name": "Person4"},
    {"id": 5, "name": "Person5"},
    {"id": 6, "name": "Person6"},
    {"id": 7, "name": "Person7"},
    {"id": 8, "name": "Person8"}
  ],
  "trustScores": {
    "1": {"outward": 1, "inward": 2},
    "2": {"outward": 2, "inward": 1},
    "3": {"outward": 3, "inward": 1},
    "4": {"outward": 1, "inward": 3},
    "5": {"outward": 2, "inward": 2},
    "6": {"outward": 1, "inward": 1},
    "7": {"outward": 3, "inward": 3},
    "8": {"outward": 0, "inward": 0}
  }
}
```
**Expected:** Prioritize most important insights (not all 8), provide summary stats

---

### Step 5: Performance Optimization

#### ✅ Token Usage

**Check token consumption:**
- System instructions: Aim for < 500 tokens
- Few-shot examples: 2-3 examples, < 300 tokens each
- User prompt: Variable (depends on input data)
- Total context: Should be < 10K tokens for most requests

**Optimize if needed:**
- Remove redundant instructions
- Consolidate few-shot examples
- Use abbreviations in JSON keys (not user-facing text)

---

#### ✅ Response Time

**Benchmark:**
- Gemini 2.5 Flash: < 2 seconds typical
- Gemini 2.5 Pro: 3-8 seconds typical
- Gemini 2.5 Pro Deep Think: 10-30 seconds

**If too slow:**
- Switch to Flash model
- Reduce few-shot examples
- Request shorter responses
- Use batch processing for multiple maps

---

#### ✅ Output Quality

**Review 10-20 sample outputs:**
- [ ] Insights are specific to input data (not generic)
- [ ] Tone is warm and supportive (not clinical)
- [ ] Actions are concrete and actionable
- [ ] No harmful or inappropriate advice
- [ ] JSON is valid (if using structured output)
- [ ] Consistent format across runs

---

### Step 6: Privacy & Security

#### ✅ Data Privacy Settings

**CRITICAL: Check your billing status**

**Free Tier (Default):**
- ⚠️ Google can use your prompts/data for model training
- ⚠️ Human reviewers may see your data
- ❌ **DO NOT use with real client data**

**Paid Tier (Google Cloud Billing Active):**
- ✅ Google will NOT use your data for training
- ✅ Data is protected under enterprise terms
- ✅ Safe for production use

**To Upgrade:**
1. Go to Google AI Studio settings
2. Link Google Cloud billing account
3. Verify "Paid Service" status
4. Confirm data not used for training

---

#### ✅ Data Handling

**In your prompt, avoid:**
- [ ] Full names (use first names or initials)
- [ ] Identifying information (company names, locations)
- [ ] Sensitive relationship details
- [ ] Mental health diagnoses
- [ ] Legal/medical advice requests

**Best Practice:**
- Use anonymous IDs instead of names
- Process data client-side when possible
- Don't store prompts/responses long-term
- Provide clear privacy disclaimer to users

---

### Step 7: Integration & Export

#### ✅ API Code Generation

**In AI Studio:**
1. Click "Get Code" button
2. Select language: Python or Node.js
3. Copy generated API call
4. Test in your local environment

**Example Generated Code (Node.js):**
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeTrustMap(relationships, trustScores) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analyze this trust map...
  Relationships: ${JSON.stringify(relationships)}
  TrustScores: ${JSON.stringify(trustScores)}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

---

#### ✅ Deployment Checklist

**Before deploying to production:**
- [ ] Billing account activated (paid tier)
- [ ] API key secured (not in frontend code)
- [ ] Rate limiting implemented (prevent abuse)
- [ ] Error handling added (timeouts, failures)
- [ ] User consent obtained (AI-generated insights)
- [ ] Privacy disclaimer displayed
- [ ] Output validation (parse JSON, sanitize HTML)
- [ ] Monitoring/logging enabled

---

## 🎯 Recommended Next Steps

### Immediate (Do Today)

1. **Review System Instructions**
   - Open your app in AI Studio
   - Update system instructions with role-specific guidance
   - Add constraints and output format requirements

2. **Add Few-Shot Examples**
   - Include 2-3 examples in your prompt
   - Cover different scenarios (balanced, asymmetric, low trust)
   - Test that examples improve output quality

3. **Test with Real Data**
   - Run all 5 test cases above
   - Verify outputs are appropriate
   - Check for edge case handling

### Short-term (This Week)

4. **Optimize Prompt**
   - Remove unnecessary instructions
   - Tighten output format specification
   - Request JSON for easier parsing

5. **Configure Variables**
   - Set up structured inputs (relationships, trustScores)
   - Define expected data types
   - Add validation hints

6. **Export API Code**
   - Generate Python or Node.js code
   - Test locally before deploying
   - Secure API key properly

### Medium-term (This Month)

7. **Upgrade to Paid Tier**
   - Link Google Cloud billing
   - Verify data privacy protection
   - Enable production use

8. **Performance Tuning**
   - Benchmark token usage
   - Optimize response time
   - Test at scale (100+ requests)

9. **Quality Assurance**
   - Review 50+ outputs
   - Gather user feedback
   - Refine based on real usage

---

## 📊 Success Metrics

### Quality Metrics
- **Relevance:** 90%+ of insights specific to input data
- **Actionability:** 100% include concrete action suggestions
- **Tone:** 0 instances of blame/judgment language
- **Accuracy:** No fabricated data or relationships

### Performance Metrics
- **Response Time:** < 5 seconds for Gemini 2.5 Pro
- **Token Efficiency:** < 10K tokens per request
- **Success Rate:** 99%+ requests return valid output
- **Cost:** < $0.01 per analysis (with Flash model)

### User Experience Metrics
- **Usefulness:** Users rate insights 4+ stars
- **Clarity:** 95%+ understand recommendations
- **Safety:** 0 complaints about inappropriate advice
- **Privacy:** 0 data breaches or exposures

---

## 🔧 Common Issues & Fixes

### Issue 1: "Generic insights that don't match my data"

**Diagnosis:** Prompt lacks few-shot examples or variable references

**Fix:**
```
❌ BEFORE: "Analyze this trust map and provide insights"

✅ AFTER: "Analyze this trust map:
Relationships: {{relationships}}
Scores: {{trustScores}}

[Include 2-3 few-shot examples here]

Provide 3-5 specific insights based on the actual data above."
```

---

### Issue 2: "Output format is inconsistent"

**Diagnosis:** No structured output specification

**Fix:**
```
Add to system instructions:

REQUIRED OUTPUT FORMAT (JSON):
{
  "insights": [
    {
      "pattern": "string",
      "observation": "string",
      "impact": "string",
      "action": "string"
    }
  ]
}

Return ONLY valid JSON, no markdown code blocks.
```

---

### Issue 3: "Responses are too slow (> 10 seconds)"

**Diagnosis:** Using Gemini 2.5 Pro for simple tasks

**Fix:**
- Switch to Gemini 2.5 Flash for basic analysis
- Reserve Pro for complex multi-relationship insights
- Use Deep Think only for strategic planning tasks

---

### Issue 4: "Concerned about data privacy"

**Diagnosis:** Using free tier with real user data

**Fix:**
1. Immediately stop using real data in free tier
2. Upgrade to paid tier (link Google Cloud billing)
3. Verify "Paid Service" status in settings
4. Update privacy policy to reflect AI usage

---

### Issue 5: "API integration is failing"

**Diagnosis:** Incorrect API key or code generation

**Fix:**
1. Regenerate API key in Google Cloud Console
2. Use "Get Code" in AI Studio (don't write manually)
3. Test with curl first:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: YOUR_API_KEY" \
  -d '{"contents":[{"parts":[{"text":"test"}]}]}' \
  https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

---

## 📚 Resources

### Official Documentation
- **Prompt Strategies:** https://ai.google.dev/gemini-api/docs/prompting-strategies
- **AI Studio Guide:** https://ai.google.dev/aistudio
- **API Reference:** https://ai.google.dev/api/rest
- **Gemini Models:** https://ai.google.dev/gemini-api/docs/models

### Best Practices Guides
- **Google AI Prompt Engineering (2025):** https://www.gptaiflow.com/blog/google-ai-prompt-engineering-best-practices-guide-2025
- **Few-Shot Learning:** Use 2-5 examples per prompt
- **System Instructions:** Keep under 500 tokens
- **Output Format:** Always specify explicitly

### Community
- **Google AI Developers Forum:** https://discuss.ai.google.dev/
- **Stack Overflow:** Tag `google-gemini`
- **GitHub Issues:** https://github.com/google/generative-ai-docs/issues

---

## 💬 Sharing for Review

If you'd like specific feedback on your AI Studio app, you can:

1. **Take Screenshots:**
   - System instructions panel
   - Prompt configuration
   - Input/output variables
   - Sample test runs

2. **Export Configuration:**
   - Copy system instructions to text file
   - Copy main prompt to text file
   - Include few-shot examples
   - Note model selection

3. **Share Test Results:**
   - Run 5 test cases above
   - Copy input and output for each
   - Note any issues or unexpected behavior

4. **Ask Specific Questions:**
   - "Is my system instruction too long?"
   - "Do my few-shot examples cover enough scenarios?"
   - "Should I use Flash or Pro model for this use case?"

I can then provide targeted recommendations for optimization!

---

**Version:** 1.0
**Last Updated:** 2025-01-15
**Next Review:** After implementing optimizations
