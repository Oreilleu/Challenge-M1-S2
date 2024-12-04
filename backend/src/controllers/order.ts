import { Request, Response } from "express";
import OrderModel from "../models/order.model";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";

export const create = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { cart, totalPrice, addressId, billingAddress, statusCheckout } =
    req.body;

  if (!user || !cart || !totalPrice || !statusCheckout) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.create({
      user: user._id,
      cart,
      addressId,
      totalPrice,
      billingAddress,
      status: statusCheckout,
    });

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();

    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    res.status(200).json({
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
