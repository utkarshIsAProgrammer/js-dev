import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.ts";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
};
