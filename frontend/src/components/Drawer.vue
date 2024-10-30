<template>
  <el-drawer v-model="model">
    <template #header>
      <h1>{{ handlerTitle[drawerContent] }}</h1>
    </template>
    <component :is="handlerForm[drawerContent]" />
  </el-drawer>
</template>

<script setup lang="ts">
import FormAddProduct from './form/FormAddProduct.vue'
import FormAddCategory from './form/FormAddCategory.vue'
import { DrawerType } from '@/utils/types/drawer-type.enum'
// TODO : Errreur d'import non bloquante ??
import FormAddUser from './form/FormAddUser.vue'

type Props = {
  drawerContent: DrawerType
}

defineProps<Props>()

const model = defineModel()

const handlerTitle = {
  [DrawerType.CREATE_PRODUCT]: 'Ajouter un produit',
  [DrawerType.CREATE_CATEGORY]: 'Ajouter une catégorie',
  [DrawerType.CREATE_USER]: 'Ajouter un utilisateur',
  [DrawerType.NONE]: null
}

const handlerForm = {
  [DrawerType.CREATE_PRODUCT]: FormAddProduct,
  [DrawerType.CREATE_CATEGORY]: FormAddCategory,
  [DrawerType.CREATE_USER]: FormAddUser,
  [DrawerType.NONE]: null
}
</script>

<style scoped></style>
