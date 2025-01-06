import type { AggregateProductOnVariation } from './types/interfaces/aggregate-product-on-variation.interface'

export const formattedNameProduct = (product: AggregateProductOnVariation) =>
  `${product.name} - ${product.variations.suffix}`
