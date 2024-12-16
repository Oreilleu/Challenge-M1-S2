import { VariationSearchOption } from "./variation-search-option.interface";
export interface BodyPaginateVariation {
  page: string;
  limit: string;
  idMasterCategory?: string;
  idSubCategories?: string[];
  searchOption?: VariationSearchOption;
}
