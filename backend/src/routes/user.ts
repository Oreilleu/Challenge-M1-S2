import express from "express";
import checkToken from "../middleware/auth";
import {
  adminRemove,
  getOne,
  isAdmin,
  isVerified,
  remove,
  updateProfile,
} from "../controllers/user";
import checkAdmin from "../middleware/checkAdmin";

const userRouter = express.Router();

userRouter.post("/get-one", checkToken, getOne);
userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);
userRouter.put("/update-profile", checkToken, updateProfile);
userRouter.delete("/delete", checkToken, remove);
userRouter.post("/delete-admin", checkToken, checkAdmin, adminRemove);

export default userRouter;
