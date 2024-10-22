import { Filter } from "./filter.interface";

export interface Variation {
  images: string[];
  price: number;
  quantite: number;
  filter: Filter;
}
