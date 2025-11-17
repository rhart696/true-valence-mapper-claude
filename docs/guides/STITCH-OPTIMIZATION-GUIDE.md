# Google Stitch Optimization Guide for True Valence Mapper
## Advanced Prompting Strategies Based on 2025 Best Practices

**Date:** 2025-01-15
**Project:** ProActive True Valence Mapper

---

## 🔑 Key Insights About Google Stitch

Based on testing and community feedback, here's what works best:

### Platform Capabilities (2025)
- **Standard Mode (Gemini 2.5 Flash):** 350 generations/month - Fast, lightweight designs
- **Experimental Mode (Gemini 2.5 Pro):** 50 generations/month - High-quality, supports image uploads
- **Theme Editor:** Live customization of colors, fonts, corner radius, light/dark mode
- **Interactive Chat:** Conversational refinement with natural language
- **Export Options:** Paste to Figma (preserves layers/auto-layout) OR HTML/CSS code generation
- **Advanced Trick:** Copy design → Paste into Gemini → Prompt for refinements → Get instant improvements

---

## 📝 Optimized Prompting Strategy

### Phase 1: Initial Generation (Start High-Level)

Instead of the detailed prompt in AI-PLATFORM-PROMPTS.md, use this **simplified initial prompt**:

```
A relationship trust visualization web app called "ProActive True Valence Mapper" for life coaches and therapists.

Main screen shows:
- Header with ProActive ReSolutions branding and title
- Central circular trust map with "You" at center
- Up to 8 relationship nodes in circle around center
- Bidirectional arrows showing trust flow (your trust → them, their trust → you)
- Control buttons: Add Person, Save Map, Load Map, Export, Cloud Save
- Legend showing 4 trust levels (high/medium/low/not scored)
- Info panel explaining how to use

Color scheme: Navy blue (#2E4A8B) and cyan (#00A8CC) gradient background, white container, trust colors green/yellow/red/gray
```

**Why this works:**
- Stitch performs better with concise, focused prompts
- High-level description lets AI interpret creatively
- Easier to refine than starting too specific

---

### Phase 2: Iterative Refinement (One Change at a Time)

After initial generation, use **targeted single-focus prompts**:

#### Refinement Prompt 1: Layout Adjustment
```
Move the control buttons to a horizontal layout below the header and above the visualization area. Group related buttons together with subtle spacing.
```

#### Refinement Prompt 2: Visualization Details
```
In the central trust map, make the "You" node larger (40px radius) with navy blue fill #667eea and white text. Arrange the 8 relationship nodes in a perfect circle 150px radius from center.
```

#### Refinement Prompt 3: Arrow Styling
```
Show two arrows between center and each node - one solid arrow (your trust going out) and one dashed arrow (their trust coming in). Offset them parallel so both are visible. Use these colors: green #22c55e for high trust, yellow #eab308 for medium, red #ef4444 for low, gray #d1d5db for not scored.
```

#### Refinement Prompt 4: Component Details
```
Add a legend box below the visualization showing 4 items: "High Trust (1) - Solid Green", "Medium Trust (2) - Dashed Yellow", "Low Trust (3) - Dotted Red", "Not Scored - Gray Long Dash". Include small line samples showing each pattern.
```

#### Refinement Prompt 5: Accessibility
```
Add pattern differentiation to arrow styles: score 1 uses solid lines, score 2 uses 8px-4px dashed pattern, score 3 uses 2px-3px dotted pattern, score 0 uses 12px-6px long-dash pattern. This ensures colorblind users can distinguish trust levels.
```

#### Refinement Prompt 6: Mobile Responsiveness
```
Make this layout responsive - on mobile screens, stack the control buttons vertically and adjust the trust map to fit smaller viewports while maintaining clarity.
```

---

### Phase 3: Theme Customization (Use Built-in Editor)

**Instead of prompting for theme changes, use the Theme Editor:**

1. Click "Edit Theme" button in Stitch interface
2. Set colors directly:
   - Primary: #2E4A8B (Navy)
   - Secondary: #00A8CC (Cyan)
   - Background: Gradient from cyan to navy
3. Choose font: "Google Sans" or system UI stack
4. Adjust corner radius: 8-20px range
5. Toggle light/dark mode to test

**Pro Tip:** Theme changes apply globally and update instantly - much faster than re-prompting!

---

## 🚀 Advanced Techniques

### Technique 1: Image Upload (Experimental Mode Only)

If you have a wireframe sketch or reference design:

1. Switch to **Experimental Mode** (Gemini 2.5 Pro)
2. Upload your sketch/wireframe/screenshot
3. Add brief text prompt: "Convert this trust mapping wireframe into a polished UI with the ProActive color scheme (navy #2E4A8B, cyan #00A8CC)"

**Best for:** Translating hand-drawn sketches or existing designs into Stitch

---

