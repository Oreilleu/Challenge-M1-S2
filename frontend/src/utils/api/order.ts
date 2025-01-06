import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { Order } from '../types/interfaces/order.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'
import type { PaginateResponse } from '../types/interfaces/paginate-response.interface'

export const fetchOrders = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/order/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    const json: ResponseApi<Array<Order>> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des commandes.',
        ToastType.ERROR
      )
      return []
    }

    return json.data || []
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des commandes.',
      ToastType.ERROR
    )
    return []
  }
}

export const fetchPaginatedOrders = async (
  page: number,
  limit: number,
  searchInput?: string,
  searchKey?: string
): Promise<PaginateResponse<Order>> => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/order/paginated-orders?page=${page}&limit=${limit}&search=${searchInput || ''}&searchKey=${searchKey || ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )
    const json: PaginateResponse<Order> = await response.json()

    if (!json.success || !json.data) {
      return {
        data: [],
        success: false,
        page: 1,
        limit: 10,
        total: 0
      }
    }

    return json;
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des commandes.',
      ToastType.ERROR
    )

    return {
      page: 1,
      limit: 10,
      total: 0,
      data: [],
      success: false
    }
  }
}

export const fetchDeleteOrder = async (id: string | undefined) => {

  if(!id) {
    toastHandler(
      'Une erreur est survenue lors de la suppression de la commande.',
      ToastType.ERROR
    )
    return false
  }
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/order/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    const json: ResponseApi<Order> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la suppression de la commande.',
        ToastType.ERROR
      )
      return false
    }

    return true
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la suppression de la commande.',
      ToastType.ERROR
    )
    return false
  }
  
}
