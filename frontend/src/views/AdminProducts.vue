<template>
  <AdminLayout>
    <section>
      <h1>Liste des produits</h1>

      <ul>
        <li v-for="product in products" :key="product._id">
          <el-button @click="openDrawerUpdate(product._id)">Modifier : {{ product._id }}</el-button>
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
import { fetchProducts } from '@/utils/api/product'
import useDrawerStore from '@/utils/store/useDrawerStore'
import toastHandler from '@/utils/toastHandler'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import type { Product } from '@/utils/types/product.interface'
import { ToastType } from '@/utils/types/toast-type.enum'
import { ref } from 'vue'
import { onMounted } from 'vue'

const products = ref<Array<Product>>([])
const drawerStore = useDrawerStore()

const openDrawerUpdate = (idProduct: string | undefined) => {
  if (!idProduct) {
    toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR)
    return
  }
  drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_PRODUCT, idProduct)
}

onMounted(async () => {
  products.value = await fetchProducts()
})
</script>

<style scoped></style>
