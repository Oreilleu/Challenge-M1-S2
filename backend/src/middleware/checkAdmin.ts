import { RequestHandler } from "express";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../types/authenticated-request.interface";

const checkAdmin: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Pas d'utilisateur",
    });
    return;
  }

  try {
    const userDatabase = await User.findOne({ email: user.email });

    if (!userDatabase) {
      res.status(400).json({
        success: false,
        message: "Pas d'utilisateur authentifié",
      });
      return;
    }

    const isAdmin = userDatabase.isAdmin;

    if (!isAdmin) {
      res.status(401).json({
        success: false,
        message: "Accès refusé.",
      });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Accès refusé.",
    });
    return;
  }
};

export default checkAdmin;
