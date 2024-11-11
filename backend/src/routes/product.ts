import express from "express";
import checkToken from "../middleware/auth";
import {
  getOne,
  create,
  edit,
  getAll,
  remove,
  getPaginate,
} from "../controllers/product";
import checkAdmin from "../middleware/checkAdmin";
import multer from "multer";
import { storage } from "../middleware/storage";

const productRouter = express.Router();

const upload = multer({ storage });

productRouter.get("/get-one/:id", checkToken, getOne);
productRouter.get("/get-all", checkToken, getAll);
productRouter.post("/get-paginate", checkToken, getPaginate);
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
productRouter.get("/get-filters", checkToken, getFilters);

export default productRouter;
