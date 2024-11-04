import type { Variation } from './variation.interface'

export interface Product {
  _id?: string
  category?: string
  name: string
  description: string
  brand: string
  model: string
  variation: Array<Variation>
}
