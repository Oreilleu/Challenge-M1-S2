import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }
});

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;