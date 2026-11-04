import { env } from "../config/env.ts";
import { AppError } from "../errors/AppError.ts";
import { TokenPayload } from "../types/user.ts";
import jwt, { SignOptions } from "jsonwebtoken";

export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtAccessExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtAccessSecret, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.jwtAccessSecret) as TokenPayload;
  } catch (err) {
    throw new AppError(401, "Invalid or expired Access Token!");
  }
};
