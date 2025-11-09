-- Supabase Schema for ProActive True Valence Mapper
-- Stage 2A: Anonymous Cloud Storage

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trust maps table
CREATE TABLE trust_maps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID NOT NULL,
    map_name VARCHAR(255) NOT NULL DEFAULT 'Untitled Map',
    relationships JSONB NOT NULL DEFAULT '[]'::jsonb,
    trust_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    share_code VARCHAR(12) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    accessed_at TIMESTAMPTZ DEFAULT NOW(),
    version VARCHAR(10) DEFAULT '1.0',
    is_demo BOOLEAN DEFAULT FALSE
);

-- Index for faster lookups
CREATE INDEX idx_device_id ON trust_maps(device_id);
CREATE INDEX idx_share_code ON trust_maps(share_code);
CREATE INDEX idx_created_at ON trust_maps(created_at DESC);

-- Function to generate unique share codes
CREATE OR REPLACE FUNCTION generate_share_code()
RETURNS VARCHAR(12) AS $$
DECLARE
    chars VARCHAR[] := ARRAY['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','2','3','4','5','6','7','8','9'];
    result VARCHAR(12) := '';
    i INTEGER;
BEGIN
    FOR i IN 1..12 LOOP
        result := result || chars[1 + floor(random() * array_length(chars, 1))];
        IF i % 4 = 0 AND i < 12 THEN
            result := result || '-';
        END IF;
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate share codes
CREATE OR REPLACE FUNCTION set_share_code()
RETURNS TRIGGER AS $$
DECLARE
    new_code VARCHAR(12);
    code_exists BOOLEAN;
BEGIN
    LOOP
        new_code := generate_share_code();
        SELECT EXISTS(SELECT 1 FROM trust_maps WHERE share_code = new_code) INTO code_exists;
        EXIT WHEN NOT code_exists;
    END LOOP;
    NEW.share_code := new_code;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_trust_maps
BEFORE INSERT ON trust_maps
FOR EACH ROW
EXECUTE FUNCTION set_share_code();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trust_maps_updated_at
BEFORE UPDATE ON trust_maps
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS)
ALTER TABLE trust_maps ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read maps by share code
CREATE POLICY "Maps are viewable by share code" ON trust_maps
    FOR SELECT USING (true);

-- Policy: Device can manage its own maps
CREATE POLICY "Device can manage own maps" ON trust_maps
    FOR ALL USING (
        device_id::text = current_setting('request.headers')::json->>'x-device-id'
    );

-- Cleanup function for old anonymous maps (30 days)
CREATE OR REPLACE FUNCTION cleanup_old_maps()
RETURNS void AS $$
BEGIN
    DELETE FROM trust_maps
    WHERE accessed_at < NOW() - INTERVAL '30 days'
    AND device_id IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE trust_maps IS 'Stores trust valence maps with anonymous device-based ownership';
COMMENT ON COLUMN trust_maps.share_code IS 'Unique code for sharing maps (format: XXXX-XXXX-XXXX)';
COMMENT ON COLUMN trust_maps.device_id IS 'Anonymous device identifier stored in browser localStorage';
COMMENT ON COLUMN trust_maps.relationships IS 'JSON array of relationship objects with id and name';
COMMENT ON COLUMN trust_maps.trust_scores IS 'JSON object mapping person IDs to trust scores';