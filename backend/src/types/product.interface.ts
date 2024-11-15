import { Category } from "./category.interface";
import { Variation } from "./variation.interface";

export interface Product {
  id?: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  idCategory?: string;
  category?: Category;
  variations: Array<Variation>;
}
