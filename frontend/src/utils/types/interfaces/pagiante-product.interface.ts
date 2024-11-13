import type { Product } from './product.interface'

export interface PaginateProduct {
  paginates: Array<Product>
  count: number
}
