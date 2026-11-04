import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.service.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);
    res.status(201).json({
      success: true,
      message: "Registered successfully, Please login to continue!",
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken } = await loginUser(email, password);
    res.status(200).json({
      success: true,
      data: accessToken,
    });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});
