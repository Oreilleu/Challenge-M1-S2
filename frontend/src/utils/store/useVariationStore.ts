import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginateVariation } from '../types/interfaces/paginate-variation.interface'
import { fetchPaginateVariations } from '../api/variation'
import type { PaginateVariationParams } from '../types/interfaces/paginate-variation-params.interface'
import type { OptionCategory } from '../types/interfaces/option-category.interface'

const useVariationStore = defineStore('variation', () => {
  const paginateVariation = ref<PaginateVariation | null>(null)
  const selectedCategory = ref<OptionCategory | null>(null)

  const updatePaginateVariations = async ({
    page,
    limit,
    searchOption,
    idSubCategories
  }: PaginateVariationParams) => {
    paginateVariation.value = await fetchPaginateVariations({
      page,
      limit,
      idMasterCategory: selectedCategory.value ? selectedCategory.value.value : undefined,
      idSubCategories,
      searchOption
    })
  }

  return {
    paginateVariation,
    selectedCategory,
    updatePaginateVariations
  }
})

export default useVariationStore
