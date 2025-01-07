import type { User } from './user.interface'

export interface PaginateUser {
  paginates: Array<User>
  count: number
}
