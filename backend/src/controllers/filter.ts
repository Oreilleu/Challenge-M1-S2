import { RequestHandler } from "express";
import { Filter } from "../types/filter.interface";
import ProductModel from "../models/product.model";
import { FormattedFilters } from "../types/formatted-filter.interface";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const filters: { _id: Filter }[] = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      { $group: { _id: "$variations.filters" } },
    ]);

    const mappedFilters = filters.map((filter) => ({ ...filter._id }));

    const filteredFilters = mappedFilters.reduce((acc, filter) => {
      const trimFilterName = filter.name.trim();
      const trimFilterValue = filter.value.trim();
      if (!acc[trimFilterName]) {
        acc[trimFilterName] = [];
      }
      if (!acc[trimFilterName].includes(trimFilterValue)) {
        acc[trimFilterName].push(trimFilterValue);
      }
      return acc;
    }, {} as FormattedFilters);

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
