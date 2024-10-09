<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <header>
    LOGO
    <RouterLink v-if="route.path !== '/register'" to="/register">Inscription</RouterLink>
    <RouterLink v-if="route.path !== '/login'" to="/login">Connexion</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>Mon footer</footer>
</template>
