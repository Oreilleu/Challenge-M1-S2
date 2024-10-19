import { Request } from "express";

export type User = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  civility: string;
  isVerified: boolean;
  isAdmin: boolean;
};

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export enum ExpiresIn {
  "24_HOUR" = "24h",
  "15_MIN" = "15m",
}
