import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { PaginateVariation } from '../types/interfaces/paginate-variation.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'

export const fetchPaginateVariations = async (page: number, limit: number) => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/variation/get-paginate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: JSON.stringify({ page, limit })
      }
    )

    const json: ResponseApi<PaginateVariation> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des produits',
        ToastType.ERROR
      )
      return {} as PaginateVariation
    }

    return json.data || ({} as PaginateVariation)
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return {} as PaginateVariation
  }
}
