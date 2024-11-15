import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPaginatedProducts } from '../api/product'
import type { PaginateProduct } from '../types/interfaces/pagiante-product.interface'
import type { ProductSearchOption } from '../types/interfaces/product-search-option.interface'

const useProductStore = defineStore('product', () => {
  const paginateProduct = ref<PaginateProduct | null>(null)

  const updatePaginateProducts = async (
    page: number,
    numberProductPerPage: number,
    searchOption?: ProductSearchOption
  ) => {
    paginateProduct.value = await fetchPaginatedProducts(page, numberProductPerPage, searchOption)
  }

  const clearPaginate = () => {
    paginateProduct.value = null
  }

  return {
    paginateProduct,
    updatePaginateProducts,
    clearPaginate
  }
})

export default useProductStore
