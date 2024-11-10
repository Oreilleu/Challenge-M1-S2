import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { AggregateProductOnVariation } from "../types/aggregate-product-on-variation.interface";
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
    const aggregateVariation: AggregateProductOnVariation[] =
      await ProductModel.aggregate([
        { $unwind: "$variations" },
        { $skip: options.skip },
        { $limit: options.limit },
      ]);

    const variations = aggregateVariation.length ? aggregateVariation : [];
    const aggregateCountVariation = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $count: "totalVariations" },
    ]);
    const count = aggregateCountVariation.length
      ? aggregateCountVariation[0].totalVariations
      : 0;
    res.status(200).json({
      success: true,
      data: {
        paginates: variations,
        count,
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
// export const getPaginate: RequestHandler = async (req, res, next) => {
//   const { page, limit } = req.body;
//   if (!page || !limit) {
//     res.status(400).json({
//       success: false,
//       message: "La numéro de page et le nombre d'élément par page est requis",
//     });
//     return;
//   }

//   const parsedPage = parseInt(page);
//   const parsedLimit = parseInt(limit);

//   const options = {
//     skip: parsedPage === 1 ? 0 : parsedPage * parsedLimit - parsedLimit,
//     limit: parsedLimit,
//   };
//   try {
//     const products = await ProductModel.find({}, null, options)
//       .populate("idCategory")
//       .lean<Array<Product>>();

//     const aggregateVariation: AggregateProductOnVariation[] =
//       await ProductModel.aggregate([
//         { $unwind: "$variations" },
//         { $skip: options.skip },
//         { $limit: options.limit },
//       ]);

//     const variations = aggregateVariation.length ? aggregateVariation : [];
//     const totalProducts = await ProductModel.countDocuments();

//     const aggregateCountVariation = await ProductModel.aggregate([
//       { $unwind: "$variations" },
//       { $count: "totalVariations" },
//     ]);
//     const totalVariations = aggregateCountVariation.length
//       ? aggregateCountVariation[0].totalVariations
//       : 0;

//     products.forEach((product) => {
//       if (product.idCategory) {
//         product.category = product.idCategory;
//         delete product.idCategory;
//       }
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         paginatesProducts: products,
//         paginatesVariations: variations,
//         totalProducts,
//         totalVariations,
//       },
//     });
//   } catch (error) {
//     console.error("Erreur pour récupérer les produits paginés", error);
//     res.status(500).json({
//       success: false,
//       message: "Erreur lors de la récupération des produits paginés",
//     });
//   }
// };
