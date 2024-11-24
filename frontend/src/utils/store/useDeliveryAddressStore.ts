import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { DeliveryAddress } from '../types/interfaces/delivery-address.interface'
import { fetchDeliveryAddress } from '../api/delivery-address'

const useDeliveryAddressStore = defineStore('deliveryAddress', () => {
  const deliveryAddress = ref<DeliveryAddress[]>([])

  const updateDeliveryAddress = async () => {
    deliveryAddress.value = await fetchDeliveryAddress()
  }

  onMounted(() => {
    if (deliveryAddress.value.length > 0) return

    updateDeliveryAddress()
  })

  return {
    deliveryAddress,
    updateDeliveryAddress
  }
})

export default useDeliveryAddressStore
