/**
 * Toast Notification System for ProActive True Valence Mapper
 * Professional, accessible, and elegant notification management
 */

class ToastManager {
    constructor(options = {}) {
        this.toasts = [];
        this.container = null;
        this.config = {
            duration: options.duration || 3000,
            maxToasts: options.maxToasts || 5,
            position: options.position || 'top-right',
            gap: options.gap || 12
        };

        this.prefersReducedMotion = this.checkReducedMotion();
        this.init();
    }

    /**
     * Initialize toast container and accessibility features
     */
    init() {
        // Create main container
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'false');
        this.container.setAttribute('role', 'region');
        this.container.setAttribute('aria-label', 'Notifications');

        // Create announcement region for screen readers
        this.announcer = document.createElement('div');
        this.announcer.className = 'sr-only';
        this.announcer.setAttribute('aria-live', 'assertive');
        this.announcer.setAttribute('aria-atomic', 'true');

        document.body.appendChild(this.container);
        document.body.appendChild(this.announcer);

        // Listen for Escape key to dismiss toasts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.toasts.length > 0) {
                this.dismissLast();
            }
        });

        // Check for reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addListener((e) => {
            this.prefersReducedMotion = e.matches;
        });
    }

    /**
     * Check if user prefers reduced motion
     */
    checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} type - Type: 'success', 'error', 'info', 'warning'
     * @param {number} duration - How long to show (in ms), 0 = manual dismiss
     */
    show(message, type = 'info', duration = null) {
        const finalDuration = duration !== null ? duration : this.config.duration;

        // Check if we're at max capacity
        if (this.toasts.length >= this.config.maxToasts) {
            // Remove oldest toast
            const oldest = this.toasts.shift();
            this.removeToastElement(oldest.id);
        }

        // Create toast object
        const toast = {
            id: this.generateId(),
            message: message,
            type: type,
            duration: finalDuration,
            createdAt: Date.now(),
            timeoutId: null,
            element: null
        };

        this.toasts.push(toast);

        // Create and insert DOM element
        toast.element = this.createToastElement(toast);
        this.container.appendChild(toast.element);

        // Announce to screen readers
        this.announce(`${this.getTypeLabel(type)}: ${message}`);

        // Set auto-dismiss timer
        if (finalDuration > 0) {
            toast.timeoutId = setTimeout(() => {
                this.dismiss(toast.id);
            }, finalDuration);
        }

        return toast.id;
    }

    /**
     * Show success toast
     */
    success(message, duration = null) {
        return this.show(message, 'success', duration);
    }

    /**
     * Show error toast
     */
    error(message, duration = null) {
        return this.show(message, 'error', duration);
    }

    /**
     * Show info toast
     */
    info(message, duration = null) {
        return this.show(message, 'info', duration);
    }

    /**
     * Show warning toast
     */
    warning(message, duration = null) {
        return this.show(message, 'warning', duration);
    }

    /**
     * Create toast DOM element
     */
    createToastElement(toast) {
        const el = document.createElement('div');
        el.className = `toast toast-${toast.type}`;
        el.setAttribute('role', 'alert');
        el.setAttribute('data-toast-id', toast.id);

        const icon = this.getIcon(toast.type);
        const progressWidth = this.prefersReducedMotion ? '0%' : '100%';

        el.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon" aria-hidden="true">${icon}</span>
                <span class="toast-message">${this.escapeHtml(toast.message)}</span>
                <button
                    class="toast-close"
                    aria-label="Dismiss notification"
                    data-toast-id="${toast.id}">
                    <span aria-hidden="true">&#10005;</span>
                </button>
            </div>
            ${toast.duration > 0 ? `<div class="toast-progress" style="animation-duration: ${toast.duration}ms;"></div>` : ''}
        `;

        // Add dismiss button listener
        const closeBtn = el.querySelector('.toast-close');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.dismiss(toast.id);
        });

        // Pause progress on hover (if not reduced motion)
        if (toast.duration > 0 && !this.prefersReducedMotion) {
            el.addEventListener('mouseenter', () => {
                if (toast.timeoutId) {
                    clearTimeout(toast.timeoutId);
                    const progress = el.querySelector('.toast-progress');
                    if (progress) {
                        progress.style.animationPlayState = 'paused';
                    }
                }
            });

            el.addEventListener('mouseleave', () => {
                const elapsed = Date.now() - toast.createdAt;
                const remaining = toast.duration - elapsed;
                if (remaining > 0) {
                    toast.timeoutId = setTimeout(() => {
                        this.dismiss(toast.id);
                    }, remaining);
                    const progress = el.querySelector('.toast-progress');
                    if (progress) {
                        progress.style.animationPlayState = 'running';
                    }
                }
            });
        }

        // Fade in animation
        requestAnimationFrame(() => {
            el.classList.add('toast-show');
        });

        return el;
    }

    /**
     * Get icon for toast type
     */
    getIcon(type) {
        const icons = {
            success: '✓',
            error: '!',
            info: 'i',
            warning: '⚠'
        };
        return icons[type] || 'i';
    }

    /**
     * Get label for toast type (for screen readers)
     */
    getTypeLabel(type) {
        const labels = {
            success: 'Success',
            error: 'Error',
            info: 'Information',
            warning: 'Warning'
        };
        return labels[type] || 'Notification';
    }

    /**
     * Dismiss toast by ID
     */
    dismiss(id) {
        const toastIndex = this.toasts.findIndex(t => t.id === id);
        if (toastIndex === -1) return;

        const toast = this.toasts[toastIndex];

        // Clear timeout
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
        }

        // Remove element with animation
        this.removeToastElement(id);

        // Remove from array
        this.toasts.splice(toastIndex, 1);
    }

    /**
     * Dismiss the last (oldest visible) toast
     */
    dismissLast() {
        if (this.toasts.length > 0) {
            const lastToast = this.toasts[this.toasts.length - 1];
            this.dismiss(lastToast.id);
        }
    }

    /**
     * Remove toast element with animation
     */
    removeToastElement(id) {
        const el = this.container.querySelector(`[data-toast-id="${id}"]`);
        if (!el) return;

        el.classList.remove('toast-show');

        // Remove after animation completes
        const animationDuration = this.prefersReducedMotion ? 0 : 300;
        setTimeout(() => {
            if (el.parentNode === this.container) {
                this.container.removeChild(el);
            }
        }, animationDuration);
    }

    /**
     * Clear all toasts
     */
    clear() {
        const ids = this.toasts.map(t => t.id);
        ids.forEach(id => this.dismiss(id));
    }

    /**
     * Announce message to screen readers
     */
    announce(message) {
        this.announcer.textContent = message;
        // Reset for next announcement
        setTimeout(() => {
            this.announcer.textContent = '';
        }, 100);
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Get current toast count
     */
    getCount() {
        return this.toasts.length;
    }

    /**
     * Check if there are any active toasts
     */
    hasActive() {
        return this.toasts.length > 0;
    }
}

// Initialize global instance
let toastManager = null;

function initToastManager(options = {}) {
    if (!toastManager) {
        toastManager = new ToastManager(options);
    }
    return toastManager;
}

// Convenience functions
function showToast(message, type = 'info', duration = null) {
    if (!toastManager) {
        initToastManager();
    }
    return toastManager.show(message, type, duration);
}

function showSuccess(message, duration = null) {
    if (!toastManager) {
        initToastManager();
    }
    return toastManager.success(message, duration);
}

function showError(message, duration = null) {
    if (!toastManager) {
        initToastManager();
    }
    return toastManager.error(message, duration);
}

function showInfo(message, duration = null) {
    if (!toastManager) {
        initToastManager();
    }
    return toastManager.info(message, duration);
}

function showWarning(message, duration = null) {
    if (!toastManager) {
        initToastManager();
    }
    return toastManager.warning(message, duration);
}

function clearAllToasts() {
    if (toastManager) {
        toastManager.clear();
    }
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ToastManager, initToastManager, showToast, showSuccess, showError, showInfo, showWarning, clearAllToasts };
}
