<template>
  <div class="page">
    <form @submit.prevent="submitForm">
      <h1>Connexion :</h1>
      <FormInput
        label="Email"
        placeholder="Email"
        v-model="loginForm.email"
        :error="errors.email"
        @blur="handleInputEvent('email')"
        type="text"
        hidden-label
      />

      <FormInput
        label="Mot de passe"
        placeholder="Mot de passe"
        v-model="loginForm.password"
        :error="errors.password"
        @blur="handleInputEvent('password')"
        type="password"
        hidden-label
      />

      <el-button
        type="primary"
        size="large"
        native-type="submit"
        :disabled="isSubmitting || hasErrors(errors)"
        >Se connecter</el-button
      >

      <div class="custom-divider">
        <el-divider />
        <span>OU</span>
        <el-divider />
      </div>

      <RouterLink to="/register" class="link-register">S'inscrire</RouterLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  LocalStorageKeys,
  ToastType,
  type LoginForm,
  type LoginFormErrors,
  type ResponseRegisterForm
} from '@/utils/types'
import { loginFormSchema } from '@/utils/validation/schema'
import { validateField } from '@/utils/validation/validator'
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import localStorageHandler from '@/utils/localStorageHandler'
import { useRouter } from 'vue-router'
import { error } from 'console'

const isSubmitting = ref(false)
const router = useRouter()

const loginForm: LoginForm = reactive({
  email: '',
  password: ''
})

const errors: LoginFormErrors = reactive({
  email: '',
  password: ''
})

const handleInputEvent = (field: keyof typeof loginForm) => {
  validateField(field, loginFormSchema, loginForm, errors)
}

const hasErrors = (errors: LoginFormErrors) => {
  return Object.values(errors).some((error) => error !== '')
}

const submitForm = async () => {
  if (hasErrors(errors)) {
    toastHandler('Le formulaire comporte des erreurs', ToastType.ERROR)
    return
  }

  isSubmitting.value = true
  try {
    const responseLogin: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginForm)
    })

    const { errors, data }: ResponseRegisterForm = await responseLogin.json()

    if (!responseLogin.ok) {
      if (responseLogin.status === 400 && errors) {
        toastHandler(errors[0] || "Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
        return
      }
      throw new Error()
    }

    if (!data) {
      throw new Error()
    }

    localStorageHandler().set(LocalStorageKeys.AUTH_TOKEN, data.jwt)
    localStorageHandler().set(LocalStorageKeys.USER, data.user)

    router.push('/')
  } catch (error) {
    toastHandler("Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.page {
  background: var(--lightgray);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

form {
  max-width: 600px;
  width: 80%;
  padding: 20px 40px 40px 40px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.03);
}

.el-button {
  width: 70%;
  margin-top: 15px;
}

.custom-divider {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.link-register {
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
