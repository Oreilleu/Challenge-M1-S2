import mongoose, { Schema } from "mongoose";

const variationSchema = new mongoose.Schema({
  images: { type: [String], required: true },
  width: {
    type: String,
    required: [true, "La largeur du produit est obligatoire."],
  },
  height: {
    type: String,
    required: [true, "La hauteur du produit est obligatoire."],
  },
  depth: {
    type: String,
    required: [true, "La profondeur du produit est obligatoire."],
  },
  price: {
    type: Number,
    required: [true, "Le prix du produit est obligatoire."],
  },
  quantite: {
    type: Number,
    required: [true, "La quantité en stock du produit est obligatoire."],
    default: 0,
  },
  filters: {
    type: Schema.Types.ObjectId,
    ref: "FilterProduct",
    required: [true, "Le filtre du produit est obligatoire."],
  },
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
