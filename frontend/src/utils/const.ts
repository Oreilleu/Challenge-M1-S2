import { ColumnProduct } from './types/column-product.enum'
import { ColumnUser } from './types/column-user.enum'

export const REGEX_PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const REGEX_PHONE_VALIDATION =
  /^(\+?\d{1,3})?[-. ]?(\(?\d{1,4}\)?)?[-. ]?(\d{1,4}[-. ]?){1,4}\d{1,4}$(?=.{0,17}$)/

export const AVAILABLE_FILE_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export const MAX_IMAGES_PRODUCT = 5

export const NUMBER_ADMIN_PRODUCT_PER_PAGE = 3

export const OPTION_PRODUCT_SEARCH_COLUMN = [
  { label: 'Toutes les colonnes', value: ColumnProduct.ALL },
  { label: 'Nom', value: ColumnProduct.NAME },
  { label: 'Modèle', value: ColumnProduct.MODEL },
  { label: 'Catégorie', value: ColumnProduct.CATEGORY }
]

export const VARIATION_PER_PAGE = 15

export const NUMBER_ADMIN_USER_PER_PAGE = 10

export const OPTION_USER_SEARCH_COLUMN = [
  { label: 'Toutes les colonnes', value: ColumnUser.ALL },
  { label: 'Email', value: ColumnUser.EMAIL },
  { label: 'Prénom', value: ColumnUser.FIRSTNAME }
]
