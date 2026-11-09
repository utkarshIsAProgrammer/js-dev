import { AppError } from "../errors/AppError.ts";
import {
  createTask,
  deleteTask,
  fetchTaskByUserId,
  findTaskById,
  updateTaskTitle,
} from "../repositories/user.task.repository.ts";
import { Task } from "../types/task.ts";

const validateTitle = (title: unknown): string => {
  if (typeof title !== "string" || !title.trim()) {
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

export const getUserTask = async (userId: string): Promise<Task[]> => {
  return fetchTaskByUserId(userId);
};

export const getUserTaskById = async (
  taskId: string,
  userId: string,
): Promise<Task> => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError(404, "Task not found!");
  }

  return task;
};

export const updateUserTaskById = async (
  taskId: string,
  userId: string,
  title: unknown,
): Promise<Task> => {
  const validTitle = validateTitle(title);
  const task = await updateTaskTitle(taskId, userId, validTitle);
  if (!task) {
    throw new AppError(404, "Task not found!");
  }

  return task;
};

export const deleteUserTask = async (
  taskId: string,
  userId: string,
): Promise<void> => {
  const deleted = await deleteTask(taskId, userId);
  if (!deleted) {
    throw new AppError(404, "Task not found!");
  }
};
