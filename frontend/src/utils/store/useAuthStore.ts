import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isAuthenticated } from '@/utils/isAuthenticatedUser'
import localStorageHandler from '../localStorageHandler'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { useRouter } from 'vue-router'
import type { User } from '../types/user.interface'

const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const isAuthenticatedUser = ref(false)

  const checkAuthentication = async () => {
    isAuthenticatedUser.value = await isAuthenticated()
  }

  const signIn = (token: string, user: User) => {
    localStorageHandler().set(LocalStorageKeys.AUTH_TOKEN, token)
    localStorageHandler().set(LocalStorageKeys.USER, user)
    isAuthenticatedUser.value = true
    router.push('/')
  }

  const logout = () => {
    localStorageHandler().remove(LocalStorageKeys.AUTH_TOKEN)
    localStorageHandler().remove(LocalStorageKeys.USER)
    isAuthenticatedUser.value = false
    router.push('/login')
  }

  return {
    isAuthenticatedUser,
    checkAuthentication,
    signIn,
    logout
  }
})

export default useAuthStore
