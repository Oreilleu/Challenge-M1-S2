import express from "express";
import { create } from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post("/create", create);

export default orderRouter;
