import { MIN_PASSWORD_LENGTH, SALT } from "../constants/constants.ts";
import { AppError } from "../errors/AppError.ts";
import { signAccessToken } from "../lib/jwt.ts";
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
} from "../repositories/user.repository.ts";
import bcrypt from "bcryptjs";

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  if (!email || !password) {
    throw new AppError(400, "Email and Password are required!");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new AppError(
      400,
      `Password must be atleast ${MIN_PASSWORD_LENGTH} characters long!`,
    );
  }

  const normalizeEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizeEmail);
  if (existingUser) {
    throw new AppError(409, "Email already exists!");
  }

  const passwordHash = await bcrypt.hash(password, SALT);
  await createUser(normalizeEmail, passwordHash);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ accessToken: string }> => {
  if (!email || !password) {
    throw new AppError(400, "Email and Password are required!");
  }

  const normalizeEmail = email.toLowerCase().trim();
  const user = await findUserByEmailWithPassword(normalizeEmail);
  if (!user?.password_hash) {
    throw new AppError(401, "Invalid email or password!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password!");
  }

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
};
