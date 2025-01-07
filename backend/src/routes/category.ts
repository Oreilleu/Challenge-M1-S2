import { Router } from "express";
import {
  createCategory,
  getCategories,
  getSubCategories,
  getMasterCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getPaginatedCategories,
} from "../controllers/category";
import multer from "multer";
import { storage } from "../middleware/storage";
import checkToken from "../middleware/auth";
import checkAdmin from "../middleware/checkAdmin";
import checkChildren from "../middleware/deleteCategoryParent";

const upload = multer({ storage });

const categoryRoute = () => {
  const router = Router();

  router.get("/", getCategories);

  router.get("/paginated-categories", checkToken, checkAdmin, getPaginatedCategories);

  router.get("/sub-categories", getSubCategories);

  router.get("/master-categories", getMasterCategories);

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

  router.delete("/:id", checkToken, checkAdmin, checkChildren, deleteCategory);

  return router;
};

export default categoryRoute;
