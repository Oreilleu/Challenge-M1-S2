<template>
  <div class="container">
    <h1>Réinitialisation du mot de passe</h1>
    <form @submit.prevent="submitForm">
      <FormInput
        label="Nouveau mot de passe :"
        placeholder="Nouveau mot de passe"
        v-model="resetPasswordForm.password"
        :error="errors.password"
        @blur="handleBlur('password')"
        type="password"
        required
        hidden-label
      />

      <FormInput
        label="Confirmer le mot de passe :"
        placeholder="Confirmer le mot de passe"
        v-model="resetPasswordForm.confirmPassword"
        :error="errors.confirmPassword"
        @blur="handleBlur('confirmPassword')"
        type="password"
        required
        hidden-label
      />

      <el-button type="primary" native-type="submit" :disabled="isSubmitting || hasErrors(errors)">
        Réinitialiser le mot de passe
      </el-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  ToastType,
  type ResetPasswordForm,
  type ResetPasswordErrorsForm,
  type ResponseResetPasswordForm
} from '@/utils/types'
import { resetPasswordFormSchema } from '@/utils/validation/schema'
import { validateField } from '@/utils/validation/validator'
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import { useRoute } from 'vue-router'

const isSubmitting = ref(false)
const route = useRoute()

const resetPasswordForm: ResetPasswordForm = reactive({
  password: '',
  confirmPassword: ''
})

const errors: ResetPasswordErrorsForm = reactive({
  password: '',
  confirmPassword: ''
})

const handleBlur = (field: keyof typeof resetPasswordForm) => {
  validateField(field, resetPasswordFormSchema._def.schema, resetPasswordForm, errors)
}

const hasErrors = (errors: ResetPasswordErrorsForm) => {
  return Object.values(errors).some((error) => error !== '')
}

const submitForm = async () => {
  if (hasErrors(errors)) {
    toastHandler('Le formulaire comporte des erreurs', ToastType.ERROR)
    return
  }

  if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    return
  }

  isSubmitting.value = true
  try {
    const response: ResponseResetPasswordForm = await fetch(
      `http://localhost:3000/reset-password/${route.params.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: resetPasswordForm.password
        })
      }
    ).then((res) => res.json())

    if (response.success) {
      toastHandler(response.message, ToastType.SUCCESS)
    } else {
      toastHandler(response.message, ToastType.ERROR)
    }
  } catch (error) {
    toastHandler('Erreur interne du serveur', ToastType.ERROR)
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
