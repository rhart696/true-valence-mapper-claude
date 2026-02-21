import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — only instantiated at call time, not at module evaluation.
// This prevents Next.js prerender from crashing when env vars aren't present
// at build time (Vercel injects them at runtime via NEXT_PUBLIC_*).
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase env vars not set. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  _client = createClient(url, key, {
    auth: {
      // No persistent session needed — share feature is stateless
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return _client;
}
