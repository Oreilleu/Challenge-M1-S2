import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { Category } from '../types/interfaces/category.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'
import type { PaginateResponse } from '../types/interfaces/paginate-response.interface'

export const fetchCategories = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category`)
    const json: ResponseApi<Category[]> = await response.json()

    if (!json.success) {
      return []
    }

    return json.data || []
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la récupération des catégories.', ToastType.ERROR)

    return []
  }
}

export const fetchPaginatedCategories = async (page: number, limit: number, searchInput?: string ):  Promise<PaginateResponse<Category>> => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/paginated-categories?page=${page}&limit=${limit}&search=${searchInput || ''}`);
    const json : PaginateResponse<Category> = await response.json();

    if (!json.success || !json.data) {
      return {
        data: [],
        success: false,
        page: 1,
        limit: 10,
        total: 0
      };
    }

    return json;
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la récupération des catégories.', ToastType.ERROR)

    return {
      page: 1,
      limit: 10,
      total: 0,
      data: [],
      success: false
    };
  }
};

export const fetchSubCategories = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/sub-categories`)
    const json: ResponseApi<Category[]> = await response.json()

    if (!json.success) {
      return []
    }

    return json.data || []
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la récupération des sous-catégories.', ToastType.ERROR)

    return []
  }
}

export const fetchMasterCategories = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/master-categories`)
    const json: ResponseApi<Category[]> = await response.json()

    if (!json.success) {
      return []
    }

    return json.data || []
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la récupération des catégories principales.', ToastType.ERROR)

    return []
  }
}

export const fetchDeleteCategory = async (id: string | undefined) => {
  if (!id) {
    toastHandler(
      "Erreur lors de la récupération de l'identifiant de la catégorie.",
      ToastType.ERROR
    )
    return false
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    const json: ResponseApi<Category> = await res.json()

    if (!res.ok) {
      toastHandler(
        json.message || 'Erreur lors de la suppression de la catégorie.', 
        ToastType.ERROR
      )
      return false
    }

    if (!json.success) {
      toastHandler(
        json.message || 'Erreur lors de la suppression de la catégorie.',
        ToastType.ERROR
      )
      return false
    }

    return true
  } catch (error) {
    toastHandler('Erreur lors de la suppression de la catégorie.', ToastType.ERROR)
    return false
  }
}

export const getCategoryById = async (id: string | null) => {
  if (!id) {
    toastHandler('Erreur lors de la récupération de la catégorie', ToastType.ERROR)
    return {} as Category
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    if (!res.ok) {
      toastHandler('Erreur lors de la récupération de la catégorie', ToastType.ERROR)
      return {} as Category
    }

    const json: ResponseApi<Category> = await res.json()

    if (!json.success) {
      toastHandler(json.message || 'Erreur lors de la récupération de la catégorie', ToastType.ERROR)
      return {} as Category
    }

    if (!json.data) {
      toastHandler('Erreur lors de la récupération de la catégorie', ToastType.ERROR)
      return {} as Category
    }

    return json.data
  } catch (error) {
    toastHandler('Erreur lors de la récupération de la catégorie', ToastType.ERROR)
    return {} as Category
  }
}
