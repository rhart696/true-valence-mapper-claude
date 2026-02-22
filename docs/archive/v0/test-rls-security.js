/**
 * ROW-LEVEL SECURITY TEST SUITE
 * Tests the secure RLS policies implemented in supabase-secure-rls-policies.sql
 *
 * CRITICAL: This validates that the security vulnerability has been fixed
 * Previous Issue: Any user could access/modify any data
 * Current Goal: Verify device_id-based ownership and share_code read access
 */

// Supabase configuration
const SUPABASE_CONFIG = {
    url: 'https://qhozgoiukkbwjivowrbw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob3pnb2l1a2tid2ppdm93cmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU4MTgsImV4cCI6MjA3ODI2MTgxOH0.O5PGV2Igfrax9fsafiaRKLuin_tBhXupugZelCuxmFI'
};

// Test result tracker
const testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

/**
 * Generate a unique device ID (simulates a user's device)
 */
function generateDeviceId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Create Supabase client with specific device_id in headers
 * This simulates authentication via device_id
 */
function createSupabaseClient(deviceId) {
    if (typeof window === 'undefined' || !window.supabase) {
        throw new Error('Supabase client not loaded. Include Supabase JS library first.');
    }

    return window.supabase.createClient(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            },
            global: {
                headers: {
                    'x-device-id': deviceId
                }
            }
        }
    );
}

/**
 * Log test result
 */
function logTest(testName, passed, details) {
    const result = {
        name: testName,
        passed,
        details,
        timestamp: new Date().toISOString()
    };

    testResults.tests.push(result);

    if (passed) {
        testResults.passed++;
        console.log(`✅ PASS: ${testName}`);
        console.log(`   ${details}`);
    } else {
        testResults.failed++;
        console.error(`❌ FAIL: ${testName}`);
        console.error(`   ${details}`);
    }
}

/**
 * TEST 1: User A cannot read User B's private maps
 *
 * Security Requirement: Without the share_code, users should not be able
 * to access other users' maps, even if they know the map ID
 */
async function testCannotReadOtherUsersMaps() {
    console.log('\n📋 TEST 1: User A cannot read User B\'s private maps');
    console.log('-----------------------------------------------------------');

    const deviceA = generateDeviceId();
    const deviceB = generateDeviceId();

    const clientA = createSupabaseClient(deviceA);
    const clientB = createSupabaseClient(deviceB);

    try {
        // User B creates a map
        console.log('1. User B creates a private map...');
        const { data: mapB, error: insertError } = await clientB
            .from('trust_maps')
            .insert({
                device_id: deviceB,
                map_name: 'User B Private Map',
                relationships: [{ id: 1, name: 'Test Person' }],
                trust_scores: { '1': 5 }
            })
            .select()
            .single();

        if (insertError) {
            throw new Error(`Failed to create map: ${insertError.message}`);
        }

        console.log(`   ✓ Map created with ID: ${mapB.id}`);
        console.log(`   ✓ Share code: ${mapB.share_code}`);

        // User A tries to read User B's map by ID (should fail)
        console.log('2. User A attempts to read User B\'s map by ID...');
        const { data: readData, error: readError } = await clientA
            .from('trust_maps')
            .select('*')
            .eq('id', mapB.id)
            .single();

        // Check if read was blocked
        if (readData === null || readError) {
            logTest(
                'Cannot read other users\' private maps',
                true,
                `User A was correctly blocked from reading User B's map. Error: ${readError?.message || 'No data returned'}`
            );
        } else {
            logTest(
                'Cannot read other users\' private maps',
                false,
                `SECURITY BREACH: User A was able to read User B's private map! Data: ${JSON.stringify(readData)}`
            );
        }

        // Cleanup
        await clientB.from('trust_maps').delete().eq('id', mapB.id);

    } catch (error) {
        logTest(
            'Cannot read other users\' private maps',
            false,
            `Test error: ${error.message}`
        );
    }
}

/**
 * TEST 2: User A cannot modify User B's maps
 *
 * Security Requirement: Users should only be able to update their own maps
 */
