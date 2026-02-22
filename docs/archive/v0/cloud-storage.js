/**
 * Cloud Storage Module for ProActive True Valence Mapper
 * Stage 2A: Anonymous Cloud Storage via Supabase
 * Includes input validation and XSS protection
 */

// Configuration for ProActive True Valence Mapper
const SUPABASE_CONFIG = {
    url: 'https://qhozgoiukkbwjivowrbw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob3pnb2l1a2tid2ppdm93cmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU4MTgsImV4cCI6MjA3ODI2MTgxOH0.O5PGV2Igfrax9fsafiaRKLuin_tBhXupugZelCuxmFI',
    timeout: 10000 // 10 second timeout
};

class CloudStorage {
    constructor() {
        this.deviceId = null; // Will be set asynchronously after auth
        this.supabase = null;
        this.isOnline = navigator.onLine;
        this.authInitialized = false; // Track authentication state
        this.initializeSupabase();
        this.setupEventListeners();
    }

    // Initialize Supabase client
    initializeSupabase() {
        if (typeof window.supabase !== 'undefined') {
            this.supabase = window.supabase.createClient(
                SUPABASE_CONFIG.url,
                SUPABASE_CONFIG.anonKey,
                {
                    auth: {
                        persistSession: true,      // Enable session persistence
                        autoRefreshToken: true,    // Auto-refresh tokens
                        storage: window.localStorage // Use localStorage for session
                    }
                }
            );

            // Initialize authentication immediately
            this.initializeAuth();
        }
    }

    // Initialize anonymous authentication
    async initializeAuth() {
        try {
            console.log('🔐 Initializing anonymous authentication...');

            // Check for existing session
            const { data: { session } } = await this.supabase.auth.getSession();

            if (session) {
                // Returning user - reuse existing session
                this.deviceId = session.user.id;
                this.authInitialized = true;
                console.log('✅ Existing auth session found:', this.deviceId);

                if (typeof showSuccess === 'function') {
                    showSuccess('Connected to cloud storage');
                }
                return;
            }

            // New user - create anonymous session
            console.log('Creating new anonymous session...');
            const { data, error } = await this.supabase.auth.signInAnonymously();

            if (error) throw error;

            // Set device_id to Supabase auth UID
            this.deviceId = data.user.id;
            this.authInitialized = true;

            console.log('✅ Anonymous authentication successful:', this.deviceId);

            // Store auth UID for debugging
            localStorage.setItem('current_auth_uid', this.deviceId);

            if (typeof showSuccess === 'function') {
                showSuccess('Connected to cloud storage');
            }

        } catch (error) {
            console.error('❌ Auth initialization error:', error);

            if (typeof showError === 'function') {
                showError('Cloud storage unavailable - offline mode');
            }

            // Fallback to offline mode
            this.deviceId = this.generateUUID();
            this.authInitialized = false;
            localStorage.setItem('fallbackDeviceId', this.deviceId);

            console.warn('⚠️ Using offline fallback device_id:', this.deviceId);
        }
    }

    // Wait for authentication to initialize
    async ensureAuthenticated() {
        // Already authenticated
        if (this.authInitialized) {
            return true;
        }

        // Wait up to 5 seconds for auth to complete
        const startTime = Date.now();
        const timeout = 5000;

        while (!this.authInitialized && Date.now() - startTime < timeout) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (!this.authInitialized) {
            console.error('❌ Authentication timeout after 5 seconds');

            if (typeof showWarning === 'function') {
                showWarning('Connection slow - using offline mode');
            }
        }

        return this.authInitialized;
    }

