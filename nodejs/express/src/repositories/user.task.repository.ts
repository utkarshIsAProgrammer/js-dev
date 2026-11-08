import { pool } from "../lib/db.ts";
import { Task } from "../types/task.ts";

export const createTask = async (
  userId: string,
  title: string,
): Promise<Task> => {
  const result = await pool.query<Task>(
    `
    INSERT INTO support_tasks (title, user_id)
    VALUES($1, $2)
    RETURNING id, title, status, user_id, created_at, updated_at;
`,
    [title, userId],
  );

  return result.rows[0];
};

export const fetchTaskByUserId = async (userId: string): Promise<Task[]> => {
  const result = await pool.query<Task>(
    `
        SELECT id, title, status, user_id, created_at, updated_at
        FROM support_tasks
        WHERE user_id = $1
        ORDER BY created_at DESC;
`,
    [userId],
  );

  return result.rows;
};
