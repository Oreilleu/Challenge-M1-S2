<template>
  <form @submit="onSubmit" class="form-deliveyr-address">
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
    <el-button type="primary" native-type="submit" :disabled="Object.keys(errors).length > 0">
      Ajouter
    </el-button>
  </form>
</template>

<script setup lang="ts">
import type { DeliveryAddress } from '@/utils/types/interfaces/delivery-address.interface'
import { deliveryAddressSchema } from '@/utils/validation/schema'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import FormInput from '../FormInput.vue'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'

type Props = {
  onValid?: () => void
}

const { onValid } = defineProps<Props>()

const deliveryAddressStore = useDeliveryAddressStore()

const validationSchema = toTypedSchema(deliveryAddressSchema)

const { handleSubmit, errors } = useForm<DeliveryAddress>({
  validationSchema
})

const onSubmit = handleSubmit(async (values) => {
  if (deliveryAddressStore.deliveryAddress.length >= 5) {
    toastHandler('Vous ne pouvez pas ajouter plus de 5 adresses de livraison', ToastType.ERROR)
    return
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/delivery-adress/add`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

  const json = await response.json()

  if (!json.success) {
    toastHandler(
      "Une erreur s'est produite lors de l'ajout de l'adresse, veuillez reéssayer.",
      ToastType.ERROR
    )
    return
  }

  toastHandler('Adresse ajoutée avec succès', ToastType.SUCCESS)
  deliveryAddressStore.updateDeliveryAddress()
  onValid?.()
})
</script>

<style scoped>
.form-deliveyr-address {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
