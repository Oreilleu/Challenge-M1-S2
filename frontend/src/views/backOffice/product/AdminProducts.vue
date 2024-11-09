<template>
  <AdminLayout>
    <section class="page">
      <h1>Liste des produits</h1>

      <el-table
        empty-text="Aucun produit trouvé"
        style="width: auto; overflow: auto"
        :default-sort="{ prop: 'name', order: 'descending' }"
        :data="
          productStore.paginateProductBySearchInput?.paginatesProducts ||
          productStore.paginateProduct?.paginatesProducts
        "
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="Nom" />
        <el-table-column prop="model" label="Modèle" />
        <el-table-column prop="category.name" label="Catégorie">
          <template #default="scope">
            {{ !scope.row.category ? 'Sans catégorie' : scope.row.category.name }}
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <el-input
              v-model="search"
              placeholder="Rechercher"
              style="margin-bottom: 5px"
              @input="onChangeSearch"
            />
            <el-select v-model="searchColumn">
              <el-option
                v-for="item in optionsSearchColumn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template #default="scope">
            <el-button type="primary" @click="openDrawerUpdate(scope.row._id)">Editer</el-button>
            <el-button type="danger" @click="displayModalDelete(scope.row)">Supprimer</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :page-size="NUMBER_ADMIN_PRODUCT_PER_PAGE"
        layout="prev, pager, next"
        :total="
          isDisplayPaginateBySearchInput()
            ? productStore.paginateProductBySearchInput?.totalProducts || 0
            : productStore.paginateProduct?.totalProducts || 0
        "
        :hide-on-single-page="
          productStore.paginateProductBySearchInput?.totalProducts ||
          0 < NUMBER_ADMIN_PRODUCT_PER_PAGE ||
          productStore.paginateProduct?.totalProducts ||
          0 < NUMBER_ADMIN_PRODUCT_PER_PAGE
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
import { NUMBER_ADMIN_PRODUCT_PER_PAGE } from '@/utils/const'
import useDrawerStore from '@/utils/store/useDrawerStore'
import useProductStore from '@/utils/store/useProductStore'
import toastHandler from '@/utils/toastHandler'
import { ColumnProduct } from '@/utils/types/column-product.enum'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import type { Product } from '@/utils/types/interfaces/product.interface'
import { ToastType } from '@/utils/types/toast-type.enum'
import { ref } from 'vue'
import { onMounted } from 'vue'

const drawerStore = useDrawerStore()
const productStore = useProductStore()
const page = ref(1)
const search = ref('')

const optionsSearchColumn = [
  { label: 'Toutes les colonnes', value: ColumnProduct.ALL },
  { label: 'Nom', value: ColumnProduct.NAME },
  { label: 'Modèle', value: ColumnProduct.MODEL },
  { label: 'Catégorie', value: ColumnProduct.CATEGORY }
]

const searchColumn = ref(optionsSearchColumn[0].value)

const productToDelete = ref<Product | null>(null)

const setCurrentPage = (newPage: number) => {
  page.value = newPage

  productStore.updatePaginateProducts(newPage, NUMBER_ADMIN_PRODUCT_PER_PAGE)
}

const isDisplayPaginateBySearchInput = () => {
  return search.value.trim().length >= 3
}

const onChangeSearch = (e: string) => {
  if (e.trim().length < 3) {
    productStore.clearSearch()
    return
  }

  productStore.updatePaginateProductsBySearchInput(
    e,
    searchColumn.value,
    page.value,
    NUMBER_ADMIN_PRODUCT_PER_PAGE
  )
}

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
    productStore.updatePaginateProducts(page.value, NUMBER_ADMIN_PRODUCT_PER_PAGE)
  } else {
    toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
  }
  productToDelete.value = null
}

onMounted(() => {
  productStore.updatePaginateProducts(page.value, NUMBER_ADMIN_PRODUCT_PER_PAGE)
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
