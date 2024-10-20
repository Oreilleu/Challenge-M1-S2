<template>
  <div class="page">
    <form @submit.prevent="submitForm">
      <h1>Création de compte :</h1>
      <el-divider />
      <h2>Vos identifiants :</h2>

      <FormInput
        label="Email"
        placeholder="Email"
        v-model="registerForm.email"
        :error="errors.email"
        @input="handleInputEvent('email')"
        @blur="handleInputEvent('email')"
        type="text"
        hidden-label
      />

      <FormInput
        label="Mot de passe"
        placeholder="Mot de passe"
        v-model="registerForm.password"
        :error="errors.password"
        @input="handleInputEvent('password')"
        @blur="handleInputEvent('password')"
        type="password"
        hidden-label
      />

      <FormInput
        label="Confirmer le mot de passe"
        placeholder="Confirmer le mot de passe"
        v-model="registerForm.confirmPassword"
        :error="errors.confirmPassword"
        @input="handleInputEvent('confirmPassword')"
        @blur="handleInputEvent('confirmPassword')"
        type="password"
        hidden-label
      />

      <el-divider />

      <h2>Vos informations personnelles :</h2>

      <el-radio-group v-model="registerForm.civility" @blur="handleInputEvent('civility')">
        <el-radio :value="'man'">M.</el-radio>
        <el-radio :value="'woman'">Mme</el-radio>
      </el-radio-group>
      <p v-if="errors.civility" class="error">{{ errors.civility }}</p>

      <FormInput
        label="Prénom"
        placeholder="Prénom"
        v-model="registerForm.firstname"
        :error="errors.firstname"
        @input="handleInputEvent('firstname')"
        @blur="handleInputEvent('firstname')"
        type="text"
        hidden-label
      />

      <FormInput
        label="Nom de famille"
        placeholder="Nom de famille"
        v-model="registerForm.lastname"
        :error="errors.lastname"
        @input="handleInputEvent('lastname')"
        @blur="handleInputEvent('lastname')"
        type="text"
        hidden-label
      />

      <FormInput
        label="Téléphone"
        placeholder="Téléphone"
        v-model="registerForm.phone"
        :error="errors.phone"
        @input="handleInputEvent('phone')"
        @blur="handleInputEvent('phone')"
        type="text"
        hidden-label
      />

      <el-button
        type="primary"
        size="large"
        native-type="submit"
        :disabled="isSubmitting || hasErrors(errors)"
        >S'inscrire
      </el-button>

      <div class="custom-divider">
        <el-divider />
        <span>OU</span>
        <el-divider />
      </div>

      <RouterLink to="/login" class="link-login">Se connecter</RouterLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  LocalStorageKeys,
  ToastType,
  type RegisterFormErrors,
  type RegisterForm,
  type ResponseRegisterForm
} from '@/utils/types'
import { registerFormSchema } from '@/utils/validation/schema'
import { validateField } from '@/utils/validation/validator'
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import localStorageHandler from '@/utils/localStorageHandler'
import { useRouter } from 'vue-router'

const isSubmitting = ref(false)
const router = useRouter()

const registerForm: RegisterForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  civility: 'man',
  firstname: '',
  lastname: '',
  phone: ''
})

const errors: RegisterFormErrors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  civility: '',
  firstname: '',
  lastname: '',
  phone: ''
})

const handleInputEvent = (field: keyof typeof registerForm) => {
  validateField(field, registerFormSchema(registerForm), registerForm, errors)
}

const hasErrors = (errors: RegisterFormErrors) => {
  const isFormEmpty = Object.entries(registerForm)
    .filter(([key]) => key !== 'civility')
    .every(([, value]) => value === '')

  return Object.values(errors).some((error) => error !== '') || isFormEmpty
}

const submitForm = async () => {
  if (hasErrors(errors)) {
    toastHandler('Le formulaire comporte des erreurs', ToastType.ERROR)
    return
  }

  isSubmitting.value = true
  try {
    const responseRegisterForm: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerForm)
      }
    )

    const { errors, data }: ResponseRegisterForm = await responseRegisterForm.json()

    if (!responseRegisterForm.ok) {
      if (responseRegisterForm.status === 400 && errors) {
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

    toastHandler('Votre compte a bien été créer.', ToastType.SUCCESS)

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

.link-login {
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
