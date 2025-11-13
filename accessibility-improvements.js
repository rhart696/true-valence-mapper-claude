/**
 * Accessibility Improvements Module
 * WCAG 2.1 AA Compliant Enhancements for ProActive True Valence Mapper
 *
 * Features:
 * - Full keyboard navigation
 * - Screen reader support
 * - Focus management
 * - ARIA live regions
 * - Skip links
 */

class AccessibilityManager {
    constructor() {
        this.currentFocusIndex = -1;
        this.focusableElements = [];
        this.modalStack = [];
        this.lastFocusedElement = null;
        this.init();
    }

    /**
     * Initialize accessibility features
     */
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusTrap();
        this.setupScreenReaderAnnouncements();
        this.setupSkipLinks();
        this.enhanceModalAccessibility();
        this.setupArrowNavigation();
    }

    /**
     * Setup keyboard navigation for the entire application
     */
    setupKeyboardNavigation() {
        // Global keyboard event handler
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch(e.key) {
                case 'Escape':
                    this.handleEscape();
                    break;
                case '?':
                    if (!e.shiftKey) {
                        e.preventDefault();
                        this.openHelp();
                    }
                    break;
                case '/':
                    e.preventDefault();
                    this.focusSearchOrInput();
                    break;
            }
        });

        // Add Enter and Space support for all buttons and interactive elements
        this.enhanceButtonAccessibility();
    }

    /**
     * Enhance button accessibility with keyboard support
     */
    enhanceButtonAccessibility() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });

        // Add keyboard support for SVG elements (arrows)
        document.addEventListener('keydown', (e) => {
            const target = e.target;
            if (target.classList && target.classList.contains('arrow-path')) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    target.click();
                }
            }
        });
    }

    /**
     * Setup focus trap for modals
     */
    setupFocusTrap() {
        // This will be enhanced when modals open
        this.modalObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('modal') && node.classList.contains('show')) {
                        this.trapFocusInModal(node);
                    }
                });
            });
        });

        // Observe modal container
        this.modalObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /**
     * Trap focus within modal
     * @param {HTMLElement} modal - Modal element
     */
    trapFocusInModal(modal) {
        // Save the last focused element before modal
        this.lastFocusedElement = document.activeElement;
        this.modalStack.push(modal);

        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        // Focus first element
        setTimeout(() => firstFocusable.focus(), 100);

        // Create focus trap
        const trapFocus = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };

        modal.addEventListener('keydown', trapFocus);

        // Store trap handler for cleanup
        modal._focusTrapHandler = trapFocus;
    }

    /**
     * Release focus trap when modal closes
     * @param {HTMLElement} modal - Modal element
     */
    releaseFocusTrap(modal) {
        if (modal._focusTrapHandler) {
            modal.removeEventListener('keydown', modal._focusTrapHandler);
            delete modal._focusTrapHandler;
        }

        // Remove from stack
        const index = this.modalStack.indexOf(modal);
        if (index > -1) {
            this.modalStack.splice(index, 1);
        }

        // Return focus to last focused element
        if (this.modalStack.length === 0 && this.lastFocusedElement) {
            this.lastFocusedElement.focus();
            this.lastFocusedElement = null;
        }
    }

    /**
     * Handle Escape key press
     */
    handleEscape() {
        const openModals = document.querySelectorAll('.modal.show');
        if (openModals.length > 0) {
            const lastModal = openModals[openModals.length - 1];
            this.releaseFocusTrap(lastModal);

            // Close the modal
            if (lastModal.id === 'welcomeModal' && typeof closeWelcomeModal === 'function') {
                closeWelcomeModal();
            } else if (lastModal.id === 'helpModal' && typeof closeHelpModal === 'function') {
                closeHelpModal();
            } else if (lastModal.id === 'myMapsModal' && typeof closeMyMapsModal === 'function') {
                closeMyMapsModal();
            } else if (lastModal.id === 'shareModal' && typeof closeShareModal === 'function') {
                closeShareModal();
            }
        }
    }

    /**
     * Open help modal
     */
    openHelp() {
        if (typeof showHelpModal === 'function') {
            showHelpModal();
        }
    }

    /**
     * Focus the main input field
     */
    focusSearchOrInput() {
        const input = document.getElementById('personName');
        if (input) {
            input.focus();
        }
    }

    /**
     * Setup screen reader announcements
     */
    setupScreenReaderAnnouncements() {
        // Create ARIA live region for announcements
        if (!document.getElementById('aria-live-announcer')) {
            const announcer = document.createElement('div');
            announcer.id = 'aria-live-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(announcer);
        }

        // Create assertive announcer for critical updates
        if (!document.getElementById('aria-live-announcer-assertive')) {
            const announcer = document.createElement('div');
            announcer.id = 'aria-live-announcer-assertive';
            announcer.setAttribute('aria-live', 'assertive');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(announcer);
        }
    }

    /**
     * Announce message to screen readers
     * @param {string} message - Message to announce
     * @param {string} priority - 'polite' or 'assertive'
     */
    announce(message, priority = 'polite') {
        const announcerId = priority === 'assertive'
            ? 'aria-live-announcer-assertive'
            : 'aria-live-announcer';

        const announcer = document.getElementById(announcerId);
        if (announcer) {
            // Clear and set new message
            announcer.textContent = '';
            setTimeout(() => {
                announcer.textContent = message;
            }, 100);
        }
    }

    /**
     * Setup skip links for keyboard navigation
     */
    setupSkipLinks() {
        if (!document.getElementById('skip-links')) {
            const skipLinks = document.createElement('div');
            skipLinks.id = 'skip-links';
            skipLinks.className = 'skip-links';
            skipLinks.innerHTML = `
                <a href="#main-content" class="skip-link">Skip to main content</a>
                <a href="#controls" class="skip-link">Skip to controls</a>
                <a href="#visualization" class="skip-link">Skip to visualization</a>
            `;
            document.body.insertBefore(skipLinks, document.body.firstChild);

            // Handle skip link clicks
            skipLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('skip-link')) {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.setAttribute('tabindex', '-1');
                        target.focus();
                        target.addEventListener('blur', () => {
                            target.removeAttribute('tabindex');
                        }, { once: true });
                    }
                }
            });
        }
    }

    /**
     * Enhance modal accessibility
     */
    enhanceModalAccessibility() {
        // Add proper ARIA attributes to modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');

            // Find and label the modal
            const heading = modal.querySelector('h2, h3, h1');
            if (heading) {
                if (!heading.id) {
                    heading.id = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
                }
                modal.setAttribute('aria-labelledby', heading.id);
            }

            // Watch for modal show/hide
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (modal.classList.contains('show')) {
                            this.trapFocusInModal(modal);
                        } else {
                            this.releaseFocusTrap(modal);
                        }
                    }
                });
            });

            observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
        });
    }

    /**
     * Setup arrow key navigation for trust scores
     */
    setupArrowNavigation() {
        document.addEventListener('keydown', (e) => {
            const target = e.target;

            // Check if focused on an arrow path
            if (target.classList && target.classList.contains('arrow-path')) {
                const personId = target.getAttribute('data-person');
                const direction = target.getAttribute('data-direction');

                if (!personId || !direction) return;

                let handled = false;

                switch(e.key) {
                    case 'ArrowUp':
                    case 'ArrowRight':
                        // Increase trust score
                        e.preventDefault();
                        this.adjustTrustScore(personId, direction, 1);
                        handled = true;
                        break;
                    case 'ArrowDown':
                    case 'ArrowLeft':
                        // Decrease trust score
                        e.preventDefault();
                        this.adjustTrustScore(personId, direction, -1);
                        handled = true;
                        break;
                }

                if (handled) {
                    // Re-render and maintain focus
                    this.maintainFocusAfterRender(personId, direction);
                }
            }
        });
    }

    /**
     * Adjust trust score with keyboard
     * @param {string} personId - Person ID
     * @param {string} direction - 'inward' or 'outward'
     * @param {number} delta - Change amount (-1 or 1)
     */
    adjustTrustScore(personId, direction, delta) {
        if (typeof trustScores === 'undefined' || !trustScores[personId]) return;

        const currentScore = trustScores[personId][direction];
        let newScore = currentScore + delta;

        // Wrap around (0-3)
        if (newScore < 0) newScore = 3;
        if (newScore > 3) newScore = 0;

        trustScores[personId][direction] = newScore;

        // Announce the change
        const scoreNames = ['not scored', 'high trust', 'medium trust', 'low trust'];
        const directionName = direction === 'outward' ? 'your trust in them' : 'their trust in you';
        this.announce(`${directionName} changed to ${scoreNames[newScore]}`, 'polite');

        // Save and re-render
        if (typeof saveToLocalStorage === 'function') {
            saveToLocalStorage();
        }
        if (typeof renderVisualization === 'function') {
            renderVisualization();
        }
    }

    /**
     * Maintain focus after re-render
     * @param {string} personId - Person ID
     * @param {string} direction - Direction
     */
    maintainFocusAfterRender(personId, direction) {
        setTimeout(() => {
            const arrow = document.querySelector(
                `.arrow-path[data-person="${personId}"][data-direction="${direction}"]`
            );
            if (arrow) {
                arrow.focus();
            }
        }, 100);
    }

    /**
     * Make SVG elements keyboard accessible
     * @param {SVGElement} element - SVG element
     * @param {string} label - Accessible label
     */
    makeSVGAccessible(element, label) {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', label);
    }

    /**
     * Update node count announcement
     * @param {number} current - Current count
     * @param {number} max - Maximum count
     */
    announceNodeCount(current, max) {
        this.announce(`${current} of ${max} relationships added`, 'polite');
    }

    /**
     * Announce map action
     * @param {string} action - Action performed
     */
    announceMapAction(action) {
        const messages = {
            'saved': 'Map saved successfully',
            'loaded': 'Map loaded successfully',
            'cleared': 'All relationships cleared',
            'exported': 'Map exported to file',
            'imported': 'Map imported successfully',
            'person-added': 'Person added to map',
            'person-removed': 'Person removed from map'
        };

        const message = messages[action] || action;
        this.announce(message, 'assertive');
    }
}

// Initialize accessibility manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.a11yManager = new AccessibilityManager();
    });
} else {
    window.a11yManager = new AccessibilityManager();
}

// Export for global use
window.AccessibilityManager = AccessibilityManager;
