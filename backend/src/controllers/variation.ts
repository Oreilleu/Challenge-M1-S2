import { RequestHandler } from "express";
import ProductModel from "../models/product.model";
import { AggregateProductOnFilter } from "../types/aggregate-product-on-filter.interface";
import { BodyPaginateVariation } from "../types/body-paginate-variation.interface";
import { Filter } from "../types/filter.interface";
import { FormattedFilterMongoQuery } from "../types/formatted-filter-mongo-query.interace";
import { FormattedFilters } from "../types/formatted-filter.interface";
import CategoryModel from "../models/category.model";
import { Category } from "../types/category.interface";

export const getPaginate: RequestHandler = async (req, res, next) => {
  const { page, limit, idMasterCategory, idSubCategories, searchOption } =
    req.body as BodyPaginateVariation;

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

  const formattedFilters: FormattedFilterMongoQuery[] = filters.map(
    (filter: Filter) => ({
      "variations.filters.name": filter.name,
      "variations.filters.value": filter.value,
    })
  );

  const hasFilters = formattedFilters.length > 0;
  const hasSearchInput = searchInput && searchInput.length >= 2;
  const hasMasterCategory = !!idMasterCategory;
  const hasSubCategories = idSubCategories && idSubCategories.length > 0;

  let mongoCategories: Category[] = [];
  let mongoSubCategoriesFilter: Category[] = [];

  if (hasMasterCategory) {
    try {
      mongoCategories = await CategoryModel.find({
        parent: idMasterCategory,
      });
    } catch (error) {
      console.error("Erreur pour récupérer les catégories", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des catégories",
      });
      return;
    }
  }

  if (hasSubCategories) {
    try {
      if (hasMasterCategory) {
        mongoCategories = await CategoryModel.find({
          _id: { $in: idSubCategories },
        });
        mongoSubCategoriesFilter = await CategoryModel.find({
          parent: idMasterCategory,
        });
      } else {
        mongoCategories = await CategoryModel.find({
          _id: { $in: idSubCategories },
        });
        mongoSubCategoriesFilter = await CategoryModel.find({
          masterCategory: false,
        });
      }
    } catch (error) {
      console.error("Erreur pour récupérer les catégories", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des catégories",
      });
      return;
    }
  }

  if (!hasMasterCategory && !hasSubCategories) {
    try {
      mongoCategories = await CategoryModel.find({
        masterCategory: false,
      });
    } catch (error) {
      console.error("Erreur pour récupérer les catégories", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des catégories",
      });
      return;
    }
  }

  const buildQuery = (formattedFilters: FormattedFilterMongoQuery[]) => {
    const query: any = {};

    if (hasFilters) {
      query.$or = formattedFilters.map((condition) => ({
        $and: [condition, { name: { $regex: searchInput, $options: "i" } }],
      }));
    }

    if (hasSearchInput) {
      query.name = { $regex: searchInput, $options: "i" };
    }

    if (hasMasterCategory) {
      const categoriesIds = mongoCategories.map((category) => category._id);
      query.idCategory = { $in: categoriesIds };
    }

    if (hasSubCategories) {
      const subCategoriesIds = mongoCategories.map((category) => category._id);
      if (query.idCategory) {
        query.idCategory.$in = query.idCategory.$in.concat(subCategoriesIds);
      } else {
        query.idCategory = { $in: subCategoriesIds };
      }
    }

    return query;
  };

  const buildQueryFilter = () => {
    const query: any = {};

    if (hasSearchInput) {
      query.name = { $regex: searchInput, $options: "i" };
    }

    if (hasMasterCategory) {
      const categoriesIds = mongoCategories.map((category) => category._id);

      query.idCategory = { $in: categoriesIds };
    }

    if (hasSubCategories) {
      const subCategoriesIds = mongoCategories.map((category) => category._id);
      if (query.idCategory) {
        query.idCategory.$in = query.idCategory.$in.concat(subCategoriesIds);
      } else {
        query.idCategory = { $in: subCategoriesIds };
      }
    }

    return query;
  };

  const query = buildQuery(formattedFilters);

  const queryFilter = buildQueryFilter();

  try {
    const variationByFilter: {
      _id: string;
      product: AggregateProductOnFilter;
    }[] = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: query,
      },
      {
        $group: {
          _id: "$variations._id",
          product: { $first: "$$ROOT" },
        },
      },
      { $skip: paginationOptions.skip },
      { $limit: paginationOptions.limit },
    ]).sort({ quantite: -1 });

    const count = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: query,
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

    const filters: Filter[] = await ProductModel.aggregate([
      { $unwind: "$variations" },
      { $unwind: "$variations.filters" },
      {
        $match: queryFilter,
      },
      {
        $replaceRoot: { newRoot: "$variations.filters" },
      },
    ]);

    const sanitizedVariationByFilter = variationByFilter.map(
      (aggregateVariation) => aggregateVariation.product
    );

    const filteredFilters = filters.reduce((acc, filter) => {
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
      data: {
        paginates: variationByFilter.length ? sanitizedVariationByFilter : [],
        count: count.length ? count[0].count : 0,
        filters: filteredFilters,
        categoryFilter: hasSubCategories
          ? mongoSubCategoriesFilter
          : mongoCategories,
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
