# Quick Deployment Checklist - RLS Security Policies

**Time Required:** 10-15 minutes
**Risk Level:** Low
**Rollback Available:** Yes

---

## Pre-Deployment (5 minutes)

### ☐ Step 1: Backup Current Policies
1. Open: https://app.supabase.com/project/qhozgoiukkbwjivowrbw/sql/new
2. Run:
```sql
SELECT tablename, policyname, cmd, qual::text, with_check::text
FROM pg_policies WHERE tablename = 'trust_maps';
```
3. Copy output to a text file (for rollback if needed)

### ☐ Step 2: Verify Anonymous Auth Enabled
1. Go to: **Authentication** → **Providers**
2. Check: "Email" provider shows "Anonymous sign-ins enabled"
3. If not enabled: Enable it and save

---

## Deployment (3 minutes)

### ☐ Step 3: Deploy RLS Policies
1. Open: https://app.supabase.com/project/qhozgoiukkbwjivowrbw/sql/new
2. Copy ENTIRE contents of: `supabase-auth-fixed-rls-policies.sql`
3. Paste into SQL Editor
4. Click **RUN** (or Ctrl+Enter)
5. Verify output shows:
   ```
   ✅ Secure RLS policies with auth.uid() successfully applied
   ✅ Previous vulnerability (app-level filtering) has been fixed
   ✅ Database now enforces device_id = auth.uid() isolation
   ```

---

## Verification (5 minutes)

### ☐ Step 4: Quick Verification
1. Stay in SQL Editor
2. Copy contents of: `verify-rls-deployment.sql`
3. Paste and run **VERIFICATION 1** through **VERIFICATION 9**
4. Check final **SUMMARY CHECK** shows:
   ```
   🎉 DEPLOYMENT SUCCESSFUL
   ```

### ☐ Step 5: Test in Application
1. Open: https://ichardart.github.io/true-valence-mapper/
2. Open browser console (F12)
3. Run:
```javascript
// Check auth
const { data: { session } } = await cloudStorage.supabase.auth.getSession();
console.log('Auth UID:', session?.user?.id);
console.log('Device ID:', cloudStorage.deviceId);
console.log('Match:', session?.user?.id === cloudStorage.deviceId);
```
4. Create and save a test map
5. Verify it appears in "My Maps"

### ☐ Step 6: Security Test (CRITICAL)
1. In browser console:
```javascript
// Try to query ALL maps (should only return YOUR maps)
const { data } = await cloudStorage.supabase.from('trust_maps').select('*');
console.log('Maps returned:', data?.length);
console.log('All mine?', data?.every(m => m.device_id === cloudStorage.deviceId));
```
2. Expected: `All mine? true` ✅
3. If returns other users' maps: **ROLLBACK IMMEDIATELY** ❌

---

## Post-Deployment (2 minutes)

### ☐ Step 7: Mark Complete
- [ ] All verification checks passed
- [ ] Security test confirmed isolation
- [ ] No console errors
- [ ] Application works end-to-end

### ☐ Step 8: Update Documentation
- [ ] Mark deployment date in `DEPLOYMENT-REPORT-RLS-POLICIES.md`
- [ ] Update status to "DEPLOYED ✅"

---

## If Something Goes Wrong

### Quick Rollback
1. Open: https://app.supabase.com/project/qhozgoiukkbwjivowrbw/sql/new
2. Run:
```sql
-- Emergency: Disable RLS temporarily
ALTER TABLE trust_maps DISABLE ROW LEVEL SECURITY;
```
3. Investigate issue
4. Contact support or review troubleshooting section

---

## Success Criteria

Deployment is successful when:
- ✅ All 4 policies deployed (SELECT, INSERT, UPDATE, DELETE)
- ✅ RLS enabled on trust_maps
- ✅ Users can save/load their own maps
- ✅ Security test passes: Users CANNOT see other users' maps
- ✅ Share code access works
- ✅ No console errors

---

## Time Estimate Breakdown

| Step | Description | Time |
|------|-------------|------|
| 1-2  | Pre-deployment checks | 5 min |
| 3    | Deploy SQL | 3 min |
| 4-6  | Verification & testing | 5 min |
| 7-8  | Documentation | 2 min |
| **Total** | **End-to-end** | **15 min** |

---

**Ready to Deploy:** ✅ YES
**Next Step:** Start with Step 1 above

**Files Needed:**
- `/home/ichardart/dev/projects/true-valence-mapper/supabase-auth-fixed-rls-policies.sql`
- `/home/ichardart/dev/projects/true-valence-mapper/verify-rls-deployment.sql`

**Supabase Dashboard:** https://app.supabase.com/project/qhozgoiukkbwjivowrbw
