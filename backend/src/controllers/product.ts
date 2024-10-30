import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { Product } from "../types/product.interface";
import { matchImageByName } from "../utils/matchImageByName";

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
  const body: Product = JSON.parse(req.body.product);

  if (!body) {
    res.status(400).json({
      success: false,
      message: "Les informations du produit sont requises",
    });
    return;
  }
  const variations = body.variations;

  const imagesFiles = req.files as Express.Multer.File[];

  if (!variations || !variations.length) {
    res.status(400).json({
      success: false,
      message: "Au moins une variation est requise",
    });
    return;
  }

  if (!imagesFiles) {
    res.status(400).json({
      success: false,
      message: "Une image est requise",
    });
    return;
  }

  variations.forEach((variation) => {
    if (!variation.nameImages) {
      return;
    }

    variation.images = [];

    variation.nameImages.forEach((nameImage) => {
      const images = matchImageByName(imagesFiles, nameImage);

      variation.images.push(images);

      variation.nameImages = variation.nameImages.filter(
        (name) => name !== nameImage
      );
    });
  });

  try {
    const product = new ProductModel(body);
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: "Produit créé avec succès",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Un produit avec ce nom existe déja.",
      });
      return;
    }

    next(error);
  }
};

export const edit: RequestHandler = async (req, res, next) => {
  const body: Product = req.body;

  try {
    const product = await ProductModel.findByIdAndUpdate(body.id, body);

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
