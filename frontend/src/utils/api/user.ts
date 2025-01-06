import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import type { UpdateUserProfile, User } from '../types/interfaces/user.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'
import type { PaginateResponse } from '../types/interfaces/paginate-response.interface'

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
    toastHandler('Vous devez être connecté.', ToastType.ERROR)
    return null
  }

  try {
    const res: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })

    if (!res.ok) {
      return null
    }

    const json: ResponseApi<User> = await res.json()

    if (json.success) {
      return json.data || null
    } else {
      return null
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error)
    return null
  }
}

export const fetchDeleteAccount = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    toastHandler('Vous devez être connecté.', ToastType.ERROR)
    return false
  }

  try {
    const resDeleteAccount: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/user/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!resDeleteAccount.ok) return false

    const json: ResponseApi<null> = await resDeleteAccount.json()

    if (json.success) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du compte :', error)
    return false
  }
}

export const fetchSendEmailChangePassword = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    toastHandler('Vous devez être connecté.', ToastType.ERROR)
    return false
  }

  try {
    const res: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/user/change-my-password`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!res.ok) {
      return false
    }

    const json: ResponseApi<null> = await res.json()

    if (json.success) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de changement de mot de passe :", error)
    return false
  }
}

export const fetchPaginatedUsers = async (
  page: number,
  limit: number,
  searchInput?: string,
  searchKey?: string
): Promise<PaginateResponse<User>> => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/user/paginated-users?page=${page}&limit=${limit}&search=${searchInput || ''}&searchKey=${searchKey || ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )
    const json: PaginateResponse<User> = await response.json()

    if (!json.success || !json.data) {
      return {
        data: [],
        success: false,
        page: 1,
        limit: 10,
        total: 0
      }
    }

    return json
  } catch (error) {
    toastHandler('Une erreur est survenue lors de la récupération des utilisateurs.', ToastType.ERROR)
    return {
      data: [],
      success: false,
      page: 1,
      limit: 10,
      total: 0
    }
  }
}

export const fetchDeleteUser = async () => {
  const ok = "ok";
  console.log("to do: fetchDeleteAccount");
  return ok;
}

