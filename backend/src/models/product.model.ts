import mongoose, { Schema } from "mongoose";

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

const variationSchema = new mongoose.Schema({
  images: { type: [String], required: true },
  price: {
    type: Number,
    required: [true, "Le prix du produit est obligatoire."],
  },
  quantite: {
    type: Number,
    required: [true, "La quantité en stock du produit est obligatoire."],
    default: 0,
  },
  filters: [filterSchema],
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
      ref: "CategoryProduct",
    },
    variation: [variationSchema],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
