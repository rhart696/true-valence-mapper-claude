# Version History Implementation Guide

## Overview

The Version History system provides comprehensive versioning, comparison, and restoration capabilities for the ProActive True Valence Mapper application. Users can track changes, compare versions, and restore previous states with confidence.

## Architecture

### Core Components

1. **version-history.js** - Core version management module
2. **index.html** - UI components and integration
3. **localStorage** - Version persistence layer

### Key Features

- **Automatic Versioning**: Versions created automatically on significant changes
- **Manual Saves**: Users can create named versions at any time
- **Version Comparison**: Visual diff showing added/removed/modified relationships
- **Version Restoration**: One-click restore to any previous version
- **Storage Management**: Maximum 10 versions to prevent storage bloat
- **Timeline Visualization**: Visual timeline of all versions
- **Export/Import**: Export version history as JSON for backup

## File Structure

```
/home/ichardart/dev/projects/true-valence-mapper/
├── version-history.js              # Core version management system
├── index.html                      # Updated with version UI and integration
└── VERSION-HISTORY-IMPLEMENTATION.md  # This documentation
```

## API Reference

### VersionHistory Class

#### Constructor
```javascript
const versionHistory = new VersionHistory();
```

#### Methods

##### createVersion(mapData, changeSummary, isManual)
Creates a new version snapshot.

**Parameters:**
- `mapData` (Object): Map data with relationships and trustScores
- `changeSummary` (string): Optional description of changes
- `isManual` (boolean): Whether this is a manual save

**Returns:** Version object

**Example:**
```javascript
versionHistory.createVersion(
    { relationships, trustScores },
    'Added new team members',
    true
);
```

##### getAllVersions()
Returns array of all versions sorted by creation time.

**Returns:** Array of version objects

##### getVersion(versionNumber)
Retrieves a specific version by number.

**Parameters:**
- `versionNumber` (number): Version number to retrieve

**Returns:** Version object or null

##### restoreVersion(versionNumber)
Restores map data from a specific version.

**Parameters:**
- `versionNumber` (number): Version number to restore

**Returns:** Map data object or null

##### deleteVersion(versionNumber)
Deletes a specific version and renumbers remaining versions.

**Parameters:**
- `versionNumber` (number): Version number to delete

**Returns:** Boolean success status

##### compareVersions(version1Number, version2Number)
Compares two versions and returns differences.

**Parameters:**
- `version1Number` (number): First version to compare
- `version2Number` (number): Second version to compare

**Returns:** Comparison object with differences

**Example:**
```javascript
const diff = versionHistory.compareVersions(1, 3);
// Returns: {
//   version1: { number, timestamp, relationshipCount },
//   version2: { number, timestamp, relationshipCount },
//   differences: {
//     added: ['Name1', 'Name2'],
//     removed: ['Name3'],
//     modified: [{ name, v1: scores, v2: scores }]
//   }
// }
```

##### shouldAutoSave()
Checks if auto-save interval has elapsed.

**Returns:** Boolean

##### clearAllVersions()
Clears all version history.

##### exportVersionHistory()
Exports version history as JSON string.

**Returns:** JSON string

##### importVersionHistory(jsonString)
Imports version history from JSON.

**Parameters:**
- `jsonString` (string): JSON string to import

**Returns:** Boolean success status

##### getStatistics()
Returns statistics about version history.

**Returns:** Object with totalVersions, manualSaves, autoSaves, storageUsed

##### getStorageSize()
Calculates storage size in KB.

**Returns:** Number (KB)

#### Static Methods

##### formatTimestamp(isoTimestamp)
Formats ISO timestamp to human-readable string.

**Parameters:**
- `isoTimestamp` (string): ISO timestamp

**Returns:** Formatted string (e.g., "5 minutes ago", "2 days ago")

## Version Object Structure

```javascript
{
    versionNumber: 1,
    timestamp: "2024-11-12T14:30:00.000Z",
    changeSummary: "Added 2 relationship(s) (total: 5)",
    isManual: false,
    data: {
        relationships: [...],
        trustScores: {...}
    },
    metadata: {
        relationshipCount: 5,
        createdAt: "2024-11-12T14:30:00.000Z"
    }
}
```

## User Interface Components

### Version History Modal

**Access:** Click "Version History" button in main controls

**Features:**
- Statistics display (total versions, manual/auto saves, storage used)
- Version timeline with visual indicators
- Per-version actions (Restore, Compare, Delete)
- Manual save option with custom description
- Export/Clear all options

### Version Comparison Modal

**Access:** Click "Compare" on any version

**Features:**
- Side-by-side version comparison
- Visual diff of changes:
  - Green boxes: Added relationships
  - Red boxes: Removed relationships
  - Yellow boxes: Modified trust scores
- Dropdown selectors for version comparison
- Detailed trust score changes

## Integration Points

### Auto-Save Triggers

Version snapshots are automatically created when:

1. **Adding a person** - After 5 minutes since last save
2. **Importing JSON** - Before and after import
3. **Loading demo data** - After loading
4. **Clearing map** - Before clearing
5. **Manual save** - User clicks "Save Version"

### localStorage Keys

- `trustMapVersionHistory` - Array of version objects
- `trustValenceMap` - Current map data (existing key)

## Storage Management

### Limits

- **Maximum Versions**: 10
- **Auto-cleanup**: When 11th version created, oldest is removed
- **Version renumbering**: Automatic after deletion

