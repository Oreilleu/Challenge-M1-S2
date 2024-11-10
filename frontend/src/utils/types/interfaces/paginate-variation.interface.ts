import type { AggregateProductOnVariation } from './aggregate-product-on-variation.interface'

export interface PaginateVariation {
  paginates: Array<AggregateProductOnVariation>
  count: number
}
