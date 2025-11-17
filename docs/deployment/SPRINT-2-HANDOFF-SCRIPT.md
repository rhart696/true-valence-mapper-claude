# Sprint 2 Handoff Script - True Valence Mapper Optimization

**Date:** 2025-01-15
**Project:** ProActive True Valence Mapper
**Phase:** Sprint 1 → Sprint 2 Transition
**Status:** Sprint 1 COMPLETE ✅

---

## Quick Start for New Chat Session

Copy this entire prompt to start Sprint 2:

---

### 🚀 SPRINT 2: ARCHITECTURE REFACTORING & TESTING INFRASTRUCTURE

**Context:** You are continuing work on the True Valence Mapper app. Sprint 1 is COMPLETE. We're now moving to Sprint 2: architecture refactoring and automated testing.

**Your Role:** Act as meta-orchestrator with a team of world-class experts in software architecture, testing, DevOps, and full-stack development. Use agents/subagents, workflows (parallel + sequential), MCP servers, Skills, and tools as appropriate.

**IMPORTANT - Test Everything in Real Life:** Ensure your team tests and validates everything IN REAL LIFE before handoff to human. Use agents/subagents, workflows, MCP servers, Skills, and tools to accomplish comprehensive testing.

---

## Sprint 1 Completion Summary

### ✅ All Tasks Delivered

| Task | Status | Files | Impact |
|------|--------|-------|--------|
| **1. Privacy Disclaimers** | ✅ DONE | index.html (modal + footer) | Legal protection |
| **2. Color-Blind Accessibility** | ✅ DONE | index.html (stroke patterns) | WCAG 2.1 compliant |
| **3. Supabase Auth Fix** | ✅ DONE | supabase-auth-fixed-rls-policies.sql | Security enforced |
| **4. Trust Definitions Visible** | ✅ DONE | index.html (green panel) | Always visible |
| **5. Favicon** | ✅ DONE | index.html (SVG + PNG) | Professional branding |
| **6. Coach Guide** | ✅ DONE | COACH-FACILITATOR-GUIDE.md | 13K word manual |

### 🔒 Security Status: VERIFIED

**RLS Policies:**
- ✅ Deployed (manual via Supabase Dashboard)
- ✅ Using `auth.uid()` for database-enforced isolation
- ✅ Users CANNOT see other users' data
- ✅ Share codes work (read-only access)

**Testing:**
- Created `test-deployment-real.html` - Run this in browser to verify security
- Open: file:///home/ichardart/dev/projects/true-valence-mapper/test-deployment-real.html
- Should show "🎉 PRODUCTION READY" if RLS working correctly

---

## Sprint 2 Objectives

### Priority 1: Architecture Refactoring (Week 3-4)

**Goal:** Transform monolithic 2300+ line index.html into modular, maintainable architecture

#### Tasks:

**1. Create Modular Structure**
```
src/
├── components/
│   ├── TrustMap.js (visualization logic)
│   ├── Legend.js
│   ├── TrustDefinitions.js
│   ├── InfoPanel.js
│   └── modals/
│       ├── Privacy.js
│       ├── Welcome.js
│       ├── Help.js
│       └── Share.js
├── services/
│   ├── StateManager.js (centralized state)
│   ├── CloudStorage.js (already exists - refactor to ES6 module)
│   ├── VersionHistory.js (already exists - refactor)
│   └── ValidationService.js
├── utils/
│   ├── svg-helpers.js
│   ├── layout-calculator.js
│   └── toast.js
└── config/
    └── constants.js
```

**2. Set Up Build System**
- Choose: Vite (recommended - fast, modern) OR Webpack
- ES6 modules with tree-shaking
- Minification for production
- Source maps for debugging
- Hot module replacement for dev

**3. Implement State Management**
- Centralized store (not Redux - overkill for this)
- Simple pub/sub or reactive state
- Sync: memory ↔ localStorage ↔ Supabase ↔ version history

