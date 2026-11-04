import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.ts";

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.user?.role != "ADMIN") {
    next(new AppError(403, "Admin access required!"));
    return;
  }

  next();
};
