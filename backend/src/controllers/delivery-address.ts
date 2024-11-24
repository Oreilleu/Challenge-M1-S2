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
    const countDeliveryAddress = await DeliveryAddressModel.countDocuments();

    if (countDeliveryAddress >= 5) {
      res.status(400).json({
        success: false,
        message: "Vous ne pouvez pas ajouter plus de 5 adresses de livraison",
      });
      return;
    }

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

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Information manquante",
    });
    return;
  }

  try {
    const deliveryAddress = await DeliveryAddressModel.findById(id);

    if (!deliveryAddress) {
      res.status(404).json({
        success: false,
        message: "Adresse de livraison introuvable",
      });
      return;
    }

    res.status(200).json({
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

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body, user } = req as AuthenticatedRequest;

  if (!id || !body || !user) {
    res.status(400).json({
      success: false,
      message: "Information manquante",
    });
    return;
  }

  try {
    const deliveryAddress = await DeliveryAddressModel.findByIdAndUpdate(
      id,
      body
    );

    if (!deliveryAddress) {
      res.status(404).json({
        success: false,
        message: "Adresse de livraison introuvable",
      });
      return;
    }

    if (deliveryAddress.idUser.toString() !== user._id) {
      res.status(403).json({
        success: false,
        message:
          "Vous n'êtes pas autorisé à modifier cette adresse de livraison",
      });
      return;
    }

    deliveryAddress.save();

    res.status(200).json({
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

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as AuthenticatedRequest;

  if (!id || !user) {
    res.status(400).json({
      success: false,
      message: "Information manquante",
    });
    return;
  }

  try {
    const userIdDeliveryAddress = await DeliveryAddressModel.findById(id);

    if (!userIdDeliveryAddress) {
      res.status(404).json({
        success: false,
        message: "Adresse de livraison introuvable",
      });
      return;
    }

    if (userIdDeliveryAddress.idUser.toString() !== user._id) {
      res.status(403).json({
        success: false,
        message:
          "Vous n'êtes pas autorisé à supprimer cette adresse de livraison",
      });
      return;
    }

    const deliveryAddress = await DeliveryAddressModel.findByIdAndDelete(id);

    if (!deliveryAddress) {
      res.status(404).json({
        success: false,
        message: "Adresse de livraison introuvable",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Adresse de livraison supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
