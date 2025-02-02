import express from "express";
import checkToken from "../middleware/auth";
import {
  getOne,
  isAdmin,
  isVerified,
  remove,
  sendEmailChangePassword,
  updateProfile,
  getPaginatedUsers,
  deleteUser,
} from "../controllers/user";
import checkAdmin from "../middleware/checkAdmin";

const userRouter = express.Router();

userRouter.post("/get-one", checkToken, getOne);
userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);
userRouter.get("/change-my-password", checkToken, sendEmailChangePassword);
userRouter.put("/update-profile", checkToken, updateProfile);
userRouter.get("/paginated-users", checkToken, checkAdmin, getPaginatedUsers);
userRouter.delete("/delete", checkToken, remove);
userRouter.delete("/delete/:id", checkToken, checkAdmin, deleteUser);

export default userRouter;
