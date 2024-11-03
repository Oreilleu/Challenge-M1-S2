<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { isAuthenticated } from '@/utils/isAuthenticatedUser'
import localStorageHandler from './utils/localStorageHandler'
import { onMounted, ref } from 'vue'
import { LocalStorageKeys } from './utils/types/local-storage-keys.enum'
import useAuthStore from './utils/store/useAuthStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuthentication()
})

const route = useRoute()
</script>

<template>
  <header>
    LOGO
    <RouterLink v-if="route.path !== '/register' && !authStore.isAuthenticatedUser" to="/register"
      >Inscription
    </RouterLink>
    <RouterLink v-if="route.path !== '/login' && !authStore.isAuthenticatedUser" to="/login">
      Connexion
    </RouterLink>
    <el-button v-if="authStore.isAuthenticatedUser" type="primary" @click="authStore.logout">
      Se déconnecter
    </el-button>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>Mon footer</footer>
</template>
