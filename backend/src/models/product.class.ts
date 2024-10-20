import { Variation } from "./variation.type";
import ProductModel from "./product.mongoose";
import { ProductHandler } from "./product-handler.interface";

export class Product implements ProductHandler {
  name: string;
  description: string;
  brand: string;
  model: string;
  variation: Variation;
  _id?: number;
  category?: string;

  constructor(
    name: string,
    description: string,
    brand: string,
    model: string,
    variation: Variation,
    id?: number,
    category?: string
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.model = model;
    this.category = category;
    this.variation = variation;
  }

  async createProduct() {
    const product = new ProductModel({
      name: this.name,
      description: this.description,
      brand: this.brand,
      model: this.model,
      category: this.category,
      variation: this.variation,
    });

    console.log(product);

    await product.save();
  }
}
