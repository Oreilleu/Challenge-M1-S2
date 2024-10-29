import { Filter } from "./filter.interface";
import { Image } from "./image.interface";

export interface Variation {
  price: number;
  quantite: number;
  nameImages: Array<string>;
  images: Array<Image>;
  filters: Array<Filter>;
}
