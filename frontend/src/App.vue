<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { isAuthenticated } from '@/utils/isAuthenticatedUser'
import localStorageHandler from './utils/localStorageHandler'
import { onMounted, ref } from 'vue'
import { LocalStorageKeys } from './utils/types/local-storage-keys.enum'
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
    LOGO
    <RouterLink v-if="route.path !== '/register' && !isAuthenticatedUser" to="/register"
      >Inscription</RouterLink
    >
    <RouterLink v-if="route.path !== '/login' && !isAuthenticatedUser" to="/login"
      >Connexion</RouterLink
    >
    <el-button v-if="isAuthenticatedUser" type="primary" @click="logout">Se déconnecter</el-button>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>Mon footer</footer>
</template>
