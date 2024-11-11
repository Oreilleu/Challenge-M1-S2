export interface Category {
  _id?: string
  name: string
  description?: string
  image?: { file: File }
  imageApi?: File
  parent?: string
}
