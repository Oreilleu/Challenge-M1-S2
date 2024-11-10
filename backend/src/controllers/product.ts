import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { Product } from "../types/product.interface";
import { matchImageByName } from "../utils/matchImageByName";
import path from "path";
import fs from "fs";
import { BodySearchProduct } from "../types/body-search-product.interdace";
import { ColumnProduct } from "../types/column-product.interface";
import { AggregateProductOnVariation } from "../types/aggregate-product-on-variation.interface";
import { Filter } from "../types/filter.interface";
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

  if (product?.idCategory) {
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

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductModel.find()
      .populate("idCategory")
      .lean<Array<Product>>();

    products.forEach((product) => {
      if (product.idCategory) {
        product.category = product.idCategory;
        delete product.idCategory;
      }
    });

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

export const getPaginate: RequestHandler = async (req, res, next) => {
  const { page, limit } = req.body;
  if (!page || !limit) {
    res.status(400).json({
      success: false,
      message: "La numéro de page et le nombre d'élément par page est requis",
    });
    return;
  }

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const options = {
    skip: parsedPage === 1 ? 0 : parsedPage * parsedLimit - parsedLimit,
    limit: parsedLimit,
  };
  try {
    const products = await ProductModel.find({}, null, options)
      .populate("idCategory")
      .lean<Array<Product>>();

    const totalProducts = await ProductModel.countDocuments();

    products.forEach((product) => {
      if (product.idCategory) {
        product.category = product.idCategory;
        delete product.idCategory;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        paginatesProducts: products,
        totalProducts,
      },
    });
  } catch (error) {
    console.error("Erreur pour récupérer les produits paginés", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits paginés",
    });
  }
};

export const getBySearch: RequestHandler = async (req, res, next) => {
  const { searchInput, column, page, limit } = req.body as BodySearchProduct;

  if (!searchInput || !column || !page || !limit) {
    res.status(400).json({
      success: false,
      message: "Tout les champs sont requis",
    });
    return;
  }

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const options = {
    skip: parsedPage === 1 ? 0 : parsedPage * parsedLimit - parsedLimit,
    limit: parsedLimit,
  };

  const query =
    column === ColumnProduct.ALL
      ? {
          $or: [
            { [ColumnProduct.NAME]: { $regex: searchInput, $options: "i" } },
            { [ColumnProduct.MODEL]: { $regex: searchInput, $options: "i" } },
            { "category.name": { $regex: searchInput, $options: "i" } },
          ],
        }
      : column === ColumnProduct.CATEGORY
      ? {
          "category.name": { $regex: searchInput, $options: "i" },
        }
      : {
          [column]: { $regex: searchInput, $options: "i" },
        };

  try {
    const products = await ProductModel.aggregate([
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
        $skip: options.skip,
      },
      {
        $limit: options.limit,
      },
    ]);

    const total = await ProductModel.aggregate([
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
        $count: "total",
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        paginatesProducts: products,
        totalProducts: total.length ? total[0].total : 0,
      },
    });
  } catch (error) {
    console.error("Erreur pour récupérer les produits par recherche", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits par recherche",
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

export const getFilters: RequestHandler = async (req, res, next) => {
  try {
    const filters: { _id: Filter }[] = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      { $group: { _id: "$variations.filters" } },
    ]);

    const mappedFilters = filters.map((filter) => ({ ...filter._id }));

    const filteredFilters: { [key: string]: string[] } = {};
    mappedFilters.forEach((filter) => {
      if (!filteredFilters[filter.name]) {
        filteredFilters[filter.name] = [];
      }
      if (!filteredFilters[filter.name].includes(filter.value)) {
        filteredFilters[filter.name].push(filter.value);
      }
    });
    console.log(filters);
    res.status(200).json({
      success: true,
      data: filteredFilters,
    });
  } catch (error) {
    console.error("Erreur pour récupérer les filtres", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des filtres",
    });
  }
};
