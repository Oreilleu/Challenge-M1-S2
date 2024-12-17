import mongoose, { Schema, UpdateQuery } from "mongoose";
import { Variation } from "../types/variation.interface";
import { Product } from "../types/product.interface";

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const filterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom du filtre est obligatoire."],
  },
  value: {
    type: String,
    required: [true, "La valeur du filtre est obligatoire."],
  },
});

export const variationSchema = new mongoose.Schema({
  suffix: {
    type: String,
    required: [true, "Le suffixe de la variante est obligatoire."],
    unique: true,
  },
  imagesApi: { type: [imageSchema], required: true },
  price: {
    type: Number,
    required: [true, "Le prix du produit est obligatoire."],
  },
  quantite: {
    type: Number,
    required: [true, "La quantité en stock du produit est obligatoire."],
    default: 0,
  },
  filters: { type: [filterSchema], required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est obligatoire."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "La description du produit est obligatoire."],
    },
    brand: {
      type: String,
      required: [true, "La marque du produit est obligatoire."],
    },
    model: {
      type: String,
      required: [true, "Le modèle du produit est obligatoire."],
    },
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La catégorie du produit est obligatoire."],
    },
    variations: { type: [variationSchema], required: true },
  },
  { timestamps: true }
);

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as UpdateQuery<Product>;
  if (update && update.variations) {
    const suffixes = update.variations.map(
      (variation: Variation) => variation.suffix
    );
    const uniqueSuffixes = new Set(suffixes);
    if (suffixes.length !== uniqueSuffixes.size) {
      return next(new Error("Le suffixe de la variante doit être unique."));
    }
  }
  next();
});

productSchema.pre("save", function (next) {
  const product = this;
  const suffixes = product.variations.map((variation) => variation.suffix);
  const uniqueSuffixes = new Set(suffixes);
  if (suffixes.length !== uniqueSuffixes.size) {
    return next(new Error("Le suffixe de la variante doit être unique."));
  }
  next();
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
