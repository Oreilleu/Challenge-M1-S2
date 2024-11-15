import mongoose, { Schema } from "mongoose";

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

const variationSchema = new mongoose.Schema({
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

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
