import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPaginatedProducts } from '../api/product'
import type { PaginateProduct } from '../types/interfaces/pagiante-product.interface'

const useProductStore = defineStore('product', () => {
  const paginateProduct = ref<PaginateProduct>()

  const DEFAULT_PAGE = 1
  const DEFAULT_NUMBER_PRODUCT_PER_PAGE = 10

  const updateProducts = async (page?: number, numberProductPerPage?: number) => {
    paginateProduct.value = await fetchPaginatedProducts(
      page || DEFAULT_PAGE,
      numberProductPerPage || DEFAULT_NUMBER_PRODUCT_PER_PAGE
    )
  }

  return { paginateProduct, updateProducts }
})

export default useProductStore
