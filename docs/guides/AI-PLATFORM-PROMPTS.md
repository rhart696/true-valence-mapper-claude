# AI Platform-Optimized Prompts for True Valence Mapper
## Generating Design Iterations Across 7 AI Platforms

**Project:** ProActive True Valence Mapper
**Purpose:** Generate iterations on different AI platforms to gather optimization insights
**Date:** 2025-01-15

---

## Table of Contents

1. [Google Stitch Prompt](#1-google-stitch-prompt)
2. [Google Opal Prompt](#2-google-opal-prompt)
3. [Google AI Studio (Gemini) Prompt](#3-google-ai-studio-gemini-prompt)
4. [Galileo.ai Prompt](#4-galileoai-prompt)
5. [UX Pilot Prompt](#5-ux-pilot-prompt)
6. [Figma Make Prompt](#6-figma-make-prompt)
7. [Magic Path Prompt](#7-magic-path-prompt)

---

## 1. Google Stitch Prompt

**Platform:** Google Stitch (stitch.withgoogle.com)
**Mode:** Standard Mode (text prompt) or Experimental Mode (with wireframe)
**Best For:** Rapid UI prototyping with export to Figma or frontend code

**💡 OPTIMIZATION TIP:** See [STITCH-OPTIMIZATION-GUIDE.md](STITCH-OPTIMIZATION-GUIDE.md) for advanced strategies, iterative refinement techniques, and 2025 best practices. The prompt below is intentionally detailed for reference, but **start with a simpler high-level prompt** (see guide) and refine iteratively for best results.

### Quick Start Prompt (Recommended - Use This First!)

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

**Then refine iteratively with focused prompts like:**
- "Make the control buttons horizontal layout with subtle grouping"
- "Add bidirectional arrow offset so both directions are clearly visible"
- "Show line patterns in legend: solid, dashed (8-4), dotted (2-3), long-dash (12-6)"

---

### Detailed Prompt (Reference - For Copy/Paste if Needed)

```
Create a relationship trust visualization web application called "ProActive True Valence Mapper" with the following specifications:

GOAL: Design a professional coaching tool that helps users visualize bidirectional trust flow in their personal and professional relationships.

LAYOUT & STRUCTURE:
- Full-width container with white background and rounded corners (20px)
- Header section with ProActive ReSolutions logo, main title "ProActive True Valence Mapper", and subtitle "Visualize trust flow in your relationships"
- Central visualization area (minimum 500px height) with light gray background (#f8f9fa)
- Control panel with button groups for managing relationships
- Legend section below visualization showing 4 trust levels
- Information panel explaining how to use the tool

KEY COMPONENTS:

1. Relationship Input Controls (top):
   - Text input field for person's name (max 20 characters)
   - "Add Person" button (navy blue #2E4A8B)
   - Display "Relationships: X / 8" counter
   - Button group: "Clear All", "Save Map", "Load Map", "Version History"
   - Button group: "Export JSON", "Import JSON", "Load Example"
   - Cloud storage buttons (cyan #00A8CC): "Save to Cloud", "My Cloud Maps", "Get Share Link"

2. Central Visualization (SVG-based):
   - Circular layout with "You" node at center (40px radius circle, filled #667eea)
   - Up to 8 relationship nodes arranged in circle around center (30px radius, white fill with #667eea stroke)
   - Bidirectional arrows between center and each person:
     * Solid arrow (outward): Your trust going TO them
     * Dashed arrow (inward): Their trust coming TO you
   - Arrows offset parallel (8px perpendicular) to show both directions clearly

3. Trust Level Colors & Patterns (for accessibility):
   - Score 1 (High Trust): Solid green line (#22c55e, no dash pattern)
   - Score 2 (Medium Trust): Dashed yellow line (#eab308, dash pattern 8,4)
   - Score 3 (Low Trust): Dotted red line (#ef4444, dash pattern 2,3)
   - Score 0 (Not Scored): Long-dash gray line (#d1d5db, dash pattern 12,6)

4. Trust Definitions Panel:
   - Light green background (#e8f5e9) with green left border (4px #22c55e)
   - Two-column grid layout explaining:
     * Outward Trust: "How confident am I that I'd go to them with a problem?"
     * Inward Trust: "How confident am I that they'd come to me with a problem?"

5. Interactive Behavior:
   - Clicking arrows cycles through trust scores (0→1→2→3→0)
   - Hover effects on nodes and arrows
   - All elements keyboard accessible with focus states (cyan outline #00A8CC)

COLOR PALETTE:
- Primary Navy: #2E4A8B
- Primary Cyan: #00A8CC
- Background Gradient: Linear gradient from #00A8CC to #2E4A8B (135 degrees)
- White containers with subtle shadows
- Trust colors: Green #22c55e, Yellow #eab308, Red #ef4444, Gray #d1d5db

VISUAL STYLE:
- Professional, clean, modern design
- Rounded corners throughout (8-20px)
- Subtle shadows for depth
- Clear typography hierarchy
- Mobile responsive layout

EXPORT:
Generate clean frontend code (HTML/CSS/JavaScript) with SVG visualization and ensure accessibility features (keyboard navigation, ARIA labels, screen reader support).
```

### Refinement Prompts (Use After Initial Generation):

```
ITERATION 1: Fix the circular arrangement of relationship nodes to be evenly spaced in a perfect circle 150px radius from center

ITERATION 2: Make the bidirectional arrows more distinct - ensure the outward (solid) and inward (dashed) arrows are clearly parallel and offset by 8px perpendicular to the main line

ITERATION 3: Add a help button (?) in the top-right corner that opens a modal with usage instructions

ITERATION 4: Ensure all interactive elements have clear hover states and 3px cyan (#00A8CC) focus outlines for keyboard navigation
```

---

## 2. Google Opal Prompt

**Platform:** Google Opal (opal.withgoogle.com)
**Mode:** Workflow Builder (Natural Language + Visual Editor)
**Best For:** Multi-step AI workflows and app logic chains

### Optimized Prompt

```
Create an AI-powered relationship trust mapping application workflow called "ProActive True Valence Mapper" that helps users visualize and analyze bidirectional trust patterns in their relationships.

APP DESCRIPTION:

Build a multi-step workflow that:
1. Accepts user input for relationship names (up to 8 people)
2. Collects bidirectional trust scores for each relationship
3. Generates a visual circular trust map with SVG graphics
4. Provides AI-powered insights on trust patterns
5. Saves and retrieves maps from cloud storage
6. Generates shareable links with unique codes

WORKFLOW STEPS:

STEP 1 - User Input Collection:
- Input field: Person's name (text, max 20 characters, validated for XSS)
- Constraint: Maximum 8 relationships
- Duplicate check (case-insensitive)
- Store in relationships array with unique ID and timestamp

STEP 2 - Trust Score Collection:
For each relationship, collect two scores (1-3 scale):
- Outward Trust Score: "How confident am I that I'd go to them with a problem?"
  * 1 = High trust (definitely would)
  * 2 = Medium trust (maybe, depends)
  * 3 = Low/No trust (unlikely)
  * 0 = Not yet scored
- Inward Trust Score: "How confident am I that they'd come to me with a problem?"
  (same 1-3 scale)

STEP 3 - Visualization Generation:
Generate SVG circular layout with:
- Center node: "You" (40px circle, navy blue #2E4A8B)
- Relationship nodes: Arranged in circle 150px radius from center (30px circles)
- Bidirectional arrows with colors:
  * Green (#22c55e) solid = High trust (score 1)
  * Yellow (#eab308) dashed = Medium trust (score 2)
  * Red (#ef4444) dotted = Low trust (score 3)
  * Gray (#d1d5db) long-dash = Not scored (score 0)

STEP 4 - AI Pattern Analysis (using Gemini):
Analyze the trust map data and provide insights on:
- Asymmetric relationships (where inward ≠ outward trust)
- Low trust zones (scores of 3)
- Balanced relationships (where inward = outward and scores are 1-2)
- Overall trust network health
- Suggested conversation starters for imbalanced relationships

Prompt template for AI analysis:
"Analyze this trust map data: {relationships} with scores {trustScores}. Identify patterns, asymmetries, and provide 3-5 actionable insights for improving relationship trust dynamics. Format as bullet points."

STEP 5 - Cloud Storage Operations:
- Save map to Supabase with:
  * Map name (user-provided)
  * Relationships array
  * Trust scores object
  * Timestamp
  * Anonymous user ID (no login required)
  * Shareable code generation (8-character alphanumeric)
- Retrieve user's saved maps list
- Load specific map by ID or share code
- Row-level security for data privacy

STEP 6 - Export & Sharing:
- Generate unique share link: `https://[domain]/?share=[code]`
- Export to JSON file with metadata
- Import from JSON with validation
- Version history tracking with change summaries

WORKFLOW LOGIC:
- Use parallel execution where possible (e.g., AI analysis + save operations)
- Include error handling for each step with user-friendly messages
- Auto-save on significant changes (add person, score change)
- Validate all inputs before processing
- Implement toast notifications for user feedback

DATA STRUCTURE:
```json
{
  "relationships": [
    {"id": 1234567890, "name": "Person Name"}
  ],
  "trustScores": {
    "1234567890": {
      "outward": 1,
      "inward": 2
    }
  },
  "metadata": {
    "mapName": "My Trust Map",
    "created": "2025-01-15T10:00:00Z",
    "updated": "2025-01-15T11:30:00Z"
  }
}
```

CUSTOMIZATION INSTRUCTIONS:
- All prompts for AI analysis should be editable in the visual workflow
- Each step should show its input/output clearly
- Enable step-by-step debugging
- Allow users to test individual steps before full workflow execution
```

---

## 3. Google AI Studio (Gemini) Prompt

**Platform:** Google AI Studio (aistudio.google.com)
**Mode:** Freeform Prompt (Gemini 2.5 Pro)
**Best For:** Generating app concepts, UI copy, and feature recommendations

### Optimized Prompt

```
You are an expert UX/UI designer and relationship coach specializing in trust visualization tools. I need you to help me create a comprehensive design specification for an enhanced version of the "ProActive True Valence Mapper" application.

CONTEXT:
The True Valence Mapper is a web-based coaching tool that helps individuals visualize bidirectional trust flow in their personal and professional relationships. Users can map up to 8 relationships, score trust levels in both directions (outward: their trust in others, inward: perceived trust from others), and identify patterns in their relationship network.

CURRENT FEATURES:
- Add up to 8 people to a circular trust map
- Score trust bidirectionally on a 1-3 scale (1=high, 2=medium, 3=low, 0=not scored)
- Visual representation using color-coded arrows (green/yellow/red/gray)
- Save/load functionality (local and cloud storage via Supabase)
- Export/import JSON files
- Version history with comparison tools
- Accessibility features (keyboard navigation, screen readers, color-blind friendly patterns)
- Shareable maps with unique codes
- Demo mode with sample data

TARGET USERS:
- Life coaches and therapists using it with clients
- Individuals doing self-reflection on relationships
- Team leaders assessing team dynamics
- Couples or family members in counseling

DESIGN GOALS:
- Professional, trustworthy aesthetic aligned with coaching/therapy context
- Clear visual hierarchy and intuitive interactions
- Accessible to all users including those with disabilities
- Mobile-responsive for use in coaching sessions
- Privacy-focused (data security is paramount)

YOUR TASK:

Generate detailed recommendations for the following enhancement areas:

1. **Visual Design Improvements:**
   - Suggest alternative color palettes that convey trust/safety while remaining accessible
   - Recommend typography choices that feel professional yet warm
   - Propose layout improvements for better information hierarchy
   - Suggest micro-interactions and animations that enhance understanding without distraction

2. **UX Enhancement Ideas:**
   - New features that would help coaches facilitate better conversations
   - Ways to make trust scoring more intuitive or nuanced
   - Onboarding flow improvements for first-time users
   - Better ways to visualize asymmetric relationships

3. **AI-Powered Features (using Gemini):**
   - How could AI provide insights on trust patterns?
   - What conversation starters could AI generate based on trust map analysis?
   - How could AI help users reflect on changes over time?
   - What safety considerations are needed for AI-generated relationship advice?

4. **Mobile Experience:**
   - How should the circular visualization adapt to small screens?
   - Touch-optimized interactions for scoring trust levels
   - Mobile-specific features (e.g., share via messaging apps)

5. **Coaching Tools Integration:**
   - Session note-taking features for coaches
   - Client progress tracking over multiple sessions
   - Anonymized case study exports for coach training
   - Integration with common coaching platforms or tools

6. **Privacy & Security Enhancements:**
   - Additional data protection measures
   - Clearer privacy controls and disclaimers
   - Options for fully offline operation
   - Data export and deletion features for GDPR compliance

FORMAT YOUR RESPONSE:
For each area (1-6), provide:
- 3-5 specific, actionable recommendations
- Brief rationale for each recommendation
- Priority level (Must-have, Should-have, Nice-to-have)
- Implementation complexity estimate (Low/Medium/High)

CONSTRAINTS:
- Must maintain current core functionality
- Keep it simple enough for non-technical users
- Privacy and data security cannot be compromised
- Should work on standard browsers without heavy dependencies
- Loading time must remain under 3 seconds

Use your deep understanding of UX best practices, accessibility standards (WCAG 2.1), and relationship dynamics to provide thoughtful, evidence-based recommendations that would genuinely improve the user experience and coaching effectiveness of this tool.
```

### Follow-up Prompts for Specific Outputs:

```
FOLLOW-UP 1: Based on your recommendations, write the complete onboarding flow copy (welcome screens, tooltips, help documentation) that explains how to use the trust mapper in a warm, non-judgmental tone suitable for a coaching context.

FOLLOW-UP 2: Generate 10 example "insight statements" that the AI could provide when analyzing a trust map, covering different patterns (asymmetric relationships, low trust zones, balanced networks, isolated nodes, etc.). Make them supportive and solution-focused.

FOLLOW-UP 3: Create a detailed user journey map for a life coach using this tool with a client during a 60-minute coaching session. Include touchpoints, pain points, emotions, and opportunities for tool enhancement.
```

---

## 4. Galileo.ai Prompt

**Platform:** Galileo.ai (app.galileo.ai)
**Mode:** UI Design Generation (Mobile or Web)
**Best For:** High-fidelity UI mockups with design system consistency

### Optimized Prompt

```
Design a high-fidelity UI for a professional relationship trust visualization web application called "ProActive True Valence Mapper" for desktop/web platform.

DETAILED REQUIREMENTS:

**Platform:** Web application (desktop-first, 1200px-1440px viewport)

**Application Purpose:**
A coaching and self-reflection tool that helps users visualize bidirectional trust flow in their personal and professional relationships through an interactive circular trust map.

**Color Palette:**
- Primary Navy: #2E4A8B (buttons, headings, primary elements)
- Primary Cyan: #00A8CC (accents, cloud features, focus states)
- Background Gradient: Linear gradient 135deg from #00A8CC to #2E4A8B
- Container White: #FFFFFF with 20px border radius
- Trust Score Green: #22c55e (high trust, solid lines)
- Trust Score Yellow: #eab308 (medium trust, dashed lines)
- Trust Score Red: #ef4444 (low trust, dotted lines)
- Trust Score Gray: #d1d5db (not scored, long-dashed lines)
- Light background: #f8f9fa
- Info panel: #fef3c7 with #fcd34d border

**Typography:**
- Primary font: System UI stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- Main heading: 2.2em, weight 600, color #2E4A8B
- Subtitle: 1.1em, color #666
- Body text: 16px, line-height 1.6
- Button text: 16px, white

**Layout Structure:**

1. **Header Section** (centered):
   - ProActive ReSolutions logo (300px max-width)
   - Main title: "ProActive True Valence Mapper"
   - Subtitle: "Visualize trust flow in your relationships"
   - Help button (?) in top-right corner: 40px circular button, navy blue

2. **Controls Section** (flexible wrap layout with centered alignment):
   - Group 1: Input field (text) + "Add Person" button
   - Group 2: "Clear All", "Save Map", "Load Map", "Version History" buttons
   - Group 3: "Export JSON", "Import JSON", "Load Example" buttons
   - Group 4 (Cloud): "☁️ Save to Cloud", "📁 My Cloud Maps", "🔗 Get Share Link" (cyan color)
   - All buttons: 10px vertical padding, 20px horizontal padding, 8px border radius, navy blue except cloud buttons (cyan)
   - Relationship counter below: "Relationships: X / 8" (centered, gray text)

3. **Central Visualization Area** (min-height 500px):
   - Light gray background (#f8f9fa), 15px padding, 15px border radius
   - SVG canvas showing:
     * Center node "You": 40px radius circle, filled #667eea, white text "You"
     * 8 surrounding nodes: 30px radius circles, white fill, #667eea stroke, person names inside
     * Nodes arranged in perfect circle, 150px radius from center
     * Bidirectional arrows between center and each node:
       - Outward arrow (solid, your trust): slightly offset to one side
       - Inward arrow (dashed, their trust): offset to other side
       - Arrow colors based on trust score (green/yellow/red/gray)
       - Arrowheads pointing toward target
   - Interactive: arrows clickable to cycle scores, hover effects

4. **Legend Section** (horizontal centered layout):
   - Background: #f8f9fa, 15px padding, 10px border radius
   - 4 legend items showing:
     * Green solid line: "High Trust (1) - Solid"
     * Yellow dashed line: "Medium Trust (2) - Dashed"
     * Red dotted line: "Low/No Trust (3) - Dotted"
     * Gray long-dash line: "Not Scored - Long Dash"
   - Each item: 40px line sample + label text

5. **Trust Definitions Panel**:
   - Light green background (#e8f5e9), 20px padding
   - 4px left border (#22c55e), 8px border radius
   - Title: "What Am I Scoring?" (navy blue, 1.1em)
   - Two-column grid:
     * Left: "→ Outward Trust (Solid Arrow)" + italic question
     * Right: "← Inward Trust (Dashed Arrow)" + italic question

6. **Info Panel** (How to Use):
   - Light yellow background (#fef3c7), 15px padding
   - 1px border (#fcd34d), 10px border radius
   - Title: "How to Use" (brown #92400e)
   - 4-step numbered instructions with bold labels

**Visual Style:**
- Modern, professional, trustworthy design
- Ample white space and breathing room
- Subtle drop shadows on containers (0 20px 60px rgba(0,0,0,0.15))
- Rounded corners throughout (8-20px depending on element)
- Clear visual hierarchy with size, weight, and color
- Hover states: slightly darker button colors, thicker arrow strokes
- Focus states: 3px cyan outline with 2px offset

**UI Components to Include:**
- Input fields with clear focus states
- Primary action buttons (navy blue)
- Secondary action buttons (cyan for cloud features)
- SVG-based visualization with interactive elements
- Modal overlay designs (for help, version history, cloud maps)
- Toast notification design (success/error/info states)
- Legend with color and pattern samples
- Information panels with subtle backgrounds

**Interaction Indicators:**
- Cursor changes on hover (pointer for clickable elements)
- Button hover states (darker shade)
- Arrow hover states (thicker stroke, increased opacity)
- Disabled button state (gray #ccc, cursor not-allowed)
- Loading states for cloud operations

**Accessibility Considerations:**
- High contrast ratios (WCAG AA minimum)
- Pattern differentiation in addition to color (solid/dashed/dotted lines)
- Large click targets (minimum 44x44px)
- Clear focus indicators (3px cyan outline)
- Readable font sizes (minimum 16px for body text)

Generate multiple design variants exploring different:
- Visual treatments for the central trust map
- Button grouping and layout arrangements
- Color palette alternatives (while maintaining accessibility)
- Typography hierarchies

Ensure the design feels professional enough for use in therapy/coaching contexts while being approachable and non-intimidating for personal use.
```

### Iteration Prompts:

```
ITERATION 1: Create a mobile-responsive version of this design for 375px width viewport, with a vertically stacked layout and touch-optimized controls

ITERATION 2: Design the modal overlay for "Version History" showing a timeline of saved versions with timestamps, comparison tools, and restore buttons

ITERATION 3: Create a dark mode variant of this design with appropriate color adjustments while maintaining accessibility contrast ratios

ITERATION 4: Design the empty state screens: (1) No relationships added yet, (2) Loading cloud maps, (3) No saved versions
```

---

## 5. UX Pilot Prompt

**Platform:** UX Pilot (uxpilot.ai)
**Mode:** AI UI Generator or Figma Plugin
**Best For:** Rapid wireframing and UX concept exploration

### Optimized Prompt

```
Create UX wireframes and high-fidelity designs for "ProActive True Valence Mapper" - a relationship trust visualization web application used by coaches and individuals for mapping bidirectional trust patterns.

APPLICATION OVERVIEW:
A coaching tool that helps users create a visual map of their relationship network, scoring trust levels in both directions (their trust in others + perceived trust from others), identifying patterns, and tracking changes over time.

TARGET USERS:
- Life coaches working with clients
- Therapists facilitating relationship discussions
- Individuals doing personal reflection
- Team leaders assessing team dynamics

WIREFRAME SPECIFICATIONS:

Create low-fidelity wireframes with grayscale colors, placeholder text represented as lorem ipsum, image placeholders shown as boxes with X marks, and minimal styling – focus on layout and hierarchy only.

**Screen 1: Main Application View**

Layout structure (desktop, 1200px width):
- Fixed header area: Logo placeholder (300x80px) + main title + subtitle
- Help icon: Top-right corner (40x40px circle)
- Control panel: Horizontal button groups below header
  * Group 1: Text input field + Add button
  * Group 2: Map management buttons (4 buttons: Clear, Save, Load, History)
  * Group 3: Import/Export buttons (3 buttons)
  * Group 4: Cloud storage buttons (3 buttons with icons)
- Relationship counter: Centered below controls
- Main visualization area: Large centered box (600x500px minimum)
  * Center circle: "You" node
  * 8 surrounding circles: Relationship nodes
  * Lines connecting center to each node (bidirectional)
- Legend box: Below visualization, showing 4 line pattern types
- Info panels: Two stacked boxes below legend
  * Panel 1: Trust definitions (2-column grid)
  * Panel 2: How-to instructions

**Screen 2: Empty State**
- Same layout as Screen 1
- Visualization area shows:
  * Only center "You" node
  * Placeholder message: "Add people to start mapping trust"
  * "Load Example" button centered below message
- All controls visible but "Clear All" is disabled

**Screen 3: Modal Overlays** (show 3 variations)

Variation A: Version History Modal
- Overlay darkens background (50% black)
- Centered modal box (600px width)
- Header: "Version History" + close button (X)
- Statistics cards: 4 metrics in grid (total versions, manual saves, auto saves, storage)
- Version list: Scrollable area with version cards
  * Each card: Version number, timestamp, description, action buttons
- Footer buttons: Save New Version, Export History, Clear All

Variation B: Help Modal
- Larger modal (700px width)
- Tabbed or sectioned content:
  * Quick Start Guide (numbered steps)
  * For Coaches section
  * Privacy & Security section
  * Keyboard Shortcuts section
- Feature grid showing key capabilities

Variation C: Cloud Maps Modal
- Modal showing list of saved maps
- Each map item: Name, last updated date, share code, action buttons (Load, Share, Delete)
- Empty state variant: "No saved maps yet" message

**Screen 4: Mobile Wireframe** (375px width)
- Vertically stacked layout
- Collapsible control sections
- Visualization area: Square aspect ratio, scaled to fit
- Touch-optimized button sizes (minimum 44px height)
- Bottom sheet for modals instead of centered overlays

**Screen 5: User Flow Diagram**
Create a flow diagram showing:
1. Landing → Welcome modal or direct to app
2. Add people → Name input → Validation → Add to map
3. Score trust → Click arrow → Cycle through scores → Visual update
4. Save → Local storage OR Cloud storage (with authentication)
5. Share → Generate link → Copy to clipboard
6. Version history → View list → Compare versions → Restore

**Screen 6: Interaction States**
Show the different states for key interactions:
- Arrow clicking: Default → Hover → Active (score change animation)
- Button states: Default → Hover → Active → Disabled → Loading
- Input field: Empty → Focus → Filled → Error → Success
- Toast notifications: Success, Error, Warning, Info

**Screen 7: Sitemap/Information Architecture**
Create a sitemap showing:
- Main Application
  * Relationship Map (core feature)
  * Controls (add, manage, import/export)
  * Cloud Storage (save, load, share)
  * Version History (track changes, compare, restore)
- Modal Overlays
  * Welcome/Tutorial
  * Help Documentation
  * Privacy Disclaimer
  * Version History
  * Cloud Maps Library
  * Share Link Generator

UX REQUIREMENTS:
- Clear visual hierarchy with size and spacing
- Consistent spacing system (8px grid)
- Grouped controls for related functions
- Immediate visual feedback on interactions
- Error prevention (validation, confirmation dialogs)
- Progressive disclosure (advanced features in modals)
- Accessible tap targets for mobile (44x44px minimum)

FEATURES TO EMPHASIZE IN WIREFRAMES:
- The circular trust map is the focal point
- Bidirectional trust scoring is a core interaction
- Cloud storage and sharing are premium features
- Version history enables tracking changes over time
- Accessibility is built-in (keyboard navigation paths)

GENERATE:
1. Low-fidelity wireframes for screens 1-4
2. High-fidelity mockups for screen 1 (main view) with real UI treatment
3. User flow diagram (screen 5)
4. Interaction state variants (screen 6)
5. Sitemap diagram (screen 7)
6. Attention heatmap prediction for screen 1 (main view) to optimize layout

CUSTOM PROMPTS TO RUN:
- "Give me features for this relationship trust mapping tool" (to explore additional capabilities)
- "Show me alternative layouts for the circular visualization on mobile devices"
- "Generate a complete onboarding flow with 3-5 tutorial screens for first-time users"
- "Create error states and empty states for all major interactions"
```

### Enhancement Prompts:

```
ENHANCE 1: Show me variations on how to display the bidirectional trust arrows in the visualization - explore different visual treatments (parallel arrows, curved arrows, arrow thickness indicating trust level, etc.)

ENHANCE 2: Design a coach dashboard view where a therapist can manage multiple client maps, track their progress over sessions, and compare trust patterns across clients (anonymized)

ENHANCE 3: Create a comparison view showing two versions of the same trust map side-by-side with visual highlighting of what changed (added relationships, removed relationships, score changes)
```

---

## 6. Figma Make Prompt

**Platform:** Figma Make (figma.com/make)
**Mode:** AI-Powered Figma Design Generation
**Best For:** Production-ready Figma designs with Auto Layout and components

**⚠️ CHARACTER LIMIT:** Figma Make has a 5,000 character maximum for initial prompts. Use the **Condensed Prompt** below, then refine with follow-up prompts.

### Condensed Prompt (4,950 characters - Use This!)

```
Build production-ready Figma design for "ProActive True Valence Mapper" - a coaching tool for visualizing bidirectional trust in relationships.

CONTEXT: Used by therapists and coaches. Users map up to 8 relationships with trust scores in both directions.

PLATFORM: Web app, desktop-first (1440px), mobile (375px)

VISUAL STYLE:
- Navy (#2E4A8B) + Cyan (#00A8CC), gradient background
- White container, 20px radius, soft shadow
- System font, 16px base, clear hierarchy

KEY COMPONENTS (with Auto Layout):

1. Header: Logo + "ProActive True Valence Mapper" (36px navy) + subtitle + help button (top-right)

2. Controls (horizontal wrap, 20px gap):
- Input + "Add Person" button (navy)
- Buttons: Clear/Save/Load/Version History (navy)
- Export/Import/Load Example (navy, green accent)
- Cloud: Save/My Maps/Share Link (cyan #00A8CC)
- Counter: "Relationships: X / 8"

3. Visualization (600x500px, #f8f9fa background):
- Center: "You" circle (80px, #667eea)
- 8 nodes in circle (60px, white, navy stroke)
- Bidirectional arrows with patterns:
  * High trust (1): Green #22c55e, solid
  * Medium (2): Yellow #eab308, dashed (8-4)
  * Low (3): Red #ef4444, dotted (2-3)
  * Not scored (0): Gray #d1d5db, long-dash (12-6)

4. Legend: 4 items showing line patterns + colors

5. Trust Definitions (green bg #e8f5e9, 4px green border):
- "→ Outward: How confident I'd go to them?"
- "← Inward: How confident they'd come to me?"

6. Info Panel (yellow #fef3c7, numbered steps)

7. Modals (3 variants):
- Version History: 700px, stats cards, timeline
- Help: 800px, feature grid, shortcuts
- Cloud Maps: List with name/date/actions

8. Toast: Icon + message + close (success/error/warning/info)

9. Buttons (10px/20px padding, 8px radius):
- Primary Navy (#2E4A8B), Cyan (#00A8CC)
- Secondary (white, navy border)
- Success (#22c55e), Danger (#ef4444)
- States: Default/Hover/Active/Disabled/Loading
- Focus: 3px cyan outline

AUTO LAYOUT:
- Spacing tokens: 8/12/16/20/24/32px
- Wrap button groups on small screens
- Stack panels vertically on mobile
- Header fixed top, content scrollable

BUILD SCREENS:
1. Main (empty state)
2. Main (with 8 relationships mapped)
3. Version History modal
4. Help modal
5. Cloud Maps modal
6. Mobile (375px stacked layout)

INTERACTION STATES:
- Arrows: Default/Hover/Active
- Buttons: Default/Hover/Active/Disabled/Loading
- Inputs: Empty/Focus/Filled/Error/Success

COLOR STYLES:
Primary Navy #2E4A8B, Cyan #00A8CC, White #FFF, Light #f8f9fa
Trust: Green #22c55e, Yellow #eab308, Red #ef4444, Gray #d1d5db
Info: Yellow bg #fef3c7 border #fcd34d, Green bg #e8f5e9 border #22c55e

TYPOGRAPHY:
H1 36px/600/navy, H2 24px/600/navy, H3 18px/600/navy
Body 16px/400/#333/1.6, Small 14px/400/#666/1.5
Button 16px/500/white, Caption 12px/400/#999

SHADOWS:
Container: 0 20px 60px rgba(0,0,0,0.15)
Button hover: 0 4px 8px rgba(0,0,0,0.1)
Focus: 3px #00A8CC offset 2px

ENSURE:
- Reusable components with variants
- 8px grid spacing
- Color/text styles defined
- Clear layer names
- Proper nesting
- WCAG AA contrast
- 44px touch targets mobile
- Responsive constraints

EXPORT: High-fidelity artboards, component library, style guide, prototype connections, dev handoff notes
```

**Character count:** 4,950 / 5,000

---

### Refinement Prompts for Figma Make

After initial generation, use these **focused refinement prompts**:

#### Refine 1: Component Variants
```
Create detailed component variant system for trust score arrows:
- 4 score levels (0,1,2,3) × 2 directions (inward/outward) × 3 states (default/hover/active)
- Total 24 arrow variants with proper naming: "Arrow/Score-1/Outward/Default"
```

#### Refine 2: Auto Layout Optimization
```
Optimize Auto Layout for responsive behavior:
- Control panel wraps at 1024px breakpoint
- Legend stacks vertically below 768px
- Trust definitions switch from 2-column to stacked at 640px
- All spacing uses 8px tokens
```

#### Refine 3: Modal Components
```
Build complete modal system with consistent structure:
- All modals: 50% black overlay, white card, top-right X close
- Version History: Include version comparison diff view
- Cloud Maps: Add empty state with illustration
- Help: Add tabbed navigation for sections
```

#### Refine 4: Interaction States
```
Add comprehensive interaction states for all components:
- Buttons: Subtle scale on hover (102%), darker shade on active
- Arrows: Thicker stroke on hover (3px → 4px), pulse animation on click
- Inputs: Animated focus ring, error shake animation
- Modals: Fade in 200ms, slide up 20px
```

#### Refine 5: Mobile Optimization
```
Create mobile-responsive version (375px):
- Vertically stacked layout with collapsible sections
- Visualization becomes square (350x350px) to fit width
- Touch-optimized controls (minimum 48px height)
- Bottom navigation for mobile actions
```

---

### Detailed Reference (For Advanced Customization)

**Note:** The original 22K character detailed prompt has been condensed above. For complete specifications, refer to the component descriptions in the condensed prompt and use the refinement prompts to add additional detail iteratively.

**Original detailed sections included:**
- Complete component specifications (9 components)
- Auto Layout implementation details
- Navigation flow requirements
- Color/typography/shadow style systems
- Interaction state matrices
- Responsive breakpoint specifications

**Best Practice:** Start with condensed prompt, generate initial design, then use refinement prompts 1-5 to add detail progressively.

---

### OLD DETAILED PROMPT (Kept for historical reference - 22K chars, TOO LONG for Figma Make)

```
[Archived - Use condensed version above]

Build a complete, production-ready Figma design for "ProActive True Valence Mapper"...

1. **Header Component**:
   - Auto Layout vertical, centered alignment
   - ProActive ReSolutions logo (300px max-width, placeholder rectangle with company name)
   - H1: "ProActive True Valence Mapper" (36px, weight 600, #2E4A8B)
   - Subtitle: "Visualize trust flow in your relationships" (18px, #666)
   - Help button: Absolute positioned top-right (40x40px circle, navy, "?" icon)

2. **Control Panel Component Group**:
   - Auto Layout horizontal with wrapping, 20px gap, centered
   - Button component variants: Default, Hover, Active, Disabled, Loading
   - Input field component with label, focus state, error state
   - Group 1: Text input ("Person's name" placeholder) + "Add Person" button (navy)
   - Group 2: 4 buttons (Clear All, Save Map, Load Map, Version History) - navy
   - Group 3: 3 buttons (Export JSON, Import JSON, Load Example) - navy, "Load Example" in green
   - Group 4: 3 cloud buttons (Save to Cloud, My Cloud Maps, Get Share Link) - cyan (#00A8CC)
   - Counter text component: "Relationships: X / 8" (centered, 14px, #666)

3. **Visualization Area Component**:
   - Frame: 600x500px minimum, background #f8f9fa, 15px border radius, 20px padding
   - SVG elements as Figma shapes:
     * Center circle: 80px diameter, fill #667eea, white text "You"
     * 8 relationship circles: 60px diameter, white fill, #667eea stroke (2px)
     * Position in perfect circle, 300px diameter from center to center
   - Arrow component with variants for trust scores:
     * Score 1: Green (#22c55e), solid stroke
     * Score 2: Yellow (#eab308), dashed stroke (8px dash, 4px gap)
     * Score 3: Red (#ef4444), dotted stroke (2px dash, 3px gap)
     * Score 0: Gray (#d1d5db), long dash (12px dash, 6px gap)
   - Bidirectional arrows: One solid (outward), one dashed pattern (inward), offset parallel

4. **Legend Component**:
   - Auto Layout horizontal, 30px gap, centered
   - Background #f8f9fa, 15px padding, 10px border radius
   - 4 legend items, each with:
     * 40px line sample (showing pattern and color)
     * Label text (13px, #333)
   - Items: "High Trust (1) - Solid", "Medium Trust (2) - Dashed", "Low/No Trust (3) - Dotted", "Not Scored - Long Dash"

5. **Trust Definitions Panel**:
   - Background #e8f5e9, 20px padding, 8px border radius
   - 4px left border in green (#22c55e)
   - Title: "What Am I Scoring?" (18px, weight 600, #2E4A8B)
   - Auto Layout horizontal (2 columns on desktop, stack on mobile)
   - Each column:
     * Bold label: "→ Outward Trust" or "← Inward Trust"
     * Italic question text (14px, #555)

6. **Info Panel Component**:
   - Background #fef3c7, 15px padding, 10px border radius
   - 1px border #fcd34d
   - Title: "How to Use" (16px, weight 600, #92400e)
   - 4-step numbered list with bold step labels
   - Line height 1.6 for readability

7. **Modal Overlay Components** (Build 3 Modal Variants):

   **Modal A: Version History**
   - Overlay: Full screen, 50% black opacity background
   - Modal box: 700px width, white, 30px padding, 15px border radius, centered
   - Close button: Top-right X (32x32px, clickable)
   - Statistics grid: 4 stat cards (total versions, manual saves, auto saves, storage)
   - Version timeline: Auto Layout vertical, scrollable
     * Version item component:
       - Border-left 4px (#2E4A8B or #00A8CC for current)
       - Background #f5f5f5, hover state #e8f4f8
       - Version number, timestamp, description, action buttons
   - Footer buttons: Save Version, Export History, Clear All

   **Modal B: Help Documentation**
   - Larger modal: 800px width
   - Sections with h3 headings
   - Feature grid: 2x2 cards showing key features
   - Keyboard shortcuts list
   - Privacy information panel

   **Modal C: My Cloud Maps**
   - Map list items: Name, date, share code, actions (Load, Share, Delete)
   - Empty state variant: Icon + message + CTA button

8. **Toast Notification Component**:
   - Auto Layout horizontal, 12px gap
   - Icon + message text + close button
   - Variants: Success (green), Error (red), Warning (yellow), Info (blue)
   - Positioning: Top-right corner, 20px margin
   - Animation: Slide in from right, fade out after 3 seconds

9. **Button Component System**:
   - Base: 10px top/bottom padding, 20px left/right padding
   - Border radius: 8px
   - Font size: 16px
   - Variants:
     * Primary Navy: #2E4A8B background, white text
     * Primary Cyan: #00A8CC background, white text
     * Secondary: White background, navy border and text
     * Success: #22c55e background, white text
     * Danger: #ef4444 background, white text
   - States: Default, Hover (darker), Active (even darker), Disabled (gray), Loading (with spinner)
   - Focus state: 3px cyan outline, 2px offset

SPECIFY HOW TO USE AUTO LAYOUT:
- All containers should use Auto Layout with proper spacing tokens (8px, 12px, 16px, 20px, 24px, 32px)
- Buttons should have Auto Layout with fixed padding
- Modal overlays should be centered using constraints
- Responsive behavior: Wrap button groups on smaller screens, stack panels vertically on mobile
- Use constraints properly: Header fixed to top, footer fixed to bottom, content scrollable

SPECIFIC DETAILS FOR EACH SECTION:

**Navigation Flow:**
Build the complete flow between screens:
1. Main application view (empty state)
2. Main application view (with relationships mapped)
3. Version History modal overlay
4. Help modal overlay
5. My Cloud Maps modal overlay
6. Share Link modal overlay
7. Mobile view (375px width)

**Interaction States:**
For each interactive element, build states:
- Arrows: Default, Hover, Active (score changing)
- Buttons: Default, Hover, Active, Disabled, Loading
- Input fields: Empty, Focus, Filled, Error, Success
- Modals: Closed, Open (with animation notes)

**Color Styles to Create:**
- Primary/Navy: #2E4A8B
- Primary/Cyan: #00A8CC
- Trust/High: #22c55e
- Trust/Medium: #eab308
- Trust/Low: #ef4444
- Trust/NotScored: #d1d5db
- Background/Gradient Start: #00A8CC
- Background/Gradient End: #2E4A8B
- Container/White: #FFFFFF
- Background/Light: #f8f9fa
- Info/Yellow Background: #fef3c7
- Info/Yellow Border: #fcd34d
- Success/Green Background: #e8f5e9
- Success/Green Border: #22c55e

**Typography Styles to Create:**
- H1/Main Title: 36px, weight 600, #2E4A8B
- H2/Section Title: 24px, weight 600, #2E4A8B
- H3/Subsection: 18px, weight 600, #2E4A8B
- Body/Regular: 16px, weight 400, #333, line-height 1.6
- Body/Small: 14px, weight 400, #666, line-height 1.5
- Button/Label: 16px, weight 500, white
- Caption: 12px, weight 400, #999

**Effects/Shadows to Create:**
- Container Shadow: 0px 20px 60px rgba(0, 0, 0, 0.15)
- Button Shadow (hover): 0px 4px 8px rgba(0, 0, 0, 0.1)
- Modal Overlay: 0px 0px 0px 9999px rgba(0, 0, 0, 0.5)
- Focus Outline: 3px solid #00A8CC, offset 2px

ENSURE:
- All elements use Auto Layout where applicable
- Components are reusable with proper variants
- Spacing is consistent using 8px grid system
- Color and text styles are defined and used throughout
- Layer names are clear and organized
- Groups and frames are properly nested
- Responsive behavior is defined with constraints
- Accessibility: color contrast ratios meet WCAG AA standards
- Touch targets are minimum 44x44px for mobile

EXPORT:
Create high-fidelity, production-ready Figma file with:
- All artboards organized and labeled
- Component library with all reusable elements
- Style guide page showing colors, typography, spacing, components
- Prototype connections showing key user flows
- Developer handoff notes with measurement specifications
```

### Refinement Prompts for Figma Make:

```
REFINE 1: Adjust the spacing between control button groups to be more balanced and increase the padding around the visualization area for better visual breathing room

REFINE 2: Create a detailed component variant system for the trust score arrows that includes all combinations: 4 score levels × 2 directions (inward/outward) × 3 states (default/hover/active)

REFINE 3: Build the responsive mobile version (375px width) with vertically stacked layout, collapsible sections for controls, and touch-optimized button sizes

REFINE 4: Add micro-interactions and animation notes: arrows should smoothly transition colors when scores change, modals should slide in from center with fade, toast notifications slide in from top-right

REFINE 5: Create a dark mode variant of the entire design with inverted colors and adjusted contrast ratios while maintaining WCAG AA accessibility standards
```

---

## 7. Magic Path Prompt

**Platform:** Magic Path (magicpath.ai)
**Mode:** Infinite Canvas with Text-to-UI Generation
**Best For:** Iterative visual design exploration with variants and code export

### Optimized Prompt

```
Design a sleek, user-friendly relationship trust visualization web application called "ProActive True Valence Mapper" for shift workers in coaching and therapy contexts, to help users visualize bidirectional trust patterns in their personal and professional relationships.

APPLICATION DESCRIPTION:
Create a professional coaching tool that allows users to map up to 8 key relationships on an interactive circular visualization, score trust levels bidirectionally (outward: their trust in others, inward: perceived trust from others), and identify patterns that can inform coaching conversations and personal growth.

DESIGN GOALS:
- Professional, trustworthy aesthetic suitable for therapy/coaching contexts
- Clean, modern layout with clear visual hierarchy
- Palette of calming navy blues (#2E4A8B), energizing cyans (#00A8CC), and trust-indicating greens/yellows/reds
- Responsive design for both desktop and tablet use in coaching sessions
- Accessible to all users including those with visual impairments

KEY FEATURES TO EMPHASIZE:

1. **Circular Trust Map Visualization** (Hero Element):
   - Central "You" node (40px radius circle, filled navy blue #667eea)
   - Up to 8 relationship nodes arranged in perfect circle (150px radius from center)
   - Each relationship node: 30px radius, white fill, navy stroke
   - Bidirectional arrows showing trust flow:
     * Solid arrow = Your trust going TO them (outward trust)
     * Dashed arrow = Their trust coming TO you (inward trust)
   - Color-coded trust levels:
     * Green (#22c55e) = High trust (Score 1) - solid line pattern
     * Yellow (#eab308) = Medium trust (Score 2) - dashed line pattern
     * Red (#ef4444) = Low trust (Score 3) - dotted line pattern
     * Gray (#d1d5db) = Not scored yet - long-dash pattern
   - Interactive: clicking arrows cycles through trust scores

2. **Control Panel** (Top Section):
   - Input field for adding relationship names (placeholder: "Enter person's name")
   - "Add Person" button (navy blue #2E4A8B, white text)
   - Relationship counter: "Relationships: X / 8"
   - Button groups:
     * Map management: "Clear All", "Save Map", "Load Map", "Version History"
     * Data portability: "Export JSON", "Import JSON", "Load Example"
     * Cloud features: "☁️ Save to Cloud", "📁 My Cloud Maps", "🔗 Get Share Link" (cyan #00A8CC)

3. **Legend Section** (Below Visualization):
   - Horizontal layout showing 4 trust level indicators
   - Each item: Color sample line + pattern + label
   - Background: Light gray (#f8f9fa), subtle padding and border radius

4. **Trust Definitions Panel**:
   - Light green background (#e8f5e9) with green left border (4px #22c55e)
   - Title: "What Am I Scoring?"
   - Two-column layout:
     * Left: "→ Outward Trust" with question "How confident am I that I'd go to them with a problem?"
     * Right: "← Inward Trust" with question "How confident am I that they'd come to me with a problem?"

5. **Info Panel** (How to Use):
   - Light yellow background (#fef3c7) with yellow border
   - 4-step numbered instructions with bold labels
   - Warm, approachable copy tone

VISUAL STYLE:
- Background: Linear gradient from cyan (#00A8CC) to navy blue (#2E4A8B) at 135 degrees
- Main container: White background, 20px border radius, subtle shadow (0 20px 60px rgba(0,0,0,0.15))
- Typography: System UI font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
  * Main title: 36px, weight 600, navy blue
  * Subtitle: 18px, gray
  * Body text: 16px, line-height 1.6
  * Button text: 16px, white on colored backgrounds
- Rounded corners throughout (8-20px depending on element size)
- Ample white space and breathing room
- Clear visual hierarchy with size, weight, and color differentiation

BRAND STORY:
ProActive ReSolutions specializes in relationship coaching and trust visualization tools. This mapper helps individuals and organizations understand trust patterns for improved communication and collaboration. It's used by life coaches, therapists, team leaders, and individuals doing personal reflection.

MARKET POTENTIAL:
- Primary users: Life coaches and therapists (B2B)
- Secondary users: Individuals seeking self-improvement (B2C)
- Use cases: Coaching sessions, team dynamics assessment, family therapy, personal reflection

PRODUCT FEATURES (Highlight These):
- Bidirectional trust mapping (unique selling point)
- Color AND pattern differentiation for accessibility
- Cloud storage with shareable links
- Version history to track progress over time
- Export/import for data portability
- Privacy-focused design (anonymous cloud storage)

USER ENGAGEMENT STRATEGIES:
- Demo mode with sample data to lower barrier to entry
- Interactive tutorial on first use
- Toast notifications for clear feedback
- Keyboard shortcuts for power users
- Help button (?) always accessible in top-right corner

DURABILITY & TECHNICAL APPROACH:
- Progressive web app (works offline after first load)
- No login required for basic features (privacy-first)
- localStorage for client-side persistence
- Optional cloud backup with anonymous authentication
- Export to JSON for complete data ownership

ACCESSIBILITY CONSIDERATIONS:
- WCAG 2.1 AA compliance (color contrast ratios)
- Pattern differentiation in addition to color (for colorblind users)
- Keyboard navigation with clear focus states (3px cyan outline)
- Screen reader support with ARIA labels
- Large touch targets (minimum 44x44px) for mobile/tablet

INTERACTIVE ELEMENTS:
- Hover states on all clickable elements (darker shades, thicker strokes)
- Click feedback on arrows (smooth color transition)
- Button states: Default, Hover, Active, Disabled, Loading
- Modal overlays for: Welcome tutorial, Help documentation, Version history, Cloud maps, Share link
- Toast notifications for: Save success, Load success, Errors, Warnings

EXPORT & CODE REQUIREMENTS:
Generate React components with clean, semantic HTML structure and modular CSS. Include:
- SVG-based trust map visualization component
- Reusable button components with variants
- Modal overlay component system
- Toast notification system
- Form input components with validation
- Responsive layout with mobile breakpoints

DESIGN SYSTEM PREFERENCES:
Use design system inspired by professional coaching tools with warm, trustworthy color palette and clean, modern typography. Reference systems like: Calm app (for soothing colors), Notion (for clarity), or Linear (for precision).
```

### Refinement Prompts for Magic Path:

```
VARIANT 1: Generate 3 alternative visual treatments for the circular trust map:
- Option A: Nodes arranged in a spiral instead of circle
- Option B: Network graph with force-directed layout
- Option C: Radial tree diagram with hierarchical grouping

VARIANT 2: Create a mobile-optimized version (375px width) with:
- Vertically stacked layout
- Collapsible control sections (accordion style)
- Touch-optimized arrow interaction (tap to score, long-press for info)
- Bottom sheet modals instead of centered overlays

VARIANT 3: Design a "Coach Dashboard" view where therapists can:
- Manage multiple client maps
- Compare trust patterns across clients (anonymized)
- Track progress over multiple sessions
- Export aggregated insights for case studies

VARIANT 4: Explore dark mode variant with:
- Dark navy background (#1a2332)
- Muted colors for trust levels (maintaining contrast)
- Glowing effects on active elements
- Reduced eye strain for evening/low-light coaching sessions

VARIANT 5: Generate an onboarding flow (3-5 screens) including:
- Welcome screen with value proposition
- Interactive tutorial showing how to add people and score trust
- Example data preview with option to try it
- Privacy disclaimer and cloud storage explanation
- Quick start guide with keyboard shortcuts
```

### Canvas Layout Suggestions:

```
CANVAS FLOW:
Create a multi-screen flow on the infinite canvas arranged left-to-right:

Screen 1: Landing/Welcome State (empty map)
Screen 2: In-Progress State (3-4 relationships mapped)
Screen 3: Complete State (8 relationships with full trust scores)
Screen 4: Version History Modal (overlay)
Screen 5: Cloud Maps Library Modal (overlay)
Screen 6: Mobile Responsive Views (vertical stack below desktop views)

Connect screens with visual flow arrows showing user journey.
Include state transitions and interaction annotations.
```

### Component Generation Prompts:

```
COMPONENT 1: Design just the trust map SVG visualization component with all interactive states (default, hover, active for each arrow)

COMPONENT 2: Design the modal overlay system showing all variants (Version History, Help, Cloud Maps, Share Link, Privacy)

COMPONENT 3: Design the button component library with all variants (Primary Navy, Primary Cyan, Secondary, Success, Danger, Disabled, Loading)

COMPONENT 4: Design the toast notification system with all message types (Success, Error, Warning, Info) and animation states

COMPONENT 5: Design the control panel component group with responsive behavior (desktop horizontal, tablet wrapped, mobile vertical stacked)
```

---

## Summary & Next Steps

### Platform Comparison:

| Platform | Best For | Output Type | Iteration Speed |
|----------|----------|-------------|-----------------|
| **Google Stitch** | Rapid UI prototyping with code export | HTML/CSS/JS + Figma paste | Fast (350/month) |
| **Google Opal** | Multi-step workflows with AI logic | Functional mini-app | Medium (visual editor) |
| **Google AI Studio** | Conceptual design, copy, insights | Text recommendations | Very fast (unlimited) |
| **Galileo.ai** | High-fidelity UI mockups | Design images + Figma | Fast (50/month exp mode) |
| **UX Pilot** | Wireframes and UX exploration | Wireframes + Figma | Fast (free trial credits) |
| **Figma Make** | Production-ready Figma designs | Native Figma file | Medium (detailed) |
| **Magic Path** | Infinite canvas design exploration | React code + visual variants | Very fast (free tier) |

### Recommended Workflow:

1. **Start with Google AI Studio (Gemini)** - Get conceptual ideas, copy, and feature recommendations
2. **Create wireframes in UX Pilot** - Explore UX patterns and user flows quickly
3. **Generate high-fidelity mockups in Galileo.ai** - Get beautiful UI designs with variants
4. **Explore variants in Magic Path** - Use infinite canvas to create multiple design directions and visual treatments
5. **Refine in Figma Make** - Convert to production-ready Figma files with components and Auto Layout
6. **Prototype in Google Stitch** - Generate working code and test interactions
7. **Build workflows in Google Opal** - Implement the AI-powered backend logic and cloud storage

### Key Insights to Gather from Each Platform:

- **Stitch:** How intuitive is the UI code it generates? What frontend patterns does it suggest?
- **Opal:** What workflow optimizations does it recommend? How does it structure multi-step AI logic?
- **Gemini:** What UX insights and feature ideas emerge from AI analysis?
- **Galileo:** What visual design treatments and layout alternatives does it explore?
- **UX Pilot:** What wireframe patterns and user flows does it suggest?
- **Figma Make:** How does it organize components and Auto Layout for handoff?
- **Magic Path:** What creative visual variants emerge? How does the infinite canvas workflow inspire new directions?

### Success Metrics:

Evaluate each platform's output on:
- **Visual Design Quality:** Does it look professional and trustworthy?
- **UX Usability:** Is the interface intuitive and easy to navigate?
- **Feature Completeness:** Did it capture all the core features?
- **Accessibility:** Does it include proper contrast, patterns, and ARIA labels?
- **Innovation:** What new ideas or approaches did it suggest?
- **Production Readiness:** How close is it to being implementable?

---

**Document prepared by:** AI Research Team
**Date:** 2025-01-15
**Version:** 1.1 (Updated to include Magic Path)
