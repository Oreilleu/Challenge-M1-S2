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
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  masterCategory:{
    type: Boolean,
    required: true, 
    default: true
  },
  imageApi: { type: imageSchema, required: true },
});

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
