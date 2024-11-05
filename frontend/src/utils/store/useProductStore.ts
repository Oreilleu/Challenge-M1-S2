import { defineStore } from 'pinia'
import type { Product } from '../types/product.interface'
import { ref } from 'vue'

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
