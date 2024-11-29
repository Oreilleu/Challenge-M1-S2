<template>
  <div class="addresses-container">
    <h1 class="addresses-title">MES ADRESSES</h1>

    <div class="addresses-actions">
      <el-button type="primary" @click="openAddressModal('new')" class="add-address-btn">
        <PlusIcon :size="16" class="button-icon" />
        Ajouter une adresse
      </el-button>
    </div>

    <div class="addresses-grid">
      <div v-for="(address, index) in addresses" :key="index" class="address-card">
        <div class="address-header">
          <span class="address-type">
            {{ address.type === 'billing' ? 'Adresse de facturation' : 'Adresse de livraison' }}
          </span>
          <div class="address-actions">
            <el-tooltip content="Modifier" placement="top">
              <button class="action-btn edit-btn" @click="openAddressModal('edit', address)">
                <EditIcon :size="16" />
              </button>
            </el-tooltip>
            <el-tooltip content="Supprimer" placement="top">
              <button class="action-btn delete-btn" @click="confirmDeleteAddress(index)">
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

    <!-- Modal d'ajout/édition d'adresse -->
    <el-dialog
      v-model="addressModalVisible"
      :title="modalMode === 'new' ? 'Ajouter une adresse' : 'Modifier l\'adresse'"
      width="600px"
    >
      <el-form :model="currentAddress" label-position="top" class="address-form">
        <div class="form-row">
          <el-form-item label="Type d'adresse" required>
            <el-radio-group v-model="currentAddress.type">
              <el-radio label="delivery">Livraison</el-radio>
              <el-radio label="billing">Facturation</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="Nom complet" required>
            <el-input v-model="currentAddress.fullName" />
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="Adresse" required>
            <el-input v-model="currentAddress.street" />
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="Complément d'adresse">
            <el-input v-model="currentAddress.additionalInfo" />
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="Code postal" required>
            <el-input v-model="currentAddress.zipCode" />
          </el-form-item>
          <el-form-item label="Ville" required>
            <el-input v-model="currentAddress.city" />
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="Pays" required>
            <el-select v-model="currentAddress.country" placeholder="Sélectionnez un pays">
              <el-option label="France" value="France" />
              <el-option label="Belgique" value="Belgique" />
              <el-option label="Suisse" value="Suisse" />
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addressModalVisible = false">Annuler</el-button>
          <el-button type="primary" @click="saveAddress">Enregistrer</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-vue-next'
import { ElMessageBox } from 'element-plus'

const addresses = ref([
  {
    type: 'delivery',
    fullName: 'Fatoumata Diaby',
    street: '123 Rue de la République',
    additionalInfo: 'Appartement 45',
    zipCode: '75001',
    city: 'Paris',
    country: 'France'
  },
  {
    type: 'billing',
    fullName: 'Fatoumata Diaby',
    street: '456 Avenue des Champs-Élysées',
    additionalInfo: '',
    zipCode: '75008',
    city: 'Paris',
    country: 'France'
  }
])

const addressModalVisible = ref(false)
const modalMode = ref('new')
const currentAddress = ref({
  type: 'delivery',
  fullName: '',
  street: '',
  additionalInfo: '',
  zipCode: '',
  city: '',
  country: 'France'
})

const openAddressModal = (mode, address = null) => {
  modalMode.value = mode
  addressModalVisible.value = true

  if (mode === 'edit' && address) {
    currentAddress.value = { ...address }
  } else {
    currentAddress.value = {
      type: 'delivery',
      fullName: '',
      street: '',
      additionalInfo: '',
      zipCode: '',
      city: '',
      country: 'France'
    }
  }
}

const saveAddress = () => {
  if (modalMode.value === 'new') {
    addresses.value.push({ ...currentAddress.value })
  } else {
    const index = addresses.value.findIndex(
      (addr) => addr.fullName === currentAddress.value.fullName
    )
    if (index !== -1) {
      addresses.value[index] = { ...currentAddress.value }
    }
  }
  addressModalVisible.value = false
}

const confirmDeleteAddress = (index) => {
  ElMessageBox.confirm('Voulez-vous vraiment supprimer cette adresse ?', 'Confirmation', {
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Annuler',
    type: 'warning'
  })
    .then(() => {
      addresses.value.splice(index, 1)
    })
    .catch(() => {
      // Annulation
    })
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
