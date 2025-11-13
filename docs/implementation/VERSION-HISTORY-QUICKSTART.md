# Version History Quick Start Guide

## What is Version History?

Version History allows you to save snapshots of your trust map at different points in time, compare changes, and restore previous versions - giving you confidence to experiment knowing you can always go back.

## Quick Access

Click the **"📜 Version History"** button in the main controls to open the Version History panel.

## Key Features

### 1. Automatic Versioning
Your map is automatically saved as a version every 5 minutes when you make changes. No action needed!

### 2. Manual Saves
Want to save an important milestone? Click **"Save Version"** and add an optional description like "Before team restructure" or "Quarterly review state".

### 3. Version Timeline
See all your versions in a timeline view with:
- Version number (v1, v2, v3...)
- Timestamp (e.g., "5 minutes ago", "2 days ago")
- Change summary (what changed)
- Manual save badge (if you saved it manually)
- Current badge (highlights the latest version)

### 4. Restore Any Version
Click **"Restore"** on any previous version to go back in time. Your current state is automatically saved before restoring, so nothing is lost!

### 5. Compare Versions
Click **"Compare"** to see exactly what changed between two versions:
- **Green boxes**: Relationships that were added
- **Red boxes**: Relationships that were removed
- **Yellow boxes**: Trust scores that were modified

### 6. Version Statistics
At the top of the Version History panel, see:
- Total number of versions
- Manual vs automatic saves
- Storage space used

## Common Use Cases

### Before Making Big Changes
```
1. Open Version History
2. Click "Save Version"
3. Enter: "Before removing old contacts"
4. Make your changes confidently
```

### After an Important Milestone
```
1. Complete your trust mapping session
2. Open Version History
3. Click "Save Version"
4. Enter: "End of Q4 review"
```

### Comparing Progress Over Time
```
1. Open Version History
2. Find an older version (e.g., v3)
3. Click "Compare"
4. Select current version (e.g., v8)
5. See all changes highlighted
```

### Undoing a Mistake
```
1. Made changes you want to undo?
2. Open Version History
3. Find the version before your changes
4. Click "Restore"
5. Confirm - you're back!
```

## Tips & Best Practices

### When to Manually Save
- Before coaching sessions
- After significant relationship changes
- Before exploring "what if" scenarios
- End of week/month/quarter reviews

### Naming Your Versions
Good descriptions help you find versions later:
- ✅ "Before adding team members"
- ✅ "Post-therapy session insights"
- ✅ "Annual review baseline"
- ❌ "test"
- ❌ "asdf"

### Managing Storage
- Version history keeps your last 10 versions
- Oldest versions automatically removed when you exceed 10
- Each version uses about 1-5 KB (very small!)
- You can manually delete old versions you don't need

### Backup Your History
Click **"Export History"** to download all versions as a JSON file. This creates a backup you can re-import later if needed.

## Keyboard Shortcuts

- **Escape**: Close Version History modal
- **Tab**: Navigate through version list
- **Enter**: Activate buttons

## Visual Guide

### Version Timeline View
```
Version History
┌──────────────────────────────────────┐
│ Statistics: 8 versions, 3 manual    │
├──────────────────────────────────────┤
│ ● v8 - Just now                      │ ← Current
│   Updated trust scores (6 rels)      │
│   [Compare]                          │
├──────────────────────────────────────┤
│ ● v7 - 10 minutes ago [Manual Save]  │
│   Before team meeting                │
│   [Restore] [Compare] [Delete]       │
├──────────────────────────────────────┤
│ ● v6 - 2 hours ago                   │
│   Added 1 relationship (total: 6)    │
│   [Restore] [Compare] [Delete]       │
└──────────────────────────────────────┘
```

### Comparison View
```
Compare Versions
┌────────────────────────────────────────────┐
│     v5              →           v7         │
│  2 days ago                  10 mins ago   │
│  5 relationships            6 relationships│
├────────────────────────────────────────────┤
│ Added Relationships (1)                    │
│ + Sarah (Coach)                    [Green] │
├────────────────────────────────────────────┤
│ Modified Trust Scores (2)                  │
│ Mom                            [Yellow]    │
│   Outward: 1 → 2 | Inward: 2 → 1          │
│                                            │
│ Best Friend Alex               [Yellow]    │
│   Outward: 1 → 1 | Inward: 2 → 1          │
└────────────────────────────────────────────┘
```

## Frequently Asked Questions

### Q: Are versions saved to the cloud?
**A:** No, versions are stored locally in your browser's localStorage. Use "Export History" to create backups.

### Q: What happens when I reach 10 versions?
**A:** The oldest version is automatically removed when you create the 11th version. Manual saves are treated the same as auto-saves for this limit.

### Q: Can I restore a deleted version?
**A:** No, deleted versions cannot be recovered. However, if you've exported your history, you can re-import it.

### Q: Do versions work across devices?
**A:** No, each browser/device has its own version history. Use Export/Import to transfer versions between devices.

### Q: How much storage do versions use?
**A:** Each version uses 1-5 KB depending on the number of relationships. 10 versions typically use 10-50 KB total - very minimal.

### Q: Will versions slow down my browser?
**A:** No, versions have negligible impact on performance. They're loaded only when you open the Version History panel.

## Troubleshooting

### Version History button not working
1. Refresh the page
2. Check browser console for errors
3. Clear browser cache if needed

### Versions not saving
1. Ensure localStorage is enabled in browser
2. Check available storage space
3. Try clearing old data from browser

### Can't see old versions
1. Check if you've cleared browser data recently
2. Versions are browser-specific - check correct device
3. Import backup if you exported history previously

## Support

For more detailed information, see:
- **VERSION-HISTORY-IMPLEMENTATION.md** - Technical documentation
- **test-version-history.html** - Test suite and examples
- **Main README.md** - General application documentation

---

**ProActive True Valence Mapper**
Version History System v1.0
© 2024 ProActive ReSolutions Inc.
