import jwt, { JwtPayload } from "jsonwebtoken";
import { ExpiresIn } from "../models/expires-in.enum";

export const generateJsonWebToken = async (
  data: JwtPayload,
  expiresIn: ExpiresIn
) => {
  const KEY_JWT = process.env.JWT_SECRET_KEY || "";
  return jwt.sign(data, KEY_JWT, { expiresIn });
};

export const verifyJsonWebToken = async (token: string) => {
  const KEY_JWT = process.env.JWT_SECRET_KEY || "";
  return jwt.verify(token, KEY_JWT);
};
