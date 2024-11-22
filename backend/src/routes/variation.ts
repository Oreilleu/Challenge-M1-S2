import express from "express";
import { getPaginate } from "../controllers/variation";

const variationRouter = express.Router();

variationRouter.post("/get-paginate", getPaginate);

export default variationRouter;
