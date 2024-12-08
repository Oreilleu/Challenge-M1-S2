<template>
  <div class="addresses-container">
    <h1 class="addresses-title">MES ADRESSES</h1>

    <!-- <div class="addresses-actions">
      <el-button type="primary" @click="openAddressModal('new')" class="add-address-btn">
        <PlusIcon :size="16" class="button-icon" />
        Ajouter une adresse
      </el-button>
    </div> -->

    <div class="addresses-grid">
      <div v-for="(address, index) in deliveryAddressStore.deliveryAddress" :key="index" class="address-card">
        <div class="address-header">
          <span class="address-type">
            {{ address.type === 'billing' ? 'Adresse de facturation' : 'Adresse de livraison' }}
          </span>
          <div class="address-actions">
            <el-tooltip content="Modifier" placement="top">
              <button class="action-btn edit-btn" @click="openUpdateModal(address)">
                <EditIcon :size="16" />
              </button>
            </el-tooltip>
            <el-tooltip content="Supprimer" placement="top">
              <button class="action-btn delete-btn" @click="openDeleteModal(address)">
                <TrashIcon :size="16" />
              </button>
            </el-tooltip>
          </div>
        </div>

        <div class="address-details">
          <p class="address-name">{{ address.fullName }}</p>
          <p>{{ address.street }}</p>
          <p>{{ address.additionalInfo }}</p>
          <p>{{ address.zipCode }} {{ address.city }}</p>
          <p>{{ address.country }}</p>
        </div>
      </div>
    </div>

    <!-- Modal de suppression -->
    <Modal :model-value="modelDeleteModal"
      :title="'Suppression de l\'adresse de livraison : ' + selectedAddress?.city + ' - ' + selectedAddress?.street"
      :display-footer="true" @close="modelDeleteModal = false" @confirm="deleteDeliveryAddress(selectedAddress?._id)" />

    <!-- Modal d'ajout/édition d'adresse -->
    <Modal :model-value="modelUpdateModal" :title="modalMode === 'new' ? 'Ajouter une adresse' : 'Modifier l\'adresse'"
      @close="modelUpdateModal = false">
      <FormUpdateDeliveryAddress :delivery-address="selectedAddress" :close-modal="closeUpdateModal" />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EditIcon, TrashIcon } from 'lucide-vue-next'
import Modal from '@/components/Modal.vue'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore';
import FormUpdateDeliveryAddress from './form/FormUpdateDeliveryAddress.vue';
import { fetchDeleteDeliveryAddress } from '@/utils/api/delivery-address';

const deliveryAddressStore = useDeliveryAddressStore()

const modelDeleteModal = ref(false)
const modelUpdateModal = ref(false)
const modalMode = ref('new')
const selectedAddress = ref(null)

const openAddressModal = (mode, address = null) => {
  modalMode.value = mode
  selectedAddress.value = address || {
    type: 'delivery',
    fullName: '',
    street: '',
    additionalInfo: '',
    zipCode: '',
    city: '',
    country: 'France'
  }
  modelUpdateModal.value = true
}

const openUpdateModal = (address) => {
  openAddressModal('edit', address)
}

const closeUpdateModal = () => {
  modelUpdateModal.value = false
}

const openDeleteModal = (address) => {
  selectedAddress.value = address
  modelDeleteModal.value = true
}

const deleteDeliveryAddress = async (id) => {
  const isDeleted = await fetchDeleteDeliveryAddress(id)

  if (isDeleted) {
    deliveryAddressStore.updateDeliveryAddress()
    modelDeleteModal.value = false
  } else {
    toastHandler("Erreur lors de la suppression de l'adresse de livraison", ToastType.ERROR)
  }
}
</script>

<style scoped>
.addresses-container {
  padding: 20px;
}

.addresses-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.addresses-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
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
