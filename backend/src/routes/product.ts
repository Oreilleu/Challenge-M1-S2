import express from "express";
import checkToken from "../middleware/auth";
import { addProduct } from "../controllers/product";
import checkAdmin from "../middleware/checkAdmin";

const productRouter = express.Router();

productRouter.post("/add", checkToken, checkAdmin, addProduct);

export default productRouter;
