import path from "node:path";
import { pool } from "../lib/db.ts";

const MIGRATION_DIR = path.join(process.cwd(), "migrations");

const CREATE_MIGRATIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    executed_at TIMESTAMP NOT NULL DEFAULT NOW()
  )
`;

// TODO: creating migration
export const migrate = async (): Promise<void> => {
  await pool.query(CREATE_MIGRATIONS_TABLE);
};
