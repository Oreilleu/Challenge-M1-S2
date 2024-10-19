import express from "express";
import checkToken from "../middleware/auth";
import {
  checkIntegrityUser,
  register,
  sendVerificationEmail,
  verifyAccount,
  login,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify-account", checkToken, verifyAccount);
authRouter.get("/send-verification-email", checkToken, sendVerificationEmail);
authRouter.get("/check-integrity-user", checkToken, checkIntegrityUser);

export default authRouter;
