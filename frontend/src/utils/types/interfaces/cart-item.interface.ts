import type { AggregateProductOnVariation } from './aggregate-product-on-variation.interface'

export interface CartItem {
  product: AggregateProductOnVariation
  quantite: number
}
