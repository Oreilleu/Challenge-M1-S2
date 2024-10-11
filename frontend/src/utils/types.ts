export type RegisterForm = {
  email: string
  password: string
  civility: Civility
  firstname: string
  lastname: string
}

export type RegisterErrorsForm = {
  email: string
  password: string
  civility: string
  firstname: string
  lastname: string
}

type Civility = 'man' | 'woman'

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}