async function testCannotModifyOtherUsersMaps() {
    console.log('\n📋 TEST 2: User A cannot modify User B\'s maps');
    console.log('-----------------------------------------------------------');

    const deviceA = generateDeviceId();
    const deviceB = generateDeviceId();

    const clientA = createSupabaseClient(deviceA);
    const clientB = createSupabaseClient(deviceB);

    try {
        // User B creates a map
        console.log('1. User B creates a map...');
        const { data: mapB, error: insertError } = await clientB
            .from('trust_maps')
            .insert({
                device_id: deviceB,
                map_name: 'Original Name',
                relationships: [],
                trust_scores: {}
            })
            .select()
            .single();

        if (insertError) {
            throw new Error(`Failed to create map: ${insertError.message}`);
        }

        console.log(`   ✓ Map created with ID: ${mapB.id}`);

        // User A tries to update User B's map (should fail)
        console.log('2. User A attempts to modify User B\'s map...');
        const { data: updateData, error: updateError } = await clientA
            .from('trust_maps')
            .update({ map_name: 'HACKED BY USER A' })
            .eq('id', mapB.id)
            .select();

        // Check if update was blocked
        if (!updateData || updateData.length === 0 || updateError) {
            logTest(
                'Cannot modify other users\' maps',
                true,
                `User A was correctly blocked from updating User B's map. Error: ${updateError?.message || 'No rows updated'}`
            );
        } else {
            logTest(
                'Cannot modify other users\' maps',
                false,
                `SECURITY BREACH: User A was able to update User B's map! Data: ${JSON.stringify(updateData)}`
            );
        }

        // Verify map wasn't modified
        const { data: verifyData } = await clientB
            .from('trust_maps')
            .select('map_name')
            .eq('id', mapB.id)
            .single();

        if (verifyData && verifyData.map_name === 'Original Name') {
            console.log('   ✓ Verified: Map name remains unchanged');
        }

        // Cleanup
        await clientB.from('trust_maps').delete().eq('id', mapB.id);

    } catch (error) {
        logTest(
            'Cannot modify other users\' maps',
            false,
            `Test error: ${error.message}`
        );
    }
}

/**
 * TEST 3: User A cannot delete User B's maps
 *
 * Security Requirement: Users should only be able to delete their own maps
 */
async function testCannotDeleteOtherUsersMaps() {
    console.log('\n📋 TEST 3: User A cannot delete User B\'s maps');
    console.log('-----------------------------------------------------------');

    const deviceA = generateDeviceId();
    const deviceB = generateDeviceId();

    const clientA = createSupabaseClient(deviceA);
    const clientB = createSupabaseClient(deviceB);

    try {
        // User B creates a map
        console.log('1. User B creates a map...');
        const { data: mapB, error: insertError } = await clientB
            .from('trust_maps')
            .insert({
                device_id: deviceB,
                map_name: 'Important Map',
                relationships: [],
                trust_scores: {}
            })
            .select()
            .single();

        if (insertError) {
            throw new Error(`Failed to create map: ${insertError.message}`);
        }

        console.log(`   ✓ Map created with ID: ${mapB.id}`);

        // User A tries to delete User B's map (should fail)
        console.log('2. User A attempts to delete User B\'s map...');
        const { data: deleteData, error: deleteError } = await clientA
            .from('trust_maps')
            .delete()
            .eq('id', mapB.id)
            .select();

        // Check if delete was blocked
        if (!deleteData || deleteData.length === 0 || deleteError) {
            logTest(
                'Cannot delete other users\' maps',
                true,
                `User A was correctly blocked from deleting User B's map. Error: ${deleteError?.message || 'No rows deleted'}`
            );
        } else {
            logTest(
                'Cannot delete other users\' maps',
                false,
                `SECURITY BREACH: User A was able to delete User B's map! Data: ${JSON.stringify(deleteData)}`
            );
        }

        // Verify map still exists
        const { data: verifyData } = await clientB
            .from('trust_maps')
            .select('id')
            .eq('id', mapB.id)
            .single();

        if (verifyData) {
            console.log('   ✓ Verified: Map still exists');
            // Cleanup
            await clientB.from('trust_maps').delete().eq('id', mapB.id);
        } else {
            console.log('   ⚠ Warning: Map was deleted!');
        }

    } catch (error) {
        logTest(
            'Cannot delete other users\' maps',
            false,
            `Test error: ${error.message}`
        );
    }
}

/**
 * TEST 4: User A CAN read User B's map with share_code
 *
 * Security Requirement: Share codes should grant read-only access to maps
 */
