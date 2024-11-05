import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../types/interfaces/product.interface'

const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  //   const getProducts = async () => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product`)
  //       const json = await response.json()
  //       products.value = json.data
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  return {}
})

export default useProductStore
