<template>
  <header v-if="!isAdminPage(route.fullPath)" class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo-menu">
          <button @click="toggleMenu" class="menu-button">
            <Menu class="icon" />
          </button>
          <div class="logo">
            <img src="/logo.png" />
          </div>
        </div>

        <div class="search-bar">
          <div class="search-input-wrapper">
            <input type="search" placeholder="Que recherchez-vous ?" class="search-input" />
            <Search class="search-icon" />
          </div>
        </div>

        <div class="user-cart">
          <RouterLink
            v-if="route.path !== '/register' && !authStore.isAuthenticatedUser"
            to="/register"
            >Inscription
          </RouterLink>
          <RouterLink v-if="route.path !== '/login' && !authStore.isAuthenticatedUser" to="/login">
            Connexion
          </RouterLink>
          <el-button v-if="authStore.isAuthenticatedUser" type="primary" @click="authStore.logout">
            Se déconnecter
          </el-button>
          <el-button style="border: none; height: 100%">
            <ShoppingCart class="icon" />
          </el-button>
        </div>
      </div>
    </div>

    <nav class="nav-bar">
      <div class="container">
        <ul class="nav-links">
          <li>
            <RouterLink to="/products" class="nav-link">Tous les produits</RouterLink>
          </li>
          <li v-for="category in categoryStore.categories" :key="category._id">
            <RouterLink :to="`/${category.name}`" class="nav-link">{{ category.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div v-if="isMenuOpen" class="mobile-menu">
      <ul class="mobile-menu-links">
        <li>
          <RouterLink to="/products" class="nav-link">Tous les produits</RouterLink>
        </li>
        <li v-for="category in categoryStore.categories" :key="category._id">
          <RouterLink :to="`/${category.name}`" class="nav-link">{{ category.name }}</RouterLink>
        </li>
      </ul>
    </div>

    <!-- <div class="breadcrumb">
      <div class="container">
        <ul class="breadcrumb-links">
          <li>
            <RouterLink to="/" class="breadcrumb-link">Accueil</RouterLink>
          </li>
          <ChevronRight class="breadcrumb-icon" />
          <li>
            <RouterLink to="/smartphones" class="breadcrumb-link">Smartphones</RouterLink>
          </li>
          <ChevronRight class="breadcrumb-icon" />
          <li>
            <RouterLink to="/iphone" class="breadcrumb-link">Iphone</RouterLink>
          </li>
          <ChevronRight class="breadcrumb-icon" />
          <li>Iphone 14 plus - 280 G</li>
        </ul>
      </div>
    </div> -->
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Search, ShoppingCart, ChevronRight } from 'lucide-vue-next'
import useAuthStore from '@/utils/store/useAuthStore'
import { isAdminPage } from '@/utils/isAdminPage'
import useCategoryStore from '@/utils/store/useCategoryStore'

const isMenuOpen = ref(false)
const route = useRoute()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.header {
  width: 100%;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-menu {
  display: flex;
  align-items: center;
}

.menu-button {
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.menu-button:hover {
  background-color: #f3f4f6;
}

.logo {
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 16px;
}

.search-bar {
  display: none;
  flex: 1;
  max-width: 640px;
  margin: 0 16px;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 16px 8px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.user-cart {
  display: flex;
  align-items: center;
}

.user-button {
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.user-button:hover,
.cart-button:hover {
  background-color: #f3f4f6;
}

.icon {
  width: 24px;
  height: 24px;
}

.nav-bar {
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.nav-links {
  display: none;
}

.nav-link {
  padding: 8px 12px;
  font-size: 14px;
  color: #4b5563;
  display: block;
}

.nav-link:hover {
  color: #2563eb;
}

.mobile-menu {
  display: block;
}

.mobile-menu-links {
  background-color: #ffffff;
  padding: 8px 16px;
}

.mobile-menu-link {
  padding: 8px 0;
  font-size: 14px;
  color: #4b5563;
  display: block;
}

.mobile-menu-link:hover {
  color: #2563eb;
}

.breadcrumb {
  padding: 8px 0;
}

.breadcrumb-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: #6b7280;
}

.breadcrumb-link {
  color: #6b7280;
}

.breadcrumb-link:hover {
  color: #2563eb;
}

.breadcrumb-icon {
  width: 16px;
  height: 16px;
  margin: 0 8px;
}

@media (min-width: 768px) {
  .search-bar {
    display: flex;
  }

  .nav-links {
    display: flex;
  }

  .mobile-menu {
    display: none;
  }

  .menu-button {
    display: none;
  }
}
</style>
