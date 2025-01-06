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
  getPaginatedUsers,
  edit,
  deleteUser,
} from "../controllers/user";
import checkAdmin from "../middleware/checkAdmin";

const userRouter = express.Router();

userRouter.get("/is-verified", checkToken, isVerified);
userRouter.get("/is-admin", checkToken, isAdmin);
userRouter.get("/change-my-password", checkToken, sendEmailChangePassword);
userRouter.put("/update-profile", checkToken, updateProfile);
userRouter.post("/get-one", checkToken, getOne);
userRouter.get("/paginated-users", checkToken, checkAdmin, getPaginatedUsers);
// userRouter.get("/paginated-users", getPaginatedUsers);
userRouter.post("/delete-admin", checkToken, checkAdmin, adminRemove);
userRouter.delete("/delete", remove);
userRouter.delete("/delete/:id", checkToken, checkAdmin, deleteUser);
userRouter.put("/edit/:id", checkToken, edit);

export default userRouter;
