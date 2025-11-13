-- Verify the share_code column size
SELECT
    column_name,
    data_type,
    character_maximum_length
FROM
    information_schema.columns
WHERE
    table_name = 'trust_maps'
    AND column_name = 'share_code';