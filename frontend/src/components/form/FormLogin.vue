<template>
  <Form :validation-schema="validationSchema" @submit="submitForm">
    <h1>Connexion :</h1>

    <FormInput
      id="email"
      name="email"
      label="Email"
      placeholder="Email"
      type="email"
      v-model="loginForm.email"
    />

    <FormInput
      id="password"
      name="password"
      label="Password"
      placeholder="Password"
      type="password"
      v-model="loginForm.password"
    />

    <el-button
      type="primary"
      size="large"
      native-type="submit"
      :disabled="isSubmitting || hasEmptyFields()"
    >
      Se connecter
    </el-button>

    <RouterLink to="/forgot-password" class="link"> Mot de passe oublié ? </RouterLink>

    <div class="custom-divider">
      <el-divider />
      <span>OU</span>
      <el-divider />
    </div>

    <RouterLink to="/register" class="link">S'inscrire</RouterLink>
  </Form>
</template>

<script setup lang="ts">
import { loginFormSchema } from '@/utils/validation/schema'
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { LoginForm } from '@/utils/types/interfaces/login-form.interface'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'
import type { ResultAuth } from '@/utils/types/interfaces/result-auth.interface'
import useAuthStore from '@/utils/store/useAuthStore'

type Props = {
  onValidLogin?: () => void
  redirectTo?: string
}

const { onValidLogin, redirectTo } = defineProps<Props>()

const isSubmitting = ref(false)
const authStore = useAuthStore()

const loginForm: LoginForm = reactive({
  email: '',
  password: ''
})

const validationSchema = toTypedSchema(loginFormSchema)

const hasEmptyFields = () => {
  return Object.values(loginForm).some((field) => field === '')
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const responseLogin: Response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginForm)
    })

    const { errors, data }: ResponseApi<ResultAuth> = await responseLogin.json()

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

    authStore.signIn(data.jwt, data.user, redirectTo)

    onValidLogin && onValidLogin()
  } catch (error) {
    toastHandler("Une erreur s'est produite, veuillez réessayer.", ToastType.ERROR)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
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
</style>
