import mongoose from "mongoose";

const filtreSchema = new mongoose.Schema({
  couleurs: {
    type: [String],
    required: [true, "La couleur est obligatoire."],
  },
  capacite: {
    type: [String],
    required: [true, "La capacité est obligatoire."],
  },
});

const FilterProductModel = mongoose.model("FilterProduct", filtreSchema);
export default FilterProductModel;
