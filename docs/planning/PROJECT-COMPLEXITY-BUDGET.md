# True Valence Mapper - Complexity Budget
## (Relationship Trust Mapper - Front-End MVP Only)

## Project Overview
**Ship Date:** November 16, 2025 (7 days from start)
**Maximum Complexity:** 10 points (HARD LIMIT)
**Current Status:** Starting fresh
**Long-term Vision:** Full relationship trust mapping app (from ChatGPT spec)
**Week 1 Focus:** Front-end visualization only (no backend, no auth)

## Complexity Budget (Target: ≤10 points)

### Front-End MVP (Week 1 - EXACTLY 10 points)
- [ ] Simple HTML/CSS/JS (no React/Next.js): 2 points
- [ ] Hub-and-spoke SVG visualization: 3 points
- [ ] Add/name relationship nodes: 2 points
- [ ] Click arrows to set trust scores (1-3): 2 points
- [ ] Local storage only: 1 point
- [ ] **TOTAL: 10 points** ✓

### What We're NOT Building This Week
- ❌ Supabase backend (Stage 2)
- ❌ User authentication (Stage 2)
- ❌ Multiple maps/sessions (Stage 2)
- ❌ Export to PNG/PDF (Stage 3)
- ❌ Templates (Family/Work) (Stage 3)
- ❌ AI integration (Stage 4)
- ❌ Force-directed layout (Stage 4)
- ❌ Drag-and-drop positioning (Stage 4)

## Minimum Viable Product (Day 3 Target)

### Must Have (6 points total):
1. HTML page with SVG canvas
2. Center circle (user/subject)
3. Add up to 8 relationship nodes
4. Basic spokes connecting nodes
5. Works locally in browser

### Then Add (4 points - Days 4-6):
1. Clickable arrows with 1-3 scoring
2. Color changes (green/yellow/red)
3. Save to localStorage
4. Basic legend showing score meanings

## Core Concept (Revised)
**Week 1**: Visual relationship trust mapper (front-end only)
**Future**: Full coaching tool with backend, auth, export, AI

The app shows trust flow in relationships:
- User at center
- Relationships as spokes
- Two arrows per spoke (trust each direction)
- 1-3 scoring: Green (high trust), Yellow (medium), Red (low)

## Success Criteria
- [ ] Can add and name relationship nodes
- [ ] Can score trust in both directions
- [ ] Visual shows trust patterns clearly
- [ ] Works offline (localStorage)
- [ ] Deployed to GitHub Pages
- [ ] 3 people have tested it

## Day-by-Day Plan

### Day 1-2 (Nov 9-10): Foundation
- Create index.html with form
- Add local storage save/load
- Basic CSS styling

### Day 3-4 (Nov 11-12): Core Features
- Calculate value ratios
- Display sorted list
- Add simple visualization

### Day 5-6 (Nov 13-14): Polish & Deploy
- Clean up UI
- Deploy to GitHub Pages
- Create simple README

### Day 7 (Nov 15): Ship
- Share with 3 people
- Log as shipped
- Gather feedback for v2

## Complexity Checkpoint
**Before adding ANY feature, ask:**
1. Does this help track value vs time?
2. Will it work without it?
3. Can it wait until after shipping?

If answer to #2 is "yes" or #3 is "yes" → DON'T ADD IT.

## The One Rule
**Ship by November 16, 2025, no matter what.**

Better to ship 5 points of working features than 15 points of half-built complexity.

---
*Created: November 9, 2025*
*Ship Date: November 16, 2025*
*Complexity Budget: 10 points MAX*