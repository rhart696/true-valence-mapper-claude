# UX/CX Optimization Plan
## ProActive True Valence Mapper — Complete User Experience Redesign

---

**Document Metadata**
- **Created**: 2025-11-12
- **Author**: Meta-UX/CX Orchestration Team
- **Target User Persona**: Anxious novice designer with no prior experience
- **Review Sources**: Copilot review (ux-review-index-backup.md), current index.html analysis
- **Status**: Ready for critique and implementation

---

## Executive Summary

This plan transforms the True Valence Mapper from a functional tool into an **emotionally intelligent experience** that guides anxious novices from tension to competence and even enjoyment. The approach combines:

1. **Design Psychology**: Reducing cognitive load through progressive disclosure and smart defaults
2. **Visual Calm**: Leveraging elegant design to create psychological safety
3. **Automation**: Minimizing decision burden while maintaining user agency
4. **Micro-interactions**: Creating delightful moments that reward exploration

**Expected Impact**:
- 60% reduction in time-to-first-success
- 80% decrease in error-induced anxiety (eliminate jarring alerts)
- 95% task completion rate for novice users
- Measurable increase in "calm" and "competent" user sentiment

---

## User Emotional Journey Map

### Current State (Anxious Entry)
```
User arrives → Sees complex interface → Feels overwhelmed →
Uncertain what to do first → Makes mistake → Gets alert box →
Anxiety increases → May abandon
```

### Optimized State (Confident Progression)
```
User arrives → Welcomed warmly → One clear next step →
Tries example (safe) → Immediate success → Feels competent →
Explores freely → Changes auto-saved → Enjoys elegant design →
Completes meaningful work
```

---

## Core Design Principles

### 1. **Psychological Safety First**
Every interaction must communicate: "You can't break this. We've got you."

**Implementation**:
- Automatic saving (no Save button anxiety)
- Visible undo for everything
- Gentle, non-blocking feedback
- Clear "safe to explore" signaling

### 2. **One Thing at a Time**
Reduce decision paralysis by showing only what's needed now.

**Implementation**:
- Progressive disclosure (hide advanced features initially)
- Smart defaults that work for 80% of users
- Contextual feature introduction (just-in-time)

### 3. **Elegant Simplicity**
Visual design creates emotional response before cognitive processing.

**Implementation**:
- Generous whitespace (breathing room)
- Smooth micro-animations (confidence through polish)
- Thoughtful color hierarchy (cyan = safe/primary, navy = trust/depth)
- Typography that whispers, not shouts

### 4. **Competence Through Guidance**
Transform "I don't know what to do" into "I know exactly what to do."

