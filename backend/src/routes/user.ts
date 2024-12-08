import express from "express";
import checkToken from "../middleware/auth";
import {
  getOne,
  isAdmin,
  isVerified,
  getPaginate,
  edit,
  remove,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/get-one", checkToken, getOne);
userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);
userRouter.post("/get-paginate", checkToken, getPaginate);
userRouter.put("/edit/:id", checkToken, edit);
userRouter.delete("/remove/:id", checkToken, remove);

export default userRouter;
