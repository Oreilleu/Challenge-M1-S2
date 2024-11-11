export interface Category {
  _id?: string
  name: string
  description?: string
  image?: { files: FileList }
  nameImage?: string
  imageApi?: File
  parent?: string
}
