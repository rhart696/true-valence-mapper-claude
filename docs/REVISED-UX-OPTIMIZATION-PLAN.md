# Revised UX Optimization Plan v2.1
## ProActive True Valence Mapper - Work-Focused Coaching Tool

**Status**: Final - Coaching & Professional Development Context
**Date**: 2025-11-12
**Confidence Level**: High (validated against adversarial analysis)

---

## Executive Summary

This revised plan addresses all critical flaws identified in adversarial review and refocuses on **work-related coaching and professional reflection**:
- **Corrected persona**: Designer anxious about using new mapping tools (not tech in general)
- **Security-first** architecture (not afterthought)
- **Realistic timeline** (5 weeks MVP vs. 4 weeks fantasy)
- **Professional tone** (calm, competent, elegant)
- **Accessibility from day 1** (not Phase 4)
- **Work context**: Coaching relationships, professional networks, team dynamics

**Bottom Line**: Ship a secure, accessible, professionally elegant MVP in 5 weeks for work-focused coaching and reflection.

---

## Part 1: Corrected User Persona

### From (Wrong):
> "Anxious novice with NO experience... she is a designer"

### To (Accurate):
```yaml
Primary Persona: "Design-Aware Professional Explorer"

Demographics:
- Age: 28-45
- Profession: Graphic designer, visual artist, creative professional
- Tech comfort: HIGH (uses Figma, Sketch, Adobe suite daily)
- Design literacy: EXPERT (judges interfaces critically)

Psychographics:
- Anxiety source: Unfamiliar MAPPING TOOLS (not technology generally)
- Design expectations: Sophisticated, elegant, intentional
- Software fluency: Expert with design tools, cautious with new tools
- Interaction preference: Clear, calm, competent interface
- Trust in tools: Judges design quality harshly

Primary Use Cases:
1. Professional coaching sessions (mapping work relationships)
2. Career development reflection (professional network analysis)
3. Team dynamics understanding (workplace trust patterns)
4. Leadership coaching (relationship health assessment)
5. Personal growth (family relationships for illustration only)

Goals:
- Understand relationship patterns with coach guidance
- Map professional networks and team dynamics
- Track trust patterns over time
- Share insights with coach/mentor
- Maintain privacy and control

Pain Points:
- Unfamiliar with trust mapping tools (this is new)
- Cluttered interfaces create anxiety
- Patronizing simplifications insult intelligence
- Gamified interfaces trivialize serious work
- Hidden features create distrust
- Poor visual design signals unprofessionalism

Design Implications:
✓ Professional aesthetic (refined, calm, spacious)
✓ All features visible (visual hierarchy, not hiding)
✓ Optional guidance (contextual, not forced)
✓ Calm, competent feedback (informative, not playful)
✓ Multiple entry points (self-service)
✓ Elegant visual design (designer-grade quality)
```

**Secondary Personas** (5 entry scenarios):
1. **Coach-referred** - Wants to map specific work relationships quickly
2. **Self-explorer** - Wants example first before committing personal data
3. **Returning user** - Wants auto-load of existing map
4. **Coach demo** - Needs flexible presentation mode
5. **Team facilitator** - Mapping team dynamics in workshop

---

## Part 2: Security & Privacy Architecture (Phase 0 - BLOCKING)

### Critical Security Fixes

#### 1. Supabase Row-Level Security (RLS) - MANDATORY

