# Supabase Setup Guide for Stage 2A

## Quick Setup Instructions

### 1. Create Supabase Account
1. Go to https://supabase.com
2. Sign up for free account
3. Create new project named "true-valence-mapper"

### 2. Get Your Credentials
Once project is created, go to Settings → API:
- **Project URL**: `https://YOUR_PROJECT_ID.supabase.co`
- **Anon/Public Key**: `eyJhbGc...` (long string)

### 3. Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase-schema.sql`
3. Run the SQL script

### 4. Update cloud-storage.js
Replace the placeholders in `cloud-storage.js`:
```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',      // Replace with your Project URL
    anonKey: 'YOUR_SUPABASE_ANON_KEY', // Replace with your Anon Key
    timeout: 10000
};
```

### 5. Add Supabase Client to index.html
Add this before your app scripts:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="cloud-storage.js"></script>
```

### 6. Configure CORS (if needed)
In Supabase Dashboard → Authentication → URL Configuration:
- Add your domain: `https://rhart696.github.io`
- Add localhost: `http://localhost:8080`

## Features Enabled

Once configured, users will have:
- ✅ Anonymous cloud storage (no login required)
- ✅ Device-based map ownership
- ✅ Shareable links (e.g., `#share/ABCD-EFGH-IJKL`)
- ✅ Automatic offline fallback
- ✅ 30-day retention for anonymous maps
- ✅ Cross-device access via share links

## Security Features

- Row Level Security (RLS) enabled
- Device ID validation
- No personal data collected
- Anonymous usage only
- Automatic cleanup of old maps

## Testing

1. **Test Save to Cloud**: Create a map and click "Save to Cloud"
2. **Test Share Link**: Copy share link and open in incognito
3. **Test Offline**: Disconnect internet and verify fallback
4. **Test Sync**: Reconnect and verify sync

## Troubleshooting

### "Failed to save to cloud"
- Check Supabase credentials in cloud-storage.js
- Verify CORS settings in Supabase
- Check browser console for errors

### "Cannot load shared map"
- Verify share code format (XXXX-XXXX-XXXX)
- Check if map still exists (30-day retention)
- Ensure you're online

### "Device ID mismatch"
- Maps are tied to device that created them
- Use share links to access from other devices
- Device ID stored in localStorage

## Next Steps

After Stage 2A is working:
- Stage 2B: Add user accounts (optional)
- Stage 3: Export to PNG, templates
- Stage 4: Advanced layouts
- Stage 5: AI insights