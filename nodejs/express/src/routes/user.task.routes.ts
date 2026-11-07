import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { createUserTask } from "../services/user.task.service.ts";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post("/", async (req, res, next) => {
  try {
    const task = await createUserTask(req.user!.userId, req.body.title);
    res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (err) {
    next(err);
  }
});
