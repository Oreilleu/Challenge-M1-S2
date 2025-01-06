import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { Order } from '../types/interfaces/order.interface'
import { fetchOrders, fetchPaginatedOrders } from '../api/order'
import type { PaginateResponse } from '../types/interfaces/paginate-response.interface'

const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const paginatedOrders = ref<PaginateResponse<Order>>({
    success: false,
    data: [],
    page: 1,
    limit: 10,
    total: 0
  })


  const updateOrders = async () => {
    orders.value = await fetchOrders()
  }

  const updatePaginatedOrders = async (page: number, limit: number, searchInput?: string, searchKey?: string) => {
    paginatedOrders.value = await fetchPaginatedOrders(page, limit, searchInput || '', searchKey || '')
  }

  onMounted(() => {
    if (!orders.value.length){
      updateOrders()
    }

    if (!paginatedOrders.value.data.length){
      updatePaginatedOrders(1, 10)
    }
  })

  return {
    orders,
    paginatedOrders,
    updateOrders,
    updatePaginatedOrders
  }
})

export default useOrderStore
