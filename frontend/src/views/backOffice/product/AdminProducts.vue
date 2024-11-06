<template>
  <AdminLayout>
    <section class="page">
      <h1>Liste des produits</h1>

      <el-table
        empty-text="Aucun produit trouvé"
        style="width: auto; overflow: auto"
        :data="productStore.paginateProduct?.paginates"
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
            <el-button type="danger" @click="displayModalDelete(scope.row)">Supprimer</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :page-size="NUMBER_OF_PRODUCTS_PER_PAGE"
        layout="prev, pager, next"
        :total="productStore.paginateProduct?.totalProducts || 0"
        :hide-on-single-page="
          productStore.paginateProduct?.totalProducts || 0 < NUMBER_OF_PRODUCTS_PER_PAGE
        "
        @current-change="setCurrentPage"
      />
    </section>
  </AdminLayout>
  <Modal
    :model-value="!!productToDelete"
    :title="'Suppression du produit : ' + productToDelete?.name"
    @close="productToDelete = null"
    @confirm="deleteProduct(productToDelete?._id)"
  >
  </Modal>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
import Modal from '@/components/Modal.vue'
import { fetchDeleteProduct } from '@/utils/api/product'
import useDrawerStore from '@/utils/store/useDrawerStore'
import useProductStore from '@/utils/store/useProductStore'
import toastHandler from '@/utils/toastHandler'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import type { Product } from '@/utils/types/interfaces/product.interface'
import { ToastType } from '@/utils/types/toast-type.enum'
import { ref, watch } from 'vue'
import { onMounted } from 'vue'

const drawerStore = useDrawerStore()
const productStore = useProductStore()
const page = ref(1)
const NUMBER_OF_PRODUCTS_PER_PAGE = 10

watch(page, (newPage) => {
  console.log('Page', newPage)
})
const productToDelete = ref<Product | null>(null)

const setCurrentPage = (newPage: number) => {
  page.value = newPage

  productStore.updateProducts(newPage, NUMBER_OF_PRODUCTS_PER_PAGE)
}

const search = ref('')

const openDrawerUpdate = (idProduct: string | undefined) => {
  if (!idProduct) {
    toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR)
    return
  }
  drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_PRODUCT, idProduct)
}

const displayModalDelete = (product: Product) => {
  productToDelete.value = product
}

const deleteProduct = async (idProduct: string | undefined) => {
  const isDeleted = await fetchDeleteProduct(idProduct)

  if (isDeleted) {
    toastHandler('Produit supprimé avec succès', ToastType.SUCCESS)
    productStore.updateProducts(page.value, NUMBER_OF_PRODUCTS_PER_PAGE)
  } else {
    toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
  }
  productToDelete.value = null
}

onMounted(() => {
  productStore.updateProducts(page.value, NUMBER_OF_PRODUCTS_PER_PAGE)
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
