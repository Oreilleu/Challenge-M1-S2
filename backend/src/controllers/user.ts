import { BodyPaginateUser } from "./../types/body-paginate-user.interface";
import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";
import { ColumnUser } from "../types/column-user.interface";
import UserModel from "../models/user.model";
import DeliverAdressModel from "../models/delivery-address.model";
import OrderModel from "../models/order.model";
import { config } from "../config";
import resetPasswordTemplate from "../utils/template-email/resetPasswordTemplate";
import { sendEmail } from "../utils/senderMail";

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

export const sendEmailChangePassword: RequestHandler = async (
  req,
  res,
  next
) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  try {
    await sendEmail(
      config.mailer.noreply,
      user.email,
      "Changement de votre mot de passe",
      await resetPasswordTemplate(user.email)
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;
  const { civility, firstname, lastname, email, phone } = req.body;

  if (!user) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  if (!civility || !firstname || !lastname || !email || !phone) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { civility, firstname, lastname, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        success: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({
      success: false,
    });
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  if (user.isAdmin) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(user._id);

    if (!deletedUser) {
      res.status(400).json({
        success: false,
      });
      return;
    }

    await DeliverAdressModel.deleteMany({
      idUser: user._id,
    });

    await OrderModel.updateMany(
      {
        user: user._id,
      },
      {
        user: null,
        address: null,
        billingAddress: null,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const adminRemove: RequestHandler = async (req, res, next) => {
  const { ids } = req.body as { ids: string[] };
  const { user } = req as AuthenticatedRequest;

  if (!user || !user.isAdmin) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  try {
    const deletedUsers = await UserModel.deleteMany({ _id: { $in: ids } });

    if (!deletedUsers) {
      res.status(400).json({
        success: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const edit: RequestHandler = async (req, res, next) => {
  const body: User = JSON.parse(req.body.user);
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "L'identifiant de l'utilisateur est requis",
    });
    return;
  }

  if (!body) {
    res.status(400).json({
      success: false,
      message: "Les données de l'utilisateur sont requises",
    });
    return;
  }
  try {
    const user = await UserModel.findByIdAndUpdate(id, body);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
      return;
    }
    await user.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
