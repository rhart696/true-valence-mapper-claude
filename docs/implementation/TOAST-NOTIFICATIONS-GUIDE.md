# Toast Notification System - Implementation Guide

## Overview

The True Valence Mapper now includes a professional, accessible toast notification system that replaces all alert dialogs with elegant, stacked notifications. The system provides visual feedback for user actions while respecting accessibility standards.

## Files Created

1. **toast-notifications.js** (11 KB)
   - Main toast manager class with full queue management
   - Auto-dismiss functionality with configurable timers
   - Keyboard navigation (Escape key to dismiss)
   - Screen reader announcements (ARIA live regions)

2. **toast-notifications.css** (5.6 KB)
   - Professional styling matching the app's design
   - Support for reduced motion preferences
   - High contrast mode support
   - Dark mode support
   - Responsive design for mobile

## Features

### Toast Types

- **Success** (Green) - Positive actions completed
- **Error** (Red) - Problems or validation errors
- **Info** (Blue) - General information
- **Warning** (Orange) - Cautions and warnings

### Core Features

✓ Stack multiple toasts vertically (top-right position)
✓ Auto-dismiss after 3 seconds (configurable)
✓ Progress bar showing time remaining
✓ Manual dismiss with X button or Escape key
✓ Queue management (max 5 visible toasts)
✓ Pause progress on hover
✓ ARIA live regions for screen readers
✓ Keyboard navigation support (Tab, Escape)
✓ Respects prefers-reduced-motion
✓ High contrast mode support
✓ Professional animations and transitions

## Usage

### Initialization

The toast manager is automatically initialized on page load:

```javascript
// In index.html DOMContentLoaded event
toastMgr = initToastManager({ duration: 3000 });
```

### Quick Functions

Use these convenient global functions throughout your app:

```javascript
// Success notification
showSuccess('Map saved to browser storage');

// Error notification
showError('Invalid person name');

// Info notification
showInfo('Demo loaded! Check the patterns.');

// Warning notification
showWarning('No saved map found');

// Custom toast with type
showToast('Custom message', 'info', 5000); // 5 second duration

// Clear all toasts
clearAllToasts();
```

### Advanced Usage

For more control, use the ToastManager class directly:

```javascript
// Get the global instance
const toast = toastManager;

// Show toast with custom duration (0 = manual dismiss only)
const toastId = toast.show('Message', 'success', 0);

// Dismiss a specific toast
toast.dismiss(toastId);

// Check if there are active toasts
if (toast.hasActive()) {
    console.log('Toast count:', toast.getCount());
}

// Clear all
toast.clear();
```

### Configuration Options

When initializing, you can customize:

```javascript
const toastMgr = initToastManager({
    duration: 3000,      // Default duration in ms
    maxToasts: 5,        // Maximum visible toasts
    position: 'top-right', // Position on screen
    gap: 12              // Space between toasts in px
});
```

## Integration Points

### Replaced in Cloud Storage (cloud-storage.js)

All `CloudStorage.showStatus()` calls replaced with:
- `showSuccess()` - for successful operations
- `showError()` - for errors
- `showWarning()` - for offline/warning states

### Replaced in Main App (index.html)

- `alert('Map saved...')` → `showSuccess('Map saved...')`
- `alert('Error...')` → `showError('Error...')`
- `alert('Info...')` → `showInfo('Info...')`
- `alert('Warning...')` → `showWarning('Warning...')`

### Functions Updated

- `saveMap()` - Shows success/warning toasts
- `loadMap()` - Shows success/warning toasts
- `addPerson()` - Shows error toasts for validation
- `saveToCloud()` - Shows error toasts
- `copyShareLink()` - Shows success toast
- `importJSON()` - Shows success/error toasts
- `loadDemoData()` - Shows info toast
- `shareMap()` - Shows error toast

## Accessibility Features

### Screen Reader Support

- ARIA live regions announce notifications
- Toast type is announced (Success, Error, etc.)
- Keyboard dismissible via Escape key
- Focus management for close buttons

### Visual Accessibility

- High contrast support (respects `prefers-contrast: high`)
- Reduced motion support (respects `prefers-reduced-motion: reduce`)
- Dark mode support (respects `prefers-color-scheme: dark`)
- Minimum touch target size (28px close button)
- Clear visual distinction between types

### Keyboard Navigation

- Tab: Navigate between close buttons
- Escape: Dismiss the most recent toast
- Enter/Space: Activate close button

## Styling Details

### Color Scheme

| Type | Color | Hex |
|------|-------|-----|
| Success | Green | #4CAF50 |
| Error | Red | #f44336 |
| Info | Blue | #2196F3 |
| Warning | Orange | #ff9800 |

### Container Positioning

- Position: Fixed (top-right)
- Top: 20px from viewport edge
- Right: 20px from viewport edge
- Z-index: 9999 (above modals at 1000)

### Animations

- Slide in from right: 300ms (cubic-bezier)
- Fade out on dismiss: 300ms
- Progress bar: Linear animation
- Respects prefers-reduced-motion (uses 100ms instead)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minimal DOM operations (only add/remove when needed)
- CSS animations (GPU accelerated)
- Automatic cleanup of old toasts
- Memory efficient queue management

## Troubleshooting

### Toast not appearing

1. Ensure `toast-notifications.js` is loaded before other scripts
2. Verify CSS file is linked in `<head>`
3. Check browser console for errors

### Custom CSS not applying

- Toast container has high z-index (9999)
- Use `!important` if needed to override

### Animations too fast/slow

Edit the duration in `toast-notifications.css`:
```css
.toast {
    transition: all 300ms cubic-bezier(0.23, 1, 0.320, 1);
}
```

### Multiple toasts overlapping

The system automatically stacks with 12px gap. If needed, adjust:
```javascript
initToastManager({ gap: 20 });
```

## Future Enhancements

Possible improvements for future versions:

- Position variants (top-left, bottom-right, etc.)
- Action buttons on toasts
- Custom icons/emojis per toast
- Swipe-to-dismiss on mobile
- Toast groups/categories
- Persist toasts to localStorage
- Analytics integration
- Sound notifications option

## Migration Notes

### Old Code (Replaced)

```javascript
// Old cloud storage status
cloudStorage.showStatus('Message', 'success');

// Old alerts
alert('This is a success message');
```

### New Code

```javascript
// New toast notifications
showSuccess('Message');
showError('Message');
showInfo('Message');
showWarning('Message');
```

## Testing

To verify the system is working:

1. Open browser console
2. Run: `showSuccess('Test notification')`
3. Should see green toast appear top-right
4. Press Escape to dismiss
5. Test other types: `showError()`, `showInfo()`, `showWarning()`

## Support

For issues or questions about the toast system:

1. Check browser console for errors
2. Review accessibility settings
3. Test in incognito/private mode
4. Check for CSS conflicts with other stylesheets
