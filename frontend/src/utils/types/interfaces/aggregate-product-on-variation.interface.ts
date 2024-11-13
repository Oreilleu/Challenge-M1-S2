import type { Variation } from './variation.interface'

export interface AggregateProductOnVariation {
  _id: string
  name: string
  description: string
  brand: string
  model: string
  idCategory: string
  variations: Omit<Variation, 'nameImages' | 'images'>
}
