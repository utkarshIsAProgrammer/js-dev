export type TaskStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};
