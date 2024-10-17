<template>
  <div class="container">
    <h2>Réinitialiser le mot de passe</h2>
    <form @submit.prevent="submitForm">
      <FormInput
        label="Entrez votre email :"
        placeholder="Email"
        v-model="forgotPasswordForm.email"
        :error="errors.email"
        @blur="handleBlur('email')"
        type="email"
        required
        hidden-label
      />
      <el-button type="primary" native-type="submit" :disabled="isSubmitting || hasErrors(errors)">
        Envoyer le lien de réinitialisation
      </el-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  type ForgotPasswordErrorsForm,
  type ForgotPasswordForm,
  type ResponseForgotPasswordForm,
  ToastType
} from '@/utils/types'
import { forgotPasswordFormSchema } from '@/utils/validation/schema'
import { validateField } from '@/utils/validation/validator'
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'

const isSubmitting = ref(false)

const forgotPasswordForm: ForgotPasswordForm = reactive({
  email: ''
})

const errors: ForgotPasswordErrorsForm = reactive({
  email: ''
})

const handleBlur = (field: keyof typeof forgotPasswordForm) => {
  validateField(field, forgotPasswordFormSchema, forgotPasswordForm, errors)
}

const hasErrors = (errors: ForgotPasswordErrorsForm) => {
  return Object.values(errors).some((error) => error !== '')
}

const submitForm = async () => {
  if (hasErrors(errors)) {
    toastHandler('Le formulaire comporte des erreurs', ToastType.ERROR)
    return
  }

  isSubmitting.value = true
  try {
    const ResponseForgotPasswordForm = await fetch('http://localhost:3000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(forgotPasswordForm)
    })
    console.log(ResponseForgotPasswordForm)
    const { errors }: ResponseForgotPasswordForm = await ResponseForgotPasswordForm.json()

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
