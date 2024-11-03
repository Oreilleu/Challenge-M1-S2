<template>
  <div class="container">
    <h1>Réinitialisation du mot de passe</h1>
    <Form :validation-schema="validationSchema" @submit="submitForm">
      <FormInput
        id="password"
        name="password"
        label="Mot de passe :"
        placeholder="Mot de passe"
        type="password"
        v-model="resetPasswordForm.password"
      />

      <FormInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmer le mot de passe :"
        placeholder="Confirmer le mot de passe"
        type="password"
        v-model="resetPasswordForm.confirmPassword"
      />

      <el-button type="primary" native-type="submit" :disabled="isSubmitting">
        Réinitialiser le mot de passe
      </el-button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import { useRoute, useRouter } from 'vue-router'
import { ToastType } from '@/utils/types/toast-type.enum'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordFormSchema } from '@/utils/validation/schema'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'

const isSubmitting = ref(false)
const route = useRoute()
const router = useRouter()

const resetPasswordForm = reactive({
  password: '',
  confirmPassword: ''
})

const validationSchema = toTypedSchema(resetPasswordFormSchema)

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/reset-password/${route.params.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: resetPasswordForm.password
        })
      }
    )

    const { success, message }: ResponseApi<null> = await response.json()

    if (success) {
      toastHandler(message || 'Mot de passe réinitialisé avec succès.', ToastType.SUCCESS)
      router.push('/login')
    } else {
      toastHandler(message || 'Erreur lors de la validation', ToastType.ERROR)
    }
  } catch (error) {
    toastHandler('Erreur lors du changement de mot de passe, veuillez réessayer.', ToastType.ERROR)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background: var(--lightgray);
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  text-align: center;
  text-transform: uppercase;
  background: var(--lightgray);
  margin: 0 0 20px 0;
  padding: 10px 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