**4. Extract SVG Rendering**
- Separate concerns: layout calculation vs. rendering
- Incremental updates (don't redraw entire SVG)
- Optimize arrow path calculations

**5. Modularize CSS**
- CSS Modules OR Tailwind CSS
- Component-scoped styles
- Maintain brand colors & accessibility

#### Success Criteria:
- ✅ No file > 300 lines
- ✅ Each module has single responsibility
- ✅ Build time < 5 seconds
- ✅ Bundle size < 100KB (gzipped)
- ✅ All existing features work identically

---

### Priority 2: Automated Testing Infrastructure (Week 3-4)

**Goal:** Prevent regressions, enable confident refactoring

#### Tasks:

**1. Unit Tests (Vitest or Jest)**

Test coverage targets:
- `services/StateManager.js` - 100% (critical)
- `services/CloudStorage.js` - 90% (mock Supabase)
- `utils/layout-calculator.js` - 95% (pure functions)
- `services/ValidationService.js` - 100% (security-critical)

Example structure:
```javascript
// StateManager.test.js
describe('StateManager', () => {
  test('adds person to relationships', () => {
    const state = new StateManager();
    state.addPerson('Alice');
    expect(state.relationships).toHaveLength(1);
    expect(state.relationships[0].name).toBe('Alice');
  });

  test('enforces max 8 relationships', () => {
    // ... test MAX_NODES limit
  });
});
```

**2. Integration Tests**

Test scenarios:
- Full save/load cycle (localStorage)
- Full cloud save/load cycle (mock Supabase)
- Version history create/restore
- Import/export JSON
- Share code generation

**3. E2E Tests (Playwright or Cypress)**

Critical user flows:
```javascript
// e2e/basic-workflow.spec.js
test('complete user workflow', async ({ page }) => {
  // 1. Accept privacy disclaimer
  await page.goto('http://localhost:3000');
  await page.click('text=I Understand - Continue');

  // 2. Add person
  await page.fill('#personName', 'Alice');
  await page.click('text=Add Person');

  // 3. Score trust
  await page.click('[data-person="1"][data-direction="outward"]');
  await page.click('[data-person="1"][data-direction="outward"]'); // Cycle to green

  // 4. Save locally
  await page.click('text=Save');

  // 5. Reload and verify persistence
  await page.reload();
  const nodes = await page.locator('.relationship-node').count();
  expect(nodes).toBe(1);
});
```

**4. Accessibility Tests**

- Axe-core integration
- Keyboard navigation testing
- Screen reader compatibility
- Color contrast validation

**5. Security Tests**

- XSS injection attempts
- SQL injection via Supabase (should be blocked by RLS)
- CSRF protection
- Content Security Policy

**6. Performance Tests**

- Lighthouse CI integration
- Bundle size monitoring
- Render performance (should handle 8 nodes smoothly)
- Memory leak detection

#### Success Criteria:
- ✅ Unit test coverage > 80%
- ✅ All E2E critical paths covered
- ✅ Accessibility score 100% (Axe)
- ✅ Security tests pass
- ✅ Performance budget met
- ✅ CI/CD pipeline runs tests automatically

---

### Priority 3: Documentation & DevOps (Week 4)

#### Tasks:

**1. Developer Documentation**
- `CONTRIBUTING.md` - How to contribute
- `DEVELOPMENT.md` - Local setup, build commands
- `ARCHITECTURE.md` - System design overview
- `API.md` - Supabase schema and RLS policies
- `TESTING.md` - How to run and write tests

**2. CI/CD Pipeline**

GitHub Actions workflow:
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - run: npm run test:e2e
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy # GitHub Pages
```

**3. Deployment Automation**
- Auto-deploy to GitHub Pages on main branch push
- Staging environment for testing
- Rollback mechanism

#### Success Criteria:
- ✅ All docs written and reviewed
- ✅ CI pipeline runs on every PR
- ✅ Auto-deploy to production on merge to main
- ✅ Deploy time < 5 minutes

---

## File Structure Overview (Current State)

**Production Files:**
```
/home/ichardart/dev/projects/true-valence-mapper/
├── index.html (2520 lines - NEEDS REFACTORING)
├── cloud-storage.js (540 lines)
├── version-history.js (371 lines)
├── toast-notifications.js (390 lines)
├── toast-notifications.css (321 lines)
├── input-validation.js (379 lines)
├── accessibility-improvements.js (492 lines)
└── background-assets/
    └── ProActive-ReSolutions-full-logo.png
```

**Documentation (Created in Sprint 1):**
```
├── ARCHITECTURE-OVERVIEW.md (generated during Sprint 1)
├── COACH-FACILITATOR-GUIDE.md (13K word manual)
├── SUPABASE-AUTH-FIX-DEPLOYMENT.md (deployment guide)
├── DEPLOYMENT-REPORT-RLS-POLICIES.md (security report)
└── QUICK-DEPLOYMENT-CHECKLIST.md
```

**Database:**
```
├── supabase-schema.sql (initial schema - OLD)
├── supabase-secure-rls-policies.sql (OLD - app-level filtering)
├── supabase-auth-fixed-rls-policies.sql (NEW - auth.uid() enforcement)
└── verify-rls-deployment.sql (verification queries)
```

**Testing:**
```
├── test-deployment-real.html (RLS security tests - USE THIS)
└── deploy-and-test-rls.py (Python test script)
```

---

## Technical Debt Identified in Sprint 1

**From ARCHITECTURE-OVERVIEW.md:**

### Critical Issues:

1. **Monolithic index.html (2520 lines)**
   - Hard to test
   - Risky to modify
   - No module boundaries

2. **Global namespace pollution**
   - ~400 functions in global scope
   - Name collision risks
   - No encapsulation

3. **Manual state synchronization**
   - Memory ↔ localStorage ↔ Supabase ↔ version history
   - Error-prone
   - Inconsistent state possible

4. **No build process**
   - Can't use ES6 modules
   - No minification
   - No tree-shaking

5. **SVG rendering inefficiency**
   - Full redraw on every change
   - Should use incremental updates

6. **No automated testing**
   - Manual testing only
   - High regression risk

---

## Constraints & Guidelines

### Do NOT Change:

- ✅ User-facing functionality (everything must work identically)
- ✅ Brand colors (#00A8CC cyan, #2E4A8B navy)
- ✅ Supabase backend (already deployed)
- ✅ Privacy disclaimers (legal requirement)
- ✅ Accessibility features (WCAG 2.1 AA)
- ✅ Coach facilitator guide content

### MUST Maintain:

- ✅ Local storage (privacy-first)
- ✅ Cloud storage (optional)
- ✅ Version history (auto-save every 5 min)
- ✅ Share code functionality
- ✅ Anonymous authentication
- ✅ 8-person limit
- ✅ Bidirectional trust scoring
- ✅ Color + stroke pattern accessibility

### Quality Standards:

- **Code:** ESLint + Prettier
- **Testing:** >80% coverage
- **Accessibility:** Axe score 100%
- **Performance:** Lighthouse >90
- **Security:** No regressions
- **Documentation:** Comprehensive

---

## Recommended Approach

### Meta-Orchestration Strategy:

**Use agents/subagents for:**

1. **Code-reviewer agent** - Review refactored modules
2. **Test-writer agent** - Generate unit/integration tests
3. **Architecture agent** - Design state management
4. **Performance agent** - Optimize bundle size
5. **Security agent** - Validate no regressions

**Use workflows:**

1. **Parallel:** Refactor independent modules simultaneously
   - Example: TrustMap.js + Legend.js + InfoPanel.js in parallel

2. **Sequential:** Dependencies require order
   - Example: StateManager.js first → then components that use it

**Use MCP python_exec:**

- Build automation scripts
- Test runners
- Bundle analysis

---

## Testing Checklist (Before Sprint 2 Completion)

### Functional Testing:

- [ ] Add person (up to 8)
- [ ] Remove person
- [ ] Score trust (cycle through 0-1-2-3)
- [ ] Save locally
- [ ] Load from localStorage
- [ ] Export to JSON
- [ ] Import from JSON
- [ ] Save to cloud
- [ ] Load from cloud
- [ ] Generate share code
- [ ] Access via share code
- [ ] Version history (create/restore/compare)
- [ ] All modals open/close correctly

### Accessibility Testing:

- [ ] Keyboard navigation (Tab, Enter, Esc, Arrow keys)
- [ ] Screen reader compatibility
- [ ] Color-blind mode (stroke patterns visible)
- [ ] Focus indicators visible
- [ ] ARIA labels correct

### Security Testing:

- [ ] XSS injection blocked
- [ ] User isolation (cannot see other users' maps)
- [ ] Share code read-only (cannot modify shared maps)
- [ ] RLS policies enforced

### Performance Testing:

- [ ] Page load < 2 seconds
- [ ] Bundle size < 100KB gzipped
- [ ] No memory leaks (8 nodes added/removed repeatedly)
- [ ] Smooth animations (60fps)

### Browser Testing:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Key Files to Review Before Starting

1. **ARCHITECTURE-OVERVIEW.md** - Current architecture analysis
2. **COACH-FACILITATOR-GUIDE.md** - User workflows to preserve
3. **index.html** (lines 1-100, 1000-1100, 2400-2520) - See structure
4. **cloud-storage.js** - Understand Supabase integration
5. **test-deployment-real.html** - Understand security requirements

---

## Success Metrics for Sprint 2

### Code Quality:

- [ ] No file > 300 lines
- [ ] ESLint 0 errors, 0 warnings
- [ ] Prettier formatted
- [ ] JSDoc comments on public APIs

### Testing:

- [ ] Unit coverage > 80%
- [ ] E2E coverage: All critical paths
- [ ] Accessibility score: 100%
- [ ] Security tests: All pass

### Performance:

- [ ] Lighthouse: >90 all categories
- [ ] Bundle size: <100KB gzipped
- [ ] Build time: <5 seconds
- [ ] Test suite: <30 seconds

### Documentation:

- [ ] README.md updated
- [ ] CONTRIBUTING.md created
- [ ] DEVELOPMENT.md created
- [ ] ARCHITECTURE.md updated
- [ ] All code commented

---

## Risks & Mitigation

### Risk 1: Breaking existing functionality during refactor

**Mitigation:**
- Write E2E tests FIRST (before refactoring)
- Refactor incrementally (one module at a time)
- Keep old version as backup
- Test after each module extraction

### Risk 2: State synchronization bugs

**Mitigation:**
- Design StateManager with clear contracts
- Write comprehensive unit tests
- Add state validation
- Test all sync paths (memory ↔ localStorage ↔ Supabase)

### Risk 3: Accessibility regressions

**Mitigation:**
- Run Axe-core after each change
- Test keyboard navigation frequently
- Preserve ARIA labels during refactor
- Test with actual screen readers

### Risk 4: Build complexity

**Mitigation:**
- Start with simplest build (Vite default config)
- Add complexity only when needed
- Document build process clearly
- Provide fallback (unbundled version)

---

## Deliverables for Sprint 2

### Code:

1. Modular codebase (src/ directory structure)
2. Build configuration (vite.config.js or webpack.config.js)
3. Package.json with all dependencies
4. ESLint + Prettier config

### Testing:

1. Test suite (unit, integration, e2e)
2. Test coverage reports (>80%)
3. CI configuration (.github/workflows/ci.yml)

### Documentation:

1. README.md (updated)
2. CONTRIBUTING.md
3. DEVELOPMENT.md
4. ARCHITECTURE.md
5. TESTING.md

### Deployment:

1. Automated deploy to GitHub Pages
2. Staging environment
3. Rollback mechanism

---

## Example Refactoring Workflow

**Step 1: Setup Build System**
```bash
npm init -y
npm install -D vite
npm install @supabase/supabase-js

# vite.config.js
export default {
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true
  }
}
```

**Step 2: Extract First Module (StateManager)**
```javascript
// src/services/StateManager.js
export class StateManager {
  constructor() {
    this.relationships = [];
    this.trustScores = {};
    this.listeners = [];
  }

