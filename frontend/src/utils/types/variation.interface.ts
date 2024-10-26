import type { Filter } from './filter.interface'

export interface Variation {
  images: string
  price: number
  quantite: number
  filters: Array<Filter>
}
