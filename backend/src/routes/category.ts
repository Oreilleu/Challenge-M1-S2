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

const upload = multer({ storage });

const categoryRoute = () => {
  const router = Router();

  router.get("/", getCategories);

  router.get("/:id", getCategoryById);

  router.post("/", upload.single("image"), createCategory);

  router.put("/:id", updateCategory);

  router.delete("/:id", deleteCategory);

  return router;
};

export default categoryRoute;