```sql
-- File: supabase-rls-policies.sql

-- Drop existing policies
DROP POLICY IF EXISTS "Users can only access own maps" ON trust_maps;

-- Enable RLS
ALTER TABLE trust_maps ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own maps
CREATE POLICY "Select own maps"
ON trust_maps
FOR SELECT
USING (
  device_id = current_setting('request.jwt.claims', true)::json->>'device_id'
  OR share_code = current_setting('app.share_code', true)
);

-- Policy: Users can only insert with their device_id
CREATE POLICY "Insert own maps"
ON trust_maps
FOR INSERT
WITH CHECK (
  device_id = current_setting('request.jwt.claims', true)::json->>'device_id'
);

-- Policy: Users can only update their own maps
CREATE POLICY "Update own maps"
ON trust_maps
FOR UPDATE
USING (
  device_id = current_setting('request.jwt.claims', true)::json->>'device_id'
);

-- Policy: Users can only delete their own maps
CREATE POLICY "Delete own maps"
ON trust_maps
FOR DELETE
USING (
  device_id = current_setting('request.jwt.claims', true)::json->>'device_id'
);

-- Add data size constraints (prevent DoS via large payloads)
ALTER TABLE trust_maps
ADD CONSTRAINT relationships_size_limit
CHECK (pg_column_size(relationships) < 1048576); -- 1MB limit

ALTER TABLE trust_maps
ADD CONSTRAINT trust_scores_size_limit
CHECK (pg_column_size(trust_scores) < 524288); -- 512KB limit
```

#### 2. Share Code Security

```javascript
// File: secure-sharing.js

class SecureSharing {
  constructor() {
    this.shareAttempts = new Map(); // In-memory rate limiting
  }

  // Generate cryptographically secure share code
  generateShareCode() {
    // 16 hex chars = 64 bits of entropy
    // Brute force at 1000 req/s = 584 million years
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Rate limiting for share code attempts
  checkRateLimit(identifier) {
    const now = Date.now();
    const attempts = this.shareAttempts.get(identifier) || [];

    // Remove attempts older than 1 hour
    const recentAttempts = attempts.filter(time => now - time < 3600000);

    if (recentAttempts.length >= 10) {
      throw new Error('Too many attempts. Please try again in 1 hour.');
    }

    recentAttempts.push(now);
    this.shareAttempts.set(identifier, recentAttempts);
    return true;
  }

  // Get share code with rate limiting
  async getSharedMap(shareCode) {
    // Use device fingerprint + IP for rate limiting
    const identifier = await this.getIdentifier();
    this.checkRateLimit(identifier);

    // Set share code in session for RLS policy
    await this.supabase.rpc('set_config', {
      parameter: 'app.share_code',
      value: shareCode
    });

    const { data, error } = await this.supabase
      .from('trust_maps')
      .select('*')
      .eq('share_code', shareCode)
      .single();

    if (error) throw error;
    return data;
  }

  // Simple fingerprinting (not perfect, but better than nothing)
  async getIdentifier() {
    const components = [
      navigator.userAgent,
      navigator.language,
      new Date().getTimezoneOffset(),
      screen.colorDepth,
      screen.width + 'x' + screen.height
    ];

    const str = components.join('|');
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
}
```

#### 3. Privacy Policy & GDPR Compliance

```html
<!-- File: privacy-consent-modal.html -->

<div id="privacyConsentModal" class="modal" role="dialog" aria-labelledby="privacy-title" aria-modal="true">
  <div class="modal-content">
    <h2 id="privacy-title">Cloud Storage Privacy Notice</h2>

    <div class="privacy-body">
      <p><strong>What data is stored:</strong></p>
      <ul>
        <li>Relationship names you enter</li>
        <li>Trust scores you assign</li>
        <li>Anonymous device identifier</li>
        <li>Map name and timestamps</li>
      </ul>

      <p><strong>How data is protected:</strong></p>
      <ul>
        <li>Encrypted in transit (HTTPS/TLS)</li>
        <li>Anonymous (no email, no account)</li>
        <li>You control deletion</li>
        <li>Share links are private (don't share publicly)</li>
      </ul>

      <p><strong>Your rights:</strong></p>
      <ul>
        <li><strong>Right to erasure:</strong> Delete all your data anytime</li>
        <li><strong>Right to export:</strong> Download your data in JSON format</li>
        <li><strong>Right to access:</strong> View all your saved maps</li>
      </ul>

      <p><strong>Important:</strong></p>
      <ul>
        <li>We cannot recover deleted data</li>
        <li>Share links allow anyone with the link to view that map</li>
        <li>Data stored on servers in [REGION - specify based on Supabase region]</li>
      </ul>

      <details>
        <summary>Full Privacy Policy</summary>
        <div class="privacy-policy-full">
          [Link to full privacy policy - MUST be created]
        </div>
      </details>
    </div>

    <div class="consent-actions">
      <label class="consent-checkbox">
        <input type="checkbox" id="privacyConsent" required>
        <span>I understand and consent to cloud storage</span>
      </label>
      <div class="button-group">
        <button class="btn-secondary" onclick="declinePrivacy()">Use Locally Only</button>
        <button class="btn-primary" onclick="acceptPrivacy()" disabled id="acceptBtn">Save to Cloud</button>
      </div>
    </div>
  </div>
</div>

<script>
// Enable accept button only when checkbox is checked
document.getElementById('privacyConsent').addEventListener('change', (e) => {
  document.getElementById('acceptBtn').disabled = !e.target.checked;
});
</script>
```

