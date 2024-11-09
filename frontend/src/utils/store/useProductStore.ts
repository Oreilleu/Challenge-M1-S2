import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPaginatedProducts, fetchProductsBySearchInput } from '../api/product'
import type { PaginateProduct } from '../types/interfaces/pagiante-product.interface'
import type { ColumnProduct } from '../types/column-product.enum'

const useProductStore = defineStore('product', () => {
  const paginateProduct = ref<PaginateProduct | null>(null)
  const paginateProductBySearchInput = ref<PaginateProduct | null>(null)

  const DEFAULT_PAGE = 1
  const DEFAULT_NUMBER_PRODUCT_PER_PAGE = 10

  const updatePaginateProducts = async (page?: number, numberProductPerPage?: number) => {
    paginateProduct.value = await fetchPaginatedProducts(
      page || DEFAULT_PAGE,
      numberProductPerPage || DEFAULT_NUMBER_PRODUCT_PER_PAGE
    )
  }

  const updatePaginateProductsBySearchInput = async (
    search: string,
    column: ColumnProduct,
    page?: number,
    numberProductPerPage?: number
  ) => {
    paginateProductBySearchInput.value = await fetchProductsBySearchInput(
      search,
      column,
      page || DEFAULT_PAGE,
      numberProductPerPage || DEFAULT_NUMBER_PRODUCT_PER_PAGE
    )
  }

  const clearSearch = () => {
    paginateProductBySearchInput.value = null
  }

  const clearPaginate = () => {
    paginateProduct.value = null
  }

  return {
    paginateProduct,
    paginateProductBySearchInput,
    updatePaginateProducts,
    updatePaginateProductsBySearchInput,
    clearSearch,
    clearPaginate
  }
})

export default useProductStore
