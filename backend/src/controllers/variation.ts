import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { AggregateProductOnFilter } from "../types/aggregate-product-on-filter.interface";
import { BodyPaginateVariation } from "../types/body-paginate-variation.interface";
export const getPaginate: RequestHandler = async (req, res, next) => {
  const { page, limit, searchOption } = req.body as BodyPaginateVariation;
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

  const searchInput = searchOption?.searchInput || "";
  const filters = searchOption?.filters || [];
  const query = (aggregateCondition: any) => {
    if (aggregateCondition.length > 0) {
      if (searchInput) {
        return {
          $and: [
            ...aggregateCondition,
            { name: { $regex: searchInput, $options: "i" } },
          ],
        };
      } else {
        return {
          $or: aggregateCondition,
        };
      }
    }
    if (searchInput.length >= 3) {
      return { name: { $regex: searchInput, $options: "i" } };
    }
    return {};
  };
  try {
    const aggregateConditions = filters.map((filter: any) => ({
      "variations.filters.name": filter.name,
      "variations.filters.value": filter.value,
    }));

    const variationByFilter: {
      _id: string;
      product: AggregateProductOnFilter;
    }[] = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: query(aggregateConditions),
      },
      {
        $group: {
          _id: "$variations._id",
          product: { $first: "$$ROOT" },
        },
      },
      { $skip: paginationOptions.skip },
      { $limit: paginationOptions.limit },
    ]);
    const count = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: query(aggregateConditions),
      },
      {
        $group: {
          _id: "$variations._id",
          product: { $first: "$$ROOT" },
        },
      },
      {
        $count: "count",
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        paginates: variationByFilter.length
          ? variationByFilter.map(
              (aggregateVariation) => aggregateVariation.product
            )
          : [],
        count: count.length ? count[0].count : 0,
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
