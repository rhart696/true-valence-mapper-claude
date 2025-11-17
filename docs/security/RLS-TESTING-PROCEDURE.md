# RLS Testing Procedure - True Valence Mapper v2.0

## Overview

This document provides comprehensive instructions for testing the Row-Level Security (RLS) policies implemented for the True Valence Mapper application. These tests validate that the critical security vulnerability has been fixed and users can only access their own data.

**Version:** 2.0
**Updated:** 2025-11-12
**Status:** Complete rewrite for corrected auth-based RLS

## Critical Security Issue (FIXED)

**Previous Vulnerability:**
```sql
CREATE POLICY "Allow anonymous CRUD" ON trust_maps
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

This policy allowed ANY user to access/modify ANY data in the database - a critical security breach.

**Current Solution:**
Device-based ownership with secure RLS policies that:
- ✅ Users can only access their own maps (via `device_id`)
- ✅ Users can read maps shared with them (via `share_code`)
- ✅ Users cannot modify other users' data
- ✅ Users cannot delete other users' data
- ✅ Users cannot impersonate other devices

---

## Prerequisites

### 1. Database Setup

Before running tests, apply the secure RLS policies to your Supabase database:

```bash
# Connect to your Supabase instance and run:
psql $DATABASE_URL -f supabase-secure-rls-policies.sql
```

**OR** via Supabase Dashboard:
1. Go to https://supabase.com/dashboard/project/qhozgoiukkbwjivowrbw/editor
2. Open SQL Editor
3. Copy and paste contents of `supabase-secure-rls-policies.sql`
4. Click "Run"

### 2. Test Environment

You can run tests in two ways:

#### Option A: Browser Console (Recommended)

1. Open `index.html` in a browser
2. Open Browser DevTools (F12)
3. Load test script in Console:

```javascript
// Create script element and load test
const script = document.createElement('script');
script.src = 'test-rls-security.js';
document.head.appendChild(script);

// After load completes, run tests:
runRLSSecurityTests();
```

#### Option B: Standalone HTML Test Page

Create a test page that loads both Supabase and the test script:

```html
<!DOCTYPE html>
<html>
<head>
    <title>RLS Security Tests</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
    <h1>RLS Security Test Suite</h1>
    <p>Check browser console for results</p>
    <button onclick="runRLSSecurityTests()">Run Tests</button>

    <script src="test-rls-security.js"></script>
</body>
</html>
```

---

## Running the Tests

### Quick Start

```javascript
// In browser console after loading test-rls-security.js:
runRLSSecurityTests();
```

### What Gets Tested

The test suite runs 5 critical security tests:

---

### Test 1: Cannot Read Other Users' Private Maps

**Purpose:** Verify users cannot access other users' maps without share code

**Process:**
1. User B creates a private map
2. User A attempts to read User B's map by ID
3. Access should be DENIED

**Expected Result:** `❌ PASS` - User A cannot read the map

**Security Validation:**
- Without share code, maps are completely private
- Knowing the map ID is not sufficient for access

---

### Test 2: Cannot Modify Other Users' Maps

**Purpose:** Verify users cannot update other users' maps

**Process:**
1. User B creates a map
2. User A attempts to update User B's map
3. Update should be BLOCKED

**Expected Result:** `❌ PASS` - Update is rejected

**Security Validation:**
- Only the owner (matching `device_id`) can modify maps
- Share codes do NOT grant update permission

---

### Test 3: Cannot Delete Other Users' Maps

**Purpose:** Verify users cannot delete other users' maps

**Process:**
1. User B creates a map
2. User A attempts to delete User B's map
3. Delete should be BLOCKED

**Expected Result:** `❌ PASS` - Delete is rejected

**Security Validation:**
- Only the owner can delete their maps
- No user can delete another user's data

---

### Test 4: CAN Read Shared Maps (Read-Only)

**Purpose:** Verify share codes grant read-only access

**Process:**
1. User B creates a map
2. User B shares the `share_code` with User A
3. User A reads map using `share_code` - should SUCCEED
4. User A attempts to modify shared map - should FAIL

**Expected Result:** `✅ PASS` - Read succeeds, modify fails

**Security Validation:**
- Share codes enable read-only sharing
- Shared maps cannot be modified by recipients
- Sharing works as intended without compromising security

---

### Test 5: Cannot Insert with Other Users' Device ID

**Purpose:** Verify users cannot impersonate other devices

**Process:**
1. User A attempts to create a map with User B's `device_id`
2. Insert should be BLOCKED

**Expected Result:** `❌ PASS` - Insert is rejected

**Security Validation:**
- Users can only create maps with their own `device_id`
- Device impersonation is prevented
- Ownership integrity is maintained

---

## Interpreting Test Results

### Success Output

```
═══════════════════════════════════════════════════════════
📊 TEST SUMMARY
═══════════════════════════════════════════════════════════
Total Tests: 5
✅ Passed: 5
❌ Failed: 0
═══════════════════════════════════════════════════════════

🎉 ALL TESTS PASSED!
✓ Security policies are working correctly
✓ Users can only access their own data
✓ Share codes grant read-only access
✓ No unauthorized access detected
```

**Action:** Security is properly configured ✅

---

### Failure Output

```
═══════════════════════════════════════════════════════════
📊 TEST SUMMARY
═══════════════════════════════════════════════════════════
Total Tests: 5
✅ Passed: 3
❌ Failed: 2
═══════════════════════════════════════════════════════════

