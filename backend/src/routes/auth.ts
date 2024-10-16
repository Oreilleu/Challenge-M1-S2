import express, { RequestHandler } from "express";
import checkToken from "../middleware/auth";
import {
  checkIntegrityUser,
  register,
  sendVerificationEmail,
  verifyAccount,
  login,
} from "../controllers/auth";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/verify-account", checkToken, verifyAccount);
authRoutes.get("/send-verification-email", checkToken, sendVerificationEmail);
authRoutes.get("/check-integrity-user", checkToken, checkIntegrityUser);

export default authRoutes;