  addPerson(name) {
    if (this.relationships.length >= 8) {
      throw new Error('Maximum 8 relationships allowed');
    }
    const person = { id: this.generateId(), name };
    this.relationships.push(person);
    this.trustScores[person.id] = { outward: 0, inward: 0 };
    this.notify('person-added', person);
    return person;
  }

  // ... more methods
}
```

**Step 3: Write Tests**
```javascript
// src/services/StateManager.test.js
import { describe, test, expect } from 'vitest';
import { StateManager } from './StateManager';

describe('StateManager', () => {
  test('adds person successfully', () => {
    const sm = new StateManager();
    const person = sm.addPerson('Alice');
    expect(sm.relationships).toHaveLength(1);
    expect(person.name).toBe('Alice');
  });

  test('enforces 8-person limit', () => {
    const sm = new StateManager();
    for (let i = 0; i < 8; i++) {
      sm.addPerson(`Person ${i}`);
    }
    expect(() => sm.addPerson('Extra')).toThrow();
  });
});
```

**Step 4: Extract Component**
```javascript
// src/components/TrustMap.js
export class TrustMap {
  constructor(stateManager, svgElement) {
    this.state = stateManager;
    this.svg = svgElement;
    this.state.subscribe('change', () => this.render());
  }

  render() {
    // Incremental update logic
    this.updateArrows();
    this.updateNodes();
  }

