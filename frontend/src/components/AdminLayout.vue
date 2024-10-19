<template>
  <div class="layout-admin-container">
    <NavbarAdmin />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import NavbarAdmin from './NavbarAdmin.vue'
</script>

<style scoped>
.layout-admin-container {
  display: flex;
  gap: 20px;
}
</style>
