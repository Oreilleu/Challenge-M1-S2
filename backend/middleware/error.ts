import { NextFunction, Request, Response } from "express";

// TODO : Custom type error ?
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Une erreur est survenue sur le serveur.",
  });
};
