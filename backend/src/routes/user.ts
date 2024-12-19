import express from "express";
import checkToken from "../middleware/auth";
import {
  adminRemove,
  getOne,
  isAdmin,
  isVerified,
  remove,
  sendEmailChangePassword,
  updateProfile,
} from "../controllers/user";
import checkAdmin from "../middleware/checkAdmin";

const userRouter = express.Router();

userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);
userRouter.get("/change-my-password", checkToken, sendEmailChangePassword);
userRouter.put("/update-profile", checkToken, updateProfile);
userRouter.post("/get-one", checkToken, getOne);
userRouter.post("/delete-admin", checkToken, checkAdmin, adminRemove);
userRouter.delete("/delete", checkToken, remove);

export default userRouter;
