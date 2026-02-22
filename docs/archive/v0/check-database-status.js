#!/usr/bin/env node
/**
 * Phase 0 Pre-flight Validation Script
 * Checks current database state before anonymous auth migration
 */

const SUPABASE_CONFIG = {
    url: 'https://qhozgoiukkbwjivowrbw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob3pnb2l1a2tid2ppdm93cmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU4MTgsImV4cCI6MjA3ODI2MTgxOH0.O5PGV2Igfrax9fsafiaRKLuin_tBhXupugZelCuxmFI'
};

async function runValidationChecks() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('PHASE 0: PRE-FLIGHT VALIDATION');
    console.log('═══════════════════════════════════════════════════════\n');

    try {
        // Load Supabase client
        let supabase;
        if (typeof window !== 'undefined' && window.supabase) {
            // Browser environment
            supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        } else {
            // Node.js environment - need to load from CDN or npm
            console.log('⚠️  Running in Node.js environment');
            console.log('Note: This script is designed to run in browser context');
            console.log('Please run this script in browser console or install @supabase/supabase-js\n');

            // Try to use fetch API
            console.log('Attempting REST API queries instead...\n');
            await runRestApiChecks();
            return;
        }

        // CHECK 1: User Impact Assessment
        console.log('CHECK 1: USER IMPACT ASSESSMENT');
        console.log('─────────────────────────────────────────────────────');

        const { data: maps, error: mapsError } = await supabase
            .from('trust_maps')
            .select('device_id, id, created_at');

        if (mapsError) {
            console.error('❌ Error querying trust_maps:', mapsError.message);
            throw mapsError;
        }

        const uniqueUsers = new Set(maps.map(m => m.device_id)).size;
        const totalMaps = maps.length;

        console.log(`✅ Unique Users (device_ids): ${uniqueUsers}`);
        console.log(`✅ Total Maps: ${totalMaps}`);

        if (uniqueUsers === 0) {
            console.log('\n🎉 GOOD NEWS: No existing users - zero risk migration!');
        } else if (uniqueUsers < 10) {
            console.log('\n⚠️  LOW RISK: Few users - migration manageable');
        } else if (uniqueUsers < 100) {
            console.log('\n⚠️  MEDIUM RISK: Moderate users - Edge Function migration recommended');
        } else {
            console.log('\n🚨 HIGH RISK: Many users - careful migration planning required!');
        }

        // CHECK 2: RLS Policy Verification
        console.log('\n\nCHECK 2: RLS POLICY VERIFICATION');
        console.log('─────────────────────────────────────────────────────');
        console.log('Note: RLS policy check requires database admin access');
        console.log('Attempting to test RLS behavior instead...\n');

        // Test if RLS is actually enforced
        try {
            // Try to query all maps (should work with anon key but RLS may filter)
            const { data: allMaps, error: rlsError } = await supabase
                .from('trust_maps')
                .select('*');

            if (rlsError) {
                console.log('❌ RLS Error:', rlsError.message);
            } else {
                console.log(`ℹ️  Query returned ${allMaps.length} maps (RLS may be filtering)`);

                // Check if we got all maps or filtered
                if (allMaps.length === totalMaps) {
                    console.log('⚠️  WARNING: RLS may not be enforcing (got all maps)');
                    console.log('   This is expected with current localStorage device_id implementation');
                } else {
                    console.log('✅ RLS appears to be filtering results');
                }
            }
        } catch (err) {
            console.log('ℹ️  RLS test inconclusive:', err.message);
        }

        // CHECK 3: Data Structure Analysis
        console.log('\n\nCHECK 3: DATA STRUCTURE ANALYSIS');
        console.log('─────────────────────────────────────────────────────');

        if (maps.length > 0) {
            const sampleMap = maps[0];
            console.log('Sample device_id format:', sampleMap.device_id);
            console.log('Device_id length:', sampleMap.device_id?.length || 'NULL');

            // Check if device_ids look like UUIDs (localStorage style)
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            const isUuid = uuidPattern.test(sampleMap.device_id);

            if (isUuid) {
                console.log('✅ Device IDs are UUID format (localStorage-based)');
                console.log('   Migration will be required to convert to auth.uid()');
            } else {
                console.log('ℹ️  Device IDs are non-standard format');
            }

            // Check age of data
            const oldestMap = maps.reduce((oldest, map) => {
                return new Date(map.created_at) < new Date(oldest.created_at) ? map : oldest;
            }, maps[0]);

            const daysSinceOldest = Math.floor(
                (Date.now() - new Date(oldestMap.created_at)) / (1000 * 60 * 60 * 24)
            );

            console.log(`Oldest map: ${daysSinceOldest} days old`);
        } else {
            console.log('✅ No existing maps - clean slate!');
        }

        // SUMMARY
        console.log('\n\n═══════════════════════════════════════════════════════');
        console.log('VALIDATION SUMMARY');
        console.log('═══════════════════════════════════════════════════════\n');

        const riskLevel = uniqueUsers === 0 ? 'ZERO' :
                         uniqueUsers < 10 ? 'LOW' :
                         uniqueUsers < 100 ? 'MEDIUM' : 'HIGH';

        console.log(`Risk Level: ${riskLevel}`);
        console.log(`Affected Users: ${uniqueUsers}`);
        console.log(`Total Maps at Risk: ${totalMaps}`);

        console.log('\n📋 RECOMMENDED NEXT STEPS:\n');

        if (uniqueUsers === 0) {
            console.log('✅ PROCEED with migration - no users to impact');
            console.log('✅ No migration code needed');
            console.log('✅ Can deploy immediately after testing');
        } else if (uniqueUsers < 10) {
            console.log('⚠️  PROCEED with caution:');
            console.log('   1. Notify users about upgrade');
            console.log('   2. Recommend export backup');
            console.log('   3. Implement Edge Function migration OR');
            console.log('   4. Accept data loss with clear warning');
        } else {
            console.log('🚨 CAREFUL PLANNING REQUIRED:');
            console.log('   1. MUST implement Edge Function migration');
            console.log('   2. Test migration in staging first');
            console.log('   3. Prepare rollback plan');
            console.log('   4. Schedule maintenance window');
        }

        console.log('\n═══════════════════════════════════════════════════════\n');

    } catch (error) {
        console.error('\n❌ VALIDATION FAILED:', error.message);
        console.error('Cannot proceed with migration until database is accessible\n');
        process.exit(1);
    }
}

