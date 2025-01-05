import {defineStore} from 'pinia'
import {onMounted, ref} from 'vue'
import type {User} from '../types/interfaces/user.interface'
import { fetchPaginatedUsers } from '../api/user'
import type {PaginateResponse} from '../types/interfaces/paginate-response.interface'

const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])
    
    const paginatedUsers = ref<PaginateResponse<User>>({
        success: false,
        data: [],
        page: 1,
        limit: 10,
        total: 0
    })

    const updatePaginatedUsers = async (page: number, limit: number, searchInput?: string, searchKey?: string) => {
        paginatedUsers.value = await fetchPaginatedUsers(page, limit, searchInput || '', searchKey || '')
    }

    onMounted(() => {
        if (!users.value.length) {
            updatePaginatedUsers(1, 10)
        }
    })

    return {
        users,
        paginatedUsers,
        updatePaginatedUsers
    }
})

export default useUserStore