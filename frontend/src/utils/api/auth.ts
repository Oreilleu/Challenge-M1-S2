import localStorageHandler from '../localStorageHandler'
import { LocalStorageKeys } from '../types'

export const checkIntegrityUser = async () => {
  const authToken = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!authToken) {
    return false
  }

  const responseCheckIntegrity = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/check-integrity-user`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    }
  )

  if (!responseCheckIntegrity.ok) {
    return false
  }

  const jsonCheckIntegrity = await responseCheckIntegrity.json()

  return jsonCheckIntegrity.data.isValid
}
