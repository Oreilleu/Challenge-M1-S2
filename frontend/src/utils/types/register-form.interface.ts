import type { User } from './user.interface'

export interface RegisterForm extends User {
  confirmPassword: string
}
