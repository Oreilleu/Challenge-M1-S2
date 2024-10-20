import { Filter } from "./filter.type";

export type Variation = {
  images: string[];
  width: string;
  height: string;
  depth: string;
  price: number;
  quantite: number;
  filters: Filter[];
};
