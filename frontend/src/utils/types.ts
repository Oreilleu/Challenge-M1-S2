export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  civility: Civility
  firstname: string
  lastname: string
  phone: string
}

export interface Product {
  _id?: string
  category?: string
  name: string
  description: string
  brand: string
  model: string
  variation: Array<{
    images: string[]
    price: number
    quantite: number
    filter: {
      name: string
      value: string
    }
  }>
}

export type CreateProductForm = Omit<Product, '_id'>

export interface RegisterFormErrors {
  email: string
  password: string
  confirmPassword: string
  civility: string
  firstname: string
  lastname: string
  phone: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface LoginFormErrors {
  email: string
  password: string
}

export interface User {
  email: string
  civility: Civility
  firstname: string
  lastname: string
  password: string
}

export interface ResponseRegisterForm {
  success: boolean
  message?: string
  data?: { user: User } & { jwt: string }
  errors?: string[]
}

type Civility = 'man' | 'woman'

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

export enum LocalStorageKeys {
  USER = 'user',
  AUTH_TOKEN = 'auth-token'
}

export enum DrawerType {
  CREATE_PRODUCT = 'create-product',
  CREATE_CATEGORY = 'create-category',
  CREATE_USER = 'create-user'
}

export interface ForgotPasswordForm {
  email: string
}

export interface ForgotPasswordErrorsForm {
  email: string
}

export interface ResponseForgotPasswordForm {
  success: boolean
  message?: string
  errors?: string[]
}

export interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

export interface ResetPasswordErrorsForm {
  password: string
  confirmPassword: string
}

export interface ResponseResetPasswordForm {
  success: boolean
  message: string
  errors?: string[]
}
