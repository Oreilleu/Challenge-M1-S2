import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../controllers/auth";

const { verifyJsonWebToken } = require("../utils/jsonWebtoken");

export const checkToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Accès refusé. Aucun token fourni.",
    });
  }

  try {
    const decoded = await verifyJsonWebToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};
