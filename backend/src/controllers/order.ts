import { Request, Response } from "express";
import OrderModel from "../models/order.model";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";

export const create = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { cart, totalPrice, address, billingAddress, statusCheckout } =
    req.body;

  if (!user || !cart || !totalPrice || !statusCheckout) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.create({
      user: user._id,
      cart,
      address,
      totalPrice,
      billingAddress,
      status: statusCheckout,
    });

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    let orders;
    if (user.isAdmin) {
      orders = await OrderModel.find().populate("address");
    } else {
      orders = await OrderModel.find({ user: user._id }).populate("address");
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { id } = req.params;

  if (!user || !id) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.findById(req.params.id).populate("address");

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    if (user._id !== order?.user._id.toString() && !user.isAdmin) {
      res.status(403).send("Unauthorized");
      return;
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { id } = req.params;
  const { cart, totalPrice, addressId, billingAddress, statusCheckout } =
    req.body;

  if (!user || !id) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        cart,
        addressId,
        totalPrice,
        billingAddress,
        status: statusCheckout,
      },
      { new: true }
    );

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    if (user._id !== order?.user._id.toString() && !user.isAdmin) {
      res.status(403).send("Unauthorized");
      return;
    }

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { id } = req.params;

  if (!user || !id) {
    res.status(404).send("Bad request");
    return;
  }

  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    if (user._id !== order?.user._id.toString() && !user.isAdmin) {
      res.status(403).send("Unauthorized");
      return;
    }

    res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
