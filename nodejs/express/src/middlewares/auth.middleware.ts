import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.ts";
import { verifyAccessToken } from "../lib/jwt.ts";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "Access Token is required!"));
    return;
  }

  const token = authHeader.split(" ")[1];
  req.user = verifyAccessToken(token);

  next();
};
