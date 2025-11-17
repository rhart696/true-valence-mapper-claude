# True Valence Mapper - Architectural Overview

**Project Location:** `/home/ichardart/dev/projects/true-valence-mapper/`
**Current Status:** Production (v1.0) - LIVE on GitHub Pages
**Codebase Size:** ~85KB total (index.html: 2346 lines, supporting JS: 4469 lines total)

---

## 1. FILE STRUCTURE & ORGANIZATION

### Core Application Files
| File | Lines | Purpose |
|------|-------|---------|
| **index.html** | 2346 | Monolithic application - HTML structure, embedded CSS, main JS logic, modals |
| **cloud-storage.js** | 540 | Supabase integration for cloud save/load/share functionality |
| **version-history.js** | 371 | Version control system (localStorage-based, up to 10 versions) |
| **toast-notifications.js** | 390 | Toast notification manager with accessibility features |
| **input-validation.js** | 379 | XSS protection and input sanitization |
| **accessibility-improvements.js** | 492 | WCAG 2.1 AA compliance (keyboard nav, screen readers, focus management) |
| **toast-notifications.css** | 321 | Standalone toast styling |

### Assets
```
background-assets/
├── ProActive-ReSolutions-full-logo.png
├── ProActive-ReSolutions-Trillium-logo.png
├── corporate-colours.png
└── reviews-evaluations/     (background documentation)
```

### Testing & Validation Files
- `test-xss-protection.js` (337 lines) - XSS test suite
- `test-rls-security.js` (526 lines) - Row Level Security tests
- `test-rls-security-complete.js` (353 lines) - Complete RLS validation
- `test-frontend-skills.py` (22KB) - Python test framework
- `test-anonymous-auth.html` (20KB) - Auth testing interface
- `test-version-history.html` (13KB) - Version history testing
- `TOAST-DEMO.html` (8KB) - Toast notification demo

### Configuration & Deployment
- `supabase-schema.sql` - Database schema
- `supabase-secure-rls-policies.sql` - Security policies
- `supabase-auth-implementation.js` - Auth module (529 lines)
- `check-database-status.js` - DB validation (231 lines)
- `.github/workflows/` - GitHub Actions for deployment

### Documentation
- `docs/` - Comprehensive documentation structure
  - `implementation/` - Feature guides (Toast, Version History, Accessibility)
  - `planning/` - Architecture plans, Supabase setup, deployment checklists
  - `reports/` - Implementation status, validation reports
  - `ux-review-*.md` - UX optimization documentation

---

## 2. INDEX.HTML STRUCTURE (2346 LINES)

### Monolithic Architecture Breakdown

#### HEAD Section (Lines 1-830)
- **Meta Tags & Metadata** (lines 3-7)
  - UTF-8 charset, viewport, SEO description
  - Title: "ProActive True Valence Mapper - Relationship Trust Visualization"

