<template>
  <el-form @submit="onSubmit" style="display: flex; flex-direction: column; gap: 15px">
    <Field id="civility" name="civility" v-slot="{ field }">
      <el-radio-group v-model="field.value" v-bind="field">
        <el-radio :value="'man'">M.</el-radio>
        <el-radio :value="'woman'">Mme</el-radio>
      </el-radio-group>
    </Field>
    <FormInput id="firstname" name="firstname" label="Prénom" placeholder="Prénom" type="text" />
    <FormInput id="lastname" name="lastname" label="Nom" placeholder="Nom" type="text" />
    <FormInput id="email" name="email" label="Email" placeholder="Email" type="email" />
    <FormInput id="phone" name="phone" label="Téléphone" placeholder="Téléphone" type="text" />
    <el-button
      type="primary"
      native-type="submit"
      style="width: 280px"
      :disabled="Object.keys(errors).length > 0 || dataHasNotChanged()"
    >
      Modifier mes informations
    </el-button>
  </el-form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import FormInput from '../FormInput.vue'
import type { User } from '@/utils/types/interfaces/user.interface'
import { updateUserSchema } from '@/utils/validation/schema'
import useAuthStore from '@/utils/store/useAuthStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import { updateUserProfile } from '@/utils/api/user'
import { isEqual } from 'lodash'

const authStore = useAuthStore()

const validationSchema = toTypedSchema(updateUserSchema)

const { handleSubmit, errors, isSubmitting, values } = useForm<User>({
  validationSchema,
  initialValues: authStore.user
})

const dataHasNotChanged = () => {
  if (!authStore.user) return true

  const userData = {
    civility: authStore.user.civility,
    firstname: authStore.user.firstname,
    lastname: authStore.user.lastname,
    email: authStore.user.email,
    phone: authStore.user.phone
  }

  return isEqual(userData, values)
}

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true

  try {
    const resUser = await updateUserProfile(values)

    if (!resUser) {
      toastHandler(
        'Une erreur est survenue lors de la mise à jour de votre profil.',
        ToastType.ERROR
      )
      return
    }

    authStore.updateUser(resUser)
    toastHandler('Votre profil a bien été mis à jour.', ToastType.SUCCESS)
  } catch (error) {
    toastHandler('Une erreur est survenue lors de la mise à jour de votre profil.', ToastType.ERROR)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<style scoped></style>
