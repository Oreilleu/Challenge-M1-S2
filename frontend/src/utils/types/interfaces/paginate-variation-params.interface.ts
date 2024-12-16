import type { VariationSearchOption } from './variation-search-option.interface'

export interface PaginateVariationParams {
  page: number
  limit: number
  idMasterCategory?: string
  idSubCategories?: Array<string>
  searchOption?: VariationSearchOption
}
