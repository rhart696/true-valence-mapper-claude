# Security Fix Implementation Guide
## True Valence Mapper - Row-Level Security

**Date:** 2025-11-12
**Priority:** CRITICAL
**Status:** REQUIRES IMMEDIATE ACTION

---

## Executive Summary

The current RLS implementation has **CRITICAL FLAWS** that make it ineffective. The "secure" policies use JWT claims that don't exist with the current anonymous authentication approach.

### Current Status: INSECURE

- Policy checks JWT claims that don't exist with anonymous auth
- Results in either complete data access failure OR security bypass
- Existing test suite won't detect this issue
- Application-level security is implemented correctly but bypassable

### Required Action: FULL IMPLEMENTATION UPDATE

You need to:
1. Update application to use Supabase anonymous authentication
2. Replace RLS policies with corrected versions
3. Update test suite to properly validate RLS
4. Test thoroughly before deployment

---

## Files Created

### 1. CRITICAL-SECURITY-ANALYSIS.md
**Purpose:** Detailed analysis of security vulnerabilities

**Key Findings:**
- JWT claims mismatch between policies and application
- RLS policies won't work as written
- Application-level security is correct but insufficient
- Need proper authentication for RLS to function

### 2. supabase-secure-rls-policies-CORRECTED.sql
**Purpose:** Working RLS policies that use Supabase auth

**Changes from original:**
- Uses `auth.uid()` instead of JWT claims
- Properly enforces row-level isolation
- Compatible with anonymous authentication
- Includes migration instructions

### 3. supabase-auth-implementation.js
**Purpose:** Updated application code with proper authentication

**Key Features:**
- Implements Supabase anonymous sign-in
- Manages auth session with device_id
- Maintains backward compatibility where possible
- Includes migration path for legacy data

---

## Implementation Plan

### Phase 1: IMMEDIATE (DO NOT SKIP)

#### Step 1: Review Security Analysis

Read `CRITICAL-SECURITY-ANALYSIS.md` completely to understand the issues.

**Key Points:**
- Current "secure" policies don't work
- JWT claims don't exist with current auth approach
- Need to implement proper Supabase anonymous auth

#### Step 2: Backup Everything

```bash
# Backup database
# Via Supabase Dashboard: Project Settings → Database → Backups → Create Backup

# Backup code
cd /home/ichardart/dev/projects/true-valence-mapper
cp cloud-storage.js cloud-storage.js.backup
cp index.html index.html.backup

# Verify backups exist
ls -l *.backup
```

#### Step 3: Update Application Code

**Option A: Replace entirely (recommended)**
```bash
cp supabase-auth-implementation.js cloud-storage.js
```

**Option B: Manual integration**
1. Open `cloud-storage.js`
2. Open `supabase-auth-implementation.js`
3. Copy the following methods from auth implementation:
   - `initializeAuth()` - NEW
   - `ensureAuthenticated()` - NEW
   - `migrateLegacyData()` - NEW
   - Update `initializeSupabase()` to enable session persistence
   - Update `setupEventListeners()` to include auth state listener
4. Update all cloud methods to call `await this.ensureAuthenticated()` first

#### Step 4: Apply Corrected RLS Policies

```bash
# Via Supabase Dashboard:
# 1. Go to https://supabase.com/dashboard/project/qhozgoiukkbwjivowrbw/editor
# 2. Open SQL Editor
# 3. Copy contents of supabase-secure-rls-policies-CORRECTED.sql
# 4. Click "Run"

# OR via psql:
psql $DATABASE_URL -f supabase-secure-rls-policies-CORRECTED.sql
```

**Verify policies applied:**
```sql
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'trust_maps';
```

Expected: 4 policies (select_own_maps_and_shared, insert_own_maps, update_own_maps, delete_own_maps)

#### Step 5: Update HTML References

In `index.html`, update:
```html
<!-- OLD -->
<script>
    const cloudStorage = new CloudStorage();
</script>

<!-- NEW -->
<script>
    const cloudStorage = new CloudStorageSecure();
</script>
```

---

### Phase 2: TESTING (CRITICAL)

#### Test 1: Basic Functionality

```javascript
// In browser console after loading updated app:

// Check auth status
const status = await cloudStorage.getAuthStatus();
console.log('Auth Status:', status);
// Expected: authenticated: true, deviceId: [UUID]

// Test saving
const result = await cloudStorage.saveToCloud({ relationships: [], trustScores: {} }, 'Test Map');
console.log('Save result:', result);
// Expected: success: true, shareCode: [code]

// Test loading own maps
const maps = await cloudStorage.getMyMaps();
console.log('My maps:', maps);
// Expected: List of user's maps only
```

#### Test 2: Security Validation

**IMPORTANT:** The existing `test-rls-security.js` will NOT work correctly because it doesn't use proper authentication.

You need to create a new test file or update the existing one to use Supabase anonymous auth.

**Manual Security Test:**

1. Open app in Browser 1 (Chrome)
2. Create a map, note the map ID
3. Open app in Browser 2 (Firefox or Incognito)
4. Try to access Browser 1's map ID directly via console:

