<template>
  <el-drawer v-model="model">
    <template #header>
      <h1>{{ handlerTitle[drawerContent] }}</h1>
    </template>
    <component :is="handlerForm[drawerContent]" />
    <!-- {{ handlerForm[drawerContent] }} -->
  </el-drawer>
  <!-- <el-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <el-radio v-model="radio1" value="Option 1" size="large"> Option 1 </el-radio>
        <el-radio v-model="radio1" value="Option 2" size="large"> Option 2 </el-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer> -->
</template>

<script setup lang="ts">
import { DrawerType } from '@/utils/types'
import CreateProduct from './form/CreateProduct.vue'
import CreateCategory from './form/CreateCategory.vue'
import CreateUser from './form/CreateUser.vue'

type Props = {
  drawerContent: DrawerType
}

defineProps<Props>()

const model = defineModel()

const handlerTitle = {
  [DrawerType.CREATE_PRODUCT]: 'Ajouter un produit',
  [DrawerType.CREATE_CATEGORY]: 'Ajouter une catégorie',
  [DrawerType.CREATE_USER]: 'Ajouter un utilisateur'
}

const handlerForm = {
  [DrawerType.CREATE_PRODUCT]: CreateProduct,
  [DrawerType.CREATE_CATEGORY]: CreateCategory,
  [DrawerType.CREATE_USER]: CreateUser
}
</script>

<style scoped></style>
