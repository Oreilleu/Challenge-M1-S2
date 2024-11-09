export const REGEX_PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const REGEX_PHONE_VALIDATION =
  /^(\+?\d{1,3})?[-. ]?(\(?\d{1,4}\)?)?[-. ]?(\d{1,4}[-. ]?){1,4}\d{1,4}$(?=.{0,17}$)/

export const AVAILABLE_FILE_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export const MAX_IMAGES_PRODUCT = 5

export const NUMBER_ADMIN_PRODUCT_PER_PAGE = 10
