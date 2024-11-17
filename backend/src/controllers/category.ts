import { Request, Response } from "express";
import CategoryModel from "../models/category.model";
import { Category } from "../types/category.interface";
import path from "path";
import fs from "fs";

const createCategory = async (req: Request, res: Response) => {
  const category: Category = JSON.parse(req.body.category);
  const image = req.file as Express.Multer.File;

  if (!image || !category) {
    res.status(400).json({
      success: false,
      message: "Information manquante",
    });
    return;
  }

  if (category.masterCategory && category.parent) {
    res.status(400).json({
      success: false,
      message: "Une catégorie principale ne peut pas être une sous-catégorie",
    });
    return;
  }

  category.imageApi = {
    name: image.originalname,
    path: image.path.replace("public", ""),
  };

  try {
    const newCategory = await CategoryModel.create(category);
    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.error("Erreur pour créer une catégorie", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find()
    .populate("parent")
    .sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Erreur pour récupérer les catégories", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getSubCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({
      masterCategory: false,
    }).sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Erreur pour récupérer les sous-catégories", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

const getMasterCategories = async (req: Request, res: Response) => {
  try{
    const categories = await CategoryModel.find({
      masterCategory: true,
    }).sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Erreur pour récupérer les catégories principales", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

const getCategoryById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const category = await CategoryModel.findById(id);
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const body: Category = JSON.parse(req.body.category);
  const id = req.params.id;
  const image = req.file as Express.Multer.File;

  if (image) {
    body.imageApi = {
      name: image.originalname,
      path: image.path.replace("public", ""),
    };
  }

  if(body.masterCategory && body.parent) {
    res.status(400).json({
      success: false,
      message: "Une catégorie principale ne peut pas être une sous-catégorie",
    });
    return;
  }

  if (!body || !id) {
    res.status(400).json({
      success: false,
      message: "Information manquante",
    });
    return;
  }

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, body);

    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        message: "Catégorie non trouvée",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Catégorie non trouvée",
      });
      return;
    }

    const imagePath = path
      .join(__dirname, "public", category.imageApi.path)
      .replace("/src/controllers", "");

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(
          `Erreur pour supprimer l'image : ${category.imageApi.name}`,
          err
        );
      }
    });

    res.status(200).json({
      success: true,
      message: "Catégorie supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export {
  createCategory,
  getCategories,
  getSubCategories,
  getMasterCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
