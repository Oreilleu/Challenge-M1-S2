import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { Filter } from '../types/interfaces/filter.interface'
import type { PaginateVariation } from '../types/interfaces/paginate-variation.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import type { VariationSearchOption } from '../types/interfaces/variation-search-option.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'

export const fetchPaginateVariations = async (
  page: number,
  limit: number,
  searchOption?: VariationSearchOption
) => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/variation/get-paginate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: JSON.stringify({ page, limit, searchOption })
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

export const fetchPaginateVariationsByFilters = async (
  filters: Filter[],
  page: number,
  limit: number
) => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/variation/get-paginate-by-filters`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: JSON.stringify({ filters, page, limit })
      }
    )

    const json: ResponseApi<any> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des produits',
        ToastType.ERROR
      )
      return {}
    }

    return json.data || {}
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return {}
  }
}
