/**
 * Version History Management Module for ProActive True Valence Mapper
 * Provides versioning, comparison, and restoration capabilities
 * Stores up to 10 versions per map in localStorage
 */

class VersionHistory {
    constructor() {
        this.maxVersions = 10;
        this.storageKey = 'trustMapVersionHistory';
        this.autoSaveInterval = 5 * 60 * 1000; // 5 minutes
        this.lastAutoSave = Date.now();
        this.versions = this.loadVersions();
    }

    /**
     * Load versions from localStorage
     * @returns {Array} Array of version objects
     */
    loadVersions() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (error) {
            console.error('Error loading version history:', error);
        }
        return [];
    }

    /**
     * Save versions to localStorage
     */
    saveVersions() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.versions));
        } catch (error) {
            console.error('Error saving version history:', error);
            // If storage is full, remove oldest version and try again
            if (this.versions.length > 0) {
                this.versions.shift();
                this.saveVersions();
            }
        }
    }

    /**
     * Create a new version snapshot
     * @param {Object} mapData - Current map data {relationships, trustScores}
     * @param {string} changeSummary - Optional description of changes
     * @param {boolean} isManual - Whether this is a manual save
     * @returns {Object} Created version object
     */
    createVersion(mapData, changeSummary = '', isManual = false) {
        // Validate and sanitize map data
        let cleanedData = mapData;
        if (typeof InputValidator !== 'undefined') {
            const validation = InputValidator.validateMapData(mapData);
            if (validation.isValid && validation.data) {
                cleanedData = validation.data;
            }
        }

        const versionNumber = this.versions.length + 1;
        const timestamp = new Date().toISOString();

        const version = {
            versionNumber: versionNumber,
            timestamp: timestamp,
            changeSummary: changeSummary || this.generateChangeSummary(cleanedData),
            isManual: isManual,
            data: {
                relationships: cleanedData.relationships || [],
                trustScores: cleanedData.trustScores || {}
            },
            metadata: {
                relationshipCount: (cleanedData.relationships || []).length,
                createdAt: timestamp
            }
        };

        // Add version to array
        this.versions.push(version);

        // Maintain max versions limit
        if (this.versions.length > this.maxVersions) {
            this.versions.shift(); // Remove oldest
            this.renumberVersions();
        }

        this.saveVersions();
        this.lastAutoSave = Date.now();

        return version;
    }

    /**
     * Renumber versions after deletion
     */
    renumberVersions() {
        this.versions.forEach((version, index) => {
            version.versionNumber = index + 1;
        });
    }

    /**
     * Generate automatic change summary
     * @param {Object} mapData - Current map data
     * @returns {string} Change summary
     */
    generateChangeSummary(mapData) {
        const relationshipCount = (mapData.relationships || []).length;
        const previousVersion = this.getLatestVersion();

        if (!previousVersion) {
            return `Initial version with ${relationshipCount} relationship(s)`;
        }

        const prevCount = previousVersion.metadata.relationshipCount;
        const diff = relationshipCount - prevCount;

        if (diff > 0) {
            return `Added ${diff} relationship(s) (total: ${relationshipCount})`;
        } else if (diff < 0) {
            return `Removed ${Math.abs(diff)} relationship(s) (total: ${relationshipCount})`;
        } else {
            return `Updated trust scores (${relationshipCount} relationships)`;
        }
    }

    /**
     * Get all versions
     * @returns {Array} Array of all versions
     */
    getAllVersions() {
        return [...this.versions];
    }

    /**
     * Get latest version
     * @returns {Object|null} Latest version or null
     */
    getLatestVersion() {
        if (this.versions.length === 0) return null;
        return this.versions[this.versions.length - 1];
    }

    /**
     * Get version by number
     * @param {number} versionNumber - Version number to retrieve
     * @returns {Object|null} Version object or null
     */
    getVersion(versionNumber) {
        return this.versions.find(v => v.versionNumber === versionNumber) || null;
    }

    /**
     * Delete a specific version
     * @param {number} versionNumber - Version number to delete
     * @returns {boolean} Success status
     */
    deleteVersion(versionNumber) {
        const index = this.versions.findIndex(v => v.versionNumber === versionNumber);
        if (index === -1) return false;

        this.versions.splice(index, 1);
        this.renumberVersions();
        this.saveVersions();

        return true;
    }

    /**
     * Restore a specific version
     * @param {number} versionNumber - Version number to restore
     * @returns {Object|null} Restored map data or null
     */
    restoreVersion(versionNumber) {
        const version = this.getVersion(versionNumber);
        if (!version) return null;

        return {
            relationships: version.data.relationships,
            trustScores: version.data.trustScores
        };
    }

    /**
     * Compare two versions and return differences
     * @param {number} version1Number - First version number
     * @param {number} version2Number - Second version number
     * @returns {Object} Comparison object with differences
     */
    compareVersions(version1Number, version2Number) {
        const v1 = this.getVersion(version1Number);
        const v2 = this.getVersion(version2Number);

        if (!v1 || !v2) {
            return { error: 'One or both versions not found' };
        }

        const comparison = {
            version1: {
                number: v1.versionNumber,
                timestamp: v1.timestamp,
                relationshipCount: v1.metadata.relationshipCount
            },
            version2: {
                number: v2.versionNumber,
                timestamp: v2.timestamp,
                relationshipCount: v2.metadata.relationshipCount
            },
            differences: {
                added: [],
                removed: [],
                modified: []
            }
        };

        // Find added/removed relationships
        const v1Names = new Set(v1.data.relationships.map(r => r.name));
        const v2Names = new Set(v2.data.relationships.map(r => r.name));

        v2.data.relationships.forEach(rel => {
            if (!v1Names.has(rel.name)) {
                comparison.differences.added.push(rel.name);
            }
        });

        v1.data.relationships.forEach(rel => {
            if (!v2Names.has(rel.name)) {
                comparison.differences.removed.push(rel.name);
            }
        });

        // Find modified trust scores
        v1.data.relationships.forEach(rel => {
            if (v2Names.has(rel.name)) {
                const v1Scores = v1.data.trustScores[rel.id];
                const v2Rel = v2.data.relationships.find(r => r.name === rel.name);
                if (v2Rel) {
                    const v2Scores = v2.data.trustScores[v2Rel.id];

                    if (v1Scores && v2Scores) {
                        if (v1Scores.outward !== v2Scores.outward || v1Scores.inward !== v2Scores.inward) {
                            comparison.differences.modified.push({
                                name: rel.name,
                                v1: { outward: v1Scores.outward, inward: v1Scores.inward },
                                v2: { outward: v2Scores.outward, inward: v2Scores.inward }
                            });
                        }
                    }
                }
            }
        });

        return comparison;
    }

    /**
     * Check if auto-save interval has elapsed
     * @returns {boolean} True if auto-save should occur
     */
    shouldAutoSave() {
        return (Date.now() - this.lastAutoSave) >= this.autoSaveInterval;
    }

    /**
     * Clear all version history
     */
    clearAllVersions() {
        this.versions = [];
        this.saveVersions();
    }

    /**
     * Export version history as JSON
     * @returns {string} JSON string of version history
     */
    exportVersionHistory() {
        const exportData = {
            appName: "ProActive True Valence Mapper",
            exportDate: new Date().toISOString(),
            versionCount: this.versions.length,
            versions: this.versions
        };

        return JSON.stringify(exportData, null, 2);
    }

    /**
     * Import version history from JSON
     * @param {string} jsonString - JSON string to import
     * @returns {boolean} Success status
     */
    importVersionHistory(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            if (data.versions && Array.isArray(data.versions)) {
                this.versions = data.versions;
                this.saveVersions();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing version history:', error);
            return false;
        }
    }

    /**
     * Get formatted timestamp
     * @param {string} isoTimestamp - ISO timestamp string
     * @returns {string} Formatted date string
     */
    static formatTimestamp(isoTimestamp) {
        const date = new Date(isoTimestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute(s) ago`;
        if (diffHours < 24) return `${diffHours} hour(s) ago`;
        if (diffDays < 7) return `${diffDays} day(s) ago`;

        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    /**
     * Get version statistics
     * @returns {Object} Statistics about version history
     */
    getStatistics() {
        if (this.versions.length === 0) {
            return {
                totalVersions: 0,
                oldestVersion: null,
                newestVersion: null,
                manualSaves: 0,
                autoSaves: 0
            };
        }

        return {
            totalVersions: this.versions.length,
            oldestVersion: this.versions[0].timestamp,
            newestVersion: this.versions[this.versions.length - 1].timestamp,
            manualSaves: this.versions.filter(v => v.isManual).length,
            autoSaves: this.versions.filter(v => !v.isManual).length,
            storageUsed: new Blob([JSON.stringify(this.versions)]).size
        };
    }

    /**
     * Calculate storage size in KB
     * @returns {number} Size in KB
     */
    getStorageSize() {
        const data = JSON.stringify(this.versions);
        return Math.round(new Blob([data]).size / 1024 * 100) / 100;
    }
}

// Export for use in main app
window.VersionHistory = VersionHistory;
