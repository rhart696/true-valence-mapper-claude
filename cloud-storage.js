/**
 * Cloud Storage Module for ProActive True Valence Mapper
 * Stage 2A: Anonymous Cloud Storage via Supabase
 */

// Configuration (to be replaced with your Supabase credentials)
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL', // e.g., https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY', // Your public anon key
    timeout: 10000 // 10 second timeout
};

class CloudStorage {
    constructor() {
        this.deviceId = this.getOrCreateDeviceId();
        this.supabase = null;
        this.isOnline = navigator.onLine;
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
                        persistSession: false,
                        autoRefreshToken: false
                    },
                    global: {
                        headers: {
                            'x-device-id': this.deviceId
                        }
                    }
                }
            );
        }
    }

    // Generate or retrieve device ID
    getOrCreateDeviceId() {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = this.generateUUID();
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
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
            this.showStatus('Back online - Cloud sync available', 'success');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showStatus('Offline - Changes saved locally', 'warning');
        });
    }

    // Save map to cloud
    async saveToCloud(mapData, mapName = 'Untitled Map') {
        if (!this.supabase || !this.isOnline) {
            return this.fallbackToLocal(mapData, mapName);
        }

        try {
            const cloudData = {
                device_id: this.deviceId,
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

    // Load map from cloud by ID or share code
    async loadFromCloud(idOrShareCode) {
        if (!this.supabase || !this.isOnline) {
            this.showStatus('Offline - cannot load from cloud', 'error');
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
                    shareCode: data.share_code
                }
            };

        } catch (error) {
            console.error('Cloud load error:', error);
            this.showStatus('Failed to load map from cloud', 'error');
            return { success: false, error: error.message };
        }
    }

    // Update existing cloud map
    async updateCloudMap(mapId, mapData) {
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

            this.showStatus('Map updated in cloud', 'success');
            return { success: true };

        } catch (error) {
            console.error('Cloud update error:', error);
            return this.fallbackToLocal(mapData);
        }
    }

    // Get list of user's maps
    async getMyMaps() {
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
        if (!this.supabase || !this.isOnline) {
            this.showStatus('Cannot delete while offline', 'error');
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
            this.showStatus('Map deleted', 'success');
            return { success: true };

        } catch (error) {
            console.error('Delete error:', error);
            this.showStatus('Failed to delete map', 'error');
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

    // Show status messages
    showStatus(message, type = 'info') {
        // Create or update status element
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

        // Set colors based on type
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

        // Auto-hide after 5 seconds
        clearTimeout(statusEl.hideTimeout);
        statusEl.hideTimeout = setTimeout(() => {
            statusEl.style.display = 'none';
        }, 5000);
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