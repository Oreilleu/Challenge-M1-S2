import { RequestHandler } from "express";
import ProductModel from "../models/product.mongoose";
import { Product } from "../models/product.interface";

export const getOne: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Produit non trouvé",
    });
  }

  const product = await ProductModel.findById(id);

  if (!product) {
    res.status(400).json({
      success: false,
      message: "Produit non trouvé",
      data: [],
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Erreur pour récupérer tous les produits", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits",
    });
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const body: Product = req.body;

  try {
    const product = new ProductModel(body);
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: "Produit créé avec succès",
    });
  } catch (error) {
    console.error("Erreur pour créer un produit", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du produit",
    });
  }
};

export const edit: RequestHandler = async (req, res, next) => {
  const body: Product = req.body;

  try {
    const product = await ProductModel.findByIdAndUpdate(body._id, body);

    if (!product) {
      res.status(400).json({
        success: false,
        message: "Produit non trouvé",
      });
      return;
    }

    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: "Produit modifié avec succès",
    });
  } catch (error) {
    console.error("Erreur pour modifier un produit", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la modification du produit",
    });
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  const { id } = req.body;

  try {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      res.status(400).json({
        success: false,
        message: "Produit non trouvé",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur pour supprimer un produit", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du produit",
    });
  }
};
