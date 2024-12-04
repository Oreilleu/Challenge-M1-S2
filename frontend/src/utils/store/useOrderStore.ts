import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { Order } from '../types/interfaces/order.interface'
import { fetchOrders } from '../api/order'

const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])

  const updateOrders = async () => {
    orders.value = await fetchOrders()
  }

  onMounted(() => {
    if (orders.value.length > 0) return

    updateOrders()
  })

  return {
    orders,
    updateOrders
  }
})

export default useOrderStore
