<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import useAuthStore from './utils/store/useAuthStore'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ConsentPopup from './components/ConsentPopup.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuthentication()
})
</script>

<template>
  <Header />
  <main class="min-h-screen">
    <ConsentPopup />
    <RouterView />
  </main>
  <Footer />
</template>