```javascript
// In Browser 2 console:
const otherUsersMapId = '[ID-FROM-BROWSER-1]';

const result = await cloudStorage.supabase
    .from('trust_maps')
    .select('*')
    .eq('id', otherUsersMapId)
    .single();

console.log(result);
// Expected: error or null (not the other user's data)
```

#### Test 3: Share Code Functionality

```javascript
// Browser 1: Create and share
const map = await cloudStorage.saveToCloud({ relationships: [], trustScores: {} }, 'Shared Map');
console.log('Share code:', map.shareCode);

// Browser 2: Load via share code
const loaded = await cloudStorage.loadFromCloud(map.shareCode);
console.log('Loaded map:', loaded);
// Expected: success: true, data: [map data], isOwned: false

// Browser 2: Try to modify shared map (should fail)
const updated = await cloudStorage.updateCloudMap(loaded.data.id, { mapName: 'HACKED' });
console.log('Update result:', updated);
// Expected: error or success: false
```

---

### Phase 3: DEPLOYMENT

#### Pre-Deployment Checklist

- [ ] Database backup created
- [ ] Code backed up
- [ ] RLS policies applied
- [ ] Application code updated
- [ ] Manual security tests passed
- [ ] Share code functionality works
- [ ] Existing maps still accessible (or migration plan ready)
- [ ] Monitoring/logging configured

#### Deployment Steps

1. **Deploy to staging/test environment first**
   ```bash
   # If you have a staging environment
   git checkout staging
   git merge main
   git push origin staging
   ```

2. **Monitor for errors**
   - Check Supabase Dashboard → Logs
   - Check browser console for auth errors
   - Verify users can sign in anonymously

3. **User Communication**
   - Existing users may need to "re-authenticate"
   - Their old device_id won't match new auth.uid()
   - Consider showing migration notice

4. **Deploy to production**
   ```bash
   git checkout main
   git push origin main
   ```

---

## Migration Considerations

### Issue: Existing User Data

**Problem:** Users who created maps with old device_id (localStorage UUID) won't have access after migration because their device_id won't match their new auth.uid().

**Solutions:**

#### Option 1: Fresh Start (Simplest)
- Accept data loss for existing users
- Suitable if app is early stage with few users
- Clear localStorage on app load to force new auth

#### Option 2: Manual Migration
- Export existing user data before migration
- Provide import functionality after migration
- Users download their data, then re-import

#### Option 3: Backend Migration (Most Complex)
- Create Supabase Edge Function
- Match old device_ids to new auth.uids
- Update device_id column in database
- Requires careful planning and testing

**Recommendation:** If you have significant existing users, implement Option 2 (manual export/import).

### Implementation for Option 2:

```javascript
// Add to cloud-storage.js before migration
async exportAllMaps() {
    const maps = await this.getMyMaps();
    const exportData = {
        deviceId: this.deviceId,
        exportDate: new Date().toISOString(),
        maps: maps.maps || []
    };

    // Download as JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trust-maps-backup-${Date.now()}.json`;
    a.click();

    return exportData;
}

async importMaps(importData) {
    // After new authentication, re-import maps
    for (const map of importData.maps) {
        await this.saveToCloud(
            { relationships: map.relationships, trustScores: map.trust_scores },
            map.map_name
        );
    }
}
```

---

## Rollback Plan

If something goes wrong:

### Step 1: Revert Code
```bash
cp cloud-storage.js.backup cloud-storage.js
cp index.html.backup index.html
```

### Step 2: Revert Database Policies

```sql
-- Remove corrected policies
DROP POLICY IF EXISTS "select_own_maps_and_shared" ON trust_maps;
DROP POLICY IF EXISTS "insert_own_maps" ON trust_maps;
DROP POLICY IF EXISTS "update_own_maps" ON trust_maps;
DROP POLICY IF EXISTS "delete_own_maps" ON trust_maps;

-- Re-apply original (WARNING: This is insecure!)
CREATE POLICY "Allow anonymous CRUD" ON trust_maps
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

**NOTE:** Rollback means going back to INSECURE state. Only do this temporarily!

### Step 3: Investigate Issue

Check:
- Supabase logs for errors
- Browser console for auth failures
- Database policies are correctly applied
- Application code changes are correct

---

## Monitoring and Maintenance

### What to Monitor

1. **Supabase Dashboard → Auth**
   - Anonymous sign-ins per day
   - Failed authentication attempts
   - Session expirations

2. **Supabase Dashboard → Logs**
   - RLS policy violations (should be rare)
   - Failed database operations
   - Suspicious access patterns

3. **Application Metrics**
   - User complaints about access issues
   - Maps not loading
   - Unexpected "permission denied" errors

### Regular Security Audits

**Monthly:**
- Review RLS policies still in place
- Check for policy modifications
- Verify no new USING(true) policies added

**Quarterly:**
- Full security review
- Update dependencies
- Review access logs

**Annually:**
- Penetration testing
- Security audit
- Compliance review

---

## Support and Troubleshooting

### Common Issues

