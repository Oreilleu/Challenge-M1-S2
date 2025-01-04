import express from "express";
import checkToken from "../middleware/auth";
import {
  getOne,
  isAdmin,
  isVerified,
  getPaginate,
  edit,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/get-one", checkToken, getOne);
userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);
userRouter.post("/get-paginate", checkToken, getPaginate);
userRouter.put("/edit/:id", checkToken, edit);

export default userRouter;
