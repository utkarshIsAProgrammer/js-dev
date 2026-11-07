import { Router } from "express";
import { healthRouter } from "./health.routes.ts";
import { authRouter } from "./auth.routes.ts";
import { userTaskRouter } from "./user.task.routes.ts";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", userTaskRouter);
