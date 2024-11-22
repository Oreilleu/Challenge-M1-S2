<template>
  <div class="container">
    <img src="/logo.png" width="80px" height="80px" alt="logo" aria-hidden="true" />
    <button @click="authStore.logout">Logout</button>
    <el-divider class="divider" />

    <el-menu class="menu">
      <el-sub-menu index="1">
        <template #title>
          <span>Produit</span>
        </template>
        <el-menu-item>
          <RouterLink to="/admin/products">Liste des produits</RouterLink>
        </el-menu-item>
        <el-menu-item @click="drawerStore.openDrawer(DrawerType.CREATE_PRODUCT)"
          >Créer un produit</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>Catégorie</span>
        </template>
        <el-menu-item>
          <RouterLink to="/admin/categories">Liste des catégories</RouterLink>
        </el-menu-item>
        <el-menu-item @click="drawerStore.openDrawer(DrawerType.CREATE_CATEGORY)"
          >Créer une catégorie</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>Utilisateurs</span>
        </template>
        <el-menu-item>
          <RouterLink to="/admin/users">Liste des utilisateurs</RouterLink>
        </el-menu-item>
        <el-menu-item @click="drawerStore.openDrawer(DrawerType.CREATE_USER)"
          >Créer un utilisateurs</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
  <Drawer
    v-model="drawerStore.isOpen"
    direction="ltr"
    :size="breakpointStore.isMobile ? '100%' : '50%'"
    :drawerContent="drawerStore.opennedDrawer || DrawerType.CREATE_PRODUCT"
  />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Drawer from './Drawer.vue'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import useDrawerStore from '@/utils/store/useDrawerStore'
import useAuthStore from '@/utils/store/useAuthStore'
import useBreakpointStore from '@/utils/store/useBreakpointStore'

const authStore = useAuthStore()
const drawerStore = useDrawerStore()
const breakpointStore = useBreakpointStore()
</script>

<style scoped>
.container {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
  border-right: 1px solid var(--el-menu-border-color);
  padding: 40px 0;
  height: 100vh;
}

img {
  margin-bottom: 20px;
}

.menu {
  width: 100%;
  border: none;
}
.divider {
  width: 80%;
}

a {
  text-decoration: none;
  color: var(--el-menu-text-color);
}
</style>
