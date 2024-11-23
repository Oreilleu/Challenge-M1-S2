import { Request, Response } from "express";
import DeliveryAddressModel from "../models/delivery-address.model";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";

export const create = async (req: Request, res: Response) => {
  const { user, body } = req as AuthenticatedRequest;

  if (!body || !user) {
    res.status(400).json({
      success: false,
      message: "Information manquante",
    });
    return;
  }

  try {
    const deliveryAddress = new DeliveryAddressModel({
      ...body,
      idUser: user._id,
    });

    await deliveryAddress.save();

    res.status(201).json({
      success: true,
      data: deliveryAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const deliveryAddresses = await DeliveryAddressModel.find();

    res.status(200).json({
      success: true,
      data: deliveryAddresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
