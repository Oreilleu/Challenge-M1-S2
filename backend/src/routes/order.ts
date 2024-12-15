import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post("/create", create);
orderRouter.get("/all", getAll);
orderRouter.get("/one/:id", getOne);
orderRouter.put("/update/:id", update);
orderRouter.delete("/delete/:id", remove);

export default orderRouter;
