import type { SessionState } from '../types';
import { SESSION_STORAGE_KEY } from '../types';

const SCORES = new Set(['high', 'medium', 'low', 'unscored']);
const STEPS = new Set(['landing', 'map', 'complete']);
const MAX_BYTES = 150_000;

export interface StorageResult {
  session: SessionState | null;
  error: string | null;
}

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function bounded(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.length <= max;
}

/** Validate every relationship; preserve existing categories and optional notes. */
export function parseStoredSession(raw: string): SessionState | null {
  if (raw.length > MAX_BYTES) return null;
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return null; }
  if (object(value) && 'schemaVersion' in value) {
    if (value.schemaVersion !== 1) return null;
    value = value.session;
  }
  if (!object(value) || !bounded(value.coacheeName, 50) || typeof value.currentStep !== 'string' || !STEPS.has(value.currentStep) ||
      !Array.isArray(value.relationships) || value.relationships.length > 25) return null;
  const ids = new Set<string>();
  const relationships: SessionState['relationships'] = [];
  for (const row of value.relationships) {
    if (!object(row) || !bounded(row.id, 128) || !row.id || ids.has(row.id) ||
        !bounded(row.name, 50) || !row.name.trim() ||
        typeof row.outbound !== 'string' || !SCORES.has(row.outbound) ||
        typeof row.inbound !== 'string' || !SCORES.has(row.inbound) ||
        (row.note !== undefined && !bounded(row.note, 4000))) return null;
    ids.add(row.id);
    relationships.push({ id: row.id, name: row.name,
      outbound: row.outbound as SessionState['relationships'][number]['outbound'],
      inbound: row.inbound as SessionState['relationships'][number]['inbound'],
      ...(row.note === undefined ? {} : { note: row.note as string }) });
  }
  return { coacheeName: value.coacheeName, relationships,
    currentStep: value.currentStep as SessionState['currentStep'] };
}

export function readStoredSession(storage: Pick<Storage, 'getItem'>): StorageResult {
  try {
    const raw = storage.getItem(SESSION_STORAGE_KEY);
    if (raw === null) return { session: null, error: null };
    const session = parseStoredSession(raw);
    return { session, error: session ? null : 'The saved map could not be read. It has been kept on this device. Starting fresh will remove it.' };
  } catch {
    return { session: null, error: 'Saved maps are unavailable in this browser. Keep an export before closing this page.' };
  }
}

export function writeStoredSession(storage: Pick<Storage, 'setItem' | 'removeItem'>, session: SessionState): string | null {
  try {
    if (!session.coacheeName && session.relationships.length === 0) storage.removeItem(SESSION_STORAGE_KEY);
    else {
      if (!parseStoredSession(JSON.stringify(session))) return 'This map could not be saved. Keep an export before closing this page.';
      storage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ schemaVersion: 1, session }));
    }
    return null;
  } catch {
    return 'Changes could not be saved on this device. Keep an export before closing this page.';
  }
}
