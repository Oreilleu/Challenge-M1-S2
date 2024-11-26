<template>
  <ul class="list-delivery-address-card">
    <li
      v-for="address in deliveryAddressStore.deliveryAddress"
      :key="address._id"
      :class="cartStore.selectedAddressId === address._id ? 'selected' : ''"
      @click="selectAddress(address)"
    >
      <DeliveryAddressCard :deliveryAddress="address" :hideIcon="true" />
    </li>
  </ul>

  <el-divider v-if="cartStore.billingAddress" />

  <h2 v-if="cartStore.billingAddress" class="title-billing-address">Adresse de facturation :</h2>

  <DeliveryAddressCard
    v-if="cartStore.billingAddress"
    :deliveryAddress="cartStore.billingAddress"
    :hideIcon="true"
  />

  <el-button @click="modelModalDeliveryAddress = true" style="margin-top: 20px">
    Ajouter une adresse de livraison
  </el-button>

  <el-button @click="modelModalBillingAddress = true" style="margin-top: 20px">
    {{
      cartStore.billingAddress
        ? "Modifier l'adresse de facturation"
        : 'Ajouter une adresse de facturation'
    }}
  </el-button>

  <el-button
    v-if="cartStore.billingAddress"
    @click="cartStore.billingAddress = null"
    style="display: block; margin-top: 20px; margin-left: 0"
  >
    Mon adresse de facturation est identique à mon adresse de livraison
  </el-button>

  <el-button @click="goToPayment" style="display: block; margin-top: 20px; margin-left: 0">
    Aller au paiement
  </el-button>

  <ModalDeliveryAddress
    :model-value="modelModalDeliveryAddress"
    @close="modelModalDeliveryAddress = false"
  />

  <Modal
    :model-value="modelModalBillingAddress"
    @close="modelModalBillingAddress = false"
    title="Ajouter une adresse de facturation différente de l'adresse de livraison"
  >
    <form @submit="onSubmitBillingAddress">
      <FormInput id="street" name="street" label="Rue" placeholder="Rue" type="text" />
      <FormInput id="city" name="city" label="Ville" placeholder="Ville" type="text" />
      <FormInput
        id="postalCode"
        name="postalCode"
        label="Code postal"
        placeholder="Code postal"
        type="text"
      />
      <FormInput id="country" name="country" label="Pays" placeholder="Pays" type="text" />

      <el-button
        type="primary"
        native-type="submit"
        style="margin-top: 20px"
        :disabled="Object.keys(errors).length > 0"
      >
        Choisir cette adresse de facturation
      </el-button>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import DeliveryAddressCard from './DeliveryAddressCard.vue'
import type { DeliveryAddress } from '@/utils/types/interfaces/delivery-address.interface'
import { onBeforeMount, ref } from 'vue'
import ModalDeliveryAddress from './ModalDeliveryAddress.vue'
import Modal from './Modal.vue'
import FormInput from './FormInput.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { deliveryAddressSchema } from '@/utils/validation/schema'
import { useForm } from 'vee-validate'
import useCartStore from '@/utils/store/useCartStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import useAuthStore from '@/utils/store/useAuthStore'
import { StepperCart } from '@/utils/types/stepper-cart.enum'

type Props = {
  onValidDeliveryAddress: () => void
}

const { onValidDeliveryAddress } = defineProps<Props>()

const deliveryAddressStore = useDeliveryAddressStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const modelModalDeliveryAddress = ref(false)
const modelModalBillingAddress = ref(false)

const validationSchema = toTypedSchema(deliveryAddressSchema)

const { handleSubmit, errors } = useForm<DeliveryAddress>({
  validationSchema
})

const selectAddress = (adress: DeliveryAddress) => {
  cartStore.selectedAddressId = adress._id || ''
}

const onSubmitBillingAddress = handleSubmit((values) => {
  cartStore.billingAddress = values
  modelModalBillingAddress.value = false
})

const goToPayment = () => {
  if (!cartStore.selectedAddressId) {
    toastHandler('Veuillez sélectionner une adresse de livraison', ToastType.WARNING)
    return
  }

  onValidDeliveryAddress()
}

onBeforeMount(() => {
  if (!cartStore.cart.length) {
    toastHandler('Votre panier est vide.', ToastType.WARNING)
    cartStore.activeStep = StepperCart.CART
  }

  if (!authStore.isAuthenticatedUser) {
    toastHandler('Vous devez être connecter..', ToastType.WARNING)
    cartStore.activeStep = StepperCart.LOGIN
    return
  }
})
</script>

<style scoped>
.list-delivery-address-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.selected {
  outline: 2px solid #409eff;
  outline-offset: 2px;
  border-radius: 5px;
}

.title-billing-address {
  margin-bottom: 20px;
}
</style>
