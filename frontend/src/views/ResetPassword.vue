<template>
  <div class="page">
    <div class="container">
      <h1>Réinitialisation du mot de passe</h1>
      <el-form @submit="onSubmit">
        <FormInput
          id="password"
          name="password"
          label="Mot de passe :"
          placeholder="Mot de passe"
          type="password"
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le mot de passe :"
          placeholder="Confirmer le mot de passe"
          type="password"
        />

        <el-button
          type="primary"
          native-type="submit"
          :disabled="isSubmitting || Object.keys(errors).length > 0"
        >
          Réinitialiser le mot de passe
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import { useRoute, useRouter } from 'vue-router'
import { ToastType } from '@/utils/types/toast-type.enum'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordFormSchema } from '@/utils/validation/schema'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'

const route = useRoute()
const router = useRouter()

const validationSchema = toTypedSchema(resetPasswordFormSchema)

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    password: '',
    confirmPassword: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/reset-password/${route.params.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: values.password })
      }
    )

    const { success }: ResponseApi<null> = await response.json()

    if (success) {
      toastHandler('Mot de passe réinitialisé avec succès.', ToastType.SUCCESS)
      router.push('/login')
    } else {
      toastHandler('Erreur lors de la validation', ToastType.ERROR)
    }
  } catch (error) {
    toastHandler('Erreur lors du changement de mot de passe, veuillez réessayer.', ToastType.ERROR)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<style scoped>
.page {
  background: var(--lightgray);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 600px;
  width: 80%;
  padding: 20px 40px 40px 40px;
  background: white;
  border-radius: 10px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.03);
}

h1 {
  text-align: center;
  text-transform: uppercase;
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
