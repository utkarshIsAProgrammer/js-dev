import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import {
  createUserTask,
  getUserTasks,
  getUserTaskById,
  updateUserTaskById,
} from "../services/user.task.service.ts";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post("/", async (req, res, next) => {
  try {
    const task = await createUserTask(req.user!.userId, req.body.title);
    res.status(201).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (err) {
    next(err);
  }
});

userTaskRouter.get("/", async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user!.userId);
    res.status(200).json({
      success: true,
      data: { tasks },
    });
  } catch (err) {
    next(err);
  }
});

userTaskRouter.get("/:taskId", async (req, res, next) => {
  try {
    const task = await getUserTaskById(req.params.taskId, req.user!.userId);
    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (err) {
    next(err);
  }
});

userTaskRouter.patch("/:taskId", async (req, res, next) => {
  try {
    const task = await updateUserTaskById(
      req.params.taskId,
      req.user!.userId,
      req.body.title,
    );
    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (err) {
    next(err);
  }
});
