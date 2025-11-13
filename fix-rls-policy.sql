-- Fix RLS Policy for ProActive True Valence Mapper
-- Run this after the main schema

-- Drop the existing policy
DROP POLICY IF EXISTS "Device can manage own maps" ON trust_maps;

-- Create a simpler policy that allows all operations for anonymous users
CREATE POLICY "Allow anonymous CRUD" ON trust_maps
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Also fix the share code generation to ensure it's exactly 12 chars with hyphens
CREATE OR REPLACE FUNCTION generate_share_code()
RETURNS VARCHAR(14) AS $$
DECLARE
    chars VARCHAR[] := ARRAY['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','2','3','4','5','6','7','8','9'];
    result VARCHAR(14) := '';
    i INTEGER;
    char_count INTEGER := 0;
BEGIN
    FOR i IN 1..12 LOOP
        result := result || chars[1 + floor(random() * array_length(chars, 1))];
        char_count := char_count + 1;
        IF char_count = 4 OR char_count = 8 THEN
            result := result || '-';
        END IF;
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Update the column to accept 14 characters (XXXX-XXXX-XXXX)
ALTER TABLE trust_maps ALTER COLUMN share_code TYPE VARCHAR(14);