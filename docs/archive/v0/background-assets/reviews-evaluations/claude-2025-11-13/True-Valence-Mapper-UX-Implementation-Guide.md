# True Valence Mapper: Complete UX Implementation Guide

## Table of Contents
1. [Wireframes & User Flow](#wireframes--user-flow)
2. [Contextual Framing Copy](#contextual-framing-copy)
3. [Facilitator Guide](#facilitator-guide)
4. [Reflection Prompt Question Bank](#reflection-prompt-question-bank)

---

# 1. WIREFRAMES & USER FLOW

## Landing Experience (First-Time Users)

### Welcome Modal Overlay

```
┌─────────────────────────────────────────────────────────────────┐
│  [ProActive Logo]                                     [Skip ×]  │
│                                                                 │
│              Welcome to the True Valence Mapper                 │
│                                                                 │
│  Understanding your workplace relationships is the first step   │
│  toward building a more connected, effective professional life. │
│                                                                 │
│  In the next 15 minutes, you'll:                               │
│  • Map 6-8 key relationships in your work network              │
│  • Reflect on trust flow—both ways                             │
│  • Discover patterns you may not have noticed                  │
│                                                                 │
│  ⚠️ Your privacy matters: All data stays on your device.       │
│  Nothing is shared unless you choose to export your map.        │
│                                                                 │
│               [Start Mapping]  [Learn More]                    │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction Notes:**
- Modal appears on first visit (cookie/localStorage check)
- "Skip" closes modal, "Learn More" expands to show full methodology
- "Start Mapping" begins onboarding flow

---

## Onboarding Flow (Step-by-Step)

### Step 1: Context Setting

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1 of 3                                          [Back] [×] │
│                                                                 │
│  Who's in your workplace relationship network?                  │
│                                                                 │
│  Think about the people you interact with regularly in your    │
│  professional life. This could include:                         │
│                                                                 │
│  ✓ Direct reports or supervisors                               │
│  ✓ Teammates and colleagues                                    │
│  ✓ Cross-functional partners                                   │
│  ✓ Contractors or external collaborators                       │
│  ✓ Mentors or mentees                                          │
│                                                                 │
│  💡 Tip: Choose people you interact with at least weekly       │
│  or who have significant impact on your work experience.        │
│                                                                 │
│                           [Next]                                │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Understanding Trust Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2 of 3                                    [Back] [Next] [×]│
│                                                                 │
│  What we mean by "trust flow"                                   │
│                                                                 │
│  Trust isn't one-sided. We'll assess two directions:           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  YOU → THEM                                             │  │
│  │  "How comfortable would I feel bringing a work          │  │
│  │   challenge to this person?"                            │  │
│  │                                                         │  │
│  │  Measures: Your confidence in their support            │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  THEM → YOU                                             │  │
│  │  "How comfortable would they feel bringing a work       │  │
│  │   challenge to me?"                                     │  │
│  │                                                         │  │
│  │  Measures: Your perception of their trust in you       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Both directions matter for healthy relationships.              │
│                                                                 │
│                   [Back]        [Next]                         │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: Understanding the Scale

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3 of 3                                    [Back] [Start] [×]│
│                                                                 │
│  The trust scale (0-3)                                          │
│                                                                 │
│  Use your gut feeling. There are no wrong answers.              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  0 - Not established                                    │  │
│  │  We haven't built this kind of trust yet, or I'm       │  │
│  │  uncertain about this relationship.                     │  │
│  │                                    🔴 Red               │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  1 - Low trust                                          │  │
│  │  I'd hesitate. Only in low-stakes situations.           │  │
│  │                                    🟠 Orange            │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  2 - Moderate trust                                     │  │
│  │  I'd feel reasonably comfortable in most situations.    │  │
│  │                                    🟡 Yellow            │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  3 - High trust                                         │  │
│  │  I'd feel fully comfortable, even with difficult topics.│  │
│  │                                    🟢 Green             │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│                   [Back]    [Start Mapping]                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Main Mapping Interface

### Layout Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│ [ProActive Logo]  True Valence Mapper              [Save] [Load] [?] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Your Relationship Network                                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ADD PERSON                                                    │ │
│  │  ┌──────────────────────┐  [+ Add Person]                     │ │
│  │  │ Name or initials... │                                       │ │
│  │  └──────────────────────┘                                      │ │
│  │                                                                │ │
│  │  Optional: ☐ New relationship  ☐ Power dynamic  ☐ In flux    │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  People in your network (3/8)                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  SARAH CHEN                                        [Edit] [×]  │ │
│  │  Context: Power dynamic                                        │ │
│  │                                                                │ │
│  │  Trust to them (YOU → SARAH):                                 │ │
│  │  ┌───┐┌───┐┌───┐┌───┐                                        │ │
│  │  │ 0 ││ 1 ││ 2 ││ 3 │  ← Selected: 2 (Moderate) 🟡          │ │
│  │  └───┘└───┘└───┘└───┘                                        │ │
│  │                                                                │ │
│  │  Trust from them (SARAH → YOU):                               │ │
│  │  ┌───┐┌───┐┌───┐┌───┐                                        │ │
│  │  │ 0 ││ 1 ││ 2 ││ 3 │  ← Selected: 1 (Low) 🟠               │ │
│  │  └───┘└───┘└───┘└───┘                                        │ │
│  │                                                                │ │
│  │  ⚠️ Asymmetric relationship: Consider why trust differs       │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  MARCUS JOHNSON                                    [Edit] [×]  │ │
│  │                                                                │ │
│  │  Trust to them: ●●●○ (3 - High) 🟢                           │ │
│  │  Trust from them: ●●●○ (3 - High) 🟢                         │ │
│  │                                                                │ │
│  │  ✓ Strong mutual trust                                        │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ALEX RIVERA                                       [Edit] [×]  │ │
│  │  Context: New relationship                                     │ │
│  │                                                                │ │
│  │  Trust to them: ●○○○ (0 - Not established) 🔴                │ │
│  │  Trust from them: ●○○○ (0 - Not established) 🔴              │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│                          [View Insights]                             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Interaction Notes:**
- Color coding uses both color AND pattern (●●●○) for accessibility
- Asymmetric relationships trigger inline alerts
- "Edit" allows changing context tags or scores
- Large touch targets (44px minimum) for tablet use
- Keyboard accessible: Tab through, Enter to select, Arrow keys to change scores

---

## Insights View

### Pattern Analysis Dashboard

```
┌──────────────────────────────────────────────────────────────────────┐
│ [← Back to Map]  Your Relationship Insights                 [Export] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  NETWORK HEALTH OVERVIEW                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Your Trust Foundation                                         │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━                                       │ │
│  │                                                                │ │
│  │  ████████████░░░░░░░░░░░░  5 out of 8 relationships           │ │
│  │                             have moderate to high trust        │ │
│  │                                                                │ │
│  │  This suggests a reasonably healthy professional network       │ │
│  │  with room for intentional growth.                            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  KEY PATTERNS                                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  🎯 Strongest Relationships (mutual high trust)                │ │
│  │  • Marcus Johnson                                              │ │
│  │  • Jamie O'Connor                                              │ │
│  │                                                                │ │
│  │  These are your relationship assets. Consider:                 │ │
│  │  → How can you nurture these connections?                      │ │
│  │  → What makes these relationships work so well?                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ⚠️ Asymmetric Relationships (trust imbalance)                 │ │
│  │                                                                │ │
│  │  SARAH CHEN                                                    │ │
│  │  You → Sarah: 2 (Moderate) 🟡                                 │ │
│  │  Sarah → You: 1 (Low) 🟠                                      │ │
│  │  Gap: You trust them more than you think they trust you       │ │
│  │                                                                │ │
│  │  DAVID MARTINEZ                                                │ │
│  │  You → David: 1 (Low) 🟠                                      │ │
│  │  David → You: 2 (Moderate) 🟡                                 │ │
│  │  Gap: They may trust you more than you trust them             │ │
│  │                                                                │ │
│  │  Reflection: What might explain these differences?             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  🔴 Growth Opportunities (low/no trust both ways)              │ │
│  │  • Alex Rivera (Context: New relationship)                     │ │
│  │  • Taylor Kim                                                  │ │
│  │                                                                │ │
│  │  These relationships represent potential for development.       │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  📊 Your Trust Patterns                                        │ │
│  │                                                                │ │
│  │  Trust you give:  ●●●●●●○○ (Average: 1.8)                    │ │
│  │  Trust you receive: ●●●●●○○○ (Average: 1.5)                  │ │
│  │                                                                │ │
│  │  You tend to trust others slightly more than you perceive     │ │
│  │  they trust you. This could indicate:                         │ │
│  │  • Openness and willingness to be vulnerable                  │ │
│  │  • Possible underestimation of others' trust in you           │ │
│  │  • Opportunity to build your credibility/reliability          │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│                [Explore Actions]  [Start Reflection]                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Action Planning Interface

```
┌──────────────────────────────────────────────────────────────────────┐
│ [← Back to Insights]  Action Planning                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Choose 1-3 relationships to focus on                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                           │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ☐ Sarah Chen                                                  │ │
│  │     You → Sarah: 2  |  Sarah → You: 1                         │ │
│  │     Reason: Asymmetric, important power dynamic                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ☑ Alex Rivera                                                 │ │
│  │     You → Alex: 0  |  Alex → You: 0                           │ │
│  │     Reason: New relationship, early investment matters         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ☑ Taylor Kim                                                  │ │
│  │     You → Taylor: 1  |  Taylor → You: 1                       │ │
│  │     Reason: Low mutual trust, work together frequently         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  [Continue to Actions]                                               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Next Steps Builder

```
┌──────────────────────────────────────────────────────────────────────┐
│  Your Relationship Development Plan                                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ALEX RIVERA                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Suggested Actions:                                            │ │
│  │  ☐ Schedule a 1:1 coffee chat to learn about their role       │ │
│  │  ☐ Ask them for input on something you're working on          │ │
│  │  ☐ Share a useful resource or insight with them               │ │
│  │  ☐ Acknowledge their contribution in a team meeting           │ │
│  │                                                                │ │
│  │  Custom action:                                                │ │
│  │  ┌──────────────────────────────────────────────────────────┐ │ │
│  │  │ What's one small step you'll take this week?             │ │ │
│  │  │                                                           │ │ │
│  │  └──────────────────────────────────────────────────────────┘ │ │
│  │                                                                │ │
│  │  Timeframe: ☐ This week  ☐ This month  ☐ This quarter        │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  TAYLOR KIM                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│  [Similar action builder...]                                         │
│                                                                      │
│                    [Save Plan]  [Email to Me]                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Reflection Mode (Guided Experience)

### Progressive Disclosure Approach

```
┌──────────────────────────────────────────────────────────────────────┐
│  Reflection Journey                                    [Pause] [Exit] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Question 1 of 8                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                      │
│  Looking at your map, which relationship surprised you most?         │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │  [Space for written response...]                               │ │
│  │                                                                │ │
│  │                                                                │ │
│  │                                                                │ │
│  │                                                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  💡 Consider: Was it surprising because of the score, or because    │
│     you hadn't thought about the relationship in this way before?   │
│                                                                      │
│                    [Skip]        [Next Question]                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Mobile-Responsive Considerations

### Phone View (Vertical Layout)

```
┌──────────────────────┐
│ [≡] True Valence [?] │
├──────────────────────┤
│                      │
│  Your Network (3/8)  │
│  ──────────────────  │
│                      │
│  ┌────────────────┐  │
│  │ SARAH CHEN     │  │
│  │ ──────────────│  │
│  │ You → Sarah    │  │
│  │ 🟡🟡○○  2      │  │
│  │                │  │
│  │ Sarah → You    │  │
│  │ 🟠○○○  1      │  │
│  │                │  │
│  │ [View Details] │  │
│  └────────────────┘  │
│                      │
│  [+ Add Person]      │
│                      │
│  [View Insights]     │
│                      │
└──────────────────────┘
```

**Mobile Optimization:**
- Hamburger menu for settings/help
- Collapsible relationship cards
- Simplified single-column layout
- Larger touch targets (48px minimum)
- Swipe gestures for navigation
- Bottom-sheet modals for actions

---

# 2. CONTEXTUAL FRAMING COPY

## Primary "Why This Matters" Section

### Version A: Professional Framing

**Headline:** Relationships are the foundation of workplace effectiveness

**Body:**

Your technical skills got you in the door. But it's your relationships that determine how far you'll go—and how fulfilling the journey will be.

Research consistently shows that relationship quality predicts:
- Career advancement and opportunities
- Job satisfaction and engagement
- Resilience during organizational change
- Innovation and collaborative problem-solving
- Overall wellbeing at work

The True Valence Mapper helps you move from reactive relationship management to intentional relationship building. By visualizing trust patterns in your professional network, you gain awareness that creates choice.

**This exercise is for you.** There are no right or wrong answers. The goal isn't perfection—it's understanding. Where you are today is simply the starting point for where you want to go.

---

### Version B: Relational Framing

**Headline:** Every relationship tells a story

**Body:**

Think about the people you work with daily. Some energize you. Others drain you. Some you'd trust with your biggest challenge. Others you navigate carefully around.

These aren't accidents—they're patterns. And patterns can be understood, and when understood, they can be intentionally shaped.

The True Valence Mapper gives you a moment to pause and see your relationship landscape clearly. Not to judge it, but to understand it. Because understanding is the first step toward positive change.

**You already know your relationships matter.** This tool helps you see *how* they matter and *where* small actions could make the biggest difference.

---

### Version C: Growth Framing

**Headline:** Professional growth starts with relational awareness

**Body:**

You've likely invested time developing technical skills, industry knowledge, and professional expertise. But have you invested intentionally in understanding your workplace relationships?

The True Valence Mapper offers structured reflection on one of your most valuable professional assets: your relationship network.

In 15 minutes, you'll:
- **See patterns** you may have felt but never articulated
- **Identify opportunities** to strengthen key connections
- **Discover asymmetries** that might be holding you back
- **Recognize strengths** you can leverage and nurture

This isn't about networking or politics. It's about authentic connection, mutual trust, and building a professional life that feels aligned with who you are.

---

## Privacy Statement

### Full Version

**Your privacy is paramount.**

This tool operates entirely on your device. We do not:
- Store your relationship data on external servers
- Share information with your employer or anyone else
- Track individual names or scores
- Require account creation or login

Your data lives in your browser's local storage. You control when to save, export, or delete it.

If you work with a ProActive facilitator, you choose what to share and when. Nothing is automatically transmitted.

**You're in control.** This reflection is yours.

---

### Condensed Version (for UI)

⚠️ **Privacy First:** Your data stays on your device. Nothing is shared unless you choose to export. [Learn more]

---

## Help Text & Tooltips

### "What counts as a work challenge?"

A work challenge could be:
- A difficult decision you're facing
- Feedback on your work or ideas
- A mistake you've made
- Conflict with another colleague
- Career uncertainty or stress
- A project that's not going well

Think about situations where you'd need support, perspective, or a safe space to think aloud.

---

### "How do I rate trust I'm unsure about?"

If you're genuinely uncertain, **0 (Not established)** is the honest answer. Uncertainty itself is data—it tells you:
- This relationship may be too new to assess
- You haven't faced situations that test trust
- There's ambiguity worth exploring

Don't overthink it. Your gut reaction is usually right.

---

### "What if the trust depends on the situation?"

That's normal. Relationships are complex. For this exercise, think about **work-related challenges specifically**—not personal life.

If trust varies dramatically by context (e.g., you'd ask for technical help but not career advice), choose the score that reflects your overall comfort level.

---

### "What if I don't want to add my boss?"

You decide who to include. Some people choose to map only peer relationships. Others include hierarchical connections.

Consider: If this relationship significantly affects your work experience—positively or negatively—it may be valuable to include.

But this is your map. Include the relationships that matter most to *your* current goals.

---

## Error Messages & Validation

### Friendly, Supportive Tone

**Empty name field:**
"We'll need a name or initials to map this relationship. (Anonymity is fine—we won't judge 'Person A'!)"

**Maximum people reached:**
"You've reached 8 people. Quality over quantity! Focus on the relationships that matter most right now. You can always adjust later."

**No relationships added yet:**
"Ready to start mapping? Add your first relationship to begin."

**Incomplete assessment:**
"You've scored trust TO Sarah, but not FROM Sarah. Both directions help reveal the full picture."

---

# 3. FACILITATOR GUIDE

## ProActive True Valence Mapper: Coach's Facilitation Guide

### Purpose of This Guide

This guide helps ProActive facilitators use the True Valence Mapper effectively in coaching contexts—whether in live sessions or asynchronously.

---

## Pre-Session Preparation

### When to Use This Tool

**Ideal Scenarios:**
- Early relationship coaching (baseline assessment)
- Mid-engagement check-in (progress tracking)
- Conflict resolution preparation (identifying trust gaps)
- Leadership development (team relationship dynamics)
- Onboarding support (new role relationship mapping)
- Career transition coaching (network evaluation)

**Less Ideal Scenarios:**
- Acute crisis situations (use immediate conflict tools first)
- When client is resistant to introspection
- When relationship issues are primarily outside work
- When client has fewer than 4 workplace relationships to map

---

### Framing the Exercise (What to Say)

**In-Session Introduction (2-3 minutes):**

> "Today I'd like us to spend some time mapping your workplace relationships. Not in a networking or political way, but to understand the trust dynamics that affect your day-to-day experience.
> 
> We'll use a tool called the True Valence Mapper. It's straightforward—you'll identify 6-8 key people in your work life and rate trust flow in both directions.
> 
> The goal isn't judgment—there's no 'should' here. It's about creating awareness so we can talk about what you notice and where you might want to focus energy.
> 
> Does that sound okay?"

**Asynchronous Assignment (Email Template):**

```
Subject: Pre-session preparation: Relationship mapping (15 min)

Hi [Name],

Before our next session on [date], I'd like you to complete a brief relationship mapping exercise using ProActive's True Valence Mapper:

[Link to tool]

This should take about 15 minutes. You'll be mapping trust patterns in 6-8 key workplace relationships.

A few things to know:
• Your data is private and stays on your device
• There are no right or wrong answers
• Focus on people you interact with regularly or who significantly impact your work experience

Once you've completed it, please save your map. We'll review it together and explore what you notice.

Looking forward to our conversation,
[Your name]
```

---

## Facilitation Framework

### Phase 1: Mapping (5-10 minutes)

**If done live:**

- Sit side-by-side or share screen (avoid "over the shoulder" positioning)
- Let them drive; you observe
- Stay quiet during initial selection and scoring
- Notice their non-verbal reactions (pauses, sighs, facial expressions)
- Resist the urge to ask "why" prematurely

**Facilitator mindset:**
- Curious, not judgmental
- Observer, not advisor
- Creating safety, not solving problems

---

### Phase 2: Initial Reaction (3-5 minutes)

**Opening Questions:**

1. **Start broad:**
   - "What do you notice?"
   - "What's coming up for you as you look at this?"
   - "Anything surprising here?"

2. **Follow their energy:**
   - If they focus on a specific relationship: "Tell me more about that."
   - If they seem uncomfortable: "This can bring up a lot. What's feeling hard right now?"
   - If they're analytical: "What patterns are you seeing?"

**What to Listen For:**
- Defensiveness or justification ("Well, the reason Sarah scored low is...")
- Surprise ("I didn't realize I felt this way about...")
- Avoidance ("These are all fine, I guess...")
- Strong emotion ("This relationship is really frustrating...")

---

### Phase 3: Deep Exploration (15-20 minutes)

**Structured Inquiry Approach:**

#### A. Strengths First

"Let's start with what's working. Where do you see strong trust?"

**Follow-up prompts:**
- "What makes this relationship different from others?"
- "How did you build this level of trust?"
- "What do you appreciate most about this connection?"
- "Can you think of a specific moment when you felt that trust?"

**Facilitator goal:** 
Anchor in positive examples before exploring challenges. This builds psychological safety and provides contrasting data.

---

#### B. Asymmetries

"I notice some relationships where trust flows differently in each direction. What do you make of that?"

**For "You trust them more than they trust you":**
- "What might explain why they seem less likely to come to you?"
- "Is this a pattern you've noticed in other relationships?"
- "How does it feel to trust someone who may not reciprocate?"

**For "They trust you more than you trust them":**
- "What makes you hesitant to bring challenges to them?"
- "What would need to shift for you to feel more comfortable?"
- "Have you considered they might want more trust from you?"

**Facilitator goal:**
Explore without blaming. Frame asymmetry as information, not indictment.

---

#### C. Low-Trust Relationships

"Let's talk about relationships where trust hasn't developed yet."

**Key questions:**
- "How important is this relationship to your daily work?"
- "What's gotten in the way of building trust here?"
- "Is this something you want to change, or is distance okay?"
- "What's the cost of leaving this relationship as-is?"

**Facilitator caution:**
Don't assume all low-trust relationships need intervention. Sometimes professional distance is appropriate and healthy.

---

### Phase 4: Action Planning (10-15 minutes)

**Narrowing Focus:**

"Of all these relationships, which 1-3 feel most important to focus on right now?"

**Help them prioritize based on:**
- Strategic importance (affects key work outcomes)
- Emotional weight (causing stress or draining energy)
- Growth potential (new relationship with high upside)
- Asymmetry severity (biggest trust gaps)

**For each priority relationship, explore:**

1. **Desired outcome:**
   - "What would success look like in this relationship?"
   - "If this relationship improved, how would your work life be different?"

2. **Barriers:**
   - "What's preventing that from happening now?"
   - "What's your role in the current dynamic?"

3. **Small actions:**
   - "What's one small thing you could try this week?"
   - "What feels doable, even if you're not sure it'll work?"
   - "What's the smallest version of progress here?"

**Facilitator role:**
Co-create options, don't prescribe. Their ownership of actions predicts follow-through.

---

### Phase 5: Reflection & Closure (3-5 minutes)

**Synthesis questions:**
- "What's the biggest insight from this exercise?"
- "What are you taking away?"
- "How do you feel about your relationship network now versus when we started?"

**Set up follow-up:**
- "Let's check back in [timeframe] about [specific relationship]."
- "Would you be willing to revisit this map in 3 months?"
- "Between now and then, what would be a useful reminder?"

**Close with validation:**
- "Relationship building takes time. You're being intentional, and that matters."
- "There's no perfect map—only the one you create through your actions."

---

## Advanced Facilitation Techniques

### Dealing with Resistance

**"This feels uncomfortable / I don't want to rate people":**

"That makes sense. Rating people can feel reductive. Remember, these scores aren't facts—they're your current perceptions. They can change. And awareness is the first step to choice."

Alternative: "You don't have to fill it all out. Want to start with just 3-4 people and see how it feels?"

---

**"All my relationships are fine":**

"That's great. Let's explore what 'fine' means. Are there any you'd like to strengthen, even if they're already okay?"

Or: "Sometimes 'fine' means we're not thinking about them much. Is that true here, or do you genuinely feel connected?"

---

**"I already know my relationships are bad":**

"This isn't about proving they're bad. It's about seeing specifically where and why. That makes it actionable rather than overwhelming."

---

### Managing Strong Emotion

**If client becomes tearful or upset:**
- Slow down, don't rush past the emotion
- "This is bringing up something important. Want to tell me what you're feeling?"
- Validate: "It makes sense this matters to you."
- Don't solve immediately—sit with the feeling

**If client expresses anger about a relationship:**
- "That sounds really frustrating."
- "Help me understand what's most upsetting about this."
- Later: "What would help channel that frustration into action?"

---

### Power Dynamics & Hierarchy

**When clients map their boss:**

Be especially attentive to:
- Fear of judgment ("My boss should trust me more—what's wrong with me?")
- Learned helplessness ("There's nothing I can do about this")
- Boundary confusion ("They overshare with me and I don't know how to handle it")

**Useful reframes:**
- "Hierarchical relationships have different dynamics. That's not your fault."
- "You can influence this relationship even if you're not in charge of it."
- "Trust with authority figures often develops differently than peer trust."

---

### When Clients Discover Concerning Patterns

**Examples:**
- All relationships scored low
- Pervasive fear of going to anyone
- Consistent pattern of trusting others who don't reciprocate

**Appropriate intervention:**

"I'm noticing a pattern across all these relationships. It seems like trust is really hard for you right now. Can we talk about what might be contributing to that?"

**Consider deeper assessment:**
- Workplace trauma history
- Burnout or depression
- Neurodivergence affecting social perception
- Referral to mental health professional if needed

---

## Sample Coaching Vignettes

### Vignette 1: The Overextended People-Pleaser

**Context:**
Client maps 8 relationships. Scores "trust to them" as all 2-3. Scores "trust from them" as all 0-1.

**Facilitation:**

"I notice you trust almost everyone here, but you're not sure they trust you back. What do you make of that?"

*Client:* "Yeah, I guess I'm always the one reaching out, helping, supporting. But when I need help, I don't feel like I can ask."

"What stops you from asking?"

*Client:* "I don't want to burden them. They're busy."

"And yet you're comfortable being the support person for them?"

*Client:* "Well, that's different..."

**Facilitation move:** Explore the double standard and underlying belief that their needs are less important.

---

### Vignette 2: The Conflict-Avoidant Leader

**Context:**
Client is a manager. Maps direct reports. All scores are 2-3 except one person (Taylor) who is 0 both directions.

**Facilitation:**

"Tell me about Taylor."

*Client:* "We just don't connect. I don't think they like me."

"What makes you think that?"

*Client:* "They're quiet in meetings, don't engage much with me."

"Have you talked to them about it?"

*Client:* "No, I don't want to make it awkward."

**Facilitation move:** Explore how avoidance perpetuates the pattern and what small engagement might look like.

---

### Vignette 3: The New Leader in Transition

**Context:**
Client recently promoted. Maps both former peers (now reports) and new peer group (fellow managers). Asymmetry everywhere.

**Facilitation:**

"This looks like a relationship network in flux. What's that like?"

*Client:* "It's weird. I don't know where I belong anymore."

"Say more."

*Client:* "My old team feels distant—I'm their boss now. And the leadership team hasn't really let me in yet."

**Facilitation move:** Normalize transition dynamics. Focus on intentional relationship-building in both directions.

---

## Tool Customization by Context

### Executive Coaching

**Adaptations:**
- Include board members or C-suite peers
- Explore trust across organizational boundaries
- Focus on strategic relationship investments
- Consider reputation and influence dynamics

---

### Team Coaching

**Adaptations:**
- All team members complete individually
- Compare anonymous aggregated patterns in team session
- Identify systemic trust gaps
- Build collective action plans

**Warning:** Requires high psychological safety. Don't force sharing.

---

### Conflict Resolution

**Adaptations:**
- Focus on the specific conflict relationship
- Map historical trust trajectory (how it's changed)
- Identify rupture points
- Explore repair opportunities

---

## Ethical Considerations

### What This Tool Is NOT:

- A performance evaluation
- A judgment of the client's relationship skills
- A diagnostic tool for relational disorders
- Something to share with HR or management without explicit consent

### Mandatory Facilitator Stance:

- **Non-judgmental:** All scores are valid
- **Confidential:** Client owns their data
- **Empowering:** Focus on agency, not victimhood
- **Realistic:** Acknowledge systemic factors (toxic culture, bad bosses, discrimination)

---

## Measuring Impact

### Short-term indicators (1-3 sessions):
- Client demonstrates awareness of relationship patterns
- Client can articulate specific trust dynamics
- Client takes at least one intentional action

### Medium-term indicators (1-3 months):
- Client reports improved relationship quality in focus areas
- Client revisits map and notes changes
- Client applies relational thinking to new situations

### Long-term indicators (6+ months):
- Client integrates relationship intentionality into professional practice
- Client reports greater work satisfaction
- Client demonstrates relationship resilience (recovers from ruptures)

---

## Troubleshooting Common Challenges

### "The client rushes through scoring"

**Problem:** Superficial engagement, no reflection

**Solution:** 
"I notice you moved through that quickly. Want to slow down and think about each person for a moment?"

Offer: "What if we went one at a time and you told me why you chose each score?"

---

### "The client wants to add 15 people"

**Problem:** Overwhelm, lack of prioritization

**Solution:**
"It sounds like you have a big network, which is great. For this exercise, let's focus on the 6-8 who most affect your day-to-day experience. Quality over quantity."

---

### "The client scores everyone as 0 or 3 (no middle ground)"

**Problem:** All-or-nothing thinking, possible underlying issue

**Solution:**
"I notice you're seeing relationships as very high or very low trust. Is that how they actually feel, or is nuance hard to capture?"

Explore cognitive distortions or trauma history if pattern persists.

---

### "The tool reveals a toxic work environment"

**Problem:** Systemic dysfunction beyond individual control

**Solution:**
Validate reality: "This isn't about you fixing broken relationships. It sounds like the environment itself is the issue."

Shift focus: "Given this landscape, how do you want to protect your wellbeing?"

Consider: Exit planning, boundary-setting, finding pockets of health within the system.

---

## Facilitator Self-Care

This work can be emotionally demanding. You're holding space for vulnerability, disappointment, and sometimes pain.

**After challenging sessions:**
- Debrief with a colleague or supervisor
- Note what worked and what didn't
- Separate client's struggles from your own
- Remember: You're a guide, not a savior

---

# 4. REFLECTION PROMPT QUESTION BANK

## Organized by Coaching Phase

### PHASE 1: Initial Awareness (Use immediately after mapping)

#### Discovery Questions

1. **What do you notice?**  
   (Open-ended, lets client lead)

2. **What surprised you most about this map?**  
   (Identifies disconnects between implicit and explicit awareness)

3. **If you had to describe your relationship network in one word, what would it be?**  
   (Reveals emotional tone)

4. **Which relationship did you find hardest to score, and why?**  
   (Surfaces ambivalence or complexity)

5. **Looking at this map, what does it tell you about your current work experience?**  
   (Connects relationships to wellbeing)

---

### PHASE 2: Pattern Recognition (After initial reaction)

#### Strengths Exploration

6. **Which relationships on this map feel most nourishing or energizing?**  
   (Identifies relationship assets)

7. **What do your strongest relationships have in common?**  
   (Extracts success patterns)

8. **Think about one of your high-trust relationships. Can you recall a specific moment when you felt that trust deepening?**  
   (Grounds abstract ratings in concrete memory)

9. **How have you contributed to building these strong relationships?**  
   (Builds self-efficacy and agency)

10. **What would it mean to have more relationships like [strongest relationship]?**  
    (Explores aspirational vision)

---

#### Asymmetry Analysis

11. **Where do you see the biggest gaps between trust you give and trust you receive?**  
    (Directs attention to asymmetry)

12. **For relationships where you trust them more than they seem to trust you: What might explain that difference?**  
    (Encourages perspective-taking)

13. **For relationships where they might trust you more than you trust them: What makes you hesitant?**  
    (Explores barriers to vulnerability)

14. **Are these trust imbalances new, or have they been this way for a while?**  
    (Assesses stability vs. change)

15. **If you could balance just one asymmetric relationship, which would it be and why?**  
    (Prioritization exercise)

---

#### Trust-Deficit Relationships

16. **Looking at relationships with low trust (red zones): How important are these people to your work?**  
    (Distinguishes necessary vs. optional relationships)

17. **What's the cost of leaving these low-trust relationships as they are?**  
    (Explores consequences of inaction)

18. **Is there anyone here you've written off, but maybe shouldn't have?**  
    (Challenges premature conclusions)

19. **For relationships where trust hasn't developed yet: What's gotten in the way?**  
    (Identifies barriers—structural, interpersonal, internal)

20. **Are any of these low-trust relationships actively harmful, or just underdeveloped?**  
    (Distinguishes between absence and toxicity)

---

### PHASE 3: Personal Insight (Deeper self-reflection)

#### Self-Awareness

21. **What does this map reveal about your relationship patterns?**  
    (Meta-level pattern recognition)

22. **Do you tend to trust others easily, or hold back until trust is proven?**  
    (Explores attachment/trust orientation)

23. **Looking at "trust FROM them": Are you underestimating how much people value you?**  
    (Challenges imposter syndrome)

24. **Is there a voice in your head that says "I shouldn't need help"? Where does that come from?**  
    (Uncovers self-reliance scripts)

25. **Do you show up differently in different relationships? What drives that?**  
    (Explores authenticity and code-switching)

---

#### Emotional Exploration

26. **Which relationship on this map causes you the most stress? What's that stress about?**  
    (Identifies emotional hot spots)

27. **If you could wave a magic wand and improve one relationship overnight, which would it be?**  
    (Reveals priority through fantasy)

28. **What feelings came up while filling this out? Discomfort? Relief? Sadness?**  
    (Normalizes emotional response)

29. **Are you avoiding anyone on this map? Why?**  
    (Explores avoidance patterns)

30. **Which relationship feels most draining, and what makes it so?**  
    (Identifies energy vampires)

---

#### Contextual Factors

31. **How much of your relationship network is shaped by your role or hierarchy, versus genuine connection?**  
    (Distinguishes structural from authentic trust)

32. **Are there systemic factors (like organizational culture) that make trust harder here?**  
    (Acknowledges external constraints)

33. **Have you experienced a betrayal or disappointment that affects how you approach relationships now?**  
    (Explores relational trauma)

34. **Do you bring trust patterns from past workplaces into this one?**  
    (Identifies historical baggage)

35. **How much does identity (gender, race, etc.) affect your trust dynamics here?**  
    (Acknowledges intersectionality)

---

### PHASE 4: Action Planning (Forward-looking)

#### Priority Setting

36. **If you could focus on improving just ONE relationship, which would create the most positive ripple effect?**  
    (Strategic prioritization)

37. **Which relationship is both important AND improvable right now?**  
    (Feasibility filter)

38. **What relationship is "good enough" and doesn't need your energy right now?**  
    (Permission to deprioritize)

39. **Are there any relationships here you need to actively protect or nurture?**  
    (Maintenance vs. growth)

40. **What's one relationship you're willing to invest in this month?**  
    (Commitment prompt)

---

#### Behavior Change

41. **What's one small, concrete action you could take this week to strengthen a relationship?**  
    (Specificity and feasibility)

42. **If you took that action, what's the best case outcome? The worst case?**  
    (Risk assessment)

43. **What's stopping you from taking that action right now?**  
    (Identifies barriers)

44. **How will you know if your relationship-building efforts are working?**  
    (Success metrics)

45. **What would need to be true for you to feel comfortable being more vulnerable with someone here?**  
    (Preconditions for openness)

---

#### Experimentation

46. **What if you approached one person with curiosity instead of judgment this week?**  
    (Reframe prompt)

47. **Could you test a small assumption? (e.g., "They don't trust me" might be tested by asking their opinion on something.)**  
    (Hypothesis testing)

48. **What if you shared something slightly vulnerable with someone you scored as "1" and saw what happens?**  
    (Graduated risk-taking)

49. **Who could you express appreciation to, even if the relationship isn't perfect?**  
    (Positivity intervention)

50. **What conversation have you been avoiding that might help?**  
    (Identifies elephants in room)

---

### PHASE 5: Long-Term Development (Revisiting the map)

#### Progress Tracking

51. **What's changed since the last time you filled this out?**  
    (Documents growth)

52. **Which relationship has improved most? What did you do differently?**  
    (Reinforces effective strategies)

53. **Are there relationships that have gotten worse? What happened?**  
    (Honest assessment without shame)

54. **What patterns are you still seeing that you want to shift?**  
    (Identifies persistent challenges)

55. **What are you most proud of in how you've approached relationships lately?**  
    (Celebrates wins)

---

#### Systemic Reflection

56. **How has your role or position changed, and how has that affected your relationships?**  
    (Contextualizes shifts)

57. **Have organizational changes (leadership, structure, etc.) impacted trust?**  
    (Acknowledges external factors)

58. **Are you building the kind of professional network you want long-term?**  
    (Strategic alignment check)

59. **What kind of colleague/leader/team member do you want to be known as?**  
    (Identity and reputation)

60. **Looking at this map, what does it tell you about where you're headed?**  
    (Future orientation)

---

## Special-Purpose Prompt Sets

### For New Leaders / Role Transitions

61. **How have your relationships changed since your promotion/transition?**

62. **Who has become more distant? Who has gotten closer?**

63. **Are you holding back authenticity because of your new role?**

64. **What support do you need as you navigate these shifting dynamics?**

65. **How do you want to build trust with your new peer group?**

---

### For Conflict Resolution Contexts

66. **What was this relationship like before the conflict?**

67. **When did trust start to erode? What was the turning point?**

68. **What do you need from this person to begin rebuilding trust?**

69. **What might they need from you?**

70. **Is repair possible and worth it, or is professional distance the healthier path?**

---

### For High-Performers / Perfectionists

71. **Do you hold your relationships to the same impossibly high standards you hold yourself to?**

72. **What would "good enough" trust look like?**

73. **Are you waiting for others to be perfect before trusting them?**

74. **What if trust is something you build through imperfection, not in spite of it?**

75. **Can you give yourself permission to need people?**

---

### For Chronic People-Pleasers

76. **Which relationships are draining because you're over-giving?**

77. **What would happen if you said "no" or set a boundary with someone here?**

78. **Who do you resent, and what is that resentment telling you?**

79. **What would it feel like to ask for help instead of always being the helper?**

80. **What if your value isn't only in what you give?**

---

### For Introverts / Relationship-Avoidant

81. **Do you see relationships as optional or as essential to your work?**

82. **What small dose of connection would feel manageable, not overwhelming?**

83. **Are you protecting yourself, or isolating yourself?**

84. **Which relationships could energize you rather than drain you?**

85. **What if trust doesn't require constant interaction?**

---

### For People in Toxic Environments

86. **Given this landscape, where can you find pockets of safety?**

87. **Who here is trustworthy, even if the system isn't?**

88. **What boundaries do you need to protect yourself?**

89. **Is staying in this environment sustainable for your wellbeing?**

90. **What support do you need outside this workplace?**

---

## Advanced Facilitation Prompts (For Coaches)

### Meta-Reflection Prompts

91. **"What's beneath that?"**  
    (Deepens surface responses)

92. **"Tell me more about that."**  
    (Invites elaboration)

93. **"What does that mean to you?"**  
    (Clarifies personal significance)

94. **"I'm noticing [pattern]. What do you make of that?"**  
    (Observation without interpretation)

95. **"If your wisest self looked at this map, what would they say?"**  
    (Accesses internal wisdom)

---

### Challenging Prompts (Use with care)

96. **"What's your role in this dynamic?"**  
    (Encourages accountability)

97. **"What are you afraid would happen if this relationship improved?"**  
    (Explores secondary gains of the status quo)

98. **"How is this pattern serving you, even if it's painful?"**  
    (Uncovers hidden benefits)

99. **"What would change if you stopped waiting for them to go first?"**  
    (Challenges passive stance)

100. **"What story are you telling yourself about this person that might not be fully true?"**  
     (Questions assumptions)

---

## Usage Guide for Facilitators

**How to Select Prompts:**

1. **Match to phase:** Don't jump to action planning during initial awareness
2. **Follow client energy:** Use their language and emotional state to guide selection
3. **One at a time:** Resist the urge to ask 5 questions at once
4. **Silence is okay:** Let them sit with the question
5. **Pivot if needed:** If a question falls flat, move on without making it awkward

**Creating Space:**

- After asking, count to 10 in your head before speaking again
- "Take your time" signals you're not rushing them
- If they say "I don't know," try: "If you did know, what might the answer be?"

**Red Flags:**

If prompts consistently lead to:
- Overwhelm → Slow down, validate, maybe pause
- Intellectualization → "How does that feel?" to ground emotionally
- Self-blame → Reframe with compassion and systemic factors
- Hopelessness → "What's one tiny thing in your control?"

---

This completes the comprehensive implementation package. You now have:
✅ Detailed wireframes and user flows  
✅ Contextual framing copy in multiple versions  
✅ Complete facilitator guide with techniques and scenarios  
✅ 100-prompt question bank organized by phase and context

Would you like me to:
- Create HTML/CSS mockups of any wireframe screens?
- Draft email templates for client communications?
- Develop a facilitator training slide deck?
- Create a "cheat sheet" reference card for coaches?