- **Embedded CSS** (lines 8-827)
  - ~820 lines of all styling
  - **Key sections:**
    - Reset & body styling (ProActive brand colors: #00A8CC cyan, #2E4A8B navy)
    - Container & header styles
    - Input & button styling (with focus states)
    - **Accessibility features** (lines 125-196):
      - `.sr-only` for screen readers
      - `.skip-link` for keyboard navigation
      - `@media (prefers-reduced-motion)` - respects reduced motion
      - `@media (prefers-contrast: high)` - high contrast mode support
      - Focus-visible states for keyboard navigation
    - **Visualization styling** (lines 198-287):
      - `.visualization-container` - SVG canvas background
      - `.node-circle`, `.center-node`, `.node-text` - node styling
      - `.arrow-path` - connection styling with hover effects
      - **Trust score colors** (score-0 to score-3):
        - Green (#22c55e) = High Trust (1)
        - Yellow (#eab308) = Medium Trust (2)
        - Red (#ef4444) = Low/No Trust (3)
        - Gray (#d1d5db) = Not Scored (0)
      - `.legend` - color legend styling
      - `.info-panel` - yellow info box styling
    - **Modal styles** (lines 330-...):
      - `.modal`, `.modal-content`, `.modal-close`
      - Slide carousel for welcome modal
      - Form elements in modals
    - **Responsive design** - flexbox-based layouts
    - **Footer styling** - white text on gradient background

- **External Script Imports** (lines 829-835):
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="input-validation.js"></script>
  <script src="toast-notifications.js"></script>
  <script src="cloud-storage.js"></script>
  <script src="version-history.js"></script>
  <script src="accessibility-improvements.js"></script>
  ```

#### BODY Section (Lines 837-2346)

**Header & Navigation (lines 837-930)**
- Skip link for accessibility
- Logo image element
- Title, subtitle
- Control buttons organized in groups:
  1. **Add Person** - text input + button
  2. **Map Management** - Clear All, Save Map, Load Map, Version History
  3. **Import/Export** - Export JSON, Import JSON, Load Example
  4. **Cloud Storage** - Save to Cloud, My Cloud Maps, Get Share Link
  5. **Node counter** - "Relationships: X / 8" (aria-live region)

**Main Visualization (lines 933-968)**
- SVG canvas (600x500px)
- **Arrow Markers** (defs section) - directional arrows for each score level
- **Arrows Group** - container for connection arrows (dynamically generated)
- **Nodes Group** - circles representing relationships
  - Center node (You) at 300,250 with r=40
  - Peripheral nodes arranged in circle (calculated per render)

**Legend & Info Panel (lines 971-1002)**
- Trust level color legend with 4 items
- Yellow info panel explaining "How to Use":
  - Instructions for adding people
  - Arrow scoring explanation (outward/inward)
  - Saving instructions

**Main Script Block (lines 1005-2113)**
- **State Management** (lines 1006-1020):
  ```javascript
  let relationships = [];           // Array of {id, name}
  let trustScores = {};             // {[personId]: {outward, inward}}
  const MAX_NODES = 8;
  const CENTER_X = 300;
  const CENTER_Y = 250;
  const RADIUS = 150;
  ```

- **Initialization** (lines 1025-1071):
  - Toast manager setup
  - Version history initialization
  - Cloud storage initialization
  - Connection status updates (every 30 seconds)
  - Share code checking (URL parameters)
  - First-visit welcome modal
  - Keyboard shortcut handlers (Enter for add, ? for help, Esc for modals)

- **Core Functions** (~400 functions organized logically):
  
  | Function | Lines | Purpose |
  |----------|-------|---------|
  | `addPerson()` | 1074-1128 | Add person with validation, update visualization |
  | `renderVisualization()` | 1130-1153 | Recalculate node positions, render all nodes & arrows |
  | `createArrows()` | 1155-1223 | Draw bidirectional arrows (outward + inward) with events |
  | `createNode()` | 1224-1249 | Draw circular node with person name, click-to-remove |
  | `cycleScore()` | 1250-1268 | Cycle through score levels (0→1→2→3→0) |
  | `updateNodeCount()` | 1269-1283 | Update UI counter, check max limit |
  | `clearAll()` | 1284-1303 | Clear all data with confirmation |
  | `saveMap()` | 1304-1313 | Save to localStorage |
  | `loadMap()` | 1314-1327 | Load from localStorage |
  | `saveToLocalStorage()` | 1328-1336 | Persist relationships + scores |
  | `loadFromLocalStorage()` | 1337-1355 | Restore from storage |
  | `exportToJSON()` | 1356-1373 | Download JSON file |
  | `importJSON()` | 1374-1440 | File upload + parse JSON |
  | `saveToCloud()` | 1597-1628 | Supabase cloud save |
  | `loadSharedMap()` | 1629-1641 | Load map via share code |
  | `showMyMaps()` | 1642-1681 | Display list of cloud maps |
  | `loadMapFromCloud()` | 1690-1705 | Restore specific cloud map |
  | `deleteCloudMap()` | 1706-1714 | Delete cloud map |
  | `shareMap()` | 1715-1729 | Generate and display share link |
  | `showVersionHistory()` | 1774-1783 | Show version history modal |
  | `createManualVersion()` | 1874-1889 | Create manual version snapshot |
  | `restoreVersion()` | 1908-1936 | Restore to previous version |
  | `deleteVersion()` | 1941-1955 | Delete specific version |
  | **Modal Functions** | - | `showWelcomeModal()`, `closeWelcomeModal()`, `showHelpModal()`, etc. |
  | **Slide Navigation** | - | `changeSlide()`, `currentSlide()`, `showSlide()` |
  | `loadDemoData()` | 1529-1583 | Load example relationship network |
  | `updateConnectionStatus()` | 1584-1596 | Show online/offline status |

- **Helper Functions & Globals**:
  - No global `showError/showSuccess` found - likely defined in toast-notifications.js
  - Window object setup for accessibility manager

**Modals (lines 2116-2330)**
1. **Welcome Modal** (lines 2116-2190)
   - Slides carousel (What, Why, How)
   - Slide dots navigation
   - "Don't show again" checkbox

2. **Help Modal** (lines 2193-2260)
   - Quick start guide
   - Coach facilitator questions
   - Privacy & data security info
   - Keyboard shortcuts
   - Features grid
   - About ProActive ReSolutions

3. **Share Modal** (lines 2261-2278)
   - Share URL text input
   - Copy button
   - Share code display

4. **My Maps Modal** (lines 2280-2286)
   - Dynamic map list (ARIA live region)

5. **Version History Modal** (lines 2288-2313)
   - Version stats
   - Action buttons (Save, Export, Clear)
   - Version timeline list

6. **Version Comparison Modal** (lines 2315-2330)
   - Version select dropdowns
   - Comparison result display

**Footer (lines 2332-2334)**
- Copyright notice
- Privacy policy link
- Brand tagline

---

## 3. SUPABASE INTEGRATION (Stage 2A)

### Current Implementation (`cloud-storage.js`)

**Configuration**
```javascript
const SUPABASE_CONFIG = {
    url: 'https://qhozgoiukkbwjivowrbw.supabase.co',
    anonKey: 'eyJ...', // Anon key for anonymous auth
    timeout: 10000
};
```

**CloudStorage Class Methods**
- `constructor()` - Initialize Supabase client
- `initializeSupabase()` - Create Supabase client with localStorage session
- `initializeAuth()` - Sign in anonymously, reuse existing session
- `checkForShareCode()` - Extract share code from URL
- `saveMap()` - Save map data to Supabase
- `getMyMaps()` - Fetch user's saved maps
- `loadMap()` - Retrieve specific map by ID
- `deleteMap()` - Remove map from cloud
- `generateShareCode()` - Create unique share code
- `generateShareUrl()` - Build shareable link
- Various error handling & connection methods

**Database Schema**
- `maps` table:
  - `id` (UUID primary key)
  - `device_id` (user identifier)
  - `name` (map name)
  - `data` (JSONB - relationships + trustScores)
  - `share_code` (unique share identifier)
  - `created_at`, `updated_at` (timestamps)
  - Row Level Security (RLS) policies

**Authentication Flow**
- Anonymous authentication via Supabase
- Session persistence in localStorage
- Device ID = Supabase auth UID
- Auto-refresh tokens enabled

**Security**
- RLS policies for data isolation
- XSS protection via InputValidator
- Input validation before Supabase operations
- Timeout handling (10s)

---

## 4. UI/UX PATTERNS

### Trust Scales & Visualization
**Score System (4 levels)**
- `0` (Gray) - Not yet scored
- `1` (Green) - High trust
- `2` (Yellow) - Medium trust
- `3` (Red) - Low/No trust

**Visual Representation**
- **Nodes**: Circular elements representing people
  - White circle with blue stroke = relationship nodes
  - Darker blue = center "You" node
  - 8-person maximum arranged in circle
- **Arrows**: Bidirectional connections
  - **Outward** (solid): "Would I go to them with a problem?"
  - **Inward** (dashed): "Would they come to me?"
  - Color-coded by trust level
  - Hover effects (increased thickness)
  - Click to cycle score

**Trust Definitions** (from Help modal)
- **Outward Arrow**: "How confident am I that I would go to this person if I had a problem with them?"
- **Inward Arrow**: "How confident am I that this person would come to me if they had a problem with me?"

### Navigation & Controls
**Primary Actions**
- Add Person (text input + button)
- Clear All (destructive, confirmable)
- Save/Load (localStorage)
- Version History (modal with timeline)
- Export/Import JSON (file-based)

**Cloud Actions**
- Save to Cloud (Supabase)
- My Cloud Maps (list modal)
- Get Share Link (shareable URL)

**Information Access**
- Welcome Modal (first-time users, disable-able)
- Help Modal (? keyboard shortcut)
- Version History Modal (📜)
- No navigation menu (all features in header)

### Modal UX
- **Backdrop overlay** with semi-transparent black (0.5 opacity)
- **Centered content** with white background, rounded corners
- **Close buttons** (X icon + Esc key)
- **Slide carousels** (welcome modal with dots + prev/next)
- **ARIA live regions** for dynamic content (My Maps)
- **Focus management** - focus trapped in modals

---

## 5. CSS & STYLING APPROACH

### Design System
**Brand Colors** (ProActive ReSolutions)
- Primary Cyan: `#00A8CC`
- Navy Blue: `#2E4A8B`
- Text Gray: `#333`, `#666`
- Border Gray: `#e0e0e0`, `#d1d5db`

**Trust Score Colors**
- High Trust Green: `#22c55e`
- Medium Trust Yellow: `#eab308`
- Low Trust Red: `#ef4444`
- Neutral Gray: `#d1d5db`

**Background**
- Gradient: `linear-gradient(135deg, #00A8CC 0%, #2E4A8B 100%)`
- Container: White, `border-radius: 20px`, shadow

**Typography**
- Font Stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif`
- Responsive sizing (14-2.2em)
- Line heights: 1.5-1.8

### Styling Patterns
1. **Flexbox-heavy** - all layouts use flexbox
2. **CSS Transitions** - smooth 0.3s transitions on interactive elements
3. **Hover States** - color/stroke/shadow changes
4. **Focus Visible** - 3px solid #00A8CC outline with offset
5. **Media Queries**:
   - `@media (prefers-reduced-motion: reduce)` - disable animations
   - `@media (prefers-contrast: high)` - increase contrast
   - Implicit mobile responsive (flex-wrap, max-widths)

### CSS Classes
- **Layout**: `.container`, `.header`, `.controls`, `.control-group`
- **Visualization**: `.visualization-container`, `.node-circle`, `.center-node`, `.arrow-path`
- **Legend**: `.legend`, `.legend-item`, `.legend-color`
- **Info**: `.info-panel`, `.node-count`
- **Modals**: `.modal`, `.modal-content`, `.modal-close`
- **Forms**: `.checkbox-container`, `.share-link`
- **Buttons**: `.demo-button`, `.cloud-button`, `.help-button`
- **Utilities**: `.sr-only`, `.skip-link`

---

## 6. JAVASCRIPT MODULES & DEPENDENCIES

### External Libraries
1. **Supabase JS v2** (`@supabase/supabase-js@2`)
   - CDN: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
   - Used for: cloud storage, authentication, real-time sync

### Local Modules (6 files)

#### 1. `input-validation.js` (379 lines)
**InputValidator Class - Static Methods**
- `sanitizeInput(input, maxLength)` - Strip HTML, remove dangerous chars
- `decodeHTMLEntities(str)` - Decode pre-encoded entities
- `htmlEncode(str)` - Encode special characters for safe display
- `validateTrustScore(value)` - Validate 0-3 range
- `validatePersonName(name)` - Full person name validation
- `validateMapData(mapData)` - Validate entire map structure
- XSS attack prevention via DOM methods (not string manipulation)
- Handles both input sanitization and output encoding

#### 2. `toast-notifications.js` (390 lines)
**ToastManager Class**
- Constructor options: duration, maxToasts, position, gap
- Methods:
  - `show(message, type, duration)` - Display toast
  - `success(msg)`, `error(msg)`, `warning(msg)`, `info(msg)` - Typed methods
  - `removeToastElement(id)` - Remove specific toast
  - `dismissLast()` - Dismiss last toast (Esc key)
  - `checkReducedMotion()` - Respect accessibility preferences
- Accessibility: ARIA live region, announcer div for screen readers
- Animations: slide-in from right (respects prefers-reduced-motion)

**Global Helper Functions** (defined in main script)
- `initToastManager(options)` - Factory function
- `showSuccess(msg)` - Wrapper calling toastMgr.success()
- `showError(msg)` - Wrapper calling toastMgr.error()
- `showWarning(msg)` - Wrapper calling toastMgr.warning()

#### 3. `cloud-storage.js` (540 lines)
**CloudStorage Class**
- Authentication: Anonymous sign-in via Supabase
- Session management: Persistence via localStorage
- Methods:
  - `saveMap(name, data)` - Upload to DB
  - `getMyMaps()` - List user's maps
  - `loadMap(mapId)` - Retrieve map data
  - `deleteMap(mapId)` - Remove from cloud
  - `generateShareCode()` - Create UUID-based code
  - `getMapByShareCode(code)` - Public read for shared maps
- Error handling: Connection checks, validation
- Timeout: 10 second abort for slow connections

#### 4. `version-history.js` (371 lines)
**VersionHistory Class**
- Storage: localStorage with `trustMapVersionHistory` key
- Limits: 10 versions max per map
- Auto-save: 5-minute intervals on changes
- Methods:
  - `createVersion(mapData, summary, isManual)` - New snapshot
  - `loadVersions()` - Restore from storage
  - `saveVersions()` - Persist to storage
  - `restoreVersion(versionNumber)` - Revert to old version
  - `deleteVersion(versionNumber)` - Remove specific version
  - `compareVersions(v1, v2)` - Detailed diff analysis
  - `clearAllVersions()` - Wipe history
  - `shouldAutoSave()` - Check interval
- Metadata: versionNumber, timestamp, changeSummary, relationshipCount
- Diff tracking: added, removed, modified relationships

#### 5. `accessibility-improvements.js` (492 lines)
**AccessibilityManager Class** (WCAG 2.1 AA)
- Initialization: Auto-starts on DOMContentLoaded
- Features:
  - Keyboard navigation (Tab, Escape, Arrow keys)
  - Focus management & trapping in modals
  - Screen reader announcements via ARIA live regions
  - Skip links (Jump to main content)
  - Enhanced button accessibility (Space/Enter support)
  - SVG element keyboard support
  - Modal stack management
- Methods:
  - `announce(message, priority)` - Screen reader announcement
  - `trapFocus(element)` - Keep focus within modal
  - `setupKeyboardNavigation()` - Global key handlers
  - `setupArrowNavigation()` - Support arrow keys for nodes
- Respects: `prefers-reduced-motion`, high contrast mode

#### 6. `toast-notifications.css` (321 lines)
**Standalone Toast Styling**
- `.toast-container` - Fixed top-right positioning, z-index 9999
- `.toast` - Individual toast box with slide animation
- `.toast-show` - Visible state (opacity 1, translateX 0)
- `.toast-content` - Flexbox layout with icon + message
- `.toast-icon` - Circular background (color by type)
- `.toast-close` - Dismiss button styling
- **Toast Types**:
  - `.toast-success` - Green (#10b981)
  - `.toast-error` - Red (#ef4444)
  - `.toast-warning` - Yellow (#f59e0b)
  - `.toast-info` - Blue (#3b82f6)
- Animations: Slide-in 300ms cubic-bezier
- Mobile: Auto-adjust width/max-width

---

## 7. KEY FUNCTIONAL AREAS IN INDEX.HTML

### 1. Visualization Rendering (lines 1130-1253)
```
renderVisualization()
  ├─ clearExistingNodes()
  ├─ clearExistingArrows()
  ├─ forEach(relationship):
  │   ├─ calculateNodePosition(angle)
  │   ├─ createArrows()          # Outward + Inward
  │   └─ createNode()            # Circle + text + click handler
```
- **Algorithm**: Circle layout with equal angular spacing
- **Formula**: `angle = (index * 2π) / relationshipCount - π/2`
- **Position**: `x = CENTER_X + RADIUS * cos(angle)`, `y = CENTER_Y + RADIUS * sin(angle)`

### 2. Data Persistence (lines 1304-1440)
```
Local Storage (localStorage)
├─ saveMap() → localStorage.setItem('trustMap', JSON)
├─ loadMap() → localStorage.getItem('trustMap')
├─ saveToLocalStorage() → Full serialization
└─ loadFromLocalStorage() → Full restoration

Cloud Storage (Supabase)
├─ saveToCloud() → INSERT/UPDATE maps table
├─ getMyMaps() → SELECT * FROM maps WHERE device_id = ?
├─ loadMapFromCloud() → SELECT by map_id
└─ shareMap() → Generate share_code + URL
```

### 3. Score Cycling (lines 1250-1268)
```javascript
cycleScore(personId, direction):
  0 → 1 → 2 → 3 → 0 (forward)
  0 → 3 → 2 → 1 → 0 (backward)
```
- Updates both `trustScores[personId].outward` and `.inward`
- Triggers re-render of single arrow (optimized)
- Auto-saves to localStorage + version history

### 4. Modal Management (throughout script)
- **Modals Array**: Track open modals for focus management
- **Close All**: ESC key closes all modals (via `closeAllModals()`)
- **Focus Trap**: AccessibilityManager confines focus within modal
- **Display**: CSS `.modal.show` = `display: flex`

### 5. Demo Data Loading (lines 1529-1583)
Pre-populated example network with realistic trust patterns:
```javascript
Sample: ["Mom", "Best Friend", "Therapist", "Sibling", ...]
Scores: Various trust patterns showing imbalances
```

---

## 8. DEPENDENCIES & EXTERNAL SERVICES

### Runtime Dependencies
1. **Supabase JS v2** - Cloud storage, auth, database
2. **Browser APIs**:
   - localStorage - Local persistence
   - JSON - Serialization
   - Blob/File API - Export/import
   - SVG DOM - Visualization rendering
   - ARIA attributes - Accessibility

### Development Dependencies
None specified in package.json (no build step - pure client-side)

### External Services
1. **Supabase** (Backend)
   - URL: `https://qhozgoiukkbwjivowrbw.supabase.co`
   - Auth: Anonymous
   - DB: PostgreSQL
   - RLS: Enabled
   - Policies: 3 tables with security rules

2. **GitHub Pages** (Deployment)
   - Automatic from main branch
   - GitHub Actions workflow

---

## 9. PAIN POINTS FOR REFACTORING (Sprint 1: Fixes First)

### Architecture Issues
1. **Monolithic index.html** - 2346 lines with embedded CSS
   - Refactor: Split into separate `main.js`, `styles.css`, module files
   - Impact: Easier testing, better separation of concerns

2. **Global Script Namespace Pollution**
   - 400+ functions in global scope (showError, cycleScore, saveMap, etc.)
   - Refactor: Namespace under App object or ES6 modules
   - Impact: Reduce conflicts, improve code organization

3. **No Build Process**
   - Can't use ES6 modules, bundling, minification
   - Current: Direct CDN script includes
   - Refactor: Minimal build (esbuild) or Vite
   - Impact: Better performance, module system

### State Management Issues
4. **Manual State Synchronization**
   - State in memory: `relationships[]`, `trustScores{}`
   - localStorage, Supabase, version history all out-of-sync risks
   - Refactor: Centralized state management (Zustand, Redux-lite)
   - Impact: Prevent data corruption, single source of truth

5. **No Error Recovery**
   - Failed cloud operations leave app in inconsistent state
   - Refactor: Transaction-like semantics, rollback capabilities
   - Impact: Reliability, user confidence

### UI/UX Issues
6. **Helper Functions Not Defined in Expected Place**
   - `showError`, `showSuccess` called from cloud-storage.js
   - But not explicitly defined in main script (implicit globals)
   - Refactor: Explicit injection or module exports
   - Impact: Clearer dependency graph

7. **Modal System Hardcoded**
   - 5 modals with repeated open/close code
   - Refactor: Generic Modal class with state machine
   - Impact: Easier to add features, less duplication

8. **SVG Rendering Not Optimized**
   - Full re-render on every change (clears entire SVG)
   - Refactor: Incremental updates, differential rendering
   - Impact: Better performance with many nodes

### Security Issues (in Sprint 1 scope)
9. **Credential Exposure** - Supabase keys in HTML source
   - Refactor: Use environment variables, server-side proxy
   - Impact: Prevent key rotation issues

10. **XSS in Modal Content** - HTML string concatenation (fixed via InputValidator)
   - Keep current approach (DOM-safe), ensure consistent use
   - Impact: Prevent injection attacks

### Testing Issues
11. **No Automated Testing Framework**
   - Manual test files exist but not integrated
   - Refactor: Jest + RTL for unit/integration tests
   - Impact: Catch regressions, confidence in refactors

12. **Accessibility Not Tested in CI**
   - Refactor: Add axe-core testing, lighthouse CI
   - Impact: Prevent a11y regression

---

## 10. CRITICAL NOTES FOR SPRINT 1 (Fixes Only)

### What NOT to Refactor Yet
- ❌ Don't split index.html (it's working, changes risk bugs)
- ❌ Don't change module system (would require build setup)
- ❌ Don't add state management library (scope creep)
- ❌ Don't rewrite SVG rendering (complex, fragile)

### What CAN Be Fixed
- ✅ Bug fixes in existing functions
- ✅ Security patches (InputValidator improvements)
- ✅ Accessibility enhancements (a11y-improvements.js additions)
- ✅ Toast notification improvements
- ✅ Version history reliability fixes
- ✅ Error handling improvements
- ✅ Performance optimizations (non-breaking)

### Git Workflow for Sprint 1
1. Create feature branch: `git checkout -b fix/<issue-name>`
2. Make changes to relevant JS files
3. Test thoroughly (manual + Python test suite)
4. Commit with clear message
5. Create PR with security checks passing
6. Merge to main (auto-deploys)

---

## Summary

**Architecture Style**: Monolithic single-page application (SPA)
**Frontend**: Vanilla JS, SVG-based visualization
**Backend**: Supabase (anonymous auth, PostgreSQL)
**Persistence**: localStorage + cloud storage
**Accessibility**: WCAG 2.1 AA compliant
**Security**: Input validation, XSS protection, RLS policies
**Status**: Production-ready, v1.0 live
**Refactor Path**: Module-based architecture in future phases

The codebase is **clean and functional** but **tightly coupled**. Fixes can be done safely without major refactoring—focus on bugs, security, and UX improvements for Sprint 1.
