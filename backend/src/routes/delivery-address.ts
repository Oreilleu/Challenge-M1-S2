import express from "express";
import { create, getAll } from "../controllers/delivery-address";

const deliveryAddressRouter = express.Router();

deliveryAddressRouter.post("/add", create);
deliveryAddressRouter.get("/get-all", getAll);

export default deliveryAddressRouter;
