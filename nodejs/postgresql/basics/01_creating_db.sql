-- delete datbase if already exists
-- never do in production
DROP DATABASE IF EXISTS postgre_one;

-- create new database
CREATE DATABASE postgre_one;

-- psql -U  postgres -d postgres -f nodejs/postgresql/01_creating_db.sql
-- psql -U postgres -d postgre_one
