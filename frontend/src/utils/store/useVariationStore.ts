import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginateVariation } from '../types/interfaces/paginate-variation.interface'
import { fetchPaginateVariations, fetchPaginateVariationsByFilters } from '../api/variation'
import type { Filter } from '../types/interfaces/filter.interface'

const useVariationStore = defineStore('variation', () => {
  const paginateVariation = ref<PaginateVariation | null>(null)
  //   const paginateProductBySearchInput = ref<PaginateProduct | null>(null)

  const DEFAULT_PAGE = 1
  const DEFAULT_NUMBER_VARIATION_PER_PAGE = 10

  const updatePaginateVariations = async (page?: number, numberVariationPerPage?: number) => {
    paginateVariation.value = await fetchPaginateVariations(
      page || DEFAULT_PAGE,
      numberVariationPerPage || DEFAULT_NUMBER_VARIATION_PER_PAGE
    )
  }

  const updatePaginationByFilters = async (
    filters: Filter[],
    page?: number,
    numberVariationPerPage?: number
  ) => {
    paginateVariation.value = await fetchPaginateVariationsByFilters(
      filters,
      page || DEFAULT_PAGE,
      numberVariationPerPage || DEFAULT_NUMBER_VARIATION_PER_PAGE
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
    updatePaginationByFilters,
    clearPaginate
  }
})

export default useVariationStore
