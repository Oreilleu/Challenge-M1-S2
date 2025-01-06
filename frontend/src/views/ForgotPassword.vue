<template>
  <div class="page">
    <div class="container">
      <h2>Réinitialiser le mot de passe</h2>
      <el-form @submit="onSubmit">
        <FormInput
          id="email"
          name="email"
          label="Entrez votre email :"
          placeholder="Email"
          type="email"
        />

        <el-button
          type="primary"
          native-type="submit"
          :disabled="isSubmitting || Object.keys(errors).length > 0"
        >
          Envoyer le lien de réinitialisation
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { forgotPasswordFormSchema } from '@/utils/validation/schema'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import FormInput from '@/components/FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'

const validationSchema = toTypedSchema(forgotPasswordFormSchema)

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: values.email })
    })

    if (!res.ok) {
      toastHandler("Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
      return
    }

    const { success, errors }: ResponseApi<null> = await res.json()

    if (res.status === 400 && errors) {
      toastHandler(errors[0] || "Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
    }

    if (success) {
      toastHandler('Un email de réinitialisation vous a été envoyé.', ToastType.SUCCESS)
    } else {
      toastHandler("Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
    }
  } catch (error) {
    toastHandler("Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
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

h2 {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
}

form {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
}

button {
  margin-top: 10px;
}
</style>
