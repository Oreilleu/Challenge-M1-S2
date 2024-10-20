import express from "express";
import checkToken from "../middleware/auth";
import { create, edit, getAll, remove } from "../controllers/product";
import checkAdmin from "../middleware/checkAdmin";
import { getOne } from "../controllers/user";

const productRouter = express.Router();

productRouter.post("/get-one", checkToken, checkAdmin, getOne);
productRouter.post("/get-all", checkToken, checkAdmin, getAll);
productRouter.post("/create", checkToken, checkAdmin, create);
productRouter.post("/edit", checkToken, checkAdmin, edit);
productRouter.post("/delete", checkToken, checkAdmin, remove);

export default productRouter;
