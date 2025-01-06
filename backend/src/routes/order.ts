import express from "express";
import { create, getAll, getOne, update, getPaginatedOrders, deleteOrder, getOrderById, updateStatusById} from "../controllers/order";
import checkAdmin from "../middleware/checkAdmin";

const orderRouter = express.Router();

orderRouter.post("/create", create);
orderRouter.get("/all", getAll);
orderRouter.get("/one/:id", getOne);
orderRouter.put("/update/:id", update);
orderRouter.get("/paginated-orders", checkAdmin, getPaginatedOrders);
orderRouter.delete("/delete/:id", checkAdmin, deleteOrder);
orderRouter.get("/:id", checkAdmin, getOrderById);
orderRouter.put("/update-status/:id", checkAdmin, updateStatusById);


export default orderRouter;
