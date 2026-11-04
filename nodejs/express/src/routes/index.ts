import { Router } from "express";
import { healthRouter } from "./health.routes.ts";
import { authRouter } from "./auth.routes.ts";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
