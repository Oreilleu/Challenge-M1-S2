import type { User } from './user.interface'

export interface ResultAuth {
  jwt: string
  user: User
}
