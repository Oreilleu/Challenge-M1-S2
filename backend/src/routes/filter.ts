import express from "express";
import checkToken from "../middleware/auth";
import { getAll } from "../controllers/filter";

const filterRouter = express.Router();

filterRouter.get("/get-all", checkToken, getAll);

export default filterRouter;
