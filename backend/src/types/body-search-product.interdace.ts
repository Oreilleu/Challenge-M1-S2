import { ColumnProduct } from "./column-product.interface";
import { BodyPaginateProduct } from "./body-paginate-product.interface";

export interface BodySearchProduct extends BodyPaginateProduct {
  searchInput: string;
  column: ColumnProduct;
}
