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
import FormUpdateProduct from './form/FormUpdateProduct.vue'
import FormUpdateCategory from './form/FormUpdateCategory.vue'
// TODO : voir avec le prof pourquoi typescript ne reconnait pas ce composant spécifiquement
// @ts-ignore
import FormAddUser from './form/FormAddUser.vue'
import CartDrawer from './CartDrawer.vue'
import FormUpdateUser from './form/FormUpdateUser.vue'
type Props = {
  drawerContent: DrawerType
}

defineProps<Props>()

const model = defineModel()

const handlerTitle = {
  [DrawerType.CREATE_PRODUCT]: 'Ajouter un produit',
  [DrawerType.CREATE_CATEGORY]: 'Ajouter une catégorie',
  [DrawerType.CREATE_USER]: 'Ajouter un utilisateur',
  [DrawerType.UPDATE_USER]: 'Modifier un utilisateur',
  [DrawerType.CREATE_ORDER]: 'Ajouter une commande',
  [DrawerType.UPDATE_PRODUCT]: `Modifier le produit`,
  [DrawerType.UPDATE_CATEGORY]: `Modifier la catégorie`,
  [DrawerType.UPDATE_ORDER]: `Modifier la commande`,
  [DrawerType.CART]: 'Panier',
  [DrawerType.NONE]: null
}

const handlerForm = {
  [DrawerType.CREATE_PRODUCT]: FormAddProduct,
  [DrawerType.CREATE_CATEGORY]: FormAddCategory,
  [DrawerType.CREATE_USER]: FormAddUser,
  [DrawerType.UPDATE_USER]: FormUpdateUser,
  [DrawerType.UPDATE_PRODUCT]: FormUpdateProduct,
  [DrawerType.UPDATE_CATEGORY]: FormUpdateCategory,
  [DrawerType.CREATE_ORDER]: null,
  [DrawerType.UPDATE_ORDER]: null,
  [DrawerType.CART]: CartDrawer,
  [DrawerType.NONE]: null
}
</script>

<style scoped></style>