    // Generate UUID v4
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Setup online/offline listeners
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            if (typeof showSuccess === 'function') {
                showSuccess('Back online - Cloud sync available');
            }
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            if (typeof showWarning === 'function') {
                showWarning('Offline - Changes saved locally');
            }
        });

        // Listen for auth state changes
        if (this.supabase) {
            this.supabase.auth.onAuthStateChange((event, session) => {
                console.log('🔐 Auth state changed:', event);

                if (event === 'SIGNED_IN' && session) {
                    this.deviceId = session.user.id;
                    this.authInitialized = true;
                    console.log('✅ Signed in:', this.deviceId);
                } else if (event === 'SIGNED_OUT') {
                    this.deviceId = null;
                    this.authInitialized = false;
                    console.warn('⚠️ Signed out - cloud features disabled');
                    if (typeof showWarning === 'function') {
                        showWarning('Signed out - using offline mode');
                    }
                } else if (event === 'TOKEN_REFRESHED') {
                    console.log('🔄 Auth token refreshed');
                } else if (event === 'USER_UPDATED' && session) {
                    console.log('👤 User updated:', session.user.id);
                }
            });
        }
    }

    // Save map to cloud
    async saveToCloud(mapData, mapName = 'Untitled Map') {
        // Wait for authentication to complete
        if (!await this.ensureAuthenticated()) {
            console.warn('Auth not ready, falling back to local storage');
            return this.fallbackToLocal(mapData, mapName);
        }

        if (!this.supabase || !this.isOnline) {
            return this.fallbackToLocal(mapData, mapName);
        }

        try {
            // Validate and sanitize map name
            const nameValidation = typeof InputValidator !== 'undefined'
                ? InputValidator.validateMapName(mapName)
                : { isValid: true, sanitized: mapName.substring(0, 100) };

            if (!nameValidation.isValid) {
                console.error('Invalid map name:', nameValidation.error);
                return this.fallbackToLocal(mapData, nameValidation.sanitized || mapName);
            }

            const sanitizedName = nameValidation.sanitized;

            // Validate map data structure
            let sanitizedData = mapData;
            if (typeof InputValidator !== 'undefined') {
                const validation = InputValidator.validateMapData(mapData);
                if (!validation.isValid) {
                    console.warn('Map data validation issues:', validation.errors);
                    if (validation.data) {
                        sanitizedData = validation.data;
                    }
                }
            }

            const cloudData = {
                device_id: this.deviceId,
                map_name: sanitizedName,
                relationships: sanitizedData.relationships || [],
                trust_scores: sanitizedData.trustScores || {},
                version: '1.0'
            };

            const { data, error } = await this.supabase
                .from('trust_maps')
                .insert([cloudData])
                .select()
                .single();

            if (error) throw error;

            // Save reference locally
            this.saveMapReference(data.id, data.share_code, sanitizedName);

            if (typeof showSuccess === 'function') {
                showSuccess(`Map saved to cloud! Share code: ${data.share_code}`);
            }
            return {
                success: true,
                id: data.id,
                shareCode: data.share_code,
                shareUrl: this.getShareUrl(data.share_code)
            };

        } catch (error) {
            console.error('Cloud save error:', error);
            if (typeof showError === 'function') {
                showError('Cloud save failed - saving locally');
            }
            return this.fallbackToLocal(mapData, mapName);
        }
    }

    // Load map from cloud by ID or share code
    async loadFromCloud(idOrShareCode) {
        // Wait for authentication to complete
        if (!await this.ensureAuthenticated()) {
            if (typeof showError === 'function') {
                showError('Authentication required - cannot load from cloud');
            }
            return { success: false, error: 'Not authenticated' };
        }

        if (!this.supabase || !this.isOnline) {
            if (typeof showError === 'function') {
                showError('Offline - cannot load from cloud');
            }
            return { success: false, error: 'Offline' };
        }

        try {
            // Determine if it's an ID or share code
            const column = idOrShareCode.includes('-') ? 'share_code' : 'id';

            const { data, error } = await this.supabase
                .from('trust_maps')
                .select('*')
                .eq(column, idOrShareCode)
                .single();

            if (error) throw error;

            // Validate and sanitize loaded data
            let cleanedData = {
                relationships: data.relationships || [],
                trustScores: data.trust_scores || {},
                mapName: data.map_name || 'Untitled Map'
            };

            if (typeof InputValidator !== 'undefined') {
                // Sanitize imported data
                cleanedData = InputValidator.sanitizeImportedJSON({
                    relationships: data.relationships,
                    trustScores: data.trust_scores
                });
                cleanedData.mapName = InputValidator.sanitizeInput(data.map_name || '', 100);
            }

            // Update accessed_at
            await this.supabase
                .from('trust_maps')
                .update({ accessed_at: new Date().toISOString() })
                .eq('id', data.id);

            if (typeof showSuccess === 'function') {
                showSuccess('Map loaded from cloud');
            }
            return {
                success: true,
                data: {
                    relationships: cleanedData.relationships,
                    trustScores: cleanedData.trustScores,
                    mapName: cleanedData.mapName,
                    shareCode: data.share_code
                }
            };

        } catch (error) {
            console.error('Cloud load error:', error);
            if (typeof showError === 'function') {
                showError('Failed to load map from cloud');
            }
            return { success: false, error: error.message };
        }
    }

    // Update existing cloud map
    async updateCloudMap(mapId, mapData) {
        // Wait for authentication to complete
        if (!await this.ensureAuthenticated()) {
            return this.fallbackToLocal(mapData);
        }

        if (!this.supabase || !this.isOnline) {
            return this.fallbackToLocal(mapData);
        }

        try {
            const { error } = await this.supabase
                .from('trust_maps')
                .update({
                    relationships: mapData.relationships || [],
                    trust_scores: mapData.trustScores || {},
                    updated_at: new Date().toISOString()
                })
                .eq('id', mapId)
                .eq('device_id', this.deviceId);

            if (error) throw error;

            if (typeof showSuccess === 'function') {
                showSuccess('Map updated in cloud');
            }
            return { success: true };

        } catch (error) {
            console.error('Cloud update error:', error);
            if (typeof showError === 'function') {
                showError('Failed to update map in cloud');
            }
            return this.fallbackToLocal(mapData);
        }
    }

    // Get list of user's maps
    async getMyMaps() {
        // Wait for authentication to complete
        if (!await this.ensureAuthenticated()) {
            return this.getLocalMaps();
        }

        if (!this.supabase || !this.isOnline) {
            return this.getLocalMaps();
        }

        try {
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

    // Delete a map
    async deleteMap(mapId) {
        // Wait for authentication to complete
        if (!await this.ensureAuthenticated()) {
            if (typeof showError === 'function') {
                showError('Authentication required - cannot delete');
            }
            return { success: false };
        }

        if (!this.supabase || !this.isOnline) {
            if (typeof showError === 'function') {
                showError('Cannot delete while offline');
            }
            return { success: false };
        }

        try {
            const { error } = await this.supabase
                .from('trust_maps')
                .delete()
                .eq('id', mapId)
                .eq('device_id', this.deviceId);

            if (error) throw error;

            this.removeMapReference(mapId);
            if (typeof showSuccess === 'function') {
                showSuccess('Map deleted');
            }
            return { success: true };

        } catch (error) {
            console.error('Delete error:', error);
            if (typeof showError === 'function') {
                showError('Failed to delete map');
            }
            return { success: false };
        }
    }

    // Generate shareable URL
    getShareUrl(shareCode) {
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}#share/${shareCode}`;
    }

    // Fallback to localStorage
    fallbackToLocal(mapData, mapName) {
        const localMaps = JSON.parse(localStorage.getItem('cloudMaps') || '{}');
        const mapId = this.generateUUID();

        // Sanitize map name
        let sanitizedName = mapName || 'Untitled Map';
        if (typeof InputValidator !== 'undefined') {
            const validation = InputValidator.validateMapName(sanitizedName);
            sanitizedName = validation.isValid ? validation.sanitized : 'Untitled Map';
        }

        // Sanitize map data
        let sanitizedData = mapData || { relationships: [], trustScores: {} };
        if (typeof InputValidator !== 'undefined') {
            const validation = InputValidator.validateMapData(mapData);
            if (validation.isValid && validation.data) {
                sanitizedData = validation.data;
            }
        }

        localMaps[mapId] = {
            ...sanitizedData,
            mapName: sanitizedName,
            id: mapId,
            deviceId: this.deviceId,
            savedAt: new Date().toISOString(),
            isLocal: true
        };

        try {
            localStorage.setItem('cloudMaps', JSON.stringify(localMaps));
            localStorage.setItem('trustValenceMap', JSON.stringify(sanitizedData));
        } catch (error) {
            console.error('LocalStorage error:', error);
            // Storage quota might be exceeded, but operation can continue
        }

        return {
            success: true,
            id: mapId,
            isLocal: true
        };
    }

    // Get local maps
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

    // Save map reference locally
    saveMapReference(id, shareCode, mapName) {
        const refs = JSON.parse(localStorage.getItem('mapReferences') || '{}');
        refs[id] = { shareCode, mapName, lastSaved: new Date().toISOString() };
        localStorage.setItem('mapReferences', JSON.stringify(refs));
    }

    // Remove map reference
    removeMapReference(id) {
        const refs = JSON.parse(localStorage.getItem('mapReferences') || '{}');
        delete refs[id];
        localStorage.setItem('mapReferences', JSON.stringify(refs));
    }


    // Check if URL has share code
    checkForShareCode() {
        const hash = window.location.hash;
        if (hash.startsWith('#share/')) {
            const shareCode = hash.substring(7);
            return shareCode;
        }
        return null;
    }

    // Sync local changes to cloud when back online
    async syncLocalToCloud() {
        if (!this.isOnline || !this.supabase) return;

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
window.CloudStorage = CloudStorage;