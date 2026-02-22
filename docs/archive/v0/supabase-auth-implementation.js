/**
 * REQUIRED APPLICATION CHANGES FOR SECURE RLS
 *
 * This file shows the necessary changes to cloud-storage.js to support
 * the corrected RLS policies that use Supabase anonymous authentication.
 *
 * CRITICAL: The current implementation uses pure localStorage device_id
 * which cannot be verified by RLS policies. This implementation uses
 * Supabase anonymous auth to provide authenticated device_id in JWT claims.
 */

// Configuration (same as before)
const SUPABASE_CONFIG = {
    url: 'https://qhozgoiukkbwjivowrbw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob3pnb2l1a2tid2ppdm93cmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU4MTgsImV4cCI6MjA3ODI2MTgxOH0.O5PGV2Igfrax9fsafiaRKLuin_tBhXupugZelCuxmFI',
    timeout: 10000
};

class CloudStorageSecure {
    constructor() {
        this.deviceId = null; // Will be set after auth
        this.supabase = null;
        this.isOnline = navigator.onLine;
        this.authInitialized = false;
        this.initializeSupabase();
        this.setupEventListeners();
    }

    // Initialize Supabase client with auth
    initializeSupabase() {
        if (typeof window.supabase !== 'undefined') {
            this.supabase = window.supabase.createClient(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey,
                {
                    auth: {
                        // CHANGE: Enable session persistence for anonymous auth
                        persistSession: true,
                        autoRefreshToken: true,
                        // Storage for auth tokens
                        storage: window.localStorage
                    }
                }
            );

            // Initialize authentication
            this.initializeAuth();
        }
    }

    // NEW METHOD: Initialize anonymous authentication
    async initializeAuth() {
        try {
            // Check if user already has an active session
            const { data: { session } } = await this.supabase.auth.getSession();

            if (session) {
                // User already authenticated
                this.deviceId = session.user.id;
                this.authInitialized = true;
                console.log('Existing session found:', this.deviceId);
                return;
            }

            // Check for legacy localStorage device_id (migration path)
            const legacyDeviceId = localStorage.getItem('deviceId');

            if (legacyDeviceId) {
                // Try to sign in with legacy device_id
                // This requires custom auth function or migrate to new session
                console.log('Legacy device_id found, creating new anonymous session');
            }

            // Create new anonymous session
            const { data, error } = await this.supabase.auth.signInAnonymously({
                options: {
                    // Store legacy device_id in user_metadata if exists
                    data: legacyDeviceId ? {
                        legacy_device_id: legacyDeviceId
                    } : {}
                }
            });

            if (error) throw error;

            // Set device_id to Supabase auth UID
            this.deviceId = data.user.id;
            this.authInitialized = true;

            // Migrate legacy data if needed
            if (legacyDeviceId && legacyDeviceId !== this.deviceId) {
                await this.migrateLegacyData(legacyDeviceId);
            }

            console.log('Anonymous authentication successful:', this.deviceId);

        } catch (error) {
            console.error('Auth initialization error:', error);
            this.showStatus('Authentication failed', 'error');

            // Fallback to offline mode
            this.deviceId = this.generateUUID();
            localStorage.setItem('fallbackDeviceId', this.deviceId);
        }
    }

    // NEW METHOD: Wait for auth to initialize
    async ensureAuthenticated() {
        if (this.authInitialized) return true;

        // Wait up to 5 seconds for auth
        const startTime = Date.now();
        while (!this.authInitialized && Date.now() - startTime < 5000) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return this.authInitialized;
    }

    // NEW METHOD: Migrate data from old device_id to new auth-based ID
    async migrateLegacyData(oldDeviceId) {
        try {
            console.log('Migrating data from', oldDeviceId, 'to', this.deviceId);

            // This would require a backend function or Supabase Edge Function
            // because regular users can't access other users' data
            // For now, just log and clear localStorage

            console.warn('Legacy data migration requires manual intervention');
            console.warn('Old device_id:', oldDeviceId);
            console.warn('New device_id:', this.deviceId);

            // Clear legacy references
            localStorage.removeItem('deviceId');
            localStorage.setItem('deviceId_legacy', oldDeviceId);

        } catch (error) {
            console.error('Migration error:', error);
        }
    }