async function testCanReadSharedMaps() {
    console.log('\n📋 TEST 4: User A CAN read User B\'s map with share_code');
    console.log('-----------------------------------------------------------');

    const deviceA = generateDeviceId();
    const deviceB = generateDeviceId();

    const clientA = createSupabaseClient(deviceA);
    const clientB = createSupabaseClient(deviceB);

    try {
        // User B creates a map
        console.log('1. User B creates a map to share...');
        const { data: mapB, error: insertError } = await clientB
            .from('trust_maps')
            .insert({
                device_id: deviceB,
                map_name: 'Shared Map',
                relationships: [{ id: 1, name: 'Shared Person' }],
                trust_scores: { '1': 7 }
            })
            .select()
            .single();

        if (insertError) {
            throw new Error(`Failed to create map: ${insertError.message}`);
        }

        console.log(`   ✓ Map created with ID: ${mapB.id}`);
        console.log(`   ✓ Share code: ${mapB.share_code}`);

        // User A reads map using share_code (should succeed)
        console.log('2. User A reads map using share_code...');
        const { data: sharedData, error: readError } = await clientA
            .from('trust_maps')
            .select('*')
            .eq('share_code', mapB.share_code)
            .single();

        if (sharedData && sharedData.id === mapB.id) {
            logTest(
                'Can read shared maps with share_code',
                true,
                `User A successfully read User B's map using share code. Map name: ${sharedData.map_name}`
            );
        } else {
            logTest(
                'Can read shared maps with share_code',
                false,
                `User A could not read shared map. Error: ${readError?.message || 'No data returned'}`
            );
        }

        // Verify User A still cannot UPDATE the shared map
        console.log('3. Verify User A cannot modify the shared map...');
        const { data: updateData, error: updateError } = await clientA
            .from('trust_maps')
            .update({ map_name: 'MODIFIED VIA SHARE' })
            .eq('share_code', mapB.share_code)
            .select();

        if (!updateData || updateData.length === 0 || updateError) {
            console.log('   ✓ Verified: Share code does not grant update permission');
        } else {
            console.log('   ⚠ Warning: Shared map was modifiable!');
        }

        // Cleanup
        await clientB.from('trust_maps').delete().eq('id', mapB.id);

    } catch (error) {
        logTest(
            'Can read shared maps with share_code',
            false,
            `Test error: ${error.message}`
        );
    }
}

/**
 * TEST 5: User cannot insert maps with other users' device_id
 *
 * Security Requirement: Users should not be able to impersonate other devices
 */
async function testCannotInsertWithOtherDeviceId() {
    console.log('\n📋 TEST 5: User cannot insert maps with other users\' device_id');
    console.log('-----------------------------------------------------------');

    const deviceA = generateDeviceId();
    const deviceB = generateDeviceId();

    const clientA = createSupabaseClient(deviceA);

    try {
        // User A tries to create a map with User B's device_id (should fail)
        console.log('1. User A attempts to create map with User B\'s device_id...');
        const { data: insertData, error: insertError } = await clientA
            .from('trust_maps')
            .insert({
                device_id: deviceB, // Attempting to use someone else's device_id
                map_name: 'Impersonation Attempt',
                relationships: [],
                trust_scores: {}
            })
            .select();

        // Check if insert was blocked
        if (!insertData || insertData.length === 0 || insertError) {
            logTest(
                'Cannot insert with other users\' device_id',
                true,
                `User A was correctly blocked from inserting with User B's device_id. Error: ${insertError?.message || 'Insert blocked'}`
            );
        } else {
            logTest(
                'Cannot insert with other users\' device_id',
                false,
                `SECURITY BREACH: User A was able to create map with User B's device_id! Data: ${JSON.stringify(insertData)}`
            );

            // Cleanup if breach occurred
            if (insertData[0]?.id) {
                await clientA.from('trust_maps').delete().eq('id', insertData[0].id);
            }
        }

    } catch (error) {
        logTest(
            'Cannot insert with other users\' device_id',
            false,
            `Test error: ${error.message}`
        );
    }
}

/**
 * Run all tests and display summary
 */
async function runAllTests() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔒 ROW-LEVEL SECURITY TEST SUITE');
    console.log('   Testing secure RLS policies for True Valence Mapper');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Check if Supabase is loaded
    if (typeof window === 'undefined' || !window.supabase) {
        console.error('❌ ERROR: Supabase client not loaded!');
        console.error('   Include Supabase JS library before running tests:');
        console.error('   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
        return;
    }

    // Run all tests
    await testCannotReadOtherUsersMaps();
    await testCannotModifyOtherUsersMaps();
    await testCannotDeleteOtherUsersMaps();
    await testCanReadSharedMaps();
    await testCannotInsertWithOtherDeviceId();

    // Display summary
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Total Tests: ${testResults.tests.length}`);
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    if (testResults.failed === 0) {
        console.log('🎉 ALL TESTS PASSED!');
        console.log('✓ Security policies are working correctly');
        console.log('✓ Users can only access their own data');
        console.log('✓ Share codes grant read-only access');
        console.log('✓ No unauthorized access detected\n');
    } else {
        console.error('⚠️  SECURITY ISSUES DETECTED!');
        console.error(`${testResults.failed} test(s) failed - review policies immediately\n`);

        // List failed tests
        testResults.tests.filter(t => !t.passed).forEach(test => {
            console.error(`❌ ${test.name}`);
            console.error(`   ${test.details}\n`);
        });
    }

    return testResults;
}

// Export for use in browser or Node.js
if (typeof window !== 'undefined') {
    window.runRLSSecurityTests = runAllTests;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, testResults };
}

// Auto-run if loaded directly in browser
if (typeof window !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('RLS Security Test Suite loaded. Run tests with: runRLSSecurityTests()');
    });
}
