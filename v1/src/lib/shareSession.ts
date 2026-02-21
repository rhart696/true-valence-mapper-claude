import { getSupabaseClient } from './supabase';
import type { SessionState } from '../types';

// 6-char alphanumeric, no confusable chars (0/O, 1/I, 5/S, 8/B)
const CODE_CHARS = 'ACDEFGHJKLMNPQRTUVWXYZ234679';

function generateShareCode(): string {
  return Array.from(
    { length: 6 },
    () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  ).join('');
}

export interface SaveResult {
  shareCode: string;
  shareUrl: string;
}

export async function saveSession(session: SessionState): Promise<SaveResult> {
  // Strip internal step state — the recipient always starts at 'map'
  const payload: SessionState = { ...session, currentStep: 'map' };

  const supabase = getSupabaseClient();

  // Retry once on the (extremely unlikely) duplicate share_code collision
  for (let attempt = 0; attempt < 3; attempt++) {
    const shareCode = generateShareCode();
    const { error } = await supabase
      .from('shared_sessions')
      .insert({ share_code: shareCode, session: payload });

    if (!error) {
      const shareUrl = buildShareUrl(shareCode);
      return { shareCode, shareUrl };
    }

    // Only retry on unique constraint violation (23505)
    if (!error.code || error.code !== '23505') {
      throw new Error(`Failed to save session: ${error.message}`);
    }
  }

  throw new Error('Could not generate a unique share code. Please try again.');
}

export async function loadSession(shareCode: string): Promise<SessionState | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('shared_sessions')
    .select('session')
    .eq('share_code', shareCode.toUpperCase().trim())
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return null;

  const s = data.session as SessionState;

  // Validate shape before accepting
  if (
    typeof s?.coacheeName !== 'string' ||
    !Array.isArray(s?.relationships)
  ) {
    return null;
  }

  return { ...s, currentStep: 'map' };
}

export function buildShareUrl(shareCode: string): string {
  if (typeof window === 'undefined') return `?share=${shareCode}`;
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('share', shareCode);
  return url.toString();
}