### Technique 2: Copy to Gemini for Advanced Refinement

**Workflow:**
1. Generate design in Stitch
2. Copy the generated screen
3. Open Gemini (gemini.google.com)
4. Paste the design
5. Prompt Gemini: "Make this more minimal and increase white space" OR "Use darker tones and add subtle animations"
6. Gemini returns refined version
7. Copy back to Stitch or export directly

**Best for:** Complex stylistic changes that Stitch's chat might struggle with

---

### Technique 3: Component-by-Component Generation

Instead of generating the entire app at once, build **modular components**:

**Component 1: Trust Map Visualization**
```
Design just the circular trust map SVG visualization:
- Center "You" node (40px circle, navy #667eea)
- 8 white nodes around it in perfect circle
- Bidirectional arrows with color coding (green/yellow/red/gray)
- Interactive hover states on arrows
```

**Component 2: Control Panel**
```
Design a control panel with button groups:
- Group 1: Input field + "Add Person" button
- Group 2: "Save Map", "Load Map", "Clear All", "Version History"
- Group 3: "Export JSON", "Import JSON"
- Group 4: Cloud buttons with icons (Save, My Maps, Share)
Use navy (#2E4A8B) for primary buttons, cyan (#00A8CC) for cloud features
```

**Component 3: Modal Overlays**
```
Design a modal overlay for Version History:
- Semi-transparent black background (50% opacity)
- White centered card (700px width, 30px padding)
- Header with "Version History" title and close X button
- Scrollable list of version items with timestamps
- Action buttons: Restore, Compare, Delete
```

**Why this works:**
- Easier for AI to focus on one component at a time
- Higher quality results per component
- Can mix-and-match best versions in Figma

---

## 🎨 Mode Selection Strategy

### Use **Standard Mode** (Gemini 2.5 Flash) when:
- Exploring multiple layout concepts quickly
- Generating component variations
- Iterating on color schemes or typography
- You have 350 generations/month to experiment

### Use **Experimental Mode** (Gemini 2.5 Pro) when:
- Uploading wireframe sketches or reference images
- Need highest quality output for client presentation
- Complex multi-screen flows
- Final production-ready designs
- You have 50 generations/month - use wisely

---

## 📊 Prompt Patterns That Work Best

### ✅ DO: Clear, Focused Descriptions
```
Good: "A settings screen with toggle switches for notifications, privacy controls, and theme selection"
```

### ❌ DON'T: Over-Specify Implementation Details
```
Bad: "Create a div with class 'settings-container' containing a flexbox layout with justify-content space-between and align-items center, with 20px padding and border-radius 8px..."
```

### ✅ DO: Describe User Experience
```
Good: "When users click the arrow, it cycles through trust scores and the color changes smoothly from gray to green to yellow to red"
```

### ❌ DON'T: Use Technical Jargon
```
Bad: "Implement an onClick event handler that increments the state variable trustScore modulo 4 and updates the stroke CSS property"
```

### ✅ DO: Reference Visual Hierarchy
```
Good: "The circular trust map should be the focal point - make it larger and centered, with controls above and legend below"
```

### ❌ DON'T: Dump All Requirements at Once
```
Bad: [500-word prompt with every detail specified upfront]
```

---

## 🔄 Iteration Workflow

### Step 1: Generate Foundation (1 prompt)
High-level app description → Get initial layout

### Step 2: Refine Layout (2-3 prompts)
- Adjust component positioning
- Fix spacing and alignment
- Add missing elements

### Step 3: Style Components (2-3 prompts)
- Color adjustments
- Typography refinements
- Button styling

### Step 4: Add Interactions (1-2 prompts)
- Hover states
- Click behaviors
- Animations

### Step 5: Theme Editor (Direct manipulation)
- Fine-tune colors
- Adjust font sizes
- Toggle light/dark mode

### Step 6: Export Decision
- **Option A:** Paste to Figma → Add final polish → Developer handoff
- **Option B:** Export HTML/CSS → Integrate into codebase → Enhance with JavaScript

**Total prompts used:** 6-9 iterations (well within monthly limits)

---

## 🧪 Testing Different Approaches

### Approach A: Descriptive Narrative
```
Create a warm, professional coaching tool that helps therapists visualize their clients' relationship trust patterns. The interface should feel trustworthy yet approachable, with a circular trust map as the hero element. Users can add up to 8 people and score bidirectional trust on a simple scale.
```

### Approach B: Feature List
```
Trust mapping app with:
- Circular visualization (center = user, 8 nodes = relationships)
- Bidirectional trust scoring (1-3 scale)
- Color-coded arrows (green/yellow/red)
- Save/load functionality
- Cloud storage with sharing
- Version history
```

### Approach C: User Story
```
As a life coach, I want to help my client visualize their relationship network, so they can identify where trust is strong, weak, or asymmetric. The client should be able to add people, score how much they trust each person AND how much that person trusts them, and see patterns emerge visually.
```

