import { Request, Response } from "express";
import OrderModel from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  const { user, products, totalPrice, bilingAddress, status } = req.body;

  if (!user || !products || !totalPrice || !bilingAddress || !status) {
    res.status(400).send("Missing required parameters");
    return;
  }

  try {
    const order = await OrderModel.create({
      user,
      products,
      totalPrice,
      bilingAddress,
      status,
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

// export const get
