import type { ImageApi } from './image.interface'

export interface Category {
  _id?: string
  name: string
  description?: string
  image?: { files: FileList }
  nameImage?: string
  imageApi?: ImageApi,
  masterCategory: boolean,
  parent?: string
}
