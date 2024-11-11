<template>
  <AdminLayout>
    <section class="page">
      <h1>Liste des produits</h1>

      <el-table
        empty-text="Aucun produit trouvé"
        style="width: auto; overflow: auto"
        :default-sort="{ prop: 'name', order: 'descending' }"
        :data="productStore.paginateProduct?.paginates"
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
              v-model="searchInput"
              placeholder="Rechercher"
              style="margin-bottom: 5px"
              @input="onChangeSearch"
            />
            <el-select v-model="searchColumn">
              <el-option
                v-for="item in OPTION_PRODUCT_SEARCH_COLUMN"
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
        :total="productStore.paginateProduct?.count || 0"
        :hide-on-single-page="
          productStore.paginateProduct?.count || 0 < NUMBER_ADMIN_PRODUCT_PER_PAGE
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
import { NUMBER_ADMIN_PRODUCT_PER_PAGE, OPTION_PRODUCT_SEARCH_COLUMN } from '@/utils/const'
import useDrawerStore from '@/utils/store/useDrawerStore'
import useProductStore from '@/utils/store/useProductStore'
import toastHandler from '@/utils/toastHandler'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import type { Product } from '@/utils/types/interfaces/product.interface'
import { ToastType } from '@/utils/types/toast-type.enum'
import { ref } from 'vue'
import { onMounted } from 'vue'

// La pagination se fait sur tout les produits si l'input de recherche est vide (input.length < 3) ET s'il n'y a pas de filtres actifs

// Si l'input de recherche est actif (input.length >= 3) ET les filtres sont inactif, ca affiche les produits filtrés par la recherche
// -> + les recquêtes de pagination se font sur la route search

// Si les fitres sont actifs, ca affiche les produits filtrés par les filtres
// -> + les requêtes de pagination se font sur la route getByFiltres

// Si la l'input de rechercher est actif (input.length >= 3) ET les filtres sont actifs, ca affiche les produits filtrés par les filtres + par le texte
// -> Les requêtes de pagination se font sur la route getByFiltresAndSearch

const drawerStore = useDrawerStore()
const productStore = useProductStore()

const page = ref(1)
const searchInput = ref('')
const searchColumn = ref(OPTION_PRODUCT_SEARCH_COLUMN[0].value)
const productToDelete = ref<Product | null>(null)

const createSearchOption = () => {
  return {
    searchInput: searchInput.value,
    column: searchColumn.value
  }
}

const setCurrentPage = (newPage: number) => {
  page.value = newPage

  const searchOption = createSearchOption()

  productStore.updatePaginateProducts(newPage, NUMBER_ADMIN_PRODUCT_PER_PAGE, searchOption)
}

const onChangeSearch = (e: string) => {
  searchInput.value = e

  const searchOption = createSearchOption()

  productStore.updatePaginateProducts(page.value, NUMBER_ADMIN_PRODUCT_PER_PAGE, searchOption)
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
