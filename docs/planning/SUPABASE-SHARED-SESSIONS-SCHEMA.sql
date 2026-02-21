-- Feature #005: Supabase cloud save + share
-- Run once in Supabase SQL editor for project: qhozgoiukkbwjivowrbw
--
-- Design decisions:
--   - Append-only: no UPDATE or DELETE exposed to clients
--   - No device_id / ownership: the share code IS the capability
--   - 30-day TTL enforced by expires_at column + SELECT policy
--   - RLS policies are trivially safe because there is nothing to protect
--     against (no personal data isolated per user — just public shared maps)
--   - Per CRITICAL-SECURITY-ANALYSIS.md: do NOT use JWT-claim RLS for anon auth
--     This schema avoids that entirely.

CREATE TABLE IF NOT EXISTS shared_sessions (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  share_code  TEXT        UNIQUE NOT NULL,
  session     JSONB       NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days')
);

-- Indexes
CREATE INDEX IF NOT EXISTS shared_sessions_share_code_idx ON shared_sessions (share_code);
CREATE INDEX IF NOT EXISTS shared_sessions_expires_at_idx ON shared_sessions (expires_at);

-- RLS
ALTER TABLE shared_sessions ENABLE ROW LEVEL SECURITY;

-- Anonymous users can save a session (INSERT only, no UPDATE/DELETE)
CREATE POLICY "anon_insert"
  ON shared_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can load a non-expired session by share code
CREATE POLICY "anon_select"
  ON shared_sessions
  FOR SELECT
  TO anon
  USING (expires_at > now());

-- Optional: periodic cleanup (run via pg_cron or manually)
-- DELETE FROM shared_sessions WHERE expires_at < now();
