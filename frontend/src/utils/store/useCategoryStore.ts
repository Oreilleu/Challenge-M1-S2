import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { OptionCategory } from '../types/interfaces/option-category.interface'
import type { Category } from '../types/interfaces/category.interface'
import { fetchCategories, fetchSubCategories, fetchMasterCategories } from '../api/category'

const useCategoryStore = defineStore('category', () => {
  const subCategories = ref<Category[]>([])
  const categories = ref<Category[]>([])
  const masterCategories = ref<Category[]>([])
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

  onMounted(() => {
    if(!categories.value.length){
      loadCategories()
      loadSubCategories()

    }
    if(!masterCategories.value.length){
      loadMasterCategories()
    }
  })

  return { categories, formattedOptionsSubCategories, formattedOptionsMasterCategories, loadCategories}
})

export default useCategoryStore