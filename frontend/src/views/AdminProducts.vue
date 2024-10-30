<template>
  <AdminLayout>
    <section>
      <h1>Liste des produits</h1>

      <ul>
        <li v-for="product in products" :key="product._id">
          <el-button @click="openDrawerUpdate">Modifier : {{ product._id }}</el-button>
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
import localStorageHandler from '@/utils/localStorageHandler'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import type { Product } from '@/utils/types/product.interface'
import type { ResponseApi } from '@/utils/types/response-api.interface'
import { ToastType } from '@/utils/types/toast-type.enum'
import { ref } from 'vue'
import { onMounted } from 'vue'

const products = ref<Array<Product>>([])

const fetchProducts = async () => {
  try {
    const response: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })
    const json: ResponseApi<Array<Product>> = await response.json()

    if (!json.success) {
      throw new Error(json.message)
    }

    products.value = json.data || []
  } catch (error: any) {
    toastHandler(
      error.message || 'Une erreur est survenue lors de la récupération des produits',
      ToastType.ERROR
    )
    return
  }
}

const openDrawerUpdate = () => {
  console.log('openDrawerUpdate')
}

onMounted(async () => {
  await fetchProducts()

  console.log(products)
})
</script>

<style scoped></style>
