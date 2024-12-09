import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import type { UpdateUserProfile } from '../types/interfaces/user.interface'
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
    return false
  }

  try {
    const res: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/is-admin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      toastHandler('Accès refusé', ToastType.ERROR)
      return false
    }

    const json: ResponseApi<boolean> = await res.json()

    return json.data || false
  } catch (error) {
    toastHandler("Une erreur s'est produite", ToastType.ERROR)
    return false
  }
}

export const updateUserProfile = async (userData: UpdateUserProfile) => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    toastHandler('Vous devez être connecté pour effectuer cette action', ToastType.ERROR)
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/update-profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })

    if (!res.ok) {
      toastHandler('Accès refusé. Veuillez vérifier vos informations.', ToastType.ERROR)
      return
    }

    const data = await res.json()
    toastHandler('Profil mis à jour avec succès', ToastType.SUCCESS)
    return data
  } catch (error) {
    toastHandler("Une erreur s'est produite. Veuillez réessayer.", ToastType.ERROR)
    console.error('Erreur lors de la mise à jour du profil :', error)
    return
  }
}
