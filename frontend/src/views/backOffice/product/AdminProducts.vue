<template>
  <AdminLayout>
    <section class="page">
      <h1>Liste des produits</h1>

      <el-table
        empty-text="Aucun produit trouvé"
        style="width: auto; overflow: auto"
        :data="products"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="Nom"></el-table-column>
        <el-table-column prop="model" label="Modèle"></el-table-column>
        <el-table-column prop="category.name" label="Catégorie" placeholder="test">
          <template #default="scope">
            {{ !scope.row.category ? 'Sans catégorie' : scope.row.category.name }}
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <el-input v-model="search" placeholder="Rechercher"></el-input>
          </template>
          <template #default="scope">
            <el-button type="primary" @click="openDrawerUpdate(scope.row._id)">Editer</el-button>
            <el-button type="danger" @click="deleteProduct(scope.row._id)">Supprimer</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
import { fetchProducts } from '@/utils/api/product'
import localStorageHandler from '@/utils/localStorageHandler'
import useDrawerStore from '@/utils/store/useDrawerStore'
import toastHandler from '@/utils/toastHandler'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import type { Product } from '@/utils/types/product.interface'
import { ToastType } from '@/utils/types/toast-type.enum'
import { ref } from 'vue'
import { onMounted } from 'vue'

const products = ref<Array<Product>>([])
const drawerStore = useDrawerStore()

const search = ref('')

const openDrawerUpdate = (idProduct: string | undefined) => {
  if (!idProduct) {
    toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR)
    return
  }
  drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_PRODUCT, idProduct)
}

const deleteProduct = async (idProduct: string | undefined) => {
  if (!idProduct) {
    toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR)
    return
  }

  try {
    const resDeleteProduct = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/product/delete/${idProduct}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )

    const json = await resDeleteProduct.json()

    if (json.success) {
      toastHandler('Produit supprimé avec succès', ToastType.SUCCESS)
      products.value = products.value.filter((product) => product._id !== idProduct)
    } else {
      toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
    }
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
  }
}

onMounted(async () => {
  products.value = await fetchProducts()
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
