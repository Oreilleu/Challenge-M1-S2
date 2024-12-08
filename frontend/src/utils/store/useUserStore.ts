import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPaginatedUsers } from '../api/user'
import type { PaginateUser } from '../types/interfaces/paginate-user.interface'
import type { UserSearchOption } from '../types/interfaces/user-search-option.interface'

const useUserStore = defineStore('user', () => {
  const paginateUser = ref<PaginateUser | null>(null)

  const updatePaginateUsers = async (
    page: number,
    numberUserPerPage: number,
    searchOption?: UserSearchOption
  ) => {
    paginateUser.value = await fetchPaginatedUsers(page, numberUserPerPage, searchOption)
  }

  const clearPaginate = () => {
    paginateUser.value = null
  }

  return {
    paginateUser,
    updatePaginateUsers,
    clearPaginate
  }
})

export default useUserStore
