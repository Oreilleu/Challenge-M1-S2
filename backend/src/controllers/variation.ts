import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { AggregateProductOnVariation } from "../types/aggregate-product-on-variation.interface";
import { AggregateProductOnFilter } from "../types/aggregate-product-on-filter.interface";
import { Filter } from "../types/filter.interface";
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

export const getPaginateByFilters: RequestHandler = async (req, res, next) => {
  const { page, limit, filters } = req.body;
  if (!page || !limit || !filters) {
    res.status(400).json({
      success: false,
      message:
        "La numéro de page, le nombre d'élément par page et les filtres sont requis",
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
    const aggregateConditions = filters.map((filter: any) => ({
      "variations.filters.name": filter.name,
      "variations.filters.value": filter.value,
    }));
    const aggregateFilter: {
      _id: string;
      product: AggregateProductOnFilter;
    }[] = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: {
          $or: aggregateConditions,
        },
      },
      {
        $group: {
          _id: "$variations._id",
          product: { $first: "$$ROOT" },
        },
      },
      { $skip: options.skip },
      { $limit: options.limit },
    ]);
    const variations = aggregateFilter.length
      ? aggregateFilter.map((product) => {
          return product.product;
        })
      : [];
    const aggregateCountFilter = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: {
          $or: aggregateConditions,
        },
      },
      {
        $group: {
          _id: "$variations._id",
          product: { $first: "$$ROOT" },
        },
      },
      { $count: "count" },
    ]);
    const count = aggregateCountFilter.length
      ? aggregateCountFilter[0].count
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
