import type { AggregateProductOnVariation } from './aggregate-product-on-variation.interface'
import type { Category } from './category.interface'
import type { FormattedFilters } from './formatedFilters.interface'

export interface PaginateVariation {
  paginates: Array<AggregateProductOnVariation>
  count: number
  filters: FormattedFilters
  categoryFilter: Category[]
}
