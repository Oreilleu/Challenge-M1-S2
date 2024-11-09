import type { Category } from './category.interface'
import type { Variation } from './variation.interface'

export interface Product {
  _id?: string
  idCategory?: string | null
  category?: Category
  name: string
  description: string
  brand: string
  model: string
  variation: Array<Variation>
}
