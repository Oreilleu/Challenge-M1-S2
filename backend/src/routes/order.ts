import express from "express";
import { create, getAll, getOne, remove, update, getPaginatedOrders } from "../controllers/order";
import checkToken from "../middleware/auth";
import isAdmin from "../middleware/checkAdmin";

const orderRouter = express.Router();

orderRouter.post("/create", create);
orderRouter.get("/all", getAll);
orderRouter.get("/one/:id", getOne);
orderRouter.put("/update/:id", update);
orderRouter.delete("/delete/:id", remove);
orderRouter.get("/paginated-orders", isAdmin, getPaginatedOrders);


export default orderRouter;
