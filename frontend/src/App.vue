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
    <HeaderComponent />
  </header>
  <main class="min-h-screen">
    <RouterView />
  </main>
  <FooterComponent />
</template>