#### 4. Data Validation & Sanitization

```javascript
// File: data-validation.js

class DataValidator {
  // Validate relationship name
  validateName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Name must be a non-empty string');
    }

    if (name.length > 50) {
      throw new Error('Name too long (50 characters max)');
    }

    // Sanitize HTML to prevent XSS
    const div = document.createElement('div');
    div.textContent = name;
    return div.textContent;
  }

  // Validate trust score
  validateScore(score) {
    if (typeof score !== 'number' || ![0, 1, 2, 3].includes(score)) {
      throw new Error('Invalid trust score (must be 0, 1, 2, or 3)');
    }
    return score;
  }

  // Validate entire map data structure
  validateMapData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid map data structure');
    }

    // Validate relationships array
    if (!Array.isArray(data.relationships)) {
      throw new Error('Relationships must be an array');
    }

    if (data.relationships.length > 24) {
      throw new Error('Too many relationships (24 max)');
    }

    // Validate each relationship
    const validatedRelationships = data.relationships.map(rel => ({
      id: rel.id, // Keep as-is (timestamp)
      name: this.validateName(rel.name)
    }));

    // Validate trust scores
    if (!data.trustScores || typeof data.trustScores !== 'object') {
      throw new Error('Trust scores must be an object');
    }

    const validatedScores = {};
    for (const [id, scores] of Object.entries(data.trustScores)) {
      validatedScores[id] = {
        outward: this.validateScore(scores.outward),
        inward: this.validateScore(scores.inward)
      };
    }

    // Check total size (prevent DoS)
    const jsonSize = JSON.stringify({
      relationships: validatedRelationships,
      trustScores: validatedScores
    }).length;

    if (jsonSize > 102400) { // 100KB limit
      throw new Error('Map data too large (100KB max)');
    }

    return {
      relationships: validatedRelationships,
      trustScores: validatedScores
    };
  }
}

// Use in save function
async function saveToCloud(mapData, mapName) {
  const validator = new DataValidator();

  try {
    const validatedData = validator.validateMapData(mapData);
    const validatedName = validator.validateName(mapName);

    // Now safe to save
    const { data, error } = await supabase
      .from('trust_maps')
      .insert([{
        device_id: deviceId,
        map_name: validatedName,
        relationships: validatedData.relationships,
        trust_scores: validatedData.trustScores,
        version: '1.0'
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };

  } catch (error) {
    console.error('Validation error:', error);
    showToast(`Invalid data: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}
```

### Security Testing Checklist

```markdown
## Security Validation (Required before launch)

