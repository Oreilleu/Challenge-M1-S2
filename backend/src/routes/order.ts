import express from "express";
import { create, getAll, getOne, remove, update, getPaginatedOrders, deleteOrder } from "../controllers/order";
import checkAdmin from "../middleware/checkAdmin";

const orderRouter = express.Router();

orderRouter.post("/create", create);
orderRouter.get("/all", getAll);
orderRouter.get("/one/:id", getOne);
orderRouter.put("/update/:id", update);
// orderRouter.delete("/delete/:id", remove);
orderRouter.get("/paginated-orders", checkAdmin, getPaginatedOrders);
orderRouter.delete("/delete/:id", checkAdmin, deleteOrder);

export default orderRouter;
