import express from "express";
import {
  create,
  getAll,
  remove,
  update,
} from "../controllers/delivery-address";

const deliveryAddressRouter = express.Router();

deliveryAddressRouter.post("/add", create);
deliveryAddressRouter.get("/get-all", getAll);
deliveryAddressRouter.delete("/delete/:id", remove);
deliveryAddressRouter.put("/update/:id", update);

export default deliveryAddressRouter;
