import { ObjectId } from "mongoose";
import { Filter } from "./filter.interface";
import { Image } from "./image.interface";

export interface Variation {
  _id: string;
  suffix: string;
  price: number;
  quantite: number;
  nameImages: Array<string>;
  imagesApi: Array<Image>;
  filters: Array<Filter>;
}
