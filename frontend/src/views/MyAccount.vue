<template>
  <h1>Mon compte</h1>
  <el-button @click="isModalOpen = true">Gérer mes adresses de livraison</el-button>

  <Modal
    :model-value="isModalOpen"
    :title="'Gérer mes adresses de livraison'"
    @close="isModalOpen = false"
  >
    <el-text v-if="!deliveryAddressStore.deliveryAddress.length">
      Pas encore d'adresse de livraison
    </el-text>

    <ul v-if="deliveryAddressStore.deliveryAddress.length > 0" class="list-delivery-address-card">
      <li v-for="address in deliveryAddressStore.deliveryAddress" :key="address._id">
        <DeliveryAddressCard :deliveryAddress="address" />
      </li>
    </ul>

    <el-divider />

    <h2>Ajouter une addresse de livraison</h2>

    <FormAddDeliveryAddress />
  </Modal>
</template>

<script setup lang="ts">
import DeliveryAddressCard from '@/components/DeliveryAddressCard.vue'
import FormAddDeliveryAddress from '@/components/form/FormAddDeliveryAddress.vue'
import Modal from '@/components/Modal.vue'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import { onMounted, ref } from 'vue'

const deliveryAddressStore = useDeliveryAddressStore()

const isModalOpen = ref(false)

onMounted(() => {
  deliveryAddressStore.updateDeliveryAddress()
})
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