⚠️  SECURITY ISSUES DETECTED!
2 test(s) failed - review policies immediately

❌ Cannot read other users' private maps
   SECURITY BREACH: User A was able to read User B's private map!
```

**Action:** DO NOT DEPLOY - Fix RLS policies immediately ⚠️

---

## Troubleshooting

### Issue 1: "Supabase client not loaded"

**Error:**
```
❌ ERROR: Supabase client not loaded!
```

**Solution:**
Include Supabase JS library before test script:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="test-rls-security.js"></script>
```

---

### Issue 2: All Tests Failing

**Symptoms:** All 5 tests fail immediately

**Possible Causes:**
1. RLS policies not applied to database
2. Incorrect Supabase URL/API key
3. Table doesn't exist

**Solution:**
1. Verify policies applied: Run `supabase-secure-rls-policies.sql`
2. Check connection:
   ```javascript
   // In browser console:
   const testClient = window.supabase.createClient(
       'https://qhozgoiukkbwjivowrbw.supabase.co',
       'YOUR_ANON_KEY'
   );
   await testClient.from('trust_maps').select('count').single();
   ```
3. Verify table exists in Supabase Dashboard

---

### Issue 3: Test 4 (Shared Maps) Failing

**Symptoms:** Tests 1-3 and 5 pass, but Test 4 fails

**Possible Cause:** SELECT policy not allowing share_code access

**Solution:**
Verify the SELECT policy includes:
```sql
CREATE POLICY "Users can view own maps and maps shared with them"
ON trust_maps
FOR SELECT
USING (
    device_id::text = current_setting('request.jwt.claims', true)::json->>'device_id'
    OR
    share_code IS NOT NULL  -- This line is critical for sharing
);
```

---

### Issue 4: Network/Connection Errors

**Symptoms:** Tests throw connection errors

**Solution:**
1. Check internet connection
2. Verify Supabase project is active
3. Check browser console for CORS errors
4. Try running tests with network throttling disabled

---

## Manual Verification

If automated tests fail, you can manually verify RLS policies:

### Manual Test 1: Check Policies Exist

```sql
-- Run in Supabase SQL Editor:
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'trust_maps';
```

**Expected:** 5 policies (SELECT, INSERT, UPDATE, DELETE)

---

### Manual Test 2: Test Data Isolation

```sql
-- Create test data as Device A
INSERT INTO trust_maps (device_id, map_name, relationships, trust_scores)
VALUES ('00000000-0000-0000-0000-000000000001', 'Device A Map', '[]', '{}');

-- Try to read as Device B (should return 0 rows)
SET request.jwt.claims = '{"device_id": "00000000-0000-0000-0000-000000000002"}';
SELECT * FROM trust_maps WHERE device_id = '00000000-0000-0000-0000-000000000001';

-- Cleanup
DELETE FROM trust_maps WHERE device_id = '00000000-0000-0000-0000-000000000001';
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] All 5 automated tests pass
- [ ] RLS policies applied to production database
- [ ] Old vulnerable "Allow anonymous CRUD" policy removed
- [ ] Manual verification completed
- [ ] Share code functionality tested in UI
- [ ] Privacy policy/terms updated (if applicable)
- [ ] Security audit log reviewed
- [ ] Backup of database created before policy changes

---

## Security Best Practices

### Do's ✅

- ✅ Always run tests after policy changes
- ✅ Test with multiple simulated users
- ✅ Verify both positive and negative cases
- ✅ Monitor Supabase logs for policy violations
- ✅ Keep test suite updated as features change

### Don'ts ❌

- ❌ Never use `USING (true)` in production policies
- ❌ Don't skip testing after "minor" policy changes
- ❌ Don't rely solely on client-side security
- ❌ Don't share database credentials
- ❌ Don't disable RLS even temporarily

---

## Additional Testing Tools

### Browser DevTools Network Tab

Monitor actual database requests:
1. Open DevTools → Network tab
2. Filter by "qhozgoiukkbwjivowrbw.supabase.co"
3. Run tests
4. Check requests for policy violations

### Supabase Dashboard Logs

View policy enforcement in real-time:
1. Go to Supabase Dashboard → Logs
2. Filter by table: `trust_maps`
3. Run tests
4. Look for "permission denied" messages (expected for blocked operations)

---

## Support and Issues

If tests fail unexpectedly:

1. **Check this document** for troubleshooting steps
2. **Review Supabase logs** in dashboard
3. **Verify policies** with SQL query above
4. **Test connection** to Supabase
5. **Check browser console** for detailed errors

**DO NOT DEPLOY** to production if any security test fails.

---

## Summary

This testing procedure validates:
- ✅ Data isolation between users
- ✅ Ownership-based access control
- ✅ Read-only sharing via share codes
- ✅ Prevention of data tampering
- ✅ Protection against impersonation

**Goal:** 5 out of 5 tests passing = Security properly configured

---

**Document Version:** 1.0
**Last Updated:** 2025-11-12
**Related Files:**
- `supabase-secure-rls-policies.sql` - Policy definitions
- `test-rls-security.js` - Automated test suite
- `cloud-storage.js` - Application code
