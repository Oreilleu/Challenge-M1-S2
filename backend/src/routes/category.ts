import { Router } from "express";
import {
  createCategory,
  getCategories,
  getSubCategories,
  getMasterCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category";
import multer from "multer";
import { storage } from "../middleware/storage";

const upload = multer({ storage });

const categoryRoute = () => {
  const router = Router();

  router.get("/", getCategories);

  router.get("/sub-categories", getSubCategories);

  router.get("/master-categories", getMasterCategories);

  router.get("/:id", getCategoryById);

  router.post("/", upload.single("image"), createCategory);

  router.put("/:id", upload.single("image"), updateCategory);

  router.delete("/:id", deleteCategory);

  return router;
};

export default categoryRoute;
