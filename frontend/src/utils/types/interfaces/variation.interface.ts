import type { Filter } from './filter.interface'
import type { ImageApi } from './image.interface'

export interface Variation {
  _id?: string
  suffix: string
  price: number
  quantite: number
  filters: Array<Filter>
  images?: { files: FileList }
  nameImages?: Array<string>
  imagesApi?: Array<ImageApi>
}
