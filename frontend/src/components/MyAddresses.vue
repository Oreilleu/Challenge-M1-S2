<template>
  <div class="addresses-container">
    <h1>Mes adresses</h1>

    <el-text v-if="!deliveryAddressStore.deliveryAddress.length">
      Vous n'avez pas d'adresse de livraison enregistré.
    </el-text>

    <div class="addresses-actions">
      <el-button type="primary" class="add-address-btn" @click="openAddDeliveryAddressModal()">
        Ajouter une adresse
      </el-button>
    </div>

    <div v-if="deliveryAddressStore.deliveryAddress.length > 0" class="addresses-grid">
      <div
        v-for="(address, index) in deliveryAddressStore.deliveryAddress"
        :key="index"
        class="address-card"
      >
        <div class="address-header">
          <span class="address-type">Adresse de livraison</span>
          <div class="address-actions">
            <el-tooltip content="Modifier" placement="top">
              <el-button class="action-btn edit-btn" @click="addressToUpdate = address">
                <EditIcon :size="16" />
              </el-button>
            </el-tooltip>
            <el-tooltip content="Supprimer" placement="top">
              <el-button class="action-btn delete-btn" @click="addressToDelete = address._id || ''">
                <TrashIcon :size="16" />
              </el-button>
            </el-tooltip>
          </div>
        </div>

        <div class="address-details">
          <p>{{ address.street }}</p>
          <p>{{ address.postalCode }} {{ address.city }}</p>
          <p>{{ address.country }}</p>
        </div>
      </div>
    </div>

    <Modal
      :model-value="!!newAdress"
      title="Ajouter une adresse de livraison"
      @close="newAdress = null"
    >
      <FormAddDeliveryAddress :onValid="() => (newAdress = null)" />
    </Modal>

    <Modal
      :model-value="!!addressToDelete"
      :title="'Etês-vous sûr de vouloir supprimer cette adresse ?'"
      :display-footer="true"
      @close="addressToDelete = null"
      @confirm="deleteDeliveryAddress(addressToDelete || '')"
    />

    <Modal
      v-if="addressToUpdate"
      :model-value="!!addressToUpdate"
      :title="'Modifier l\'adresse'"
      @close="addressToUpdate = null"
    >
      <FormUpdateDeliveryAddress
        :delivery-address="addressToUpdate"
        :close-modal="() => (addressToUpdate = null)"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EditIcon, TrashIcon } from 'lucide-vue-next'
import Modal from '@/components/Modal.vue'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import { fetchDeleteDeliveryAddress } from '@/utils/api/delivery-address'
import type { DeliveryAddress } from '@/utils/types/interfaces/delivery-address.interface'
import FormAddDeliveryAddress from './form/FormAddDeliveryAddress.vue'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import FormUpdateDeliveryAddress from './form/FormUpdateDeliveryAddress.vue'

const deliveryAddressStore = useDeliveryAddressStore()

const newAdress = ref<DeliveryAddress | null>(null)
const addressToUpdate = ref<DeliveryAddress | null>(null)
const addressToDelete = ref<string | null>(null)

const openAddDeliveryAddressModal = () => {
  newAdress.value = {
    street: '',
    postalCode: '',
    city: '',
    country: 'France'
  }
}

const deleteDeliveryAddress = async (id: string) => {
  const isDeleted = await fetchDeleteDeliveryAddress(id)

  if (isDeleted) {
    deliveryAddressStore.updateDeliveryAddress()
    addressToDelete.value = null
  } else {
    toastHandler("Erreur lors de la suppression de l'adresse de livraison", ToastType.ERROR)
  }
}
</script>

<style scoped>
.addresses-actions {
  display: flex;
  margin: 20px 0;
}

.addresses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.address-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.address-card:hover {
  transform: translateY(-5px);
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.address-type {
  font-weight: bold;
  color: #555;
  font-size: 0.9rem;
}

.address-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;
}

.action-btn:hover {
  color: #1890ff;
}

.delete-btn:hover {
  color: #f5222d;
}

.address-details {
  color: #333;
}

.address-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.address-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

@media (max-width: 768px) {
  .addresses-grid {
    grid-template-columns: 1fr;
  }

  .address-form .form-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.button-icon {
  margin-right: 5px;
}
</style>
