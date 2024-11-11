import { Request, Response } from "express";
import CategoryModel from "../models/category.model";
import { Category } from "../types/category.interface";

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
    const categories = await CategoryModel.find().sort({ name: 1 });
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
  const id = req.params.id;
  const category: Category = req.body;
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      category,
      { new: true }
    );
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
    await CategoryModel.findByIdAndDelete(id);
    res.status(204).json({
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
  getCategoryById,
  updateCategory,
  deleteCategory,
};