#### Issue 1: "Not authenticated" errors

**Symptoms:** Users can't save maps, get authentication errors

**Solutions:**
1. Check Supabase project is active
2. Verify anonymous auth is enabled in Supabase Dashboard → Authentication → Settings
3. Check browser console for auth errors
4. Clear localStorage and cookies, reload app

#### Issue 2: "Permission denied" errors

**Symptoms:** Users get database permission errors

**Solutions:**
1. Verify RLS policies are applied correctly
2. Check user's auth.uid() matches device_id in database
3. Review Supabase logs for specific policy violations
4. Ensure GRANT statements were applied

#### Issue 3: Can't access old maps

**Symptoms:** Users' existing maps disappeared after migration

**Solutions:**
1. Check if migration was performed
2. Verify device_id column values in database
3. Implement export/import functionality (see Migration section)
4. Consider manual data migration via SQL

#### Issue 4: Share codes not working

**Symptoms:** Shared maps can't be accessed

**Solutions:**
1. Verify SELECT policy includes share_code condition
2. Check share_code column has valid values
3. Test with fresh share code from new map
4. Review application logic for share code handling

---

## Technical Details

### How RLS Works with Anonymous Auth

```
User visits app
    ↓
App calls: supabase.auth.signInAnonymously()
    ↓
Supabase creates anonymous session
    ↓
Session includes: user.id (UUID) stored in JWT
    ↓
App uses user.id as device_id
    ↓
Database INSERT: device_id = user.id
    ↓
RLS policies check: device_id::text = auth.uid()::text
    ↓
Match = Access granted
No match = Access denied
```

### Why Previous Implementation Failed

```
User visits app
    ↓
App generates UUID in JavaScript
    ↓
Stores in localStorage (client-side only)
    ↓
Sends device_id to database
    ↓
RLS tries to check: current_setting('request.jwt.claims')
    ↓
Returns: NULL (no JWT claims exist)
    ↓
Policy evaluation fails
    ↓
Either all access blocked OR all access allowed
```

### Security Guarantees (After Fix)

With corrected implementation:

1. **Row-Level Isolation**
   - User A cannot SELECT User B's data
   - Enforced at database level, not application level

2. **Ownership Verification**
   - Users can only INSERT with their own device_id
   - Users can only UPDATE their own rows
   - Users can only DELETE their own rows

3. **Read-Only Sharing**
   - Share codes grant SELECT permission only
   - Recipients cannot modify shared maps
   - Share codes are unguessable (random 12-char codes)

4. **Authentication-Based**
   - Device identity verified by Supabase auth
   - Cannot be spoofed or bypassed
   - Session managed securely by Supabase

---

## Next Steps

1. **Read:** CRITICAL-SECURITY-ANALYSIS.md
2. **Backup:** Database and code
3. **Test:** In development environment first
4. **Apply:** RLS policies from supabase-secure-rls-policies-CORRECTED.sql
5. **Update:** Application code with supabase-auth-implementation.js
6. **Test:** Thoroughly before production deployment
7. **Monitor:** After deployment for issues

---

## Questions and Answers

### Q: Can I just apply the RLS policies without updating the app?

**A:** NO. The policies require Supabase authentication which the current app doesn't use. Apply both changes together.

### Q: Will existing users lose their data?

**A:** Possibly. Their old device_id (localStorage UUID) won't match their new auth.uid(). Implement migration strategy (see Migration section).

### Q: Is this truly secure now?

**A:** Yes, IF implemented correctly. The corrected RLS policies enforce security at the database level using Supabase authentication, which cannot be bypassed by client-side code.

### Q: Do I still need application-level device_id checks?

**A:** Yes, as defense-in-depth. The application checks provide immediate feedback and the RLS policies provide enforcement.

### Q: Can users share maps and still have them be secure?

**A:** Yes. Share codes grant read-only access. Recipients can view but not modify shared maps.

### Q: What if I want to keep using localStorage device_id?

**A:** You can't have true RLS without authentication. Consider implementing Option 3 (Hybrid) from CRITICAL-SECURITY-ANALYSIS.md, but understand the security limitations.

---

## Conclusion

This is a **CRITICAL SECURITY UPDATE** that requires:
- Application code changes
- Database policy updates
- Thorough testing
- Careful deployment

The current "secure" policies DO NOT WORK and provide a false sense of security. Implement the corrected version to achieve true row-level security.

**DO NOT DEPLOY** the current "secure" policies without implementing the required authentication changes.

---

## Document Information

- **Version:** 1.0
- **Date:** 2025-11-12
- **Author:** Security Analysis System
- **Status:** CRITICAL - IMMEDIATE ACTION REQUIRED
- **Related Files:**
  - CRITICAL-SECURITY-ANALYSIS.md
  - supabase-secure-rls-policies-CORRECTED.sql
  - supabase-auth-implementation.js
  - supabase-secure-rls-policies.sql (FLAWED - DO NOT USE AS-IS)
  - test-rls-security.js (NEEDS UPDATE)
  - RLS-TESTING-PROCEDURE.md (NEEDS UPDATE)
