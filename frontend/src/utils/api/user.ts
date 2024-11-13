import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'
// TODO : faire un fetcher
export const fetchIsVerifiedUser = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/is-verified`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      toastHandler('Accès refusé', ToastType.ERROR)
      return
    }

    const data = await res.json()
    return data
  } catch (error) {
    toastHandler("Une erreur s'est produite", ToastType.ERROR)
    return
  }
}

export const fetchIsAdminUser = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/is-admin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      toastHandler('Accès refusé', ToastType.ERROR)
      return
    }

    const data = await res.json()
    return data
  } catch (error) {
    toastHandler("Une erreur s'est produite", ToastType.ERROR)
    return
  }
}
