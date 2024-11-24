<template>
  <h1>Mon compte</h1>
  <el-button @click="isModalOpen = true">Gérer mes adresses de livraison</el-button>

  <ModalDeliveryAddress :model-value="isModalOpen" @close="isModalOpen = false" />
</template>

<script setup lang="ts">
import ModalDeliveryAddress from '@/components/ModalDeliveryAddress.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-delivery-address-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
