import { VariationSearchOption } from "./variation-search-option.interface";
export interface BodyPaginateUser {
  page: string;
  limit: string;
  searchOption?: VariationSearchOption;
}
