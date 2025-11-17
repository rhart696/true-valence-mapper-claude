# CRITICAL SECURITY ANALYSIS
## True Valence Mapper RLS Implementation

**Date:** 2025-11-12
**Status:** CRITICAL ISSUES IDENTIFIED
**Action Required:** IMMEDIATE

---

## Executive Summary

The current RLS implementation has **CRITICAL SECURITY VULNERABILITIES** that make the "secure" policies ineffective. The policies as written **DO NOT WORK** with the current application architecture.

### Critical Issues Found

1. **Policy-Application Mismatch** - Policies expect JWT claims, app uses anonymous auth
2. **No Actual Row Isolation** - Current "secure" policies would allow all access
3. **Vulnerable Policy Still Exists** - `fix-rls-policy.sql` contains USING(true) policy
4. **Testing Won't Catch This** - Tests use custom headers that aren't validated by RLS

---

## Problem Analysis

### Issue 1: Authentication Model Mismatch

**The Policies Expect:**
```sql
device_id::text = current_setting('request.jwt.claims', true)::json->>'device_id'
```

**The Application Provides:**
```javascript
// cloud-storage.js - This is anonymous auth with NO JWT claims
const supabase = window.supabase.createClient(url, anonKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
```

**Result:** The policies can NEVER match device_id because:
- Anonymous auth provides NO JWT claims
- `current_setting('request.jwt.claims')` returns NULL
- Policy evaluation falls through to default deny OR allow (depending on implementation)

### Issue 2: The "Secure" Policies Are Actually Insecure

The current secure policies in `supabase-secure-rls-policies.sql` will either:

**Option A:** Always DENY (if NULL check fails)
- Users can't access ANY data including their own
- Application breaks completely

**Option B:** Always ALLOW (if NULL evaluates to pass)
- Same as `USING (true)` - the original vulnerability
- No security improvement

### Issue 3: Application Already Implements Correct Pattern

Looking at `cloud-storage.js`, the app ALREADY does the right thing:

```javascript
// UPDATE - includes device_id in WHERE clause
.update({ ... })
.eq('id', mapId)
.eq('device_id', this.deviceId);  // ✓ CORRECT!

// DELETE - includes device_id in WHERE clause
.delete()
.eq('id', mapId)
.eq('device_id', this.deviceId);  // ✓ CORRECT!

// SELECT own maps - filters by device_id
.select('*')
.eq('device_id', this.deviceId);  // ✓ CORRECT!
```

The application-level security is CORRECT and WORKING.

---

## The Real Security Issue

The ACTUAL vulnerability is:

1. **Without RLS enforcement at database level**, a malicious user could:
   - Bypass the JavaScript layer
   - Make direct API calls to Supabase
   - Access/modify ANY row by crafting SQL without device_id filters

2. **With anonymous auth and no JWT claims**, true RLS is IMPOSSIBLE because:
   - There's no authenticated user identity at database level
   - Device IDs are client-provided and untrusted
   - Cannot verify device_id in RLS policy without authentication

---

## Solution Options

### Option 1: Keep Application-Level Security (Current State)

**Pros:**
- Already implemented correctly
- Works with anonymous auth
- Simple architecture

**Cons:**
- Vulnerable to direct API access
- Relies on client-side code
- Can't enforce at database level

**Security Level:** Medium (vulnerable to sophisticated attacks)

### Option 2: Implement Proper Authentication

**Required Changes:**
1. Use Supabase Auth with custom claims
2. Store device_id in JWT claims during "anonymous" session
3. Update RLS policies to read from JWT
4. Maintain localStorage for persistence

**Implementation:**
```javascript
// During initialization
const { data: { session } } = await supabase.auth.signInAnonymously({
    options: {
        data: { device_id: this.deviceId }
    }
});

// RLS can then use:
device_id::text = auth.uid()  // Supabase auth UID
// OR with custom claims:
device_id::text = (auth.jwt() -> 'user_metadata' ->> 'device_id')
```

**Pros:**
- True database-level enforcement
- Secure against direct API access
- Industry standard approach

**Cons:**
- Requires code changes
- More complex architecture
- Need to manage anonymous sessions

**Security Level:** High (proper security)

### Option 3: Hybrid Approach (Recommended)

**Implement simple RLS that blocks OBVIOUS attacks:**

