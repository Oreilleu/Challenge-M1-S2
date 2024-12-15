import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import type { Product } from '../types/interfaces/product.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { ToastType } from '../types/toast-type.enum'
import type { PaginateProduct } from '../types/interfaces/pagiante-product.interface'
import type { ColumnProduct } from '../types/column-product.enum'
import type { ProductSearchOption } from '../types/interfaces/product-search-option.interface'

export const fetchProducts = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    const json: ResponseApi<Array<Product>> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des produits',
        ToastType.ERROR
      )
      return []
    }

    return json.data || []
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return []
  }
}

export const fetchProductsByCategories = async (id: string) => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/product/get-by-category/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )

    const json: ResponseApi<Array<Product>> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des produits',
        ToastType.ERROR
      )
      return []
    }

    return json.data || []
  }
  catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return []
  }
}

export const fetchPaginatedProducts = async (
  page: number,
  limit: number,
  searchOption?: ProductSearchOption
) => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/product/get-paginate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: JSON.stringify({ page, limit, searchOption })
      }
    )

    const json: ResponseApi<PaginateProduct> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des produits',
        ToastType.ERROR
      )
      return {} as PaginateProduct
    }

    return json.data || ({} as PaginateProduct)
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return {} as PaginateProduct
  }
}

export const fetchProductsBySearchInput = async (
  searchInput: string,
  column: ColumnProduct,
  page: number,
  limit: number
) => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      },
      body: JSON.stringify({ searchInput, column, page, limit })
    })

    const json: ResponseApi<PaginateProduct> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des produits',
        ToastType.ERROR
      )
      return {} as PaginateProduct
    }

    return json.data || ({} as PaginateProduct)
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return {} as PaginateProduct
  }
}

export const fetchProductById = async (id: string | null) => {
  if (!id) {
    toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR)
    return {} as Product
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-one/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    if (!res.ok) {
      toastHandler('Erreur lors de la récupération du produit', ToastType.ERROR)
      return {} as Product
    }

    const json: ResponseApi<Product> = await res.json()

    if (!json.success) {
      toastHandler(json.message || 'Erreur lors de la récupération du produit', ToastType.ERROR)
      return {} as Product
    }

    if (!json.data) {
      toastHandler('Erreur lors de la récupération du produit', ToastType.ERROR)
      return {} as Product
    }

    return json.data
  } catch (error) {
    toastHandler('Erreur lors de la récupération du produit', ToastType.ERROR)
    return {} as Product
  }
}



export const fetchDeleteProduct = async (id: string | undefined) => {
  if (!id) {
    toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR)
    return false
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    if (!res.ok) {
      toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
      return false
    }

    const json: ResponseApi<Product> = await res.json()

    if (!json.success) {
      toastHandler(json.message || 'Erreur lors de la suppression du produit', ToastType.ERROR)
      return false
    }

    return true
  } catch (error) {
    toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
    return false
  }
}