// Alternative REST API check for Node.js environment
async function runRestApiChecks() {
    try {
        const response = await fetch(
            `${SUPABASE_CONFIG.url}/rest/v1/trust_maps?select=device_id,id,created_at`,
            {
                headers: {
                    'apikey': SUPABASE_CONFIG.anonKey,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const maps = await response.json();
        const uniqueUsers = new Set(maps.map(m => m.device_id)).size;
        const totalMaps = maps.length;

        console.log('CHECK 1: USER IMPACT ASSESSMENT');
        console.log('─────────────────────────────────────────────────────');
        console.log(`✅ Unique Users (device_ids): ${uniqueUsers}`);
        console.log(`✅ Total Maps: ${totalMaps}`);

        if (uniqueUsers === 0) {
            console.log('\n🎉 GOOD NEWS: No existing users - zero risk migration!');
            console.log('✅ Safe to proceed with implementation');
        } else if (uniqueUsers < 10) {
            console.log('\n⚠️  LOW RISK: Few users detected');
            console.log('⚠️  Migration strategy recommended but not critical');
        } else if (uniqueUsers < 100) {
            console.log('\n⚠️  MEDIUM RISK: Moderate user base');
            console.log('⚠️  Edge Function migration RECOMMENDED');
        } else {
            console.log('\n🚨 HIGH RISK: Large user base');
            console.log('🚨 Edge Function migration REQUIRED');
        }

        console.log('\n═══════════════════════════════════════════════════════\n');

    } catch (error) {
        console.error('❌ REST API check failed:', error.message);
        console.error('\nPlease verify:');
        console.error('1. Supabase project is running');
        console.error('2. API key is valid');
        console.error('3. Network connection is available\n');
        process.exit(1);
    }
}

// Run checks
if (typeof window !== 'undefined') {
    // Browser environment - expose function globally
    window.runPhase0Validation = runValidationChecks;
    console.log('✅ Validation script loaded');
    console.log('Run: runPhase0Validation()');
} else {
    // Node.js environment - run immediately
    runValidationChecks().catch(console.error);
}
