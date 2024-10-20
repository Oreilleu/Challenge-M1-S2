import express from "express";
import checkToken from "../middleware/auth";
import { getOne, isAdmin, isVerified } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/get-one", checkToken, getOne);
userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);

export default userRouter;
