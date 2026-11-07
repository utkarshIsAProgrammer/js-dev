import { AppError } from "../errors/AppError.ts";
import { createTask } from "../repositories/user.task.repository.ts";
import { Task } from "../types/task.ts";

const validateTitle = (title: unknown): string => {
  if (typeof title != "string" || !title.trim()) {
    throw new AppError(400, "Title is required!");
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle.length > 100) {
    throw new AppError(400, "Title should not be greater than 100 characters!");
  }

  return trimmedTitle;
};

export const createUserTask = async (
  userId: string,
  title: unknown,
): Promise<Task> => {
  const validTitle = validateTitle(title);
  return createTask(userId, validTitle);
};
