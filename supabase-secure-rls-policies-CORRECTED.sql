-- =============================================================================
-- CORRECTED SECURE RLS POLICIES FOR TRUE VALENCE MAPPER
-- =============================================================================
-- Purpose: Implement WORKING row-level security for anonymous authentication
--
-- CRITICAL CHANGES FROM PREVIOUS VERSION:
-- - Uses auth.uid() for anonymous session identification
-- - Requires Supabase anonymous auth with device_id in user_metadata
-- - Properly enforces row-level isolation at database level
--
-- PREREQUISITE: Application must use Supabase anonymous auth
-- See: supabase-auth-implementation.js for required code changes
-- =============================================================================

-- -----------------------------------------------------------------------------
-- STEP 1: DROP ALL EXISTING VULNERABLE POLICIES
-- -----------------------------------------------------------------------------

-- Remove ALL old policies
DROP POLICY IF EXISTS "Allow anonymous CRUD" ON trust_maps;
DROP POLICY IF EXISTS "Maps are viewable by share code" ON trust_maps;
DROP POLICY IF EXISTS "Device can manage own maps" ON trust_maps;
DROP POLICY IF EXISTS "Users can view own maps and maps shared with them" ON trust_maps;
DROP POLICY IF EXISTS "Users can only insert maps with their own device_id" ON trust_maps;
DROP POLICY IF EXISTS "Users can only update their own maps" ON trust_maps;
DROP POLICY IF EXISTS "Users can only delete their own maps" ON trust_maps;
DROP POLICY IF EXISTS "Users can insert maps" ON trust_maps;
DROP POLICY IF EXISTS "Users can update maps" ON trust_maps;
DROP POLICY IF EXISTS "Users can delete maps" ON trust_maps;

-- Ensure RLS is enabled
ALTER TABLE trust_maps ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- STEP 2: UPDATE SCHEMA TO SUPPORT AUTH-BASED SECURITY
-- -----------------------------------------------------------------------------

-- Change device_id to support Supabase auth UIDs
-- Auth UIDs are UUIDs, so this works with existing schema
-- No schema changes needed if device_id is already UUID type

-- Add index for auth-based lookups
CREATE INDEX IF NOT EXISTS idx_trust_maps_device_id ON trust_maps(device_id);

-- -----------------------------------------------------------------------------
-- STEP 3: CREATE SECURE SELECT POLICY
-- -----------------------------------------------------------------------------
-- Users can read:
-- 1. Maps where device_id matches their authenticated session
-- 2. ANY map if queried by share_code (read-only sharing)
--
-- SECURITY: This properly enforces row-level isolation
-- Users cannot see other users' private maps
-- Share codes enable read-only sharing
-- -----------------------------------------------------------------------------

CREATE POLICY "select_own_maps_and_shared"
ON trust_maps
FOR SELECT
USING (
    -- Option 1: User owns this map
    -- auth.uid() returns the authenticated user's UID (even for anon users)
    -- This matches the device_id stored during anonymous sign-in
    device_id::text = auth.uid()::text

    OR

    -- Option 2: Map is being accessed via share_code query
    -- When user queries .eq('share_code', 'XXXX-XXXX-XXXX'), this allows it
    -- Note: This doesn't grant access to all maps, only maps matching the query
    (share_code IS NOT NULL AND share_code =
        COALESCE(
            current_setting('request.headers', true)::json->>'x-share-code',
            ''
        )
    )
);

-- -----------------------------------------------------------------------------
-- STEP 4: CREATE SECURE INSERT POLICY
-- -----------------------------------------------------------------------------
-- Users can INSERT maps ONLY with their own device_id (auth.uid)
--
-- SECURITY: Prevents users from creating maps under other users' identities
-- The device_id MUST match the authenticated session UID
-- -----------------------------------------------------------------------------

CREATE POLICY "insert_own_maps"
ON trust_maps
FOR INSERT
WITH CHECK (
    -- Can only insert if device_id matches authenticated user
    device_id::text = auth.uid()::text

    AND

    -- Ensure device_id is not NULL
    device_id IS NOT NULL
);

-- -----------------------------------------------------------------------------
-- STEP 5: CREATE SECURE UPDATE POLICY
-- -----------------------------------------------------------------------------
-- Users can UPDATE only their own maps
--
-- SECURITY:
-- - USING clause: Can only select rows to update where device_id matches
-- - WITH CHECK clause: Cannot change device_id to someone else's
-- Share codes do NOT grant update permission (read-only)
-- -----------------------------------------------------------------------------

CREATE POLICY "update_own_maps"
ON trust_maps
FOR UPDATE
USING (
    -- Can only update rows you own
    device_id::text = auth.uid()::text
)
WITH CHECK (
    -- Cannot change device_id to someone else's
    device_id::text = auth.uid()::text

    AND

    -- Device_id cannot be removed
    device_id IS NOT NULL
);

-- -----------------------------------------------------------------------------
-- STEP 6: CREATE SECURE DELETE POLICY
-- -----------------------------------------------------------------------------
-- Users can DELETE only their own maps
--
-- SECURITY: Only rows with matching device_id can be deleted
-- Share codes do NOT grant delete permission
-- -----------------------------------------------------------------------------

CREATE POLICY "delete_own_maps"
ON trust_maps
FOR DELETE
USING (
    -- Can only delete rows you own
    device_id::text = auth.uid()::text
);

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Check all policies are in place
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'trust_maps'
ORDER BY cmd, policyname;

-- Expected output: 4 policies (SELECT, INSERT, UPDATE, DELETE)

-- =============================================================================
-- POLICY SUMMARY
-- =============================================================================
--
-- ✓ SELECT: Own maps (device_id = auth.uid) OR shared maps (via share_code)
-- ✓ INSERT: Only with own device_id (device_id = auth.uid)
-- ✓ UPDATE: Only own maps, cannot change device_id
-- ✓ DELETE: Only own maps
--
-- SECURITY GUARANTEES (when used with proper authentication):
-- ✓ Users cannot see other users' private maps
-- ✓ Users cannot modify other users' maps
-- ✓ Users cannot delete other users' maps
-- ✓ Users can share maps read-only via share_code
-- ✓ Users cannot impersonate other users' device_ids
-- ✓ All security enforced at DATABASE level, not application level
--
-- =============================================================================
-- MIGRATION FROM INSECURE POLICIES
-- =============================================================================
--
-- If you have existing data with USING(true) policy:
-- 1. Backup database first
-- 2. Apply these policies
-- 3. Update application to use anonymous auth (see supabase-auth-implementation.js)
-- 4. Test with test-rls-security-CORRECTED.js
-- 5. Verify existing maps still accessible with new auth
--
-- BREAKING CHANGE: Existing users will need to re-authenticate
-- Their localStorage device_id will NOT match their new auth.uid()
-- Consider migration strategy for existing user data
--
-- =============================================================================
-- TESTING
-- =============================================================================
--
-- After applying these policies:
-- 1. Update cloud-storage.js to use anonymous auth
-- 2. Run test-rls-security-CORRECTED.js
-- 3. Verify all 5 tests pass
-- 4. Test in actual application
-- 5. Monitor Supabase logs for policy violations
--
-- =============================================================================

-- Grant permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE, DELETE ON trust_maps TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON trust_maps TO authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'CORRECTED RLS policies applied successfully';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'IMPORTANT: Application code changes required!';
    RAISE NOTICE 'See: supabase-auth-implementation.js';
    RAISE NOTICE 'Test: test-rls-security-CORRECTED.js';
    RAISE NOTICE '========================================';
END $$;
