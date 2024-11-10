import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginateVariation } from '../types/interfaces/paginate-variation.interface'
import { fetchPaginateVariations } from '../api/variation'

const useVariationStore = defineStore('variation', () => {
  const paginateVariation = ref<PaginateVariation | null>(null)
  //   const paginateProductBySearchInput = ref<PaginateProduct | null>(null)

  const DEFAULT_PAGE = 1
  const DEFAULT_NUMBER_VARIATION_PER_PAGE = 10

  const updatePaginateVariations = async (page?: number, numberProductPerPage?: number) => {
    paginateVariation.value = await fetchPaginateVariations(
      page || DEFAULT_PAGE,
      numberProductPerPage || DEFAULT_NUMBER_VARIATION_PER_PAGE
    )
  }

  //   const updatePaginateProductsBySearchInput = async (
  //     search: string,
  //     column: ColumnProduct,
  //     page?: number,
  //     numberProductPerPage?: number
  //   ) => {
  //     paginateProductBySearchInput.value = await fetchProductsBySearchInput(
  //       search,
  //       column,
  //       page || DEFAULT_PAGE,
  //       numberProductPerPage || DEFAULT_NUMBER_PRODUCT_PER_PAGE
  //     )
  //   }

  //   const clearSearch = () => {
  //     paginateProductBySearchInput.value = null
  //   }

  const clearPaginate = () => {
    paginateVariation.value = null
  }

  return {
    paginateVariation,
    updatePaginateVariations,
    clearPaginate
  }
})

export default useVariationStore
