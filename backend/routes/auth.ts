import express, { RequestHandler } from "express";
import { checkToken } from "../middleware/auth";
import {
  checkIntegrityUser,
  register,
  sendVerificationEmail,
  verifyAccount,
  login,
} from "../controllers/auth";

// TODO : trouver le type de la fonction checkToken
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/verify-account", checkToken as RequestHandler, verifyAccount);
authRoutes.get(
  "/send-verification-email",
  checkToken as RequestHandler,
  sendVerificationEmail as RequestHandler
);
authRoutes.get(
  "/check-integrity-user",
  checkToken as RequestHandler,
  checkIntegrityUser as unknown as RequestHandler
);

export default authRoutes;
