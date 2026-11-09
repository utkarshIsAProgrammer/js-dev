import { pool } from "../lib/db.ts";
import { Task } from "../types/task.ts";

export const createTask = async (
  userId: string,
  title: string,
): Promise<Task> => {
  const result = await pool.query<Task>(
    `
    INSERT INTO
      support_tasks (title, user_id)
    VALUES
      ($1, $2)
    RETURNING
      id,
      title,
      status,
      user_id,
      created_at,
      updated_at;
`,
    [title, userId],
  );

  return result.rows[0];
};

export const fetchTasksByUserId = async (userId: string): Promise<Task[]> => {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      title,
      status,
      user_id,
      created_at,
      updated_at
    FROM
      support_tasks
    WHERE
      user_id = $1
    ORDER BY
      created_at DESC;
`,
    [userId],
  );

  return result.rows;
};

// Alias for backwards compatibility
export const fetchTaskByUserId = fetchTasksByUserId;

export const findTaskById = async (
  taskId: string,
  userId: string,
): Promise<Task | null> => {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      title,
      status,
      user_id,
      created_at,
      updated_at
    FROM
      support_tasks
    WHERE
      id = $1
      AND user_id = $2;
`,
    [taskId, userId],
  );

  return result.rows[0] ?? null;
};

export const updateTaskTitle = async (
  taskId: string,
  userId: string,
  title: string,
): Promise<Task | null> => {
  const result = await pool.query<Task>(
    `
    UPDATE support_tasks
    SET
      title = $1,
      updated_at = NOW()
    WHERE
      id = $2
      AND user_id = $3
    RETURNING
      id,
      title,
      status,
      user_id,
      created_at,
      updated_at;
`,
    [title, taskId, userId],
  );
  return result.rows[0] ?? null;
};
