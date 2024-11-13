import { ProductSearchOption } from "./product-search-option.interface";

export interface BodyPaginateProduct {
  page: string;
  limit: string;
  searchOption?: ProductSearchOption;
}
