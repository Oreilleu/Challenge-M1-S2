import express from "express";
import {
  getOne,
  create,
  edit,
  remove,
  getPaginate,
  getByCategory,
} from "../controllers/product";
import multer from "multer";
import { storage } from "../middleware/storage";

const productRouter = express.Router();

const upload = multer({ storage });

productRouter.get("/get-one/:id", getOne);
productRouter.post("/get-by-category/:id", getByCategory);
productRouter.post("/get-paginate", getPaginate);
productRouter.post("/create", upload.array("images", 200), create);
productRouter.put("/edit/:id", upload.array("images", 200), edit);
productRouter.delete("/delete/:id", remove);

export default productRouter;