**Test all three and compare results!** Stitch may respond better to different prompt styles.

---

## 🎯 Specific Fixes for Common Issues

### Issue 1: "Arrows overlap and are hard to distinguish"
**Fix Prompt:**
```
Offset the bidirectional arrows so they run parallel, 8px apart perpendicular to the line direction. The solid arrow (your trust) should be on one side, the dashed arrow (their trust) on the other side.
```

### Issue 2: "Legend doesn't show line patterns clearly"
**Fix Prompt:**
```
In the legend, show actual 40px line samples with the exact dash patterns, not just colored boxes. Each sample should demonstrate the pattern: solid, dashed (8-4), dotted (2-3), long-dash (12-6).
```

### Issue 3: "Mobile layout breaks the circular visualization"
**Fix Prompt:**
```
On mobile viewports (< 768px), make the trust map square instead of extending beyond screen width, and reduce node sizes proportionally while maintaining the circular arrangement.
```

### Issue 4: "Buttons don't have clear hierarchy"
**Fix Prompt:**
```
Make primary action buttons (Add Person, Save to Cloud) use solid navy blue #2E4A8B. Make secondary buttons (Load, Export) use outlined style with navy border and white background. Make destructive actions (Clear All, Delete) use red #ef4444.
```

### Issue 5: "Text is hard to read on gradient background"
**Fix Prompt:**
```
Place all content inside a white container (#FFFFFF) with 20px border radius and subtle shadow (0 20px 60px rgba(0,0,0,0.15)). Only the page background should use the cyan-to-navy gradient.
```

---

## 📤 Export Optimization

### For Figma Workflow:
1. Generate design in Stitch
2. Click "Paste to Figma"
3. In Figma:
   - Auto Layout is preserved
   - Layer structure is clean
   - Components can be converted to Figma components
   - Easy to share with design team
   - Maintain design system consistency

### For Code Export:
1. Generate design in Stitch
2. Click "Export HTML/CSS"
3. Review generated code:
   - HTML is semantic and clean
   - CSS uses modern practices (flexbox, grid)
   - Responsive breakpoints included
   - Ready to integrate into React/Vue/vanilla JS

**Pro Tip:** Use Figma export for design iteration, code export for developer handoff

---

## 🆕 New Features (2025 Updates)

### 1. Multi-Screen Flows
You can now prompt Stitch to generate entire flows:
```
Create a 3-screen flow for the trust mapper:
Screen 1: Welcome/onboarding with value proposition
Screen 2: Main trust mapping interface
Screen 3: Results/insights view showing trust patterns
```

### 2. Dark Mode Toggle
Built-in dark mode generation:
```
Generate this design with both light and dark mode variants
```

### 3. Component Library Export
Export reusable components:
```
Export the trust map visualization, button styles, and modal components as a reusable design system
```

### 4. Animation Hints
Stitch now interprets animation descriptions:
```
When clicking an arrow to change trust score, the color should smoothly transition over 300ms with ease-in-out timing
```

---

## 💡 Pro Tips from Community

### Tip 1: Reference Design Systems
```
Use a design system inspired by Material Design 3 with emphasis on accessibility and clear visual hierarchy
```

### Tip 2: Specify Platform
```
Design for web application (desktop-first, 1440px viewport)
```
vs
```
Design for iOS mobile app following Apple Human Interface Guidelines
```

### Tip 3: Use Comparison Prompts
```
Make this trust map more like Notion (minimal, lots of white space) and less like traditional enterprise software
```

### Tip 4: Iterate on Variants
Generate design → Ask for 3 variants → Pick best → Refine winner

### Tip 5: Combine with Gemini
Stitch design → Copy to Gemini → Ask "What UX improvements would you suggest?" → Apply insights → Regenerate

---

## 📋 Checklist for Successful Stitch Session

- [ ] Choose appropriate mode (Standard for exploration, Experimental for quality)
- [ ] Start with high-level prompt (< 100 words)
- [ ] Generate initial design
- [ ] Review and identify top 3 issues
- [ ] Refine with targeted prompts (1 issue per prompt)
- [ ] Use Theme Editor for color/font adjustments
- [ ] Test light and dark modes
- [ ] Export to Figma for design polish OR export code for development
- [ ] Document what worked for future iterations

---

## 🎓 Learning Resources

- **Stitch Prompt Guide:** discuss.ai.google.dev/t/stitch-prompt-guide/83844
- **Official Blog:** developers.googleblog.com/en/stitch-a-new-way-to-design-uis/
- **Codecademy Tutorial:** codecademy.com/article/google-stitch-tutorial
- **Community Examples:** Search "Google Stitch" on Twitter/X for real user examples

---

**Version:** 1.0
**Last Updated:** 2025-01-15