### Storage Optimization

- Versions stored as complete snapshots (not diffs) for simplicity
- Input validation ensures clean data
- Graceful degradation if localStorage full

## Security & Validation

All version data passes through InputValidator:

- Person names sanitized (max 50 chars)
- Map names sanitized (max 100 chars)
- Trust scores validated (0-3 range)
- XSS protection via htmlEncode for display
- Invalid data rejected with clear error messages

## Testing Procedures

### Manual Testing

#### 1. Basic Versioning
```
1. Open application
2. Add 3 people
3. Open Version History
4. Verify version created
5. Check statistics display
```

#### 2. Manual Save
```
1. Click "Save Version"
2. Enter description "Test save"
3. Verify version appears with manual badge
4. Check description appears correctly
```

#### 3. Version Restoration
```
1. Create version with 2 people
2. Add 2 more people
3. Open Version History
4. Click Restore on earlier version
5. Verify map restored to 2 people
6. Verify new version created for current state
```

#### 4. Version Comparison
```
1. Create version with Person A
2. Add Person B
3. Change trust scores
4. Click Compare on any version
5. Verify differences display correctly
6. Check added/removed/modified sections
```

#### 5. Version Deletion
```
1. Create 3 versions
2. Delete middle version
3. Verify version numbers renumbered
4. Verify timeline updates
```

#### 6. Storage Limits
```
1. Create 10 versions
2. Create 11th version
3. Verify oldest version removed automatically
4. Check version numbers remain sequential
```

#### 7. Export/Import
```
1. Create several versions
2. Export version history
3. Clear all versions
4. Import exported file
5. Verify all versions restored
```

### Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### localStorage Availability

Version history gracefully handles:
- localStorage disabled
- Storage quota exceeded
- Private browsing mode

## Performance Considerations

### Memory Usage

- Each version: ~1-5 KB depending on relationship count
- 10 versions: ~10-50 KB total
- Negligible impact on application performance

### Optimization Strategies

1. **Lazy Loading**: Versions loaded only when modal opened
2. **Efficient Comparison**: O(n) comparison algorithm
3. **Debounced Auto-Save**: 5-minute intervals prevent excessive saves
4. **Selective Storage**: Only essential data stored

## Accessibility

### Keyboard Navigation

- Modal opens/closes with Escape
- All buttons keyboard accessible
- Tab navigation through version list
- Screen reader announcements

### ARIA Labels

- Version items: role="region"
- Buttons: descriptive aria-labels
- Live regions: aria-live="polite"
- Current version: visually and semantically marked

### Screen Reader Support

- Version creation announced
- Restoration announced
- Deletion announced
- Comparison results accessible

## Error Handling

### Common Errors

1. **Version Not Found**
   - User message: "Version not available"
   - Graceful fallback to latest version

2. **Storage Full**
   - Automatic cleanup of oldest version
   - User notified if persistent

3. **Invalid Version Data**
   - Validation errors logged
   - Sanitized data used when possible
   - Clear error messages to user

4. **Comparison Failure**
   - User message: "Cannot compare versions"
   - Modal remains open for retry

## Best Practices

### For Users

1. **Manual Saves**: Create manual saves before major changes
2. **Descriptions**: Add meaningful descriptions to manual saves
3. **Regular Cleanup**: Delete old unnecessary versions
4. **Export Regularly**: Export version history for backup

### For Developers

1. **Always Validate**: Use InputValidator for all data
2. **Check Existence**: Verify versionHistory exists before calling
3. **Handle Nulls**: Check return values for null
4. **Announce Changes**: Use a11yManager for screen readers
5. **Test Storage Limits**: Test behavior at 10+ versions

## Future Enhancements

### Planned Features

1. **Diff Storage**: Store diffs instead of full snapshots for efficiency
2. **Version Tags**: Allow users to tag important versions
3. **Search Versions**: Search by description or date
4. **Cloud Sync**: Sync version history to cloud storage
5. **Version Notes**: Add detailed notes to versions
6. **Undo/Redo**: Quick undo/redo using version stack

### Under Consideration

- Version branching for experimentation
- Collaborative version history
- Version analytics and insights
- Auto-merge for cloud conflicts

## Troubleshooting

### Version History Not Saving

**Symptoms:** Versions not appearing in history
**Solutions:**
1. Check browser console for errors
2. Verify localStorage enabled
3. Clear browser cache and reload
4. Check storage quota

### Comparison Not Working

**Symptoms:** Comparison shows no differences when there are changes
**Solutions:**
1. Verify both versions exist
2. Check version numbers are different
3. Refresh version list
4. Try different version pair

### Restore Fails

**Symptoms:** Version restore doesn't update map
**Solutions:**
1. Check version data integrity
2. Verify version number exists
3. Check console for validation errors
4. Try reloading application

## Support & Maintenance

### Logging

All errors logged to browser console:
- Version creation failures
- Storage errors
- Validation issues
- Comparison errors

### Monitoring

Monitor these metrics:
- Average versions per user
- Storage usage trends
- Restore success rate
- Comparison usage

### Updates

Version history system version: **1.0.0**

Last updated: 2024-11-12

## License & Credits

Part of ProActive True Valence Mapper
Copyright 2024 ProActive ReSolutions Inc.

---

For questions or issues, please check the main README.md or contact support.