  // ... more methods
}
```

**Step 5: Update HTML**
```html
<!-- dist/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>ProActive True Valence Mapper</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

## Questions to Consider During Sprint 2

1. **State Management:** Vanilla JS pub/sub OR lightweight library (Zustand/Jotai)?
2. **Build Tool:** Vite (modern, fast) OR Webpack (more config)?
3. **CSS:** Modules OR Tailwind OR keep vanilla?
4. **Testing:** Vitest (fast) OR Jest (mature)?
5. **E2E:** Playwright (modern) OR Cypress (established)?
6. **Deployment:** Keep GitHub Pages OR move to Vercel/Netlify?

---

## Post-Sprint 2 Roadmap (Future Sprints)

### Sprint 3: Advanced Features (Optional)
- Multi-map support (compare maps over time)
- Export to PDF/PNG
- Analytics dashboard (trust patterns over time)
- Coach dashboard (aggregate client insights)

### Sprint 4: Mobile Optimization
- Progressive Web App (PWA)
- Touch gestures
- Mobile-first redesign
- Offline mode improvements

### Sprint 5: Integration & Scaling
- Calendar integration (schedule reviews)
- Email reminders
- Multi-language support
- White-label for other coaching firms

---

## Contact & Resources

**Project Location:** `/home/ichardart/dev/projects/true-valence-mapper/`

