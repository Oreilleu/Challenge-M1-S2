import { Image } from "./image.interface";
import { Filter } from "./filter.interface";

export interface CartItem {
  product: {
    _id: string;
    name: string;
    description: string;
    brand: string;
    model: string;
    idCategory: string;
    variations: {
      _id?: string;
      imagesApi?: Array<Image>;
      price: number;
      quantite: number;
      filters: Array<Filter>;
    };
  };
  quantite: number;
}
