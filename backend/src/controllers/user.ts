import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";
import UserModel from "../models/user.model";

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

export const getCurrentUser: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur authentifié",
    });
    return;
  }

  const foundUser = await UserModel.findById(user._id).select("-password");
  if (!foundUser) {
    res.status(400).json({
      success: false,
      message: "Utilisateur non trouvé",
    });
  }

  res.status(200).json({
    success: true,
    data: foundUser,
  });
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as AuthenticatedRequest;
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Pas d'utilisateur authentifié",
      });
      return;
    }

    const { civility, firstname, lastname, email, phone } = req.body;

    if (!civility || !firstname || !lastname || !email || !phone) {
      res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { civility, firstname, lastname, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({
      success: false,
      message: "Une erreur interne s'est produite",
    });
  }
};