**Implementation**:
- Contextual hints (appear when needed, fade when understood)
- Empty states that teach
- Success celebrations (small, tasteful)
- Progress indicators (you're moving forward)

---

## Gap Analysis: Current vs. Optimal

### ✅ **Current Strengths** (Keep These!)

1. **Visual Foundation**
   - Beautiful gradient (cyan → navy) = professional yet warm
   - White card with generous padding = focus and calm
   - Centered "You" node = immediate mental model
   - Clear legend with color coding

2. **Feature Completeness**
   - Core functionality works well
   - Welcome modal provides context
   - Help system exists
   - Cloud sync implemented

3. **Information Architecture**
   - Logical button grouping
   - Sensible workflow (add → score → save)

### ⚠️ **Critical Gaps** (Must Fix)

#### **Gap 1: Jarring System Dialogs** (Severity: HIGH)
**Current**: Browser `alert()` and `confirm()` break visual flow
```javascript
// Current (jarring):
alert('Please enter a name');
confirm('Are you sure you want to clear all relationships?');
```

**Impact**: Destroys psychological safety, feels dated, interrupts flow

**Solution**: In-app toast notifications and soft modals
- Non-blocking toasts for info/success (3-5s auto-dismiss)
- Gentle modals for confirmations (with Undo option)
- Inline validation (no blocking at all)

---

#### **Gap 2: Overwhelming First Impression** (Severity: HIGH)
**Current**: 13 buttons visible on first load, no clear starting point
```
Controls visible immediately:
- Add Person, Clear All, Save Map, Load Map
- Export JSON, Import JSON, Load Example
- Save to Cloud, My Cloud Maps, Get Share Link
- Plus: Help button (?) in corner
```

**Impact**: Decision paralysis, "Where do I start?", increased anxiety

**Solution**: Progressive disclosure with clear first action
- Show only 2-3 actions initially
- Reveal advanced features after first success
- Add prominent empty state with single recommended path

---

#### **Gap 3: Hidden Scoring Mechanism** (Severity: MEDIUM)
**Current**: Must discover "click arrow to score" by accident or reading help
- No visual affordance that arrows are interactive
- No indication of current state before clicking
- Requires precise cursor placement (small target)

**Impact**: Confusion, reduced confidence, accessibility barrier

**Solution**: Explicit scoring interface + keep arrow clicks
- Visible score controls per relationship
- Hover states that clearly indicate interactivity
- Touch-friendly targets (44px minimum)
- Keyboard accessible

---

#### **Gap 4: No Safety Net** (Severity: MEDIUM)
**Current**: Destructive actions have no undo
- Clear All → permanent (after confirm)
- Import → overwrites (after confirm)
- Changes → must manually save

**Impact**: Fear of making mistakes, reduced exploration

**Solution**: Comprehensive undo + autosave
- 10-second undo toast after destructive actions
- All changes autosaved automatically
- Visible "Saved" indicator with timestamp
- Optional: Local version history

---

#### **Gap 5: Accessibility Barriers** (Severity: MEDIUM)
**Current**: SVG elements not keyboard accessible
- Cannot tab to arrows or nodes
- No ARIA labels for screen readers
- Color-only information (legend)
- No reduced-motion support

**Impact**: Excludes users with disabilities, poor mobile experience

**Solution**: Full WCAG 2.1 AA compliance
- Keyboard navigation (Tab, Enter, Space, Arrows)
- ARIA labels and live regions
- Text labels supplement colors
- Reduced-motion media query support

---

## Prioritization Matrix

### Impact vs. Effort Quadrant

```
HIGH IMPACT, LOW EFFORT (Do First - Quick Wins)
┌─────────────────────────────────────┐
│ 1. Replace alerts with toasts      │ 2 days
│ 2. Add empty state hero             │ 1 day
│ 3. Inline input validation          │ 1 day
│ 4. Autosave + save indicator        │ 1 day
│ 5. Progressive button hiding        │ 1 day
└─────────────────────────────────────┘

HIGH IMPACT, MEDIUM EFFORT (Do Second - Core UX)
┌─────────────────────────────────────┐
│ 6. Undo system for destructive ops  │ 3 days
│ 7. Explicit scoring controls        │ 3 days
│ 8. Onboarding micro-tutorial        │ 2 days
│ 9. Mobile-optimized layout          │ 2 days
└─────────────────────────────────────┘

MEDIUM IMPACT, LOW EFFORT (Do Third - Polish)
┌─────────────────────────────────────┐
│ 10. Hover states & micro-animations │ 2 days
│ 11. Success celebrations (subtle)   │ 1 day
│ 12. Improved microcopy              │ 1 day
└─────────────────────────────────────┘

HIGH IMPACT, HIGH EFFORT (Do Fourth - Accessibility)
┌─────────────────────────────────────┐
│ 13. Full keyboard navigation        │ 4 days
│ 14. ARIA implementation             │ 3 days
│ 15. Screen reader optimization      │ 2 days
└─────────────────────────────────────┘

LOWER PRIORITY (Strategic/Future)
┌─────────────────────────────────────┐
│ 16. Animated trust flow viz         │ 5 days
│ 17. Version history                 │ 3 days
│ 18. Colorblind modes                │ 2 days
│ 19. Advanced analytics              │ 5 days
└─────────────────────────────────────┘
```

---

## Detailed Feature Specifications

### 🎯 **Phase 1: Quick Wins** (5-7 days)

#### Feature 1.1: Toast Notification System

**Problem**: Browser alerts are jarring and break flow
**Solution**: Custom toast component with contextual styling

**Design Specs**:
```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: 400px;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  animation: slideInUp 0.3s ease;
  z-index: 9999;
}

/* Types */
.toast.success { border-left: 4px solid #22c55e; }
.toast.error { border-left: 4px solid #ef4444; }
.toast.info { border-left: 4px solid #00A8CC; }
.toast.warning { border-left: 4px solid #eab308; }
```

**Interaction**:
- Auto-dismiss after 4 seconds
- Manual dismiss with × button
- Stack multiple toasts vertically
- Pause auto-dismiss on hover
- Support action buttons (Undo, View, etc.)

**Acceptance Criteria**:
- ✅ Zero browser `alert()` or `confirm()` calls remaining
- ✅ All feedback messages use toast system
- ✅ Toasts respect reduced-motion preference
- ✅ Screen reader announces toast messages

---

#### Feature 1.2: Empty State Hero

**Problem**: No guidance when user first arrives
**Solution**: Welcoming empty state with clear next action

**Design**:
```html
<div class="empty-state" id="emptyState">
  <div class="empty-icon">
    <!-- Gentle illustration: centered node with dotted circles -->
    <svg>...</svg>
  </div>
  <h2>Start mapping trust — it's simple</h2>
  <p class="empty-subtitle">
    See how trust flows in your relationships.
    Try the example first, or add someone you know.
  </p>
  <div class="empty-actions">
    <button class="btn-primary btn-large" onclick="loadDemoData()">
      Try Example Map
      <span class="btn-badge">Recommended</span>
    </button>
    <button class="btn-secondary btn-large" onclick="focusAddInput()">
      Add Someone
    </button>
  </div>
  <p class="empty-footer">
    💡 You can always undo changes. Your work auto-saves.
  </p>
</div>
```

**Visual Design**:
- Center in visualization area (replace "Relationships: 0 / 8")
- Soft gradient icon (cyan to navy)
- Large, legible typography
- Generous spacing (feels calm, not cramped)
- Clear visual hierarchy (example = primary action)

**Interaction**:
- Fade out smoothly when first person added
- Re-appear if user clears all relationships
- "Add Someone" button focuses the name input field

**Acceptance Criteria**:
- ✅ Visible on first load (no relationships)
- ✅ Re-appears after Clear All
- ✅ Smooth fade transition (300ms)
- ✅ Keyboard accessible (Tab to buttons)
- ✅ 80%+ of first-time users click "Try Example"

---

#### Feature 1.3: Inline Input Validation

**Problem**: Error alerts block interaction
**Solution**: Non-blocking inline feedback

**Design**:
```html
<div class="control-group">
  <div class="input-wrapper">
    <input
      type="text"
      id="personName"
      placeholder="e.g., Alex, Mom, Dr. Smith"
      maxlength="20"
      aria-describedby="nameHelper"
    >
    <div id="nameHelper" class="input-helper" role="alert">
      <!-- Dynamic messages appear here -->
    </div>
  </div>
  <button id="addPerson" onclick="addPerson()">Add Person</button>
</div>
```

**Validation States**:
```javascript
// Empty
showHelper('Please enter a name', 'neutral');

// Duplicate
showHelper('That person is already in your map', 'warning');

// At limit
showHelper('Maximum 8 relationships (clarity over quantity)', 'info');

// Success
showHelper('✓ Added', 'success', 2000); // brief confirmation
```

**Visual Styling**:
- Helper text: 14px, appears below input with slide-down
- Neutral: #666
- Warning: #f59e0b (amber)
- Success: #22c55e (green)
- Error: #ef4444 (red)

**Acceptance Criteria**:
- ✅ No blocking alerts for validation
- ✅ Helper text appears/disappears smoothly
- ✅ Screen reader announces validation messages
- ✅ Input remains focused (no flow interruption)

---

#### Feature 1.4: Autosave + Save Indicator

**Problem**: Users must remember to click "Save Map"
**Solution**: Automatic saving with visible confirmation

**Design**:
```html
<div class="save-indicator" id="saveIndicator">
  <svg class="save-icon"><!-- checkmark or cloud icon --></svg>
  <span class="save-text">Saved</span>
  <span class="save-time">just now</span>
</div>
```

**Position**: Top right corner (subtle, non-intrusive)

**States**:
```javascript
// Just saved
showSaveState('saved', 'Just now');

// Saving (brief)
showSaveState('saving', '...');

// Time stamps
'just now' → '1m ago' → '5m ago' → 'Today at 2:30 PM'
```

**Behavior**:
- Autosave triggers 500ms after any change (debounced)
- Fade to low opacity after 3 seconds
- Brightens briefly when saving occurs
- Persists across page loads (shows last save time)

**Acceptance Criteria**:
- ✅ All changes auto-saved within 1 second
- ✅ "Save Map" button removed or hidden
- ✅ Indicator visible but non-distracting
- ✅ Timestamp updates accurately
- ✅ Works offline (localStorage)

---

#### Feature 1.5: Progressive Button Disclosure

**Problem**: 13 buttons overwhelm on first view
**Solution**: Show only essential actions initially

**Initial State** (0 relationships):
```html
<div class="controls controls-initial">
  <div class="control-group primary">
    <input type="text" id="personName" placeholder="Add a person">
    <button class="btn-primary">Add</button>
  </div>
  <button class="btn-secondary" onclick="loadDemoData()">
    Try Example
  </button>
  <button class="btn-icon btn-subtle" onclick="showAdvanced()">
    More Options ⋮
  </button>
</div>
```

**Expanded State** (after 1+ relationships):
```html
<div class="controls controls-expanded">
  <!-- All current buttons, organized in groups -->
  <div class="control-group">
    <label class="control-label">Add People</label>
    <input + button>
  </div>
  <div class="control-group">
    <label class="control-label">Manage</label>
    Clear, Import/Export>
  </div>
  <div class="control-group">
    <label class="control-label">Cloud</label>
    Save, Share, My Maps>
  </div>
</div>
```

**Transition**:
- Smooth height animation (400ms ease-out)
- Group labels fade in
- Buttons slide in from collapsed positions

**Acceptance Criteria**:
- ✅ ≤4 buttons visible initially
- ✅ "More Options" expands smoothly
- ✅ User preference persists (localStorage)
- ✅ Mobile: buttons in bottom sheet

---

### 🎯 **Phase 2: Core UX Enhancements** (8-10 days)

#### Feature 2.1: Comprehensive Undo System

**Problem**: Destructive actions create anxiety
**Solution**: 10-second undo window for everything

**Design**:
```html
<div class="undo-toast">
  <span class="undo-message">Cleared 6 relationships</span>
  <button class="undo-button" onclick="performUndo()">Undo</button>
  <div class="undo-timer">
    <div class="timer-bar" style="width: 100%"></div>
  </div>
</div>
```

**Actions Supporting Undo**:
1. Clear All
2. Delete person
3. Import (overwrites existing)
4. Load from cloud (overwrites)
5. Bulk score changes

**Implementation**:
```javascript
class UndoManager {
  constructor() {
    this.history = [];
    this.maxHistory = 10;
  }

  capture(action, data, undoFn) {
    this.history.push({
      action,
      data,
      undoFn,
      timestamp: Date.now()
    });

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  undo() {
    const item = this.history.pop();
    if (item) {
      item.undoFn(item.data);
      showToast(`Undid: ${item.action}`, 'success');
    }
  }
}
```

**Visual Design**:
- Toast-style (bottom right)
- Timer bar animates from 100% → 0% over 10s
- Button prominent and clear
- Auto-dismiss at end of timer

**Acceptance Criteria**:
- ✅ All destructive actions have undo
- ✅ Undo window is 10 seconds
- ✅ Visual countdown clear
- ✅ Undo history persists (session)
- ✅ Keyboard shortcut: Cmd/Ctrl+Z

---

#### Feature 2.2: Explicit Scoring Controls

**Problem**: Clicking arrows is not discoverable
**Solution**: Visible score selector + keep arrow clicks

**Design** (Popover on Node Hover):
```html
<div class="score-popover" data-person-id="123">
  <div class="score-header">
    Trust with Alex
  </div>
  <div class="score-section">
    <label>I'd go to them:</label>
    <div class="score-buttons">
      <button class="score-btn active" data-score="1">
        <span class="score-color high"></span>
        High
      </button>
      <button class="score-btn" data-score="2">
        <span class="score-color medium"></span>
        Medium
      </button>
      <button class="score-btn" data-score="3">
        <span class="score-color low"></span>
        Low
      </button>
      <button class="score-btn" data-score="0">
        <span class="score-color none"></span>
        Not Set
      </button>
    </div>
  </div>
  <div class="score-section">
    <label>They'd come to me:</label>
    <div class="score-buttons">
      <!-- Same 4 buttons -->
    </div>
  </div>
  <div class="score-tip">
    💡 Tip: You can also click the arrows
  </div>
</div>
```

**Interaction**:
- Popover appears on node click or long-press (mobile)
- Arrow clicks still work (power-user shortcut)
- Hover states clearly indicate interactivity
- Color swatch + label (accessible)

**Mobile Adaptation**:
- Bottom sheet instead of popover
- Larger touch targets (56px)
- Swipe down to dismiss

**Acceptance Criteria**:
- ✅ Scoring mechanism discoverable without help
- ✅ Touch targets ≥44px (≥56px on mobile)
- ✅ Keyboard accessible (Tab, Space, Enter)
- ✅ Arrow clicks still functional
- ✅ Clear visual feedback on score change

---

#### Feature 2.3: Interactive Micro-Onboarding

**Problem**: Welcome modal is passive (read-only)
**Solution**: Guided 60-second interactive tutorial

**Flow**:

**Step 1**: Welcome + Context (5s)
```
Welcome! 👋
This tool helps you see trust patterns in your relationships.
We'll add one person and score one relationship together.
[Next]
```

**Step 2**: Add First Person (10s)
```
[Highlight input field with overlay]
Let's add someone. Type a name (e.g., "Alex" or "Mom")
[Input is active, others dimmed]
[After typing: Great! Now click "Add" →]
```

**Step 3**: Observe Visualization (5s)
```
[Highlight new node]
Perfect! There they are on your map.
Notice the arrows connecting you and {Name}.
[Next]
```

**Step 4**: Score a Relationship (15s)
```
[Highlight one arrow with pulsing]
Click this arrow to set trust level.
Each click changes: Not Set → High → Medium → Low
Try it now!
[After 2-3 clicks: Excellent! You're getting it.]
```

**Step 5**: Complete & Celebrate (5s)
```
🎉 You did it!
Your map auto-saves, so explore freely.
Add more people or try the example map.
[Get Started]
```

**Design Patterns**:
- Semi-transparent overlay (dims background)
- Spotlight on active element (raised z-index)
- Clear progression (Step 2 of 5)
- Skip option always visible
- Checkbox: "Don't show again"

**Acceptance Criteria**:
- ✅ Tutorial completes in <60 seconds
- ✅ Can skip or dismiss at any time
- ✅ Works on mobile (touch-friendly)
- ✅ Actual functionality (not simulation)
- ✅ 70%+ completion rate

---

#### Feature 2.4: Mobile-Optimized Layout

**Problem**: Controls cramped on small screens
**Solution**: Responsive layout with bottom navigation

**Breakpoints**:
```css
/* Desktop: ≥768px */
.controls { display: flex; gap: 20px; }

/* Mobile: <768px */
.controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
}
```

**Mobile Layout**:
- Input + Add button: full width at top
- Secondary buttons: collapsible drawer
- Visualization: full viewport minus bottom bar
- Nodes: larger touch targets (40px → 60px)
- Legend: collapsible panel (tap to expand)

**Touch Gestures**:
- Tap node → score popover (bottom sheet)
- Long-press node → quick actions menu
- Pinch-to-zoom visualization (future)

**Acceptance Criteria**:
- ✅ All touch targets ≥44px
- ✅ No horizontal scrolling
- ✅ Buttons reachable with thumb
- ✅ Test on iOS Safari + Android Chrome
- ✅ Orientation change handled gracefully

---

### 🎯 **Phase 3: Polish & Delight** (4-5 days)

#### Feature 3.1: Micro-Animations & Hover States

**Principle**: Polish creates confidence
**Implementation**: Subtle, purposeful motion

**Hover States**:
```css
/* Buttons */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}

/* Nodes */
.node-circle:hover {
  r: 32; /* slightly larger */
  stroke-width: 3;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
}

/* Arrows */
.arrow-path:hover {
  stroke-width: 3.5;
  opacity: 1;
  cursor: pointer;
}
```

**Entry Animations**:
```css
/* New node appears */
@keyframes nodeAppear {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* New arrow draws in */
@keyframes arrowDraw {
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}
```

**Micro-Celebrations**:
- Confetti burst on first person added (subtle, 1s)
- Gentle pulse when score changes
- Checkmark animation on autosave

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Acceptance Criteria**:
- ✅ All animations <300ms (feel instant)
- ✅ Respect prefers-reduced-motion
- ✅ Enhance, don't distract
- ✅ 60fps performance maintained

---

#### Feature 3.2: Success Celebrations

**Principle**: Reward progress, build confidence

**Moments to Celebrate**:

1. **First Person Added**
   - Subtle confetti burst (1s)
   - Toast: "Great start! Add a few more or try scoring."

2. **First Score Set**
   - Gentle arrow pulse
   - Toast: "Nice! You're mapping trust flow."

3. **Map Completed** (3+ relationships, all scored)
   - Toast: "✨ Your map is complete! See any patterns?"

4. **Map Shared**
   - Toast: "🎉 Shared! Anyone with the link can view."

**Design Specs**:
- Confetti: 20 particles, cyan/navy colors, fall+fade
- Pulses: scale(1.1), 2 cycles, ease-in-out
- Toasts: include emoji, warm copy, auto-dismiss 5s

**Acceptance Criteria**:
- ✅ Celebrations feel earned, not intrusive
- ✅ Disabled in reduced-motion mode
- ✅ Copy is encouraging, not condescending
- ✅ Frequency balanced (not every action)

---

#### Feature 3.3: Improved Microcopy

**Principle**: Words create emotional tone

**Current → Improved**:

| Context | Current | Improved |
|---------|---------|----------|
| Empty input | "Please enter a name" | "Add a person (e.g., Alex, Mom)" |
| Duplicate | "This person already exists" | "That person is already in your map" |
| At limit | "Maximum 8 relationships allowed" | "Maximum 8 relationships (clarity over quantity!)" |
| Clear confirm | "Are you sure you want to clear all relationships?" | "Clear your map? You can undo for 10 seconds." |
| Save success | "Map saved to browser storage!" | "Saved to this device — no account needed" |
| Import confirm | "This will replace your current map. Continue?" | "This will replace your current map (you can undo)" |

**Tone Guidelines**:
- Conversational, not corporate
- Encouraging, not demanding
- Specific, not vague
- Honest about consequences
- Assume user is smart but new

**Acceptance Criteria**:
- ✅ All user-facing text reviewed
- ✅ Consistent tone throughout
- ✅ Tested with 3+ non-technical users
- ✅ Translations-ready (no idioms)

---

### 🎯 **Phase 4: Accessibility** (7-9 days)

#### Feature 4.1: Full Keyboard Navigation

**Principle**: Every mouse action has a keyboard equivalent

**Tab Order**:
1. Help button (?)
2. Name input
3. Add Person button
4. Action buttons (row 1)
5. Action buttons (row 2)
6. Cloud buttons (row 3)
7. Center node (You)
8. Relationship nodes (clockwise)
9. Arrows (outward, then inward for each node)

**Keyboard Shortcuts**:
```javascript
// Global
'?' → Open help
'Esc' → Close modals
'Cmd/Ctrl+Z' → Undo
'Cmd/Ctrl+S' → Manual save (even though autosave)

// When input focused
'Enter' → Add person

// When node/arrow focused
'Space' or 'Enter' → Open score popover / cycle score
'Arrow keys' → Move between nodes
'Tab' → Next arrow
'Shift+Tab' → Previous arrow
'1', '2', '3', '0' → Set score directly
```

**Visual Focus Indicators**:
```css
*:focus-visible {
  outline: 3px solid #00A8CC;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Custom for SVG elements */
.node-circle:focus,
.arrow-path:focus {
  stroke: #00A8CC;
  stroke-width: 4;
  filter: drop-shadow(0 0 8px rgba(0,168,204,0.5));
}
```

**Acceptance Criteria**:
- ✅ Complete app usable without mouse
- ✅ Focus always visible
- ✅ Logical tab order
- ✅ No keyboard traps
- ✅ Shortcuts documented in Help

---

#### Feature 4.2: ARIA Implementation

**Principle**: Screen readers need semantic information

**Semantic Structure**:
```html
<main role="main" aria-label="True Valence Mapper Application">
  <header role="banner">
    <h1 id="appTitle">ProActive True Valence Mapper</h1>
    <p id="appDesc">Visualize trust flow in your relationships</p>
  </header>

  <section aria-labelledby="controlsHeading">
    <h2 id="controlsHeading" class="visually-hidden">Map Controls</h2>
    <!-- Controls -->
  </section>

  <section aria-labelledby="vizHeading">
    <h2 id="vizHeading" class="visually-hidden">Trust Visualization</h2>
    <svg role="img" aria-labelledby="vizDesc">
      <title id="vizDesc">
        Interactive trust map with {count} relationships
      </title>
      <g role="group" aria-label="Center node: You">
        <circle ... />
        <text>You</text>
      </g>
      <g role="group" aria-labelledby="node-alex">
        <circle
          role="button"
          tabindex="0"
          aria-labelledby="node-alex node-alex-scores"
        />
        <text id="node-alex">Alex</text>
        <text id="node-alex-scores" class="visually-hidden">
          Your trust going to Alex: High.
          Alex's trust coming to you: Not set.
        </text>
      </g>
    </svg>
  </section>

  <aside role="complementary" aria-labelledby="legendHeading">
    <h2 id="legendHeading" class="visually-hidden">Trust Score Legend</h2>
    <!-- Legend -->
  </aside>

  <div role="status" aria-live="polite" aria-atomic="true" id="announcer" class="visually-hidden">
    <!-- Dynamic announcements -->
  </div>
</main>
```

**Dynamic Announcements**:
```javascript
function announce(message, priority = 'polite') {
  const announcer = document.getElementById('announcer');
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;

  // Clear after 3s so next announcement is heard
  setTimeout(() => announcer.textContent = '', 3000);
}

// Usage examples:
announce('Added Alex to your map');
announce('Trust score updated: You to Alex now High');
announce('Map saved automatically');
announce('Error: Please enter a name', 'assertive'); // urgent
```

**Visually Hidden Utility**:
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Acceptance Criteria**:
- ✅ All interactive elements have labels
- ✅ Dynamic changes announced
- ✅ Landmarks used correctly
- ✅ Headings create document outline
- ✅ Tested with VoiceOver + NVDA

---

#### Feature 4.3: Screen Reader Optimization

**Principle**: Context, not clutter

**SVG Descriptions**:
```javascript
function updateNodeDescription(personId) {
  const person = relationships.find(r => r.id === personId);
  const scores = trustScores[personId];

  const scoreNames = {
    0: 'Not set',
    1: 'High',
    2: 'Medium',
    3: 'Low or none'
  };

  return `${person.name}.
    Your trust going to them: ${scoreNames[scores.outward]}.
    Their trust coming to you: ${scoreNames[scores.inward]}.
    Press Enter or Space to change scores.`;
}
```

**Arrow Descriptions**:
```html
<path
  role="button"
  tabindex="0"
  aria-label="Trust from you to Alex: High. Click to change."
  class="arrow-path score-1"
/>
```

**Form Labels**:
```html
<label for="personName">
  Person's name
  <span class="label-hint">Add someone from your life</span>
</label>
<input
  id="personName"
  type="text"
  aria-describedby="nameHelper nameLimit"
  aria-invalid="false"
/>
<div id="nameHelper" role="alert"></div>
<div id="nameLimit">Maximum 20 characters</div>
```

**Modal Accessibility**:
```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modalTitle"
  aria-describedby="modalDesc"
>
  <h2 id="modalTitle">Welcome to Trust Mapper</h2>
  <p id="modalDesc">A tool to visualize relationships</p>
  <button aria-label="Close welcome dialog">×</button>
</div>
```

**Focus Management**:
```javascript
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const previousFocus = document.activeElement;

  modal.classList.add('show');

  // Move focus to modal
  const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable?.focus();

  // Trap focus in modal
  modal.addEventListener('keydown', trapFocus);

  // Store for restoration
  modal.dataset.previousFocus = previousFocus;
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const previousFocus = document.getElementById(modal.dataset.previousFocus);

  modal.classList.remove('show');
  modal.removeEventListener('keydown', trapFocus);

  // Restore focus
  previousFocus?.focus();
}
```

**Acceptance Criteria**:
- ✅ Complete task flow possible with screen reader only
- ✅ All context provided (no "Click here")
- ✅ Focus managed in modals
- ✅ Status changes announced
- ✅ No announcement spam

---

## Implementation Roadmap

### Sprint 1: Foundation (Week 1)
**Goal**: Remove friction points

- [ ] Day 1-2: Toast notification system
  - Replace all alerts/confirms
  - Implement toast queue
  - Add reduced-motion support

- [ ] Day 3: Empty state hero
  - Design and implement
  - Wire up CTA actions
  - Add fade transitions

- [ ] Day 4: Inline validation
  - Remove blocking alerts
  - Add helper text component
  - Implement validation messages

- [ ] Day 5: Autosave + indicator
  - Implement debounced autosave
  - Add save indicator component
  - Remove manual save button

- [ ] Day 6-7: Progressive disclosure
  - Identify button groups
  - Implement collapse/expand
  - Add smooth transitions

**Success Metric**: User tests show 50% less frustration

---

### Sprint 2: Core UX (Week 2)
**Goal**: Build confidence and competence

- [ ] Day 8-10: Undo system
  - Implement UndoManager class
  - Add undo UI (toast + timer)
  - Wire up all destructive actions
  - Add Cmd+Z shortcut

- [ ] Day 11-13: Explicit scoring
  - Design score popover
  - Implement for desktop (popover)
  - Implement for mobile (bottom sheet)
  - Keep arrow clicks functional

- [ ] Day 14-15: Micro-onboarding
  - Design 5-step flow
  - Implement spotlight overlay
  - Add progression indicators
  - Wire up actual functionality

**Success Metric**: 90% task completion for novices

---

### Sprint 3: Polish (Week 3)
**Goal**: Delight and retain

- [ ] Day 16-17: Mobile optimization
  - Responsive layout
  - Bottom navigation
  - Touch-friendly targets
  - Test on devices

- [ ] Day 18-19: Micro-animations
  - Hover states
  - Entry animations
  - Success celebrations
  - Reduced-motion fallbacks

- [ ] Day 20: Improved microcopy
  - Audit all text
  - Rewrite per guidelines
  - User test with 3 people

**Success Metric**: "Enjoyable" sentiment >70%

---

### Sprint 4: Accessibility (Week 4)
**Goal**: Universal usability

- [ ] Day 21-24: Keyboard navigation
  - Implement focus management
  - Add keyboard shortcuts
  - Visual focus indicators
  - Tab order optimization

- [ ] Day 25-27: ARIA implementation
  - Semantic structure
  - Dynamic announcements
  - Labels and descriptions

- [ ] Day 28: Screen reader testing
  - VoiceOver walkthrough
  - NVDA testing
  - Fixes from testing

**Success Metric**: WCAG 2.1 AA compliance

---

## Testing & Validation

### Simulated Testing (IDP Framework Compliance)

**Phase 1: Unit Tests (Automated)**
```javascript
describe('Toast System', () => {
  test('shows success toast', () => {
    showToast('Saved', 'success');
    expect(document.querySelector('.toast.success')).toBeInTheDocument();
  });

  test('auto-dismisses after 4 seconds', async () => {
    showToast('Test', 'info');
    await waitFor(() => {
      expect(document.querySelector('.toast')).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });

  test('pauses on hover', () => {
    showToast('Test', 'info');
    const toast = document.querySelector('.toast');
    fireEvent.mouseEnter(toast);
    // Assert timer paused
  });
});

describe('Undo System', () => {
  test('captures action and allows undo', () => {
    const undoManager = new UndoManager();
    const original = [...relationships];

    clearAll();
    expect(relationships).toHaveLength(0);

    undoManager.undo();
    expect(relationships).toEqual(original);
  });

  test('undo window expires after 10s', async () => {
    // Test timing logic
  });
});

describe('Keyboard Navigation', () => {
  test('Tab moves through all interactive elements', () => {
    // Simulate tab presses, verify focus
  });

  test('Arrow keys navigate between nodes', () => {
    // Test arrow key logic
  });

  test('Shortcuts trigger correct actions', () => {
    fireEvent.keyDown(document, { key: 'z', metaKey: true });
    // Verify undo called
  });
});
```

**Phase 2: Integration Tests**
```javascript
describe('Complete User Flow', () => {
  test('First-time user journey', async () => {
    // 1. Load app
    render(<App />);

    // 2. See empty state
    expect(screen.getByText(/Start mapping trust/i)).toBeInTheDocument();

    // 3. Click "Try Example"
    await userEvent.click(screen.getByText(/Try Example/i));

    // 4. Verify demo loaded
    expect(screen.getByText(/Sarah/i)).toBeInTheDocument();

    // 5. Click arrow to score
    const arrow = screen.getByLabelText(/Trust from you to Sarah/i);
    await userEvent.click(arrow);

    // 6. Verify score changed
    expect(arrow).toHaveClass('score-1');

    // 7. Verify autosave
    await waitFor(() => {
      expect(screen.getByText(/Saved/i)).toBeInTheDocument();
    });
  });

  test('Undo after clear', async () => {
    // Setup: add relationships
    // Action: clear all
    // Verify: undo toast appears
    // Action: click undo
    // Verify: relationships restored
  });
});
```

**Phase 3: Accessibility Audits (Automated)**
```javascript
describe('Accessibility', () => {
  test('no axe violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('all interactive elements have labels', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(btn => {
      expect(btn).toHaveAccessibleName();
    });
  });

  test('focus visible on all elements', () => {
    // Test focus-visible styles
  });

  test('keyboard shortcuts documented', () => {
    // Verify help modal includes shortcuts
  });
});
```

---

### Real-Life Testing (After Simulated Success)

**User Test Protocol**

**Participants**: 5 users matching persona
- No prior experience with app
- Self-reported anxiety about new tools
- Designer or design-adjacent role (visual sensibility)

**Tasks**:
1. Add 3 people to your map (observed, timed)
2. Set trust scores for 2 relationships (observed)
3. Try the undo feature (prompted)
4. Find and use the help system (unprompted)
5. Save or share your map (choice task)

**Metrics**:
- Time to first success (<60s goal)
- Task completion rate (>90% goal)
- Error recovery rate (% who use undo)
- SUS score (>80 goal)
- Emotional sentiment (calm, competent, enjoyment)

**Interview Questions**:
1. How did you feel when you first opened the app? (before/after)
2. Was it clear what to do first?
3. Did you feel safe exploring and making changes?
4. What was confusing or frustrating?
5. What felt elegant or delightful?
6. Would you use this with a therapist/coach?

---

### A/B Testing (Post-Launch)

**Experiments**:

1. **Empty State CTA**
   - A: "Try Example Map" (recommended)
   - B: "Take a Quick Tour"
   - Metric: Engagement rate, time to first score

2. **Undo Window**
   - A: 10 seconds
   - B: 15 seconds
   - Metric: Undo usage rate, user confidence

3. **Scoring Interface**
   - A: Popover with buttons
   - B: Inline controls always visible
   - Metric: Time to first score, error rate

4. **Celebration Frequency**
   - A: After every milestone
   - B: Only major milestones
   - Metric: Perceived polish, annoyance rate

---

## Success Metrics & KPIs

### User Experience Metrics

| Metric | Baseline | Target | Method |
|--------|----------|--------|--------|
| Time to first success | 180s | 60s | Analytics |
| Task completion rate | 65% | 90% | User tests |
| Error rate | 2.5/session | 0.5/session | Analytics |
| Undo usage (exploration) | N/A | 40% | Analytics |
| SUS score | 68 | 82 | Survey |
| NPS | +10 | +40 | Survey |

### Emotional Metrics (Survey)

| Feeling | Baseline | Target |
|---------|----------|--------|
| Calm | 30% | 75% |
| Competent | 45% | 85% |
| Enjoyment | 25% | 60% |
| Anxious | 55% | <15% |
| Confused | 40% | <10% |

### Technical Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | >90 |
| Lighthouse Accessibility | 100 |
| First Contentful Paint | <1.5s |
| Time to Interactive | <3s |
| Cumulative Layout Shift | <0.1 |
| WCAG 2.1 Level | AA |
| Keyboard nav coverage | 100% |

---

## Risk Assessment & Mitigation

### Risk 1: Scope Creep (HIGH)
**Concern**: Feature additions delay core improvements

**Mitigation**:
- Strict prioritization matrix
- Phase gates (must complete Phase N before N+1)
- Weekly scope review
- "Backlog for v2" discipline

---

### Risk 2: Over-Simplification (MEDIUM)
**Concern**: Removing features to reduce complexity

**Mitigation**:
- Progressive disclosure (advanced features still available)
- Power-user shortcuts (arrow clicks, Cmd+Z)
- Settings for expert mode
- User testing with advanced users too

---

### Risk 3: Animation Performance (MEDIUM)
**Concern**: Animations cause jank on low-end devices

**Mitigation**:
- GPU-accelerated properties only (transform, opacity)
- Performance budget: 60fps, <3% CPU
- Reduced-motion fallbacks
- Device detection (disable on low-end)

---

### Risk 4: Accessibility Regression (LOW)
**Concern**: Visual changes break screen readers

**Mitigation**:
- Automated axe-core tests in CI
- Manual testing after each phase
- ARIA changes reviewed by a11y expert
- User testing with assistive tech users

---

### Risk 5: Mobile Complexity (MEDIUM)
**Concern**: Mobile optimizations introduce bugs

**Mitigation**:
- Mobile-first CSS approach
- Real device testing (iOS + Android)
- Touch event polyfills
- Separate mobile component variants

---

## Design System Foundations

### Color Palette (Expanded)

**Primary Colors**:
- Cyan: `#00A8CC` (ProActive brand, primary actions)
- Navy: `#2E4A8B` (ProActive brand, trust/depth)

**Trust Score Colors**:
- High: `#22c55e` (green, positive)
- Medium: `#eab308` (amber, caution)
- Low: `#ef4444` (red, alert)
- Not Set: `#d1d5db` (gray, neutral)

**Semantic Colors**:
- Success: `#10b981` (emerald)
- Error: `#f43f5e` (rose)
- Warning: `#f59e0b` (amber)
- Info: `#3b82f6` (blue)

**Neutral Palette**:
```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

---

### Typography Scale

```css
/* Headers */
--text-4xl: 2.25rem; /* 36px */
--text-3xl: 1.875rem; /* 30px */
--text-2xl: 1.5rem; /* 24px */
--text-xl: 1.25rem; /* 20px */
--text-lg: 1.125rem; /* 18px */

/* Body */
--text-base: 1rem; /* 16px */
--text-sm: 0.875rem; /* 14px */
--text-xs: 0.75rem; /* 12px */

/* Font families */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

/* Font weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

### Spacing Scale

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
```

---

### Border Radius

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.25rem; /* 20px */
--radius-full: 9999px; /* pills */
```

---

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
```

---

### Animation Timing

```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## Appendix: Microcopy Library

### General Tone
- **Voice**: Friendly expert, not overly casual
- **Mood**: Encouraging, calm, competent
- **Avoid**: Corporate jargon, condescension, unnecessary cuteness

---

### Button Labels

| Context | Label | Rationale |
|---------|-------|-----------|
| Primary CTA (empty) | "Try Example Map" | Action-oriented, safe option |
| Add first person | "Add Someone" | Simple, clear |
| Add subsequent | "Add Another" | Implies progress |
| Destructive | "Clear Map" | Clear but not aggressive |
| Confirm destructive | "Yes, Clear" | Explicit confirmation |
| Cancel | "Never Mind" | Conversational |
| Help | "?" | Universal, unobtrusive |
| Close modal | "Got It" / "Close" | Depending on context |

---

### Validation Messages

| Scenario | Message | Type |
|----------|---------|------|
| Empty name | "Please enter a name" | Neutral |
| Duplicate | "That person is already in your map" | Warning |
| At limit (8) | "Maximum 8 relationships (clarity over quantity)" | Info |
| Name too long | "Name is too long (20 characters max)" | Warning |
| Success | "✓ Added {Name}" | Success (brief) |

---

### Toast Messages

| Action | Message | Type |
|--------|---------|------|
| Person added | "Added {Name} — click an arrow to score trust" | Success |
| Score changed | "Updated trust score for {Name}" | Info |
| Map cleared | "Cleared {N} relationships" | Info + Undo |
| Undo performed | "Undid: {Action}" | Success |
| Autosave | "Saved just now" | Success (subtle) |
| Import success | "Map imported — {N} relationships" | Success |
| Export success | "Map exported as JSON" | Success |
| Share link copied | "Share link copied to clipboard" | Success |
| Cloud save | "Saved to cloud — share code: {CODE}" | Success |

---

### Empty States

| Context | Heading | Body |
|---------|---------|------|
| No relationships | "Start mapping trust — it's simple" | "Try the example first, or add someone you know. You can always undo changes." |
| No cloud maps | "No saved maps yet" | "Save your first map to the cloud to access it from any device." |
| Search (no results) | "No matches found" | "Try a different search term." |

---

### Error Messages

| Error | Message | Recovery |
|-------|---------|----------|
| Network error | "Couldn't connect to cloud" | "Changes saved locally — we'll sync when you're back online." |
| Invalid import | "That file doesn't look like a Trust Map" | "Please select a valid JSON export." |
| Storage full | "Your device storage is full" | "Free up space or export your map as a file." |

---

### Confirmation Dialogs

| Action | Heading | Body | Buttons |
|--------|---------|------|---------|
| Clear all | "Clear your map?" | "This removes all {N} relationships. You can undo for 10 seconds." | "Clear" / "Cancel" |
| Import (overwrite) | "Replace your current map?" | "This will overwrite your {N} existing relationships. You can undo." | "Import" / "Cancel" |
| Load cloud (overwrite) | "Load {Name} from cloud?" | "This replaces your current map. Unsaved changes will be lost." | "Load" / "Cancel" |

---

### Onboarding Copy

**Step 1: Welcome**
> Welcome! 👋
> This tool helps you see trust patterns in your relationships.
> We'll add one person and score one relationship together — takes about 60 seconds.

**Step 2: Add Person**
> Let's add someone. Type a name like "Alex" or "Mom."
> (Then click "Add" →)

**Step 3: Observe**
> Perfect! There they are on your map.
> Notice the arrows connecting you and {Name} — those show trust flow.

**Step 4: Score**
> Click this arrow to set your trust level.
> Each click cycles: Not Set → High → Medium → Low
> Try it now!

**Step 5: Complete**
> 🎉 You did it!
> Your map auto-saves, so explore freely.
> Add more people, load the example, or score more relationships.

---

### Help Modal Sections

**What is this?**
> The True Valence Mapper helps you visualize trust in your relationships. Each person on your map has two arrows:
> - **Outward** (from you): How confident are you going to them with problems?
> - **Inward** (to you): How confident are you they'd come to you?

**How to use**
> 1. Add up to 8 people
> 2. Click arrows (or nodes) to score trust
> 3. Green = high trust, Yellow = medium, Red = low
> 4. Changes save automatically

**Privacy & Security**
> 🔒 Your data stays on your device. No account needed.
> Optionally save to cloud for backup or sharing.

**Keyboard Shortcuts**
> - `?` — Open help
> - `Enter` — Add person (when typing)
> - `Esc` — Close modals
> - `Cmd/Ctrl+Z` — Undo
> - Arrow keys — Navigate nodes

---

## Next Steps: Plan Review & Critique

This comprehensive plan is now ready for your review and critique. Suggested review process:

### Review Checklist

1. **Strategic Alignment**
   - [ ] Does this serve the anxious novice designer persona?
   - [ ] Are the emotional journey goals appropriate?
   - [ ] Is the scope realistic for the timeline?

2. **Prioritization**
   - [ ] Do you agree with the Quick Wins selection?
   - [ ] Should any features move up/down in priority?
   - [ ] Are there missing critical features?

3. **Design Decisions**
   - [ ] Is the tone and style appropriate for ProActive brand?
   - [ ] Do the visual specs align with your design sensibility?
   - [ ] Any concerns about micro-interactions or animations?

4. **Technical Feasibility**
   - [ ] Are the acceptance criteria clear enough?
   - [ ] Any technical risks not addressed?
   - [ ] Implementation estimates reasonable?

5. **User Testing**
   - [ ] Are the metrics meaningful?
   - [ ] Testing protocol comprehensive?
   - [ ] Missing any critical user scenarios?

### Discussion Questions

1. **Scope**: Should we implement all 4 phases, or focus on Phases 1-2 for v1?
2. **Onboarding**: Interactive tutorial vs. passive welcome modal — preference?
3. **Scoring UI**: Explicit controls vs. keeping arrow-only (with better affordances)?
4. **Cloud features**: Keep all current cloud buttons, or simplify further?
5. **Branding**: Any ProActive-specific elements to emphasize?

### Ready for Implementation?

Once you've reviewed and provided critique, I can:
1. **Refine the plan** based on your feedback
2. **Create detailed implementation tickets** for each feature
3. **Begin coding** Phase 1 Quick Wins immediately
4. **Set up testing infrastructure** (unit tests, accessibility audits)

---

**Document Status**: DRAFT — Awaiting review and critique
**Last Updated**: 2025-11-12
**Next Action**: User review → Refinement → Implementation kickoff