    // MODIFIED: Save map to cloud (wait for auth)
    async saveToCloud(mapData, mapName = 'Untitled Map') {
        // Ensure authentication completed
        if (!await this.ensureAuthenticated()) {
            return this.fallbackToLocal(mapData, mapName);
        }

        if (!this.supabase || !this.isOnline) {
            return this.fallbackToLocal(mapData, mapName);
        }

        try {
            const cloudData = {
                device_id: this.deviceId, // Now uses auth.uid()
                map_name: mapName,
                relationships: mapData.relationships || [],
                trust_scores: mapData.trustScores || {},
                version: '1.0'
            };

            const { data, error } = await this.supabase
                .from('trust_maps')
                .insert([cloudData])
                .select()
                .single();

            if (error) throw error;

            // Save reference locally
            this.saveMapReference(data.id, data.share_code, mapName);

            this.showStatus(`Map saved to cloud! Share code: ${data.share_code}`, 'success');
            return {
                success: true,
                id: data.id,
                shareCode: data.share_code,
                shareUrl: this.getShareUrl(data.share_code)
            };

        } catch (error) {
            console.error('Cloud save error:', error);
            this.showStatus('Cloud save failed - saving locally', 'error');
            return this.fallbackToLocal(mapData, mapName);
        }
    }

    // MODIFIED: Load map from cloud (handle share codes properly)
    async loadFromCloud(idOrShareCode) {
        if (!await this.ensureAuthenticated()) {
            this.showStatus('Offline - cannot load from cloud', 'error');
            return { success: false, error: 'Not authenticated' };
        }

        if (!this.supabase || !this.isOnline) {
            this.showStatus('Offline - cannot load from cloud', 'error');
            return { success: false, error: 'Offline' };
        }

        try {
            // Determine if it's an ID or share code
            const isShareCode = idOrShareCode.includes('-');

            let query = this.supabase
                .from('trust_maps')
                .select('*');

            if (isShareCode) {
                // Loading via share code
                query = query.eq('share_code', idOrShareCode);
            } else {
                // Loading own map by ID
                query = query
                    .eq('id', idOrShareCode)
                    .eq('device_id', this.deviceId); // Ensure ownership
            }

            const { data, error } = await query.single();

            if (error) throw error;

            // Update accessed_at
            await this.supabase
                .from('trust_maps')
                .update({ accessed_at: new Date().toISOString() })
                .eq('id', data.id);

            this.showStatus('Map loaded from cloud', 'success');
            return {
                success: true,
                data: {
                    relationships: data.relationships,
                    trustScores: data.trust_scores,
                    mapName: data.map_name,
                    shareCode: data.share_code,
                    isOwned: data.device_id === this.deviceId
                }
            };

        } catch (error) {
            console.error('Cloud load error:', error);
            this.showStatus('Failed to load map from cloud', 'error');
            return { success: false, error: error.message };
        }
    }

    // Update existing cloud map (no changes needed, already correct)
    async updateCloudMap(mapId, mapData) {
        if (!await this.ensureAuthenticated()) {
            return this.fallbackToLocal(mapData);
        }

        if (!this.supabase || !this.isOnline) {
            return this.fallbackToLocal(mapData);
        }

        try {
            // RLS will enforce device_id matching automatically
            const { error } = await this.supabase
                .from('trust_maps')
                .update({
                    relationships: mapData.relationships || [],
                    trust_scores: mapData.trustScores || {},
                    updated_at: new Date().toISOString()
                })
                .eq('id', mapId)
                .eq('device_id', this.deviceId); // Ensure ownership

            if (error) throw error;

            this.showStatus('Map updated in cloud', 'success');
            return { success: true };

        } catch (error) {
            console.error('Cloud update error:', error);
            return this.fallbackToLocal(mapData);
        }
    }

    // Get list of user's maps (no changes needed, already correct)
    async getMyMaps() {
        if (!await this.ensureAuthenticated()) {
            return this.getLocalMaps();
        }

        if (!this.supabase || !this.isOnline) {
            return this.getLocalMaps();
        }

        try {
            // RLS will automatically filter to only user's maps
            const { data, error } = await this.supabase
                .from('trust_maps')
                .select('id, map_name, share_code, created_at, updated_at')
                .eq('device_id', this.deviceId)
                .order('updated_at', { ascending: false });

            if (error) throw error;

            return { success: true, maps: data };

        } catch (error) {
            console.error('Failed to fetch maps:', error);
            return this.getLocalMaps();
        }
    }

    // Delete a map (no changes needed, already correct)
    async deleteMap(mapId) {
        if (!await this.ensureAuthenticated()) {
            this.showStatus('Cannot delete while offline', 'error');
            return { success: false };
        }

        if (!this.supabase || !this.isOnline) {
            this.showStatus('Cannot delete while offline', 'error');
            return { success: false };
        }

        try {
            // RLS will enforce device_id matching automatically
            const { error } = await this.supabase
                .from('trust_maps')
                .delete()
                .eq('id', mapId)
                .eq('device_id', this.deviceId); // Ensure ownership

            if (error) throw error;

            this.removeMapReference(mapId);
            this.showStatus('Map deleted', 'success');
            return { success: true };

        } catch (error) {
            console.error('Delete error:', error);
            this.showStatus('Failed to delete map', 'error');
            return { success: false };
        }
    }

