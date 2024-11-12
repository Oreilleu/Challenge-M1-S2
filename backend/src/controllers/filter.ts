import { RequestHandler } from "express";
import { Filter } from "../types/filter.interface";
import ProductModel from "../models/product.model";

export const getAll: RequestHandler = async (req, res, next) => {
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
