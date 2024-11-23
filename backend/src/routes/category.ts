import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category";
import multer from "multer";
import { storage } from "../middleware/storage";
import checkToken from "../middleware/auth";
import checkAdmin from "../middleware/checkAdmin";

const upload = multer({ storage });

const categoryRoute = () => {
  const router = Router();

  router.get("/", getCategories);

  router.get("/:id", getCategoryById);

  router.post(
    "/",
    upload.single("image"),
    checkToken,
    checkAdmin,
    createCategory
  );

  router.put(
    "/:id",
    upload.single("image"),
    checkToken,
    checkAdmin,
    updateCategory
  );

  router.delete("/:id", checkToken, checkAdmin, deleteCategory);

  return router;
};

export default categoryRoute;
