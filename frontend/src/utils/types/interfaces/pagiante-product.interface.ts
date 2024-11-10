import type { Product } from './product.interface'

export interface PaginateProduct {
  paginatesProducts: Array<Product>
  totalProducts: number
}
