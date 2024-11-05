import { Variation } from "./variation.interface";

export interface Product {
  id?: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  idCategory?: string;
  category?: string;
  variations: Array<Variation>;
}
