import localStorageHandler from '../localStorageHandler'
import toastHandler from '../toastHandler'
import type { DeliveryAddress } from '../types/interfaces/delivery-address.interface'
import type { ResponseApi } from '../types/interfaces/response-api.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import { ToastType } from '../types/toast-type.enum'

export const fetchDeliveryAddress = async () => {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/delivery-adress/get-all`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )

    const json: ResponseApi<DeliveryAddress[]> = await response.json()

    if (!json.success) {
      toastHandler(
        json.message || 'Une erreur est survenue lors de la récupération des adresses de livraison',
        ToastType.ERROR
      )
      return [] as DeliveryAddress[]
    }

    return json.data || ([] as DeliveryAddress[])
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des adresses de livraison',
      ToastType.ERROR
    )
    return [] as DeliveryAddress[]
  }
}
