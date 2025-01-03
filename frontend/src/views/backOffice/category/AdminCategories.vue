<template>
  <AdminLayout>
    <Table 
      title="Liste des catégories" 
      :table-data="categoryStore.paginatedCategories.data"
      empty-text="Aucune catégorie trouvée"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :totalItems="categoryStore.paginatedCategories.total"
      @openDrawerUpdate="openDrawerUpdate"
      @displayModalDelete="displayModalDelete"
      @deleteSelectedData="deleteSelectedCategories"
      @changePage="HandleChangePage"
      @changeSizePage="HandleChangeSizePage"
    >
    </Table>
    <Modal
        :model-value="!!categoryToDelete"
        :title="'Êtes-vous sur de vouloir supprimer la catégorie : ' + categoryToDelete?.name"
        :displayFooter="true"
        @close="categoryToDelete = null"
        @confirm="deleteCategory(categoryToDelete?._id)"
      >
      </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import type { Category } from '@/utils/types/interfaces/category.interface'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import useDrawerStore from '@/utils/store/useDrawerStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import useCategoryStore from '@/utils/store/useCategoryStore'
import Modal from '@/components/Modal.vue'
import { fetchDeleteCategory } from '@/utils/api/category'
import Table from '@/components/Table.vue'

const categoryStore = useCategoryStore()
const drawerStore = useDrawerStore()
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

const categoryToDelete = ref<Category | null>(null)

const loadPaginatedCategories = () => {
  categoryStore.loadPaginatedCategories(currentPage.value, pageSize.value)
  console.log('Current page:', currentPage.value);
  console.log('Page size:', pageSize.value);
  console.log('Categories:', categoryStore.paginatedCategories.data);

}

const HandleChangePage = (page: number) => {
  currentPage.value = page
  loadPaginatedCategories()
}

const HandleChangeSizePage = (size: number) => {
  pageSize.value = size
  loadPaginatedCategories()
}

const openDrawerUpdate = (category: Category) => {
  if (!category?._id) {
    toastHandler("Erreur lors de la récupération de l'identifiant de la catégorie", ToastType.ERROR)
    return
  }
  drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_CATEGORY, category._id)
}

const displayModalDelete = (category: Category) => {
  categoryToDelete.value = category
}

const deleteCategory = async (idCategory: string | undefined) => {
  const isDeleted = await fetchDeleteCategory(idCategory)

  if (isDeleted) {
    toastHandler('Catégorie supprimé avec succès', ToastType.SUCCESS)
    categoryStore.loadCategories();
    categoryToDelete.value = null
    return
  }
  categoryToDelete.value = null
}

const deleteSelectedCategories = async (ids: string[]) => {
  
  for (const id of ids) {
    const isDeleted = await fetchDeleteCategory(id)
    if(isDeleted){
      toastHandler('Catégorie supprimé avec succès', ToastType.SUCCESS)
    }
  }
  loadPaginatedCategories();
}

onMounted(() => {
  loadPaginatedCategories()
});
</script>