**Supabase Dashboard:** https://app.supabase.com/project/qhozgoiukkbwjivowrbw

**Live App:** https://ichardart.github.io/true-valence-mapper/

**Security Test:** file:///home/ichardart/dev/projects/true-valence-mapper/test-deployment-real.html

**Key Documentation:**
- Architecture: `ARCHITECTURE-OVERVIEW.md`
- Coach Guide: `COACH-FACILITATOR-GUIDE.md`
- Deployment: `SUPABASE-AUTH-FIX-DEPLOYMENT.md`

---

## Final Notes for Sprint 2 Team

**Philosophy:**
- **Incremental over revolutionary** - Don't rewrite everything at once
- **Tests first** - Write E2E tests before refactoring
- **Preserve UX** - User-facing behavior must stay identical
- **Document decisions** - ADRs (Architecture Decision Records)
- **Automate everything** - CI/CD, testing, deployment

**Remember:**
- This is a **learning project** for the dev team
- This is a **coaching tool** (not clinical software)
- **Privacy-first** (local storage default)
- **Accessibility matters** (WCAG 2.1 AA compliance)
- **Security is critical** (RLS must work correctly)

**Sprint 2 Motto:**
> "Make it maintainable, make it testable, make it fast - in that order."

---

## Ready to Start?

1. Review this entire document
2. Read `ARCHITECTURE-OVERVIEW.md`
3. Read `COACH-FACILITATOR-GUIDE.md` (understand user workflows)
4. Open `test-deployment-real.html` in browser (verify security)
5. Create agents for architecture, testing, performance
6. Begin refactoring incrementally
7. Test continuously
8. Document everything

**Good luck with Sprint 2! 🚀**

---

**Version:** 1.0
**Date:** 2025-01-15
**Author:** Sprint 1 Team
**For:** Sprint 2 Team (New Chat Session)
