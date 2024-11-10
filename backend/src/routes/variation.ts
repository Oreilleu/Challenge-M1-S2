import express from "express";
import checkToken from "../middleware/auth";
import { getPaginate, getPaginateByFilters } from "../controllers/variation";

const variationRouter = express.Router();

variationRouter.post("/get-paginate", checkToken, getPaginate);
variationRouter.post(
  "/get-paginate-by-filters",
  checkToken,
  getPaginateByFilters
);

export default variationRouter;
