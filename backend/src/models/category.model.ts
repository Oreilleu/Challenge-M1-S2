import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  idParent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  imageApi: { type: imageSchema, required: true },
});

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
