import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DeliveryAddress } from '../types/interfaces/delivery-address.interface'
import { fetchDeliveryAddress } from '../api/delivery-address'

const useDeliveryAddressStore = defineStore('deliveryAddress', () => {
  const deliveryAddress = ref<DeliveryAddress[]>([])

  const updateDeliveryAddress = async () => {
    deliveryAddress.value = await fetchDeliveryAddress()
  }

  return {
    deliveryAddress,
    updateDeliveryAddress
  }
})

export default useDeliveryAddressStore
