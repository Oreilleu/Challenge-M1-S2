import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { FormattedFilters } from '../types/interfaces/formatedFilters.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'

export const fetchFilters = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/filter/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    const json: ResponseApi<FormattedFilters> = await response.json()

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
