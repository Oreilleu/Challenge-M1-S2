<template>
  <div class="container">
    <img src="/public/logo.png" width="80px" height="80px" alt="logo" aria-hidden="true" />
    <button @click="logout">Logout</button>
    <el-divider class="divider" />
    <el-menu default-active="2" class="menu">
      <el-sub-menu index="1">
        <template #title>
          <span>Produit</span>
        </template>
        <el-menu-item>
          <RouterLink to="/admin/products">Liste des produits</RouterLink>
        </el-menu-item>
        <el-menu-item @click="createProduct">Créer un produit</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>Catégorie</span>
        </template>
        <el-menu-item>
          <RouterLink to="/admin/categories">Liste des catégories</RouterLink>
        </el-menu-item>
        <el-menu-item>Créer une catégorie</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>Utilisateurs</span>
        </template>
        <el-menu-item>
          <RouterLink to="/admin/users">Liste des utilisateurs</RouterLink>
        </el-menu-item>
        <el-menu-item>Créer un utilisateurs</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import localStorageHandler from '@/utils/localStorageHandler'
import { useRouter, RouterLink } from 'vue-router'
import { LocalStorageKeys } from '@/utils/types'
const router = useRouter()

// TODO : trouver comment stocker des donnéees globalement avec vue js (equivalent useContext react)
const logout = () => {
  localStorageHandler().remove(LocalStorageKeys.AUTH_TOKEN)
  localStorageHandler().remove(LocalStorageKeys.USER)
  // isAuthenticatedUser.value = false
  router.push('/')
}

const createProduct = async () => {
  try {
    const resCreate = await fetch(`http://localhost:3000/product/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      },
      body: JSON.stringify({
        name: 'Product name',
        description: 'Product description',
        price: 100,
        stock: 10
      })
    })
    if (resCreate.ok) {
      router.push('/admin/products')
    }
    console.log(resCreate)
  } catch (error) {
    console.log(error)
  }
}
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
