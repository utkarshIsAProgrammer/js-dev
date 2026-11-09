import { AppError } from "../errors/AppError.ts";
import {
  createTask,
  fetchTasksByUserId,
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

export const getUserTasks = async (userId: string): Promise<Task[]> => {
  return fetchTasksByUserId(userId);
};

export const getUserTask = getUserTasks;

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

export const updateUserTask = updateUserTaskById;
