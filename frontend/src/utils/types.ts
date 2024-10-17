export type RegisterForm = {
  email: string
  password: string
  confirmPassword: string
  civility: Civility
  firstname: string
  lastname: string
  phone: string
}

export type RegisterFormErrors = {
  email: string
  password: string
  confirmPassword: string
  civility: string
  firstname: string
  lastname: string
  phone: string
}

export type LoginForm = {
  email: string
  password: string
}

export type LoginFormErrors = {
  email: string
  password: string
}

export type User = {
  email: string
  civility: Civility
  firstname: string
  lastname: string
  password: string
}

export type ResponseRegisterForm = {
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
