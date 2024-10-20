import { RequestHandler } from "express";
import { Product } from "../models/product.class";

export const getOne: RequestHandler = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "product added",
  });
};

export const getAll: RequestHandler = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "product added",
  });
};

export const create: RequestHandler = async (req, res, next) => {
  console.log("Je suis dans ke controller create");
  const product = new Product("name", "description", "brand", "model", {
    images: ["image1", "image2"],
    width: "width",
    height: "height",
    depth: "depth",
    price: 10,
    quantite: 10,
    filters: [
      {
        _id: "name",
        type: ["type"],
      },
    ],
  });

  product.createProduct();

  res.status(200).json({
    success: true,
    data: "product added",
  });
};

export const edit: RequestHandler = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "product added",
  });
};

export const remove: RequestHandler = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "product added",
  });
};
