<template>
  <div class="page">
    <FormLogin />
  </div>
</template>

<script setup lang="ts">
import FormLogin from '@/components/form/FormLogin.vue'
</script>

<style scoped>
.page {
  background: var(--lightgray);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>
