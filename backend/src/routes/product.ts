import express from "express";
import checkToken from "../middleware/auth";
import { create, edit, getAll, remove } from "../controllers/product";
import checkAdmin from "../middleware/checkAdmin";
import { getOne } from "../controllers/user";
import multer from "multer";
import { storage } from "../middleware/storage";

const productRouter = express.Router();

const upload = multer({ storage });

productRouter.get("/get-one", checkToken, getOne);
productRouter.get("/get-all", checkToken, getAll);
productRouter.post(
  "/create",
  checkToken,
  checkAdmin,
  upload.array("images", 200),
  create
);
productRouter.put("/edit", checkToken, checkAdmin, edit);
productRouter.delete("/delete", checkToken, checkAdmin, remove);

export default productRouter;
