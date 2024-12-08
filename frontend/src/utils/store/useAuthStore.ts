import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { isAuthenticated } from '@/utils/isAuthenticatedUser'
import localStorageHandler from '../localStorageHandler'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { useRouter } from 'vue-router'
import type { User } from '../types/interfaces/user.interface'
import { fetchIsAdminUser } from '../api/user'

const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuthenticatedUser = ref(false)
  const isAdmin = ref(false)

  const checkAuthentication = async () => {
    isAuthenticatedUser.value = await isAuthenticated()
  }

  const checkIsAdmin = async () => {
    isAdmin.value = await fetchIsAdminUser()
  }

  const signIn = (token: string, user: User, redirecTo?: string) => {
    localStorageHandler().set(LocalStorageKeys.AUTH_TOKEN, token)
    localStorageHandler().set(LocalStorageKeys.USER, user)
    isAuthenticatedUser.value = true
    router.push(redirecTo || '/')
    checkIsAdmin()
  }

  const logout = () => {
    localStorageHandler().remove(LocalStorageKeys.AUTH_TOKEN)
    localStorageHandler().remove(LocalStorageKeys.USER)
    localStorageHandler().remove(LocalStorageKeys.SELECTED_ADDRESS_ID)
    localStorageHandler().remove(LocalStorageKeys.BILLING_ADDRESS)

    isAuthenticatedUser.value = false
    router.push('/login')
  }

  onMounted(() => {
    checkAuthentication()
    checkIsAdmin()
  })

  return {
    isAuthenticatedUser,
    isAdmin,
    checkAuthentication,
    checkIsAdmin,
    signIn,
    logout
  }
})

export default useAuthStore
