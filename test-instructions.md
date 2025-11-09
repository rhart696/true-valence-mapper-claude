# Testing the Trust Valence Mapper

## Quick Test Checklist

### 1. Basic Functionality
- [ ] Open http://localhost:8000 in your browser
- [ ] Page loads without errors
- [ ] Visual design looks professional

### 2. Adding Relationships
- [ ] Add "Alice" - should appear as a node
- [ ] Add "Bob" - nodes should reposition
- [ ] Add "Charlie" - all three evenly spaced
- [ ] Try adding 8 people total - should work
- [ ] Try adding a 9th person - should show max limit message

### 3. Arrow Scoring
- [ ] Click outward arrow (You → Alice) - should cycle: gray → green → yellow → red → gray
- [ ] Click inward arrow (Alice → You) - should cycle independently
- [ ] Verify arrows are clearly separated (visible gap between them)
- [ ] Check that colors match the legend

### 4. Visual Clarity
- [ ] Arrows don't overlap at nodes
- [ ] Clear separation between arrow pairs
- [ ] Colors are distinct and meaningful
- [ ] Text is readable on all nodes

### 5. Persistence
- [ ] Score a few relationships
- [ ] Click "Save Map"
- [ ] Refresh the page
- [ ] Click "Load Map" - should restore exact state

### 6. Edge Cases
- [ ] Clear All - should reset everything
- [ ] Empty name - should show alert
- [ ] Duplicate name - should show alert
- [ ] Long names (20 chars) - should fit

## Test Scenarios

### Scenario 1: Family Dynamics
Add: Mom, Dad, Sister, Brother
- Set high trust (green) with Sister
- Set medium trust (yellow) with Parents
- Notice any asymmetries

### Scenario 2: Work Team
Add: Boss, Peer1, Peer2, Report
- Set various trust levels
- Look for patterns in hierarchy

### Scenario 3: Mixed Network
Add: Friend, Partner, Colleague, Mentor
- Create a realistic trust map
- Save and reload to verify persistence

## Known Limitations (MVP)
- No export to image yet (Stage 2)
- No multiple maps (Stage 2)
- No templates (Stage 3)
- Fixed positioning (no drag & drop)

## Feedback Questions
1. Is the arrow separation clear enough?
2. Are the trust levels (1-3) sufficient?
3. Is the scoring intuitive?
4. What's missing for your use case?