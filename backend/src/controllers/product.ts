import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { Product } from "../types/product.interface";
import { matchImageByName } from "../utils/matchImageByName";
import path from "path";
import fs from "fs";
import { ColumnProduct } from "../types/column-product.interface";
import { BodyPaginateProduct } from "../types/body-paginate-product.interface";
import CategoryModel from "../models/category.model";

export const getOne: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Produit non trouvé",
    });
  }

  const product = await ProductModel.findById(id)
    .populate("idCategory")
    .lean<Product>();

  if (product?.idCategory && typeof product.idCategory !== "string") {
    product.category = product.idCategory;
    delete product.idCategory;
  }

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

export const getPaginate: RequestHandler = async (req, res, next) => {
  const { page, limit, searchOption } = req.body as BodyPaginateProduct;

  if (!page || !limit) {
    res.status(400).json({
      success: false,
      message: "La numéro de page et le nombre d'élément par page est requis",
    });
    return;
  }

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const paginationOptions = {
    skip: parsedPage === 1 ? 0 : parsedPage * parsedLimit - parsedLimit,
    limit: parsedLimit,
  };

  const filterOptions =
    searchOption && searchOption?.searchInput.length < 3
      ? undefined
      : searchOption;

  const buildQuery = (filterOptions: any) => {
    if (!filterOptions) {
      return {};
    }

    const { column, searchInput } = filterOptions;
    const regex = { $regex: searchInput, $options: "i" };

    if (column === ColumnProduct.ALL) {
      return {
        $or: [
          { [ColumnProduct.NAME]: regex },
          { [ColumnProduct.MODEL]: regex },
          { "category.name": regex },
        ],
      };
    }

    if (column === ColumnProduct.CATEGORY) {
      return { "category.name": regex };
    }

    return { [column]: regex };
  };

  const query = buildQuery(filterOptions);

  try {
    const paginates = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "idCategory",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: query,
      },
      {
        $skip: paginationOptions.skip,
      },
      {
        $limit: paginationOptions.limit,
      },
    ]).sort({ createdAt: -1 });

    const count = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "idCategory",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: query,
      },
      {
        $count: "count",
      },
    ]);

    res.status(200).json({
      success: true,
      data: { paginates, count: count.length ? count[0].count : 0 },
    });
  } catch (error) {
    console.error("Erreur pour récupérer les produits.", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits.",
    });
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const body: Product = JSON.parse(req.body.product);
  const variations = body.variations;
  const imagesFiles = req.files as Express.Multer.File[];

  if (!body) {
    res.status(400).json({
      success: false,
      message: "Les informations du produit sont requises",
    });
    return;
  }

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

    variation.imagesApi = [];

    variation.nameImages.forEach((nameImage) => {
      const images = matchImageByName(imagesFiles, nameImage);

      variation.imagesApi.push(images);

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
  const body: Product = JSON.parse(req.body.product);
  const { id } = req.params;
  const imagesFiles = req.files as Express.Multer.File[];

  const variations = body.variations;
  const variationToDeleteImages: Array<string> = [];

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Produit non trouvé",
    });
    return;
  }

  if (!body) {
    res.status(400).json({
      success: false,
      message: "Les informations du produit sont requises",
    });
    return;
  }

  if (!variations || !variations.length) {
    res.status(400).json({
      success: false,
      message: "Au moins une variation est requise",
    });
    return;
  }

  variations.forEach((variation) => {
    if (variation.imagesApi) return;

    if (variation._id) {
      variationToDeleteImages.push(variation._id);
    }

    variation.imagesApi = [];

    variation.nameImages?.forEach((nameImage) => {
      const images = matchImageByName(imagesFiles, nameImage);

      variation.imagesApi?.push(images);

      variation.nameImages = variation.nameImages?.filter(
        (name) => name !== nameImage
      );
    });
  });

  try {
    const product = await ProductModel.findByIdAndUpdate(id, body);

    if (!product) {
      res.status(400).json({
        success: false,
        message: "Produit non trouvé",
      });
      return;
    }

    await product.save();

    product.variations.forEach((oldVariation) => {
      if (variationToDeleteImages.includes(oldVariation._id.toString())) {
        oldVariation.imagesApi?.forEach((image) => {
          const imagePath = path
            .join(__dirname, "public", image.path)
            .replace("/src/controllers", "");

          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(
                `Erreur pour supprimer l'image : ${image.name}`,
                err
              );
            }
          });
        });
      }
    });

    res.status(200).json({
      success: true,
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
  const { id } = req.params;

  try {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      res.status(400).json({
        success: false,
        message: "Produit non trouvé",
      });
      return;
    }

    product.variations.forEach((variation) => {
      variation.imagesApi?.forEach((image) => {
        const imagePath = path
          .join(__dirname, "public", image.path)
          .replace("/src/controllers", "");

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Erreur pour supprimer l'image : ${image.name}`, err);
          }
        });
      });
    });

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
