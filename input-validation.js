/**
 * Input Validation and XSS Protection Module
 * Provides sanitization and validation for all user inputs
 */

class InputValidator {
    /**
     * Sanitize user input string
     * Removes HTML tags, limits length, escapes special characters
     * @param {string} input - Raw user input
     * @param {number} maxLength - Maximum allowed length (default 100)
     * @returns {string} Sanitized string
     */
    static sanitizeInput(input, maxLength = 100) {
        if (typeof input !== 'string') {
            return '';
        }

        // Step 1: Strip HTML tags using regex
        let cleaned = input.replace(/<[^>]*>/g, '');

        // Step 2: Decode HTML entities that might have been pre-encoded
        cleaned = this.decodeHTMLEntities(cleaned);

        // Step 3: Remove potentially dangerous characters
        // Allow alphanumeric, spaces, and common punctuation (.-_')
        cleaned = cleaned.replace(/[^\w\s\.\-_\'\(\)]/g, '');

        // Step 4: Normalize whitespace (remove extra spaces)
        cleaned = cleaned.replace(/\s+/g, ' ').trim();

        // Step 5: Limit length
        cleaned = cleaned.substring(0, maxLength);

        return cleaned;
    }

    /**
     * Decode HTML entities to prevent double-encoding issues
     * @param {string} str - String with potential HTML entities
     * @returns {string} Decoded string
     */
    static decodeHTMLEntities(str) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = str;
        return textArea.value;
    }

    /**
     * HTML-encode special characters for safe display
     * Used when displaying user input in HTML context
     * @param {string} str - String to encode
     * @returns {string} HTML-encoded string
     */
    static htmlEncode(str) {
        if (typeof str !== 'string') {
            return '';
        }

        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Validate trust score is valid number between 0-3
     * @param {*} value - Value to validate
     * @returns {number} Validated score (0-3) or 0 if invalid
     */
    static validateTrustScore(value) {
        const num = parseInt(value, 10);

        // Return 0 if not a valid number or out of range
        if (isNaN(num) || num < 0 || num > 3) {
            return 0;
        }

        return num;
    }

    /**
     * Validate person name
     * @param {string} name - Name to validate
     * @returns {object} { isValid: boolean, error: string|null, sanitized: string }
     */
    static validatePersonName(name) {
        // Check if empty
        if (!name || typeof name !== 'string') {
            return {
                isValid: false,
                error: 'Name is required',
                sanitized: ''
            };
        }

        const trimmed = name.trim();

        // Check minimum length
        if (trimmed.length < 1) {
            return {
                isValid: false,
                error: 'Name cannot be empty',
                sanitized: ''
            };
        }

        // Sanitize
        const sanitized = this.sanitizeInput(trimmed, 50);

        // Check if sanitization removed too much
        if (sanitized.length === 0) {
            return {
                isValid: false,
                error: 'Name contains invalid characters',
                sanitized: ''
            };
        }

        return {
            isValid: true,
            error: null,
            sanitized: sanitized
        };
    }

    /**
     * Validate map name
     * @param {string} name - Map name to validate
     * @returns {object} { isValid: boolean, error: string|null, sanitized: string }
     */
    static validateMapName(name) {
        // Check if empty
        if (!name || typeof name !== 'string') {
            return {
                isValid: false,
                error: 'Map name is required',
                sanitized: ''
            };
        }

        const trimmed = name.trim();

        // Check minimum length
        if (trimmed.length < 1) {
            return {
                isValid: false,
                error: 'Map name cannot be empty',
                sanitized: ''
            };
        }

        // Sanitize - allow more length for map names
        const sanitized = this.sanitizeInput(trimmed, 100);

        // Check if sanitization removed too much
        if (sanitized.length === 0) {
            return {
                isValid: false,
                error: 'Map name contains invalid characters',
                sanitized: ''
            };
        }

        return {
            isValid: true,
            error: null,
            sanitized: sanitized
        };
    }

    /**
     * Validate relationship object structure
     * @param {object} rel - Relationship object to validate
     * @returns {object} Validated and sanitized relationship
     */
    static validateRelationship(rel) {
        if (typeof rel !== 'object' || !rel) {
            return null;
        }

        // Validate and sanitize name
        const nameValidation = this.validatePersonName(rel.name);
        if (!nameValidation.isValid) {
            return null;
        }

        return {
            id: rel.id, // IDs are numeric/UUID, pass through
            name: nameValidation.sanitized
        };
    }

    /**
     * Validate trust scores object
     * @param {object} scores - Trust scores object
     * @returns {object} Validated scores
     */
    static validateTrustScores(scores) {
        if (typeof scores !== 'object' || !scores) {
            return {};
        }

        const validated = {};

        for (const [key, value] of Object.entries(scores)) {
            if (typeof value === 'object') {
                validated[key] = {
                    outward: this.validateTrustScore(value.outward),
                    inward: this.validateTrustScore(value.inward)
                };
            }
        }

        return validated;
    }

    /**
     * Validate entire map data structure
     * @param {object} mapData - Map data to validate
     * @returns {object} { isValid: boolean, data: sanitized data or null, errors: array }
     */
    static validateMapData(mapData) {
        const errors = [];

        if (typeof mapData !== 'object' || !mapData) {
            return {
                isValid: false,
                data: null,
                errors: ['Invalid map data structure']
            };
        }

        // Validate relationships array
        let relationships = [];
        if (Array.isArray(mapData.relationships)) {
            mapData.relationships.forEach((rel, index) => {
                const validated = this.validateRelationship(rel);
                if (validated) {
                    relationships.push(validated);
                } else {
                    errors.push(`Relationship ${index} is invalid`);
                }
            });
        }

        // Validate trust scores
        const trustScores = this.validateTrustScores(mapData.trustScores || {});

        // Check for reasonable data
        if (relationships.length === 0) {
            errors.push('No valid relationships found');
        }

        return {
            isValid: errors.length === 0,
            data: errors.length === 0 ? {
                relationships: relationships,
                trustScores: trustScores
            } : null,
            errors: errors
        };
    }

    /**
     * Sanitize JSON data from file import
     * Prevents injection attacks through JSON data
     * @param {object} jsonData - Parsed JSON data
     * @returns {object} Sanitized JSON data
     */
    static sanitizeImportedJSON(jsonData) {
        if (typeof jsonData !== 'object' || !jsonData) {
            return { relationships: [], trustScores: {} };
        }

        const sanitized = {
            relationships: [],
            trustScores: {}
        };

        // Sanitize relationships
        if (Array.isArray(jsonData.relationships)) {
            sanitized.relationships = jsonData.relationships
                .map(rel => {
                    if (typeof rel === 'object' && rel.name) {
                        return {
                            id: rel.id,
                            name: this.sanitizeInput(rel.name, 50)
                        };
                    }
                    return null;
                })
                .filter(rel => rel !== null);
        }

        // Sanitize trust scores
        if (typeof jsonData.trustScores === 'object') {
            for (const [key, value] of Object.entries(jsonData.trustScores)) {
                if (typeof value === 'object' && value.outward !== undefined && value.inward !== undefined) {
                    sanitized.trustScores[key] = {
                        outward: this.validateTrustScore(value.outward),
                        inward: this.validateTrustScore(value.inward)
                    };
                }
            }
        }

        return sanitized;
    }

    /**
     * Create safe text node for SVG display
     * SVG text content must be safe from XSS
     * @param {string} text - Text to display
     * @param {number} maxLength - Maximum length
     * @returns {string} Safe text for SVG display
     */
    static sanitizeForSVGDisplay(text, maxLength = 30) {
        if (typeof text !== 'string') {
            return '';
        }

        // Remove HTML tags
        let safe = text.replace(/<[^>]*>/g, '');

        // Limit length
        safe = safe.substring(0, maxLength);

        // Trim
        safe = safe.trim();

        return safe;
    }

    /**
     * Validate user input length to prevent DoS attacks
     * @param {string} input - Input to check
     * @param {number} maxLength - Maximum allowed length
     * @returns {boolean} True if input is within limits
     */
    static isWithinLength(input, maxLength = 100) {
        if (typeof input !== 'string') {
            return false;
        }
        return input.length <= maxLength;
    }

    /**
     * Check if a URL is safe (not a javascript: or data: URL)
     * @param {string} url - URL to validate
     * @returns {boolean} True if URL is safe
     */
    static isSafeURL(url) {
        if (typeof url !== 'string') {
            return false;
        }

        // Reject javascript: and data: URLs
        if (url.startsWith('javascript:') || url.startsWith('data:')) {
            return false;
        }

        // Reject protocol-relative URLs that could be exploited
        if (url.startsWith('//')) {
            return true; // Allow protocol-relative URLs from trusted sources
        }

        // Allow http, https, and relative URLs
        try {
            const urlObj = new URL(url, window.location.href);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            // If URL parsing fails, assume it's a relative URL
            return !url.includes('<') && !url.includes('>');
        }
    }
}

// Export for use in other modules
window.InputValidator = InputValidator;
