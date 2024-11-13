import jwt, { JwtPayload } from "jsonwebtoken";
import { ExpiresIn } from "../types/expires-in.enum";

const invalidatedTokens: Array<{
  token: string;
  expiresAt: number;
}> = [];

export const generateJsonWebToken = async (
  data: JwtPayload,
  expiresIn: ExpiresIn
) => {
  const KEY_JWT = process.env.JWT_SECRET_KEY || "";
  return jwt.sign({ data }, KEY_JWT, { expiresIn });
};

export const verifyJsonWebToken = async (token: string) => {
  const KEY_JWT = process.env.JWT_SECRET_KEY || "";

  cleanExpiredTokens();

  if (invalidatedTokens.some((t) => t.token === token)) {
    throw new Error("Le token n'est plus valide.");
  }

  return jwt.verify(token, KEY_JWT);
};

export const killJsonWebToken = async (token: string) => {
  const decodedToken = jwt.decode(token) as JwtPayload;
  if (decodedToken && decodedToken.exp) {
    invalidatedTokens.push({
      token,
      expiresAt: decodedToken.exp * 1000,
    });
  }
};

const cleanExpiredTokens = () => {
  const now = Date.now();
  invalidatedTokens.filter((t) => t.expiresAt > now);
};
