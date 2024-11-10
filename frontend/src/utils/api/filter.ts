import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'

export const fetchFilters = async () => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/product/get-filters`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )

    const json: ResponseApi<Record<string, string[]>> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des filtres',
        ToastType.ERROR
      )
      return {}
    }

    return json.data || {}
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des filtres',
      ToastType.ERROR
    )
    return {}
  }
}
