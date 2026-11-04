import path from "node:path";
import { pool } from "../lib/db.ts";
import fs from "node:fs";
import { logger } from "../lib/logger.ts";

const MIGRATION_DIR = path.join(process.cwd(), "migrations");

const CREATE_MIGRATIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    executed_at TIMESTAMP NOT NULL DEFAULT NOW()
  )
`;

const runMigration = async (fileName: string): Promise<void> => {
  const sql = fs.readFileSync(path.join(MIGRATION_DIR, fileName), "utf-8");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("INSERT INTO migrations (name) values ($1)", [fileName]);
    await client.query("COMMIT");
    logger.info(`Migration completed: ${fileName}`);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const migrate = async (): Promise<void> => {
  await pool.query(CREATE_MIGRATIONS_TABLE);
  const executed = new Set(await getExecutedMigrations());
  const pending = getMigrationFiles().filter((file: string) => {
    return !executed.has(file);
  });

  if (pending.length === 0) {
    logger.info("No pending migration");
    return;
  }

  for (const fileName of pending) {
    await runMigration(fileName);
  }

  logger.info("All migrations completed");
};

type MigrationRow = {
  name: String;
};

const getExecutedMigrations = async (): Promise<string[]> => {
  const result = await pool.query<MigrationRow>(
    "SELECT name FROM migrations ORDER BY name",
  );
  return result.rows.map((row: MigrationRow) => row.name as string);
};

const getMigrationFiles = () => {
  return fs
    .readdirSync(MIGRATION_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
};

migrate()
  .catch((err) => {
    logger.error({ error: err }, "Migration failed");
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });
