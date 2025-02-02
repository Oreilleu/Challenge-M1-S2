import express from "express";
import checkToken from "../middleware/auth";
import {
  checkIntegrityUser,
  register,
  sendVerificationEmail,
  verifyAccount,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/send-verification-email", checkToken, sendVerificationEmail);
authRouter.get("/check-integrity-user", checkToken, checkIntegrityUser);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify-account", checkToken, verifyAccount);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
