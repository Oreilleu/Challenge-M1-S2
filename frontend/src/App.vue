<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { isAuthenticated } from '@/utils/isAuthenticatedUser'
import localStorageHandler from './utils/localStorageHandler'
import { onMounted, ref } from 'vue'
import { LocalStorageKeys } from './utils/types/local-storage-keys.enum'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
const router = useRouter()
const route = useRoute()

const isAuthenticatedUser = ref(false)
const checkAuthentication = async () => {
  isAuthenticatedUser.value = await isAuthenticated()
}

onMounted(() => {
  checkAuthentication()
})

const logout = () => {
  localStorageHandler().remove(LocalStorageKeys.AUTH_TOKEN)
  localStorageHandler().remove(LocalStorageKeys.USER)
  isAuthenticatedUser.value = false
  router.push('/login')
}
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
