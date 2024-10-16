import { checkIntegrityUser } from './api/auth'
import localStorageHandler from './localStorageHandler'
import { LocalStorageKeys } from './types'

const removeAuthStorage = () => {
  localStorageHandler().remove(LocalStorageKeys.AUTH_TOKEN)
  localStorageHandler().remove(LocalStorageKeys.USER)
}

export const isAuthenticated = async () => {
  const authToken = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)
  const user = localStorageHandler().get(LocalStorageKeys.USER)

  if (!authToken || !user) {
    removeAuthStorage()
    return false
  }

  const isTokenValid = await checkIntegrityUser()

  if (!isTokenValid) {
    removeAuthStorage()
    return false
  }

  return true
}