    // NEW METHOD: Sign out (clear anonymous session)
    async signOut() {
        try {
            await this.supabase.auth.signOut();
            this.deviceId = null;
            this.authInitialized = false;
            localStorage.clear();
            this.showStatus('Signed out successfully', 'success');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }

    // NEW METHOD: Get current auth status
    async getAuthStatus() {
        const { data: { session } } = await this.supabase.auth.getSession();
        return {
            authenticated: !!session,
            deviceId: this.deviceId,
            userId: session?.user?.id,
            expiresAt: session?.expires_at
        };
    }

    // ========================================================================
    // REMAINING METHODS UNCHANGED FROM ORIGINAL cloud-storage.js
    // ========================================================================

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showStatus('Back online - Cloud sync available', 'success');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showStatus('Offline - Changes saved locally', 'warning');
        });

        // NEW: Listen for auth state changes
        this.supabase?.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session?.user?.id);
            if (event === 'SIGNED_IN') {
                this.deviceId = session.user.id;
                this.authInitialized = true;
            } else if (event === 'SIGNED_OUT') {
                this.deviceId = null;
                this.authInitialized = false;
            }
        });
    }

    getShareUrl(shareCode) {
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}#share/${shareCode}`;
    }

    fallbackToLocal(mapData, mapName) {
        const localMaps = JSON.parse(localStorage.getItem('cloudMaps') || '{}');
        const mapId = this.generateUUID();

        localMaps[mapId] = {
            ...mapData,
            mapName,
            id: mapId,
            deviceId: this.deviceId,
            savedAt: new Date().toISOString(),
            isLocal: true
        };

        localStorage.setItem('cloudMaps', JSON.stringify(localMaps));
        localStorage.setItem('trustValenceMap', JSON.stringify(mapData));

        return {
            success: true,
            id: mapId,
            isLocal: true
        };
    }

    getLocalMaps() {
        const localMaps = JSON.parse(localStorage.getItem('cloudMaps') || '{}');
        const maps = Object.values(localMaps).map(map => ({
            id: map.id,
            map_name: map.mapName || 'Untitled',
            created_at: map.savedAt,
            updated_at: map.savedAt,
            isLocal: true
        }));

        return { success: true, maps, isLocal: true };
    }

    saveMapReference(id, shareCode, mapName) {
        const refs = JSON.parse(localStorage.getItem('mapReferences') || '{}');
        refs[id] = { shareCode, mapName, lastSaved: new Date().toISOString() };
        localStorage.setItem('mapReferences', JSON.stringify(refs));
    }

    removeMapReference(id) {
        const refs = JSON.parse(localStorage.getItem('mapReferences') || '{}');
        delete refs[id];
        localStorage.setItem('mapReferences', JSON.stringify(refs));
    }

    showStatus(message, type = 'info') {
        let statusEl = document.getElementById('cloudStatus');
        if (!statusEl) {
            statusEl = document.createElement('div');
            statusEl.id = 'cloudStatus';
            statusEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                font-family: -apple-system, sans-serif;
                font-size: 14px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            `;
            document.body.appendChild(statusEl);
        }

        const colors = {
            success: { bg: '#4CAF50', text: 'white' },
            error: { bg: '#f44336', text: 'white' },
            warning: { bg: '#ff9800', text: 'white' },
            info: { bg: '#2196F3', text: 'white' }
        };

        const color = colors[type] || colors.info;
        statusEl.style.backgroundColor = color.bg;
        statusEl.style.color = color.text;
        statusEl.textContent = message;
        statusEl.style.display = 'block';

        clearTimeout(statusEl.hideTimeout);
        statusEl.hideTimeout = setTimeout(() => {
            statusEl.style.display = 'none';
        }, 5000);
    }

    checkForShareCode() {
        const hash = window.location.hash;
        if (hash.startsWith('#share/')) {
            const shareCode = hash.substring(7);
            return shareCode;
        }
        return null;
    }

    async syncLocalToCloud() {
        if (!this.isOnline || !this.supabase || !this.authInitialized) return;

        const localMaps = JSON.parse(localStorage.getItem('cloudMaps') || '{}');
        const localOnly = Object.values(localMaps).filter(m => m.isLocal);

        for (const map of localOnly) {
            try {
                await this.saveToCloud(map, map.mapName);
                delete localMaps[map.id];
            } catch (error) {
                console.error('Sync failed for map:', map.id);
            }
        }

        localStorage.setItem('cloudMaps', JSON.stringify(localMaps));
    }
}

// Export for use in main app
window.CloudStorageSecure = CloudStorageSecure;

// MIGRATION GUIDE:
// 1. Backup your database
// 2. Apply supabase-secure-rls-policies-CORRECTED.sql
// 3. Replace CloudStorage with CloudStorageSecure in your HTML
// 4. Test thoroughly with test-rls-security-CORRECTED.js
// 5. Update any references from window.CloudStorage to window.CloudStorageSecure
