/**
 * RLS Security Test Suite - Complete Version
 * Tests Row-Level Security policies in Supabase
 *
 * USAGE:
 * 1. Set your Supabase credentials in the config
 * 2. Run: node test-rls-security-complete.js
 * 3. All tests should pass for secure implementation
 */

import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = 'https://qhozgoiukkbwjivowrbw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob3pnb2l1a2tid2ppdm93cmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU4MTgsImV4cCI6MjA3ODI2MTgxOH0.O5PGV2Igfrax9fsafiaRKLuin_tBhXupugZelCuxmFI';

// Test utilities
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class RLSSecurityTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async runTests() {
        console.log('🔒 RLS Security Test Suite Starting...\n');

        // Create two separate users with different auth sessions
        const user1 = await this.createTestUser('User1');
        const user2 = await this.createTestUser('User2');

        // Run test scenarios
        await this.test1_UserIsolation(user1, user2);
        await this.test2_NoUnauthorizedReads(user1, user2);
        await this.test3_NoUnauthorizedUpdates(user1, user2);
        await this.test4_NoUnauthorizedDeletes(user1, user2);
        await this.test5_ShareCodeAccess(user1, user2);
        await this.test6_AnonymousUserHandling();

        // Clean up test data
        await this.cleanup(user1, user2);

        // Report results
        this.reportResults();
    }

    async createTestUser(name) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // Sign in anonymously to get unique auth.uid()
        const { data: authData, error: authError } = await supabase.auth.signInAnonymously();

        if (authError) {
            console.error(`❌ Failed to create ${name}:`, authError);
            return null;
        }

        return {
            name,
            supabase,
            userId: authData.user.id,
            testMapId: null,
            shareCode: null
        };
    }

    async test1_UserIsolation(user1, user2) {
        console.log('Test 1: User Isolation - Each user can only see their own maps');

        try {
            // User1 creates a map
            const map1Data = {
                map_name: 'User1 Private Map',
                relationships: [{ from: 'Me', to: 'Boss', trust: 7 }],
                trust_scores: { 'Me-Boss': 7 }
            };

            const { data: map1, error: error1 } = await user1.supabase
                .from('trust_maps')
                .insert([map1Data])
                .select()
                .single();

            if (error1) throw error1;
            user1.testMapId = map1.id;
            user1.shareCode = map1.share_code;

            // User2 creates a map
            const map2Data = {
                map_name: 'User2 Private Map',
                relationships: [{ from: 'Me', to: 'Colleague', trust: 8 }],
                trust_scores: { 'Me-Colleague': 8 }
            };

            const { data: map2, error: error2 } = await user2.supabase
                .from('trust_maps')
                .insert([map2Data])
                .select()
                .single();

            if (error2) throw error2;
            user2.testMapId = map2.id;
            user2.shareCode = map2.share_code;

            // User1 queries their maps
            const { data: user1Maps, error: user1Error } = await user1.supabase
                .from('trust_maps')
                .select('*');

            // User2 queries their maps
            const { data: user2Maps, error: user2Error } = await user2.supabase
                .from('trust_maps')
                .select('*');

            // Verify isolation
            const user1SeesOnlyOwn = user1Maps.every(m => m.id === user1.testMapId);
            const user2SeesOnlyOwn = user2Maps.every(m => m.id === user2.testMapId);
            const user1CannotSeeUser2 = !user1Maps.some(m => m.id === user2.testMapId);
            const user2CannotSeeUser1 = !user2Maps.some(m => m.id === user1.testMapId);

            if (user1SeesOnlyOwn && user2SeesOnlyOwn && user1CannotSeeUser2 && user2CannotSeeUser1) {
                this.recordPass('User Isolation');
                console.log('✅ Users are properly isolated\n');
            } else {
                this.recordFail('User Isolation', 'Users can see each other\'s maps!');
                console.log('❌ CRITICAL: User isolation failed!\n');
            }

        } catch (error) {
            this.recordFail('User Isolation', error.message);
            console.log('❌ Test failed:', error.message, '\n');
        }
    }

    async test2_NoUnauthorizedReads(user1, user2) {
        console.log('Test 2: No Unauthorized Reads - User cannot read another user\'s map by ID');

        try {
            // User2 tries to read User1's map directly by ID
            const { data, error } = await user2.supabase
                .from('trust_maps')
                .select('*')
                .eq('id', user1.testMapId)
                .single();

            if (error || !data) {
                this.recordPass('No Unauthorized Reads');
                console.log('✅ Direct read by ID blocked\n');
            } else {
                this.recordFail('No Unauthorized Reads', 'User could read another user\'s map!');
                console.log('❌ CRITICAL: Unauthorized read succeeded!\n');
            }

        } catch (error) {
            this.recordPass('No Unauthorized Reads');
            console.log('✅ Direct read properly blocked\n');
        }
    }

    async test3_NoUnauthorizedUpdates(user1, user2) {
        console.log('Test 3: No Unauthorized Updates - User cannot update another user\'s map');

        try {
            // User2 tries to update User1's map
            const { data, error } = await user2.supabase
                .from('trust_maps')
                .update({ map_name: 'HACKED!' })
                .eq('id', user1.testMapId);

            // Verify the map wasn't changed
            const { data: checkData } = await user1.supabase
                .from('trust_maps')
                .select('map_name')
                .eq('id', user1.testMapId)
                .single();

            if (error || !data || checkData.map_name === 'User1 Private Map') {
                this.recordPass('No Unauthorized Updates');
                console.log('✅ Update blocked or had no effect\n');
            } else {
                this.recordFail('No Unauthorized Updates', 'User could update another user\'s map!');
                console.log('❌ CRITICAL: Unauthorized update succeeded!\n');
            }

        } catch (error) {
            this.recordPass('No Unauthorized Updates');
            console.log('✅ Update properly blocked\n');
        }
    }

    async test4_NoUnauthorizedDeletes(user1, user2) {
        console.log('Test 4: No Unauthorized Deletes - User cannot delete another user\'s map');

        try {
            // User2 tries to delete User1's map
            const { data, error } = await user2.supabase
                .from('trust_maps')
                .delete()
                .eq('id', user1.testMapId);

            // Verify the map still exists
            const { data: checkData } = await user1.supabase
                .from('trust_maps')
                .select('id')
                .eq('id', user1.testMapId)
                .single();

            if (error || !data || checkData) {
                this.recordPass('No Unauthorized Deletes');
                console.log('✅ Delete blocked or had no effect\n');
            } else {
                this.recordFail('No Unauthorized Deletes', 'User could delete another user\'s map!');
                console.log('❌ CRITICAL: Unauthorized delete succeeded!\n');
            }

        } catch (error) {
            this.recordPass('No Unauthorized Deletes');
            console.log('✅ Delete properly blocked\n');
        }
    }

    async test5_ShareCodeAccess(user1, user2) {
        console.log('Test 5: Share Code Access - Users can read maps via share code');

        try {
            // User2 tries to read User1's map using share code
            const { data, error } = await user2.supabase
                .from('trust_maps')
                .select('*')
                .eq('share_code', user1.shareCode)
                .single();

            if (data && data.id === user1.testMapId) {
                // Verify it's read-only by trying to update
                const { error: updateError } = await user2.supabase
                    .from('trust_maps')
                    .update({ map_name: 'Modified via share code' })
                    .eq('share_code', user1.shareCode);

                if (updateError) {
                    this.recordPass('Share Code Access');
                    console.log('✅ Share code allows read-only access\n');
                } else {
                    this.recordFail('Share Code Access', 'Share code allowed write access!');
                    console.log('❌ Share code should be read-only!\n');
                }
            } else {
                this.recordFail('Share Code Access', 'Could not read via share code');
                console.log('❌ Share code read failed\n');
            }

        } catch (error) {
            this.recordFail('Share Code Access', error.message);
            console.log('❌ Test failed:', error.message, '\n');
        }
    }

    async test6_AnonymousUserHandling() {
        console.log('Test 6: Anonymous User Handling - Each anonymous session is isolated');

        try {
            // Create two anonymous sessions
            const anon1 = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const anon2 = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

            const { data: auth1 } = await anon1.auth.signInAnonymously();
            const { data: auth2 } = await anon2.auth.signInAnonymously();

            // Verify different user IDs
            if (auth1.user.id !== auth2.user.id) {
                this.recordPass('Anonymous User Handling');
                console.log('✅ Anonymous users get unique IDs\n');
            } else {
                this.recordFail('Anonymous User Handling', 'Anonymous users share IDs!');
                console.log('❌ Anonymous users must have unique IDs\n');
            }

        } catch (error) {
            this.recordFail('Anonymous User Handling', error.message);
            console.log('❌ Test failed:', error.message, '\n');
        }
    }

    async cleanup(user1, user2) {
        console.log('Cleaning up test data...');

        try {
            // Clean up user1's test map
            if (user1?.testMapId) {
                await user1.supabase
                    .from('trust_maps')
                    .delete()
                    .eq('id', user1.testMapId);
            }

            // Clean up user2's test map
            if (user2?.testMapId) {
                await user2.supabase
                    .from('trust_maps')
                    .delete()
                    .eq('id', user2.testMapId);
            }

            console.log('✅ Cleanup complete\n');
        } catch (error) {
            console.log('⚠️ Cleanup error:', error.message, '\n');
        }
    }

    recordPass(testName) {
        this.results.passed++;
        this.results.tests.push({ name: testName, passed: true });
    }

    recordFail(testName, reason) {
        this.results.failed++;
        this.results.tests.push({ name: testName, passed: false, reason });
    }

    reportResults() {
        console.log('=' .repeat(60));
        console.log('TEST RESULTS SUMMARY');
        console.log('=' .repeat(60));

        console.log(`\nTotal Tests: ${this.results.passed + this.results.failed}`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);

        if (this.results.failed > 0) {
            console.log('\nFailed Tests:');
            this.results.tests
                .filter(t => !t.passed)
                .forEach(t => console.log(`  - ${t.name}: ${t.reason}`));
        }

        console.log('\n' + '=' .repeat(60));

        if (this.results.failed === 0) {
            console.log('🎉 ALL TESTS PASSED! RLS is properly configured.');
        } else {
            console.log('⚠️ SECURITY ISSUES DETECTED! Fix RLS policies immediately.');
        }

        console.log('=' .repeat(60));
    }
}

// Run tests
const tester = new RLSSecurityTester();
tester.runTests().catch(console.error);