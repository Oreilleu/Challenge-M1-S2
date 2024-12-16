<template>
  <header v-if="!isAdminPage(route.fullPath)">
    <el-row :style="rowStyle">
      <el-col :span="breakpointStore.isMobile ? 24 : 'auto'" :style="colLogoStyle">
        <el-button @click="toggleMenu" :style="buttonMenuStyle">
          <el-icon :size="20">
            <Menu />
          </el-icon>
        </el-button>
        <RouterLink to="/" class="container-logo">
          <el-image src="/logo.png" fit="cover" />
        </RouterLink>
      </el-col>

      <el-col
        :span="breakpointStore.isMobile ? (authStore.isAuthenticatedUser ? 14 : 16) : 'auto'"
        style="display: flex; align-items: center; gap: 10px"
      >
        <RouterLink
          v-if="route.path !== '/register' && !authStore.isAuthenticatedUser"
          to="/register"
          class="link"
        >
          S'inscrire
        </RouterLink>
        <RouterLink
          v-if="route.path !== '/login' && !authStore.isAuthenticatedUser"
          to="/login"
          class="link"
        >
          Se connecter
        </RouterLink>

        <el-button v-if="authStore.isAuthenticatedUser" type="primary" @click="authStore.logout">
          Se déconnecter
        </el-button>
      </el-col>

      <el-col
        :span="breakpointStore.isMobile ? (authStore.isAuthenticatedUser ? 10 : 8) : 'auto'"
        style="text-align: right"
      >
        <el-button
          v-if="authStore.isAuthenticatedUser"
          @click="authStore.isAdmin ? goToAdminPage() : goToMyAccount()"
          style="border: none; height: 100%"
        >
          <el-icon :size="20">
            <User />
          </el-icon>
        </el-button>
        <el-button @click="openCartDrawer" style="border: none; height: 100%">
          <el-icon :size="20">
            <ShoppingCart />
          </el-icon>
        </el-button>
      </el-col>
    </el-row>

    <nav class="nav-bar">
      <div class="container">
        <ul class="nav-links">
          <li>
            <RouterLink
              v-if="!isProductPage()"
              @click="selectCategory(null)"
              to="/"
              class="nav-link"
            >
              Tous les produits
            </RouterLink>
            <el-button v-else @click="selectCategory(null)" class="nav-link">
              Tous les produits
            </el-button>
          </li>
          <li
            v-for="category in categoryStore.formattedOptionsMasterCategories"
            :key="category.value"
          >
            <RouterLink
              v-if="!isProductPage()"
              to="/"
              @click="selectCategory(category)"
              class="nav-link"
            >
              {{ category.label }}
            </RouterLink>
            <el-button v-else @click="selectCategory(category)" class="nav-link">
              {{ category.label }}
            </el-button>
          </li>
        </ul>
      </div>
    </nav>

    <div v-if="isMenuOpen" class="mobile-menu">
      <ul class="mobile-menu-links">
        <li>
          <RouterLink v-if="!isProductPage()" @click="selectCategory(null)" to="/" class="nav-link">
            Tous les produits
          </RouterLink>
          <el-button v-else @click="selectCategory(null)" class="nav-link">
            Tous les produits
          </el-button>
        </li>
        <li
          v-for="category in categoryStore.formattedOptionsMasterCategories"
          :key="category.value"
        >
          <RouterLink
            v-if="!isProductPage()"
            to="/"
            @click="selectCategory(category)"
            class="nav-link"
          >
            {{ category.label }}
          </RouterLink>
          <el-button v-else @click="selectCategory(category)" class="nav-link">
            {{ category.label }}
          </el-button>
        </li>
      </ul>
    </div>

    <Drawer
      :size="breakpointStore.isTablet || breakpointStore.isMobile ? '100%' : '50%'"
      v-model="drawerStore.isOpen"
      direction="ltr"
      :drawerContent="drawerStore.opennedDrawer"
    />
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, ShoppingCart, User } from 'lucide-vue-next'
import useAuthStore from '@/utils/store/useAuthStore'
import { isAdminPage } from '@/utils/isAdminPage'
import useCategoryStore from '@/utils/store/useCategoryStore'
import useDrawerStore from '@/utils/store/useDrawerStore'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import Drawer from './Drawer.vue'
import useBreakpointStore from '@/utils/store/useBreakpointStore'
import type { OptionCategory } from '@/utils/types/interfaces/option-category.interface'
import useVariationStore from '@/utils/store/useVariationStore'
import { VARIATION_PER_PAGE } from '@/utils/const'

const isMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()

const drawerStore = useDrawerStore()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const breakpointStore = useBreakpointStore()
const variationStore = useVariationStore()

const isProductPage = () => route.fullPath === '/'

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const openCartDrawer = () => {
  drawerStore.openDrawer(DrawerType.CART)
}

const goToMyAccount = () => {
  router.push('/my-account')
}

const goToAdminPage = () => {
  router.push('/admin/products')
}

const selectCategory = (category: OptionCategory | null) => {
  variationStore.selectedCategory = category

  variationStore.updatePaginateVariations({
    page: 1,
    limit: VARIATION_PER_PAGE
  })
}

const rowStyle = computed(() => {
  return breakpointStore.isMobile
    ? 'padding: 5px; row-gap: 15px'
    : 'padding: 5px 15px; height: 70px; display:flex; gap: 10px'
})

const colLogoStyle = computed(() => {
  return breakpointStore.isMobile
    ? 'display: flex; justify-content: space-between; align-items: center'
    : 'display:flex; align-items: center; flex: 2'
})

const buttonMenuStyle = computed(() => {
  return breakpointStore.isMobile ? 'display: block' : 'display: none'
})
</script>

<style scoped>
.container-logo {
  width: 80px;
  height: 40px;
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
  border: none;
  text-decoration: none;
  height: 100%;
  height: 35px;
}

.nav-link:hover {
  color: #2563eb;
  background: #ebf5ff;
  border-radius: 4px;
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

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }

  .mobile-menu {
    display: none;
  }
}
</style>
