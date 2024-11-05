import { defineStore } from 'pinia'
import toastHandler from '../toastHandler'
import { ToastType } from '../types/toast-type.enum'
import { ref, watch } from 'vue'
import type { OptionCategory } from '../types/interfaces/option-category.interface'
import type { Category } from '../types/interfaces/category.interface'

const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const formattedOptionsCategories = ref<Array<OptionCategory>>([])

  const getCategory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category`)
      const json = await response.json()
      categories.value = json.data
      formattedOptionsCategories.value = json.data.map((category: Category) => {
        return {
          value: category._id,
          label: category.name
        }
      })
    } catch (error) {
      console.error(error)
      toastHandler('Erreur lors de la rcupération des catégories.', ToastType.ERROR)
    }
  }

  watch(
    categories,
    (newCategories) => {
      if (newCategories.length === 0) {
        getCategory()
      }
    },
    { immediate: true }
  )

  return { categories, formattedOptionsCategories, getCategory }
})

export default useCategoryStore
