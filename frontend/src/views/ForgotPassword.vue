<template>
  <div class="container">
    <h2>Réinitialiser le mot de passe</h2>
    <Form :validation-schema="validationSchema" @submit="submitForm">
      <FormInput
        id="email"
        name="email"
        label="Entrez votre email :"
        placeholder="Email"
        v-model="forgotPasswordForm.email"
        type="email"
      />

      <el-button
        type="primary"
        native-type="submit"
        :disabled="isSubmitting || !forgotPasswordForm.email"
      >
        Envoyer le lien de réinitialisation
      </el-button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { forgotPasswordFormSchema } from '@/utils/validation/schema'
import { reactive, ref } from 'vue'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import FormInput from '@/components/FormInput.vue'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { ResponseApi } from '@/utils/types/response-api.interface'

const isSubmitting = ref(false)

const forgotPasswordForm = reactive({
  email: ''
})

const validationSchema = toTypedSchema(forgotPasswordFormSchema)

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const ResponseForgotPasswordForm = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(forgotPasswordForm)
      }
    )

    const { errors }: ResponseApi<null> = await ResponseForgotPasswordForm.json()

    if (!ResponseForgotPasswordForm.ok) {
      if (ResponseForgotPasswordForm.status === 400 && errors) {
        toastHandler(errors[0] || "Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
      }
      throw new Error()
    }

    toastHandler('Un email de réinitialisation vous a été envoyé.', ToastType.SUCCESS)
  } catch (error) {
    toastHandler("Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px 40px 40px;
  background: var(--lightgray);
}

h2 {
  background: var(--lightgray);
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
