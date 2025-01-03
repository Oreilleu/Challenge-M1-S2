import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { OptionCategory } from '../types/interfaces/option-category.interface'
import type { Category } from '../types/interfaces/category.interface'
import { fetchCategories, fetchSubCategories, fetchMasterCategories, fetchPaginatedCategories } from '../api/category'
import type { PaginateResponse } from '../types/interfaces/paginate-response.interface'

const useCategoryStore = defineStore('category', () => {
  const subCategories = ref<Category[]>([])
  const categories = ref<Category[]>([])
  const masterCategories = ref<Category[]>([])
  const paginatedCategories = ref<PaginateResponse<Category>>({
    data: [],
    page: 1,
    limit: 10,
    total: 0
  });
  const formattedOptionsSubCategories = ref<Array<OptionCategory>>([])
  const formattedOptionsMasterCategories = ref<Array<OptionCategory>>([])

  const loadCategories = async () => {
    categories.value = await fetchCategories()
  }

  const loadSubCategories = async () => {
    subCategories.value = await fetchSubCategories()

    formattedOptionsSubCategories.value = subCategories.value.map((category: Category) => {
      return {
        value: category._id || '',
        label: category.name
      }
    })
  }

  const loadMasterCategories = async () => {
    masterCategories.value = await fetchMasterCategories()

    formattedOptionsMasterCategories.value = masterCategories.value.map((category: Category) => {
      return {
        value: category._id || '',
        label: category.name
      }
    })
  }

  const loadPaginatedCategories = async (page: number, limit: number, searchInput?: string) => {
    const result = await fetchPaginatedCategories(page, limit, searchInput || '');
    paginatedCategories.value = result;
    console.log('Paginated Categories value: ', paginatedCategories.value);
  }

  onMounted(() => {
    if(!categories.value.length){
      loadCategories()
      loadSubCategories()
      loadPaginatedCategories(1, 10, '');
    }
    if(!masterCategories.value.length){
      loadMasterCategories()
    }
  })

  return { categories, paginatedCategories, formattedOptionsSubCategories, formattedOptionsMasterCategories, loadCategories, loadPaginatedCategories};
})

export default useCategoryStore