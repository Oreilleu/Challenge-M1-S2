import type { AggregateProductOnVariation } from './aggregate-product-on-variation.interface'
import type { Product } from './product.interface'

export interface PaginateProduct {
  paginatesProducts: Array<Product>
  paginatesVariations: Array<AggregateProductOnVariation>
  totalProducts: number
  totalVariations: number
}
