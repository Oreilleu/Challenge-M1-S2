import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { OptionCategory } from '../types/interfaces/option-category.interface'
import type { Category } from '../types/interfaces/category.interface'
import { fetchCategories } from '../api/category'

const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const formattedOptionsCategories = ref<Array<OptionCategory>>([])

  const updateCategorie = async () => {
    categories.value = await fetchCategories()

    formattedOptionsCategories.value = categories.value.map((category: Category) => {
      return {
        value: category._id || '',
        label: category.name
      }
    })
  }

  onMounted(() => {
    if (!categories.value.length) {
      updateCategorie()
    }
  })

  return { categories, formattedOptionsCategories, updateCategorie }
})

export default useCategoryStore
