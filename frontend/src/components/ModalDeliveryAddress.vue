<template>
  <Modal :model-value="model" :title="'Gérer mes adresses de livraison'">
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
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import Modal from './Modal.vue'
import FormAddDeliveryAddress from './form/FormAddDeliveryAddress.vue'
import DeliveryAddressCard from './DeliveryAddressCard.vue'

const deliveryAddressStore = useDeliveryAddressStore()

const model = defineModel()
</script>

<style scoped>
.list-delivery-address-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
