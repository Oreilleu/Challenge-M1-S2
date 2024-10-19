import { RequestHandler } from "express";

export const addProduct: RequestHandler = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "product added",
  });
};
