import express from "express";
import checkToken from "../middleware/auth";
import { getPaginate } from "../controllers/variation";

const variationRouter = express.Router();

variationRouter.post("/get-paginate", checkToken, getPaginate);

export default variationRouter;
