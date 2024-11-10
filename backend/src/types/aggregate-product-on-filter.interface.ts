import { Image } from "./image.interface";
import { Filter } from "./filter.interface";
export interface AggregateProductOnFilter {
  _id: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  idCategory: string;
  variations: {
    imagesApi: Image[];
    price: number;
    quantity: number;
    filters: Filter;
    _id: string;
  };
}
