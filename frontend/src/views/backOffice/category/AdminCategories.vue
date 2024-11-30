<template>
  <AdminLayout>
    <Table 
      title="Liste des catégories" 
      :table-data="categoryStore.categories" 
      empty-text="Aucune catégorie trouvée"
      @openDrawerUpdate="openDrawerUpdate"
      @displayModalDelete="displayModalDelete"
    >
    </Table>
    <Modal
        :model-value="!!categoryToDelete"
        :title="'Suppression du produit : ' + categoryToDelete?.name"
        :displayFooter="true"
        @close="categoryToDelete = null"
        @confirm="deleteCategory(categoryToDelete?._id)"
      >
      </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
const categoryToDelete = ref<Category | null>(null)

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
    toastHandler('Produit supprimé avec succès', ToastType.SUCCESS)
    categoryStore.loadCategories();
  } else {
    toastHandler('Erreur lors de la suppression du produit', ToastType.ERROR)
  }
  categoryToDelete.value = null
}
</script>
