import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyJsonWebToken } from "../utils/jsonWebtoken";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const checkToken: RequestHandler = async (req, res, next) => {
  const request = req as AuthenticatedRequest;
  const token =
    request.headers.authorization &&
    request.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Accès refusé. Aucun token fourni.",
    });
    return;
  }

  try {
    const decoded = await verifyJsonWebToken(token);

    request.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};

export default checkToken;