- [ ] RLS policies verified (attempt to read other users' data fails)
- [ ] Share code entropy verified (16 hex chars minimum)
- [ ] Rate limiting tested (10 attempts per hour limit works)
- [ ] Data validation tested (XSS attempts blocked)
- [ ] Size limits enforced (1MB relationships, 512KB scores)
- [ ] Device ID spoofing prevented (cannot overwrite other device's data)
- [ ] GDPR deletion verified (data truly deleted, not soft delete)
- [ ] Privacy policy reviewed by legal (if applicable)
- [ ] SQL injection attempts tested (parameterized queries used)
- [ ] HTTPS enforced (no mixed content warnings)
```

---

## Part 3: Revised Timeline (Realistic Estimates)

### Option A: MVP in 5 Weeks (RECOMMENDED)

```
WEEK 1-2: Phase 0 - Foundation (BLOCKING)
Day 1-2: Security implementation
  - Implement RLS policies
  - Add data validation
  - Create privacy policy
  - Test security vulnerabilities

Day 3-5: Accessibility architecture
  - Semantic HTML refactor
  - ARIA labels and roles
  - Keyboard navigation
  - Screen reader testing basics

Day 6-7: Version history system
  - Implement VersionHistory class
  - Add UI for version restore
  - Test data recovery

Day 8-9: Testing infrastructure
  - Set up Jest/Vitest
  - Add accessibility tests (axe-core)
  - Create test fixtures

WEEK 3-4: Phase 1 - Core UX (MVP)
Day 10-12: Toast system (with accessibility)
  - Build toast component with aria-live
  - Replace all alert() calls
  - Add toast queue logic
  - Test with screen readers

Day 13-14: Inline validation
  - Replace alert() validation
  - Add inline helper text
  - Test validation states

Day 15-17: Autosave + version integration
  - Implement debounced autosave
  - Integrate with VersionHistory
  - Add save indicator
  - Test autosave conflicts

Day 18: Empty state hero
  - Design and implement
  - Add recommended actions
  - Test with first-time users

Day 19-22: Microcopy improvements
  - Audit all user-facing text
  - Rewrite for calm, professional tone
  - Test clarity with designers

WEEK 5: Testing & Polish
Day 23-25: User testing with 5 users
  - Recruit designers/creative professionals
  - Observe (don't guide)
  - Document findings
  - Prioritize fixes

Day 26-27: Critical bug fixes
  - Fix P0/P1 issues from testing
  - Verify security still intact
  - Re-test accessibility

Day 28: Documentation & deploy prep
  - Write deployment guide
  - Finalize privacy policy
  - Set up monitoring

TOTAL: 28 days = 5 weeks
CONFIDENCE: High (includes buffer time)
```

### Post-MVP Phases (Data-Driven)

**Phase 2: Only if users request** (3 weeks)
- Undo system (IF users want it)
- Explicit scoring UI (IF arrow clicks confuse)
- Node limit increase (IF users hit 8-person limit)

**Phase 3: Mobile & polish** (3 weeks)
- Mobile-responsive layout
- Touch optimizations
- Micro-animations (subtle only)

---

## Part 4: Professional Design System

### Tone Guidelines

**Core Principle**: Calm, competent, elegant

```yaml
Voice: Professional, clear, respectful
Mood: Calm, spacious, elegant
Pace: Unhurried, confident

NEVER:
- Confetti, sparkles, or celebrations
- "Great job!" "Awesome!" "You did it!"
- Playful emoji (🎉 ✨ 😊)
- Gamification language
- Patronizing simplifications
- Hand-holding tutorials

ALWAYS:
- Clear confirmations
- Informative status updates
- Professional tone
- Elegant visual design
- Respect user intelligence
- Trust user competence
```

### Revised Microcopy Library

```javascript
// File: microcopy.js

const MICROCOPY = {
  // Person management
  personAdded: (name) => `${name} added.`,
  personRemoved: (name) => `${name} removed.`,
  cannotAddMore: `Maximum 24 relationships.`,
  nameRequired: `Please enter a name.`,
  nameDuplicate: (name) => `${name} is already in your map.`,

  // Scoring
  scoreUpdated: (name) => `Trust score updated for ${name}.`,
  scorePrompt: `Click arrows to set trust levels.`,

  // Save/Load
  savedLocal: `Saved to this device.`,
  savedCloud: (code) => `Saved to cloud. Share code: ${code}`,
  loadedMap: (name) => `Loaded: ${name}`,
  autoSaved: `Auto-saved`,

  // Destructive actions
  confirmClear: {
    title: `Clear all relationships?`,
    body: `This will remove all relationships from your current map. You can restore from version history if needed.`,
    confirm: `Clear Map`,
    cancel: `Cancel`
  },

  confirmImport: {
    title: `Replace current map?`,
    body: (count) => `This will replace your ${count} current relationships with imported data. You can restore from version history if needed.`,
    confirm: `Import`,
    cancel: `Cancel`
  },

  // Errors
  errorGeneric: `Unable to complete action. Please try again.`,
  errorNetwork: `Cannot connect to cloud. Changes saved locally.`,
  errorValidation: (field) => `Invalid ${field}. Please check and try again.`,

  // Empty states
  emptyState: {
    title: `Start mapping relationships`,
    subtitle: `Add someone from your life, or explore the example map first.`,
    primaryAction: `Try Example Map`,
    secondaryAction: `Add Someone`
  },

  // Help and guidance
  firstPersonHint: `Add your first person to begin.`,
  firstScoreHint: `Set trust levels to see patterns.`,

  // Version history
  versionHistory: {
    title: `Version History`,
    restore: `Restore`,
    noVersions: `No saved versions yet.`
  }
};
```

### Visual Design Tokens (Simplified)

```css
/* File: design-tokens.css */

:root {
  /* Colors (8 total - reduced from 100+) */
  --brand-primary: #00A8CC;
  --brand-secondary: #2E4A8B;
  --trust-high: #22c55e;
  --trust-medium: #eab308;
  --trust-low: #ef4444;
  --gray-light: #f3f4f6;
  --gray-mid: #6b7280;
  --gray-dark: #1f2937;

  /* Spacing (4 total) */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 4rem;     /* 64px */

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */

  /* Borders */
  --radius-sm: 0.5rem;  /* 8px */
  --radius-lg: 1.25rem; /* 20px */

  /* Shadows (2 total) */
  --shadow-soft: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-strong: 0 20px 40px rgba(0, 0, 0, 0.2);

  /* Animation */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Part 5: Accessibility (Phase 0 - Not Phase 4)

### Implementation Checklist

```markdown
## Accessibility Requirements (Phase 0 - BLOCKING)

### HTML Structure
- [ ] Semantic HTML5 elements used throughout
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Landmarks defined (main, nav, aside, etc.)
- [ ] Forms have proper label associations
- [ ] Links and buttons semantically correct

### ARIA Implementation
- [ ] Live regions for dynamic updates (aria-live)
- [ ] All interactive elements have accessible names
- [ ] SVG has role="img" and proper labels
- [ ] Modal focus management (aria-modal, focus trap)
- [ ] Current state communicated (aria-current, aria-selected)

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Tab order logical
- [ ] Focus visible (3px outline minimum)
- [ ] No keyboard traps
- [ ] Keyboard shortcuts documented

### Screen Reader Support
- [ ] Tested with VoiceOver (macOS)
- [ ] Tested with NVDA (Windows)
- [ ] Screen reader-only text where needed (.sr-only)
- [ ] Images and icons have alt text
- [ ] Forms announce validation errors

### Color & Contrast
- [ ] Text contrast ≥4.5:1 (WCAG AA)
- [ ] Large text contrast ≥3:1
- [ ] Color not sole indicator (trust scores have text labels)
- [ ] Focus indicators visible against all backgrounds

### Testing
- [ ] axe DevTools shows 0 violations
- [ ] Lighthouse Accessibility score ≥95
- [ ] Manual keyboard testing passed
- [ ] Manual screen reader testing passed
```

### Key Accessibility Implementations

**1. Announcer for Dynamic Updates**

```html
<!-- Always present, screen reader only -->
<div
  id="announcer"
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
></div>

<script>
function announce(message, priority = 'polite') {
  const announcer = document.getElementById('announcer');
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = '';

  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
}

// Usage
announce('Alex added to your map');
announce('Trust score updated');
</script>
```

**2. Keyboard Navigation for SVG**

```javascript
// Make all SVG nodes and arrows keyboard accessible
function setupKeyboardNav() {
  const focusableElements = document.querySelectorAll('[role="button"]');

  focusableElements.forEach((el, index) => {
    el.setAttribute('tabindex', '0');

    el.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          el.click();
          announce(`Activated ${el.getAttribute('aria-label')}`);
          break;

        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          const next = focusableElements[(index + 1) % focusableElements.length];
          next.focus();
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          const prev = focusableElements[(index - 1 + focusableElements.length) % focusableElements.length];
          prev.focus();
          break;

        case 'Home':
          e.preventDefault();
          focusableElements[0].focus();
          break;

        case 'End':
          e.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
          break;
      }
    });
  });
}
```

---

## Part 6: Success Metrics (Outcome-Based)

### Remove Vanity Metrics

❌ **Do NOT measure**:
- Time to first success (gameable)
- Task completion rate on trivial tasks
- Self-reported emotions (unreliable)
- SUS score only (survivor bias)

### Action Metrics (Week 1-4)

✅ **DO measure**:

```javascript
// Privacy-preserving analytics

const metrics = {
  // Engagement depth
  relationshipCount: 'Average relationships mapped per user',
  scoringCompleteness: '% users who score ALL mapped relationships',
  sessionDuration: 'Median time spent (indicates engagement)',

  // Retention
  dayOneReturn: '% users who return within 24 hours',
  weekOneReturn: '% users who return within 7 days',
  monthOneReturn: '% users who return within 30 days',

  // Feature usage
  cloudSaveRate: '% users who save to cloud',
  shareRate: '% users who generate share links',
  versionRestoreRate: '% users who use version history',

  // Quality indicators
  errorRate: 'Errors per session',
  dropoffRate: '% users who abandon before adding 3 relationships',
  helpAccessRate: '% users who open help/FAQ'
};

// Implementation (no PII)
class PrivacyMetrics {
  track(event, properties = {}) {
    // Only if user consented
    if (!hasConsent()) return;

    // Hash device ID (irreversible)
    const sessionHash = this.hash(getDeviceId() + Date.now());

    // Remove all PII
    const sanitized = {
      event,
      count: properties.count || 1, // Numbers only
      timestamp: Date.now(),
      session: sessionHash.slice(0, 12) // Truncated hash
    };

    // Send to analytics (self-hosted preferred)
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(sanitized)
    });
  }
}

// Usage examples
metrics.track('person_added', { count: relationships.length });
metrics.track('map_saved_cloud');
metrics.track('version_restored');
```

### Outcome Metrics (Month 1-3)

```yaml
User Impact:
  - "% users who report relationship insights" (survey)
  - "% users who share map with coach" (self-reported)
  - "Testimonials mentioning specific benefits" (qualitative)

Professional Adoption:
  - "# coaches who recommend to 2+ clients"
  - "# coaching organizations that adopt"
  - "% professional users who use weekly"

Technical Quality:
  - "Lighthouse Performance ≥90"
  - "Lighthouse Accessibility = 100"
  - "Zero critical security issues"
  - "Zero data loss reports"

Business Viability:
  - "NPS score ≥40"
  - "% users willing to pay for pro features" (survey)
  - "Feature requests indicating value" (qualitative)
```

---

## Part 7: What Changed from v2.0

### Removed

❌ **Crisis resources** (suicidality, domestic violence) - Not appropriate for work-focused coaching tool
❌ **Therapeutic positioning** - Defer therapist features to later version
❌ **Emotional harm warnings** - Family relationships used for illustration only, not primary use case
❌ **Clinical language** - Not positioning as therapy tool

### Revised

✅ **Persona**: Designer anxious about NEW MAPPING TOOLS (not technology generally)
✅ **Use cases**: Work relationships, professional coaching, team dynamics (primary)
✅ **Tone**: Professional, calm, competent (not therapeutic)
✅ **Context**: Coaching sessions, career reflection, leadership development
✅ **Family relationships**: For illustration purposes only (not primary focus)

### Added

✅ **Work-focused examples**: Professional networks, team dynamics, work relationships
✅ **Coaching context**: Tool designed for use with coach/mentor
✅ **Professional tone**: Elegant, calm, competent (designer-grade quality)
✅ **Career development framing**: Professional growth and relationship awareness

---

## Part 8: Risk Mitigation

### Identified Risks & Mitigations

**Risk: Data breach/privacy violation**
- Mitigation: RLS policies, data validation, rate limiting, privacy policy
- Acceptance: Security testing required before launch

**Risk: Accessibility lawsuit**
- Mitigation: WCAG 2.1 AA compliance from Phase 0, ongoing testing
- Acceptance: Accessibility is blocking requirement

**Risk: Timeline slippage**
- Mitigation: Realistic estimates with buffer, MVP scope focused
- Acceptance: 5 weeks is hard deadline, features cut if needed

**Risk: Low user adoption**
- Mitigation: User testing in Week 5, iterate based on feedback
- Acceptance: MVP is learning tool, not final product

**Risk: Poor visual design quality**
- Mitigation: Designer-grade aesthetic, designer user testing
- Acceptance: Visual quality is critical for designer audience

---

## Part 9: Implementation Priority

### Phase 0 (Week 1-2): Foundation - REQUIRED

**Blocking items** (nothing ships without these):
1. Security (RLS, validation, privacy policy)
2. Accessibility architecture (semantic HTML, ARIA, keyboard)
3. Version history (autosave safety)
4. Testing infrastructure (Jest, axe-core)

**Acceptance**: All security tests pass, accessibility score ≥95

### Phase 1 (Week 3-4): Core UX - MVP

**Required for MVP**:
1. Toast system (replace alerts, with a11y)
2. Inline validation (non-blocking feedback)
3. Autosave with versions (data safety)
4. Empty state (clear entry point)
5. Professional microcopy (all user-facing text)

**Acceptance**: 5 designers can complete core tasks without help

### Week 5: Testing & Polish - VALIDATION

**Required before launch**:
1. User testing with 5 designers/creative professionals
2. Critical bug fixes (P0/P1 issues)
3. Security re-verification
4. Documentation (privacy policy, help docs)

**Acceptance**: No P0/P1 issues, security intact, users complete tasks

### Post-MVP: Data-Driven Decisions

**Only build IF users need**:
- Undo system (IF requested)
- Explicit scoring UI (IF arrows confuse)
- Mobile optimization (IF mobile traffic >30%)
- Node limit increase (IF users hit limit)

**Acceptance**: User data shows clear need before building

---

## Part 10: Go/No-Go Criteria

### Ready to Launch (Week 5)

**Must have ALL of these**:
- ✅ Zero P0 security issues (RLS tested, validation works)
- ✅ Zero P0 accessibility issues (axe score 100, screen reader works)
- ✅ Zero P0 functional issues (core tasks completable)
- ✅ Privacy policy published and linked
- ✅ 5 user tests completed with ≥80% task completion
- ✅ Version history prevents data loss (tested)
- ✅ Monitoring/error tracking configured
- ✅ Visual design quality meets designer standards

**Nice to have (can defer)**:
- Undo system
- Mobile optimization
- Micro-animations
- Advanced analytics

### No-Go Triggers

**Do NOT launch if**:
- RLS policies not verified (data breach risk)
- Accessibility score <90 (legal risk)
- User testing shows <60% task completion (usability failure)
- Privacy policy not complete (compliance risk)
- Version history not working (data loss risk)
- Visual design quality rated poorly by designers (audience mismatch)

---

## Conclusion

This revised plan focuses on **work-related coaching and professional development**:

1. **Persona**: Designer anxious about unfamiliar mapping tools (not tech generally)
2. **Context**: Professional coaching, career reflection, team dynamics
3. **Tone**: Calm, competent, elegant (designer-grade quality)
4. **Security**: RLS, validation, privacy policy in Phase 0
5. **Timeline**: 5 weeks MVP (realistic, with buffer)
6. **Accessibility**: Phase 0 requirement (not Phase 4)
7. **Scope**: Work-focused MVP, defer therapeutic features

**Confidence Level**: HIGH - Plan validated and refined for work context

**Next Action**: Stakeholder review → Approve MVP scope → Begin Phase 0 implementation

---

**End of Revised Plan v2.1**
**Ready for work-focused coaching implementation**
