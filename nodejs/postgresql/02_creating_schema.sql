-- prevent error if the schema is already created
CREATE SCHEMA IF NOT EXISTS basics;

-- create extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- select schema
SELECT schema_name

-- from read only system view defined by ANSI SQL
-- that contains metadata about all schemas
FROM information_schema.schemata

-- sort by schema name
ORDER BY schema_name;