```sql
-- Allow SELECT for share codes (read-only sharing)
CREATE POLICY "Allow shared map access"
ON trust_maps FOR SELECT
USING (share_code IS NOT NULL);

-- For owned maps, rely on application filtering
-- This allows the app to work while blocking direct table scans
CREATE POLICY "Allow authenticated operations"
ON trust_maps FOR ALL
USING (
    -- Only allow if request comes through anon key (not direct SQL)
    current_setting('request.jwt.claims', true) IS NOT NULL
);
```

**Pros:**
- Blocks direct SQL injection/table scans
- Works with current app architecture
- Easy to implement

**Cons:**
- Still relies on application for user isolation
- Not perfect security but better than nothing

**Security Level:** Medium-High (pragmatic balance)

---

## Recommended Action Plan

### Phase 1: Immediate (Deploy within 24 hours)

1. **Remove the vulnerable policy:**
   ```sql
   DROP POLICY IF EXISTS "Allow anonymous CRUD" ON trust_maps;
   ```

2. **Apply hybrid RLS policies** (Option 3 above)

3. **Verify application works** with new policies

4. **Document security limitations** in README

### Phase 2: Short-term (1-2 weeks)

1. **Implement proper Supabase anonymous auth** (Option 2)

2. **Update RLS policies** to use JWT claims

3. **Test thoroughly** with security test suite

4. **Deploy to production**

### Phase 3: Long-term (Ongoing)

1. **Monitor Supabase logs** for policy violations

2. **Rate limiting** on API endpoints

3. **Security audit** quarterly

4. **Consider migration** to authenticated accounts

---

## Testing Implications

### Current Test Suite Status

The test suite in `test-rls-security.js` has a flaw:

```javascript
// This doesn't actually test RLS!
function createSupabaseClient(deviceId) {
    return window.supabase.createClient(url, anonKey, {
        global: {
            headers: {
                'x-device-id': deviceId  // This header is ignored by RLS!
            }
        }
    });
}
```

**Problem:** Custom headers are NOT available to RLS policies. Only JWT claims are.

### Required Test Changes

To properly test RLS, you need:

1. **Test with actual authentication:**
   ```javascript
   // Sign in anonymously with device_id
   await supabase.auth.signInAnonymously({
       options: { data: { device_id: deviceId } }
   });
   ```

2. **Test direct SQL access** (if possible via admin connection)

3. **Test malicious API calls** bypassing JavaScript layer

---

## Security Threat Model

### Threat 1: Malicious User with Chrome DevTools

**Attack:** User opens DevTools, reads deviceId from localStorage, crafts API calls

**Current Defense:** Application-level filtering (bypassable)

**After Fix:** RLS policies block unauthorized access

### Threat 2: Direct API Access

**Attack:** Attacker uses Postman/curl with anon key to access database

**Current Defense:** NONE (with USING true policy)

**After Fix:** RLS policies require proper authentication

### Threat 3: SQL Injection via API

**Attack:** Crafted payloads to bypass Supabase client filtering

**Current Defense:** Supabase parameterized queries (good)

**After Fix:** RLS provides defense-in-depth

---

## Compliance and Best Practices

### OWASP Top 10 Relevance

- **A01:2021 – Broken Access Control** ✓ APPLIES
- **A02:2021 – Cryptographic Failures** ✓ Device IDs not cryptographically secured
- **A07:2021 – Identification and Authentication Failures** ✓ No true authentication

### Industry Standards

- **NIST Cybersecurity Framework:** Current implementation does not meet access control standards
- **PCI DSS:** Would fail audit for access control mechanisms
- **GDPR:** User data not adequately protected

---

## Conclusion

**Current Status:** The "secure" RLS policies DO NOT provide the intended security due to architectural mismatch with anonymous auth.

**Risk Level:** HIGH - User data is accessible to anyone who bypasses the JavaScript layer

**Recommended Action:** Implement Option 2 (proper authentication) or Option 3 (hybrid) immediately

**DO NOT DEPLOY** the current "secure" policies without addressing the authentication issue - they either won't work or won't improve security.

---

## Files Requiring Changes

1. `/home/ichardart/dev/projects/true-valence-mapper/supabase-secure-rls-policies.sql` - Needs rewrite
2. `/home/ichardart/dev/projects/true-valence-mapper/cloud-storage.js` - Needs auth implementation
3. `/home/ichardart/dev/projects/true-valence-mapper/test-rls-security.js` - Tests won't work as written
4. `/home/ichardart/dev/projects/true-valence-mapper/RLS-TESTING-PROCEDURE.md` - Needs major updates

---

**Next Steps:** Implement proper anonymous authentication with device_id in JWT claims, then apply true RLS policies.
