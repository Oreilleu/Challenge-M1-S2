import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginateVariation } from '../types/interfaces/paginate-variation.interface'
import { fetchPaginateVariations } from '../api/variation'
import type { VariationSearchOption } from '../types/interfaces/variation-search-option.interface'

const useVariationStore = defineStore('variation', () => {
  const paginateVariation = ref<PaginateVariation | null>(null)

  const updatePaginateVariations = async (
    page: number,
    numberVariationPerPage: number,
    searchOption?: VariationSearchOption
  ) => {
    paginateVariation.value = await fetchPaginateVariations(
      page,
      numberVariationPerPage,
      searchOption
    )
  }

  return {
    paginateVariation,
    updatePaginateVariations
  }
})

export default useVariationStore
