<template>
  <article class="container-delivery-address">
    <div>
      <div>
        <el-text>Rue :</el-text>
        <el-text style="font-weight: bold">{{ ' ' }}{{ deliveryAddress.street }}</el-text>
      </div>
      <div>
        <el-text>Ville :</el-text>
        <el-text style="font-weight: bold">{{ ' ' }}{{ deliveryAddress.city }}</el-text>
      </div>
      <div>
        <el-text>Code postal :</el-text>
        <el-text style="font-weight: bold">{{ ' ' }}{{ deliveryAddress.postalCode }}</el-text>
      </div>
      <div>
        <el-text>Pays :</el-text>
        <el-text style="font-weight: bold">{{ ' ' }}{{ deliveryAddress.country }}</el-text>
      </div>
    </div>
    <div v-if="!hideIcon" class="container-icon">
      <el-button style="margin: 0" @click="openModalDelete">
        <el-icon :size="20">
          <CircleX />
        </el-icon>
      </el-button>
      <el-button style="margin: 0" @click="openModalUpdate">
        <el-icon :size="20">
          <Pencil />
        </el-icon>
      </el-button>
    </div>
  </article>

  <Modal
    v-if="!hideIcon"
    :model-value="modelDeleteModal"
    :title="
      'Suppression de l\adresse de livraison : ' +
      deliveryAddress.city +
      ' - ' +
      deliveryAddress.street
    "
    :displayFooter="true"
    @close="modelDeleteModal = false"
    @confirm="deleteDeliveryAddress(deliveryAddress?._id)"
  />

  <Modal
    v-if="!hideIcon"
    :model-value="modelUpdateModal"
    :title="
      'Modification de l\adresse de livraison : ' +
      deliveryAddress.city +
      ' - ' +
      deliveryAddress.street
    "
    @close="modelUpdateModal = false"
  >
    <FormUpdateDeliveryAddress :deliveryAddress="deliveryAddress" :closeModal="closeUpdateModal" />
  </Modal>
</template>

<script setup lang="ts">
import type { DeliveryAddress } from '@/utils/types/interfaces/delivery-address.interface'
import { CircleX, Pencil } from 'lucide-vue-next'
import Modal from './Modal.vue'
import { fetchDeleteDeliveryAddress } from '@/utils/api/delivery-address'
import { ref } from 'vue'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import FormUpdateDeliveryAddress from './form/FormUpdateDeliveryAddress.vue'

type Props = {
  deliveryAddress: DeliveryAddress
  hideIcon?: boolean
}

defineProps<Props>()

const deliveryAddressStore = useDeliveryAddressStore()
const modelDeleteModal = ref(false)
const modelUpdateModal = ref(false)

const openModalDelete = () => {
  modelDeleteModal.value = true
}

const openModalUpdate = () => {
  modelUpdateModal.value = true
}

const closeUpdateModal = () => {
  modelUpdateModal.value = false
}

const deleteDeliveryAddress = async (id: string | undefined) => {
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
.container-delivery-address {
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container-icon {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}
</style>
