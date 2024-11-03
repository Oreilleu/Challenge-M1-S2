import type { Civility } from '../civility.type'

export interface User {
  email: string
  civility: Civility
  firstname: string
  lastname: string
  password: string
  phone: string
}
