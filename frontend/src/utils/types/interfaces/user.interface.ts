import type { Civility } from '../civility.type'

export interface User {
  _id?: string
  email: string
  civility: Civility
  firstname: string
  lastname: string
  password: string
  phone: string
}

export interface UpdateUserProfile {
  civility: string
  firstname: string
  lastname: string
  email: string
  phone: string
}
