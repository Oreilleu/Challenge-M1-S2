import express from "express";
import {
  getOne,
  create,
  edit,
  remove,
  getPaginate,
} from "../controllers/product";
import multer from "multer";
import { storage } from "../middleware/storage";
import checkToken from "../middleware/auth";
import checkAdmin from "../middleware/checkAdmin";

const productRouter = express.Router();

const upload = multer({ storage });

productRouter.get("/get-one/:id", getOne);
productRouter.post("/get-paginate", getPaginate);
productRouter.post(
  "/create",
  checkToken,
  checkAdmin,
  upload.array("images", 200),
  create
);
productRouter.put(
  "/edit/:id",
  checkToken,
  checkAdmin,
  upload.array("images", 200),
  edit
);
productRouter.delete("/delete/:id", checkToken, checkAdmin, remove);

export default productRouter;
