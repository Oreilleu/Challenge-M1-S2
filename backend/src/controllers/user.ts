import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../models/authenticated-request.interface";
import UserModel from "../models/user.mongoose";

export const getOne: RequestHandler = (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: { ...user },
  });
};

export const isVerified: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur",
    });
    return;
  }

  const userDatabase = await UserModel.findOne({ email: user.email });

  if (!userDatabase) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  const isVerified = userDatabase.isVerified;

  res.status(200).json({
    success: true,
    data: isVerified,
  });
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur",
    });
    return;
  }

  const userDatabase = await UserModel.findOne({ email: user.email });

  if (!userDatabase) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  const isAdmin = userDatabase.isAdmin;

  res.status(200).json({
    success: true,
    data: isAdmin,
  });
};
