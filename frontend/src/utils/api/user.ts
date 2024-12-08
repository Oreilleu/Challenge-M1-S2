import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'
import type { PaginateUser } from '../types/interfaces/paginate-user.interface'
import type { UserSearchOption } from '../types/interfaces/user-search-option.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'

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

export const fetchPaginatedUsers = async (
  page: number,
  limit: number,
  searchOption?: UserSearchOption
) => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/user/get-paginate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: JSON.stringify({ page, limit, searchOption })
      }
    )

    const json: ResponseApi<PaginateUser> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des utilisateurs',
        ToastType.ERROR
      )
      return {} as PaginateUser
    }

    return json.data || ({} as PaginateUser)
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des utilisateurs',
      ToastType.ERROR
    )
    return {} as PaginateUser
  }
}
