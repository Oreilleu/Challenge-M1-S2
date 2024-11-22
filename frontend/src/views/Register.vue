<template>
  <div class="page">
    <FormRegister />
  </div>
</template>

<script setup lang="ts">
import FormRegister from '@/components/form/FormRegister.vue'
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
