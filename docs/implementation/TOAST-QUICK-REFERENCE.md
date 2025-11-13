# Toast Notifications - Quick Reference

## Basic Usage

```javascript
// Success (green, auto-dismiss in 3s)
showSuccess('Operation completed');

// Error (red, auto-dismiss in 3s)
showError('Something went wrong');

// Info (blue, auto-dismiss in 3s)
showInfo('Here is some information');

// Warning (orange, auto-dismiss in 3s)
showWarning('Please be careful');

// Custom duration (0 = manual dismiss only)
showToast('Message', 'info', 5000);  // 5 seconds
showToast('Message', 'error', 0);    // Manual dismiss
```

## Advanced API

```javascript
// Get instance
const toast = toastManager;

// Show with full control
const id = toast.show('Message', 'type', duration);

// Dismiss specific toast
toast.dismiss(id);

// Dismiss last toast (Escape key does this)
toast.dismissLast();

// Clear all toasts
toast.clear();

// Get info
toast.getCount();      // Number of active toasts
toast.hasActive();     // Boolean check
```

## Features at a Glance

| Feature | Details |
|---------|---------|
| Position | Top-right corner |
| Duration | 3 seconds (configurable) |
| Max Visible | 5 toasts (auto-queue) |
| Dismiss | Click X, press Escape, or auto-timeout |
| Pause | Hover to pause timer |
| Animations | Smooth slide-in/out |
| Motion | Respects reduced-motion |
| Contrast | Supports high-contrast mode |
| Dark Mode | Automatic support |
| Keyboard | Full keyboard navigation |
| Screen Reader | ARIA announcements |

## Types

```
✓ Success  → Green (#4CAF50)
✗ Error    → Red (#f44336)
ℹ Info     → Blue (#2196F3)
⚠ Warning  → Orange (#ff9800)
```

## Real-World Examples

### Map Operations
```javascript
// Saving
showSuccess('Map saved to browser storage');
showError('Cloud save failed - saving locally');

// Loading
showSuccess('Map loaded successfully');
showWarning('No saved map found');
showInfo('Loaded shared map: My Relationships');
```

### Validation
```javascript
// Form validation
showError('Maximum 8 relationships allowed');
showError('This person already exists');
showError('Invalid file format');
```

### Cloud Features
```javascript
// Cloud operations
showSuccess('Map saved to cloud!');
showSuccess('Link copied to clipboard!');
showError('Cannot delete while offline');
showWarning('Offline - Changes saved locally');
showSuccess('Back online - Cloud sync available');
```

## Initialization

Automatic in `index.html`:
```javascript
// Happens on page load
toastMgr = initToastManager({ duration: 3000 });
```

Custom init if needed:
```javascript
const custom = initToastManager({
    duration: 4000,      // Longer timeout
    maxToasts: 3,        // Fewer visible
    position: 'top-right',
    gap: 20              // More spacing
});
```

## File Locations

- **JavaScript**: `/toast-notifications.js` (11 KB)
- **Styles**: `/toast-notifications.css` (5.6 KB)
- **Guide**: `/TOAST-NOTIFICATIONS-GUIDE.md`

## Integration Points (Already Updated)

✓ Cloud storage notifications
✓ Map save/load feedback
✓ User input validation
✓ File import/export
✓ Demo data loading
✓ Share link feedback
✓ Connection status

## Design Specifications

### Visual
- Border-radius: 8px
- Box shadow: 0 4px 16px rgba(0, 0, 0, 0.12)
- Min width: 300px
- Max width: 400px
- Mobile: 90vw max-width

### Animations
- Slide in: 300ms cubic-bezier(0.23, 1, 0.32, 1)
- Slide out: 300ms (reverse)
- Progress bar: Linear animation (duration-based)
- Reduced motion: 100ms transitions only

### Accessibility
- ARIA live regions
- ARIA alerts
- Keyboard Tab/Escape
- Focus visible outlines
- High contrast borders
- Color + icon differentiation

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate close buttons |
| Escape | Dismiss most recent toast |
| Enter/Space | Activate close button |

## Common Patterns

### Import/Export
```javascript
try {
    // ... import logic
    showSuccess('Map imported successfully!');
} catch (error) {
    showError('Error reading file');
}
```

### Async Operations
```javascript
try {
    const result = await cloudStorage.saveToCloud(data);
    // showSuccess already called by cloud-storage.js
} catch (error) {
    // showError already called by cloud-storage.js
}
```

### Validation
```javascript
const validation = InputValidator.validatePersonName(name);
if (!validation.isValid) {
    showError(validation.error);
    return;
}
```

## Styling Override (if needed)

```css
/* Override default duration */
.toast-progress {
    animation-duration: 5000ms !important;
}

/* Change position */
.toast-container {
    bottom: 20px;
    right: 20px;
    top: auto;
}
```

## Browser DevTools Tips

### Test in Console
```javascript
// Rapid testing
showSuccess('Success!');
showError('Error!');
showInfo('Info!');
showWarning('Warning!');

// Check state
toastManager.getCount()
toastManager.hasActive()

// Clear all
clearAllToasts()
```

### Inspect Elements
- Container: `.toast-container`
- Individual: `.toast`
- Types: `.toast-success`, `.toast-error`, `.toast-info`, `.toast-warning`
- Icon: `.toast-icon`
- Close button: `.toast-close`
- Progress: `.toast-progress`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Not showing | Check JS loaded before other scripts |
| Wrong colors | Verify CSS is linked in `<head>` |
| Missing animations | Check browser supports CSS animations |
| Accessibility issues | Use keyboard instead of mouse |
| Layout issues on mobile | Browser might be narrow, check CSS |

## Performance Notes

- Minimal repaints (CSS animations)
- Auto-cleanup of old toasts
- Memory efficient (max 5 visible)
- GPU-accelerated transforms
- No memory leaks

## Version Info

- Created: November 2024
- Version: 1.0
- Status: Production Ready
- Tested: Chrome, Firefox, Safari, Mobile
- Accessible: WCAG 2.1 AA compliant
