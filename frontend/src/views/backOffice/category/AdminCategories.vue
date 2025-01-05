<template>
  <AdminLayout>
    <section style="width: 100%">
      <h1>Liste des catégories</h1>
      <el-table :data="categoryStore.categories" :empty-text="'Aucune catégorie trouvée'">
        <el-table-column prop="name" label="Nom"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column label="Catégorie parente">
          <template #default="scope">
            {{ scope.row.parent?.name || '' }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" placeholder="Rechercher"></el-input>
          </template>
          <template #default="scope">
            <el-button type="info" @click="handleShow(scope.row)">Afficher</el-button>
            <el-button type="primary" @click="openDrawerUpdate(scope.row._id)">Éditer</el-button>
            <el-button type="danger" @click="displayModalDelete(scope.row)">Supprimer</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Modal
        :model-value="!!categoryToDelete"
        :title="'Êtes-vous sur de vouloir supprimer la catégorie : ' + categoryToDelete?.name"
        :displayFooter="true"
        @close="categoryToDelete = null"
        @confirm="deleteCategory(categoryToDelete?._id)"
      >
      </Modal>
    </section>
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

const categoryStore = useCategoryStore()
const search = ref('')
const modalVisible = ref(false)
const modalCategory = ref<Category | null>(null)
const modalTitle = ref('')
const drawerStore = useDrawerStore()
const categoryToDelete = ref<Category | null>(null)

const openDrawerUpdate = (idCategory: string | undefined) => {
  if (!idCategory) {
    toastHandler("Erreur lors de la récupération de l'identifiant de la catégorie", ToastType.ERROR)
    return
  }
  drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_CATEGORY, idCategory)
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

const handleShow = (category: Category) => {
  modalCategory.value = category
  modalTitle.value = 'Afficher la catégorie'
  modalVisible.value = true
}
</script>
