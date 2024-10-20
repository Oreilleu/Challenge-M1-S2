import mongoose from "mongoose";

const categoryProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est obligatoire."],
      unique: true,
    },
  },
  { timestamps: true }
);

const CategoryProductModel = mongoose.model(
  "CategoryProduct",
  categoryProductSchema
);

export default CategoryProductModel;
