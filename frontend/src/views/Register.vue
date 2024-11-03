<template>
  <div class="page">
    <Form :validation-schema="validationSchema" @submit="submitForm">
      <h1>Création de compte :</h1>
      <el-divider />
      <h2>Vos identifiants :</h2>

      <FormInput
        id="email"
        name="email"
        label="Email"
        placeholder="Email"
        type="email"
        v-model="registerForm.email"
      />

      <FormInput
        id="password"
        name="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        type="password"
        v-model="registerForm.password"
      />

      <FormInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmer le mot de passe"
        placeholder="Confirmer le mot de passe"
        type="password"
        v-model="registerForm.confirmPassword"
      />

      <el-divider />

      <h2>Vos informations personnelles :</h2>

      <Field name="civility" v-model="registerForm.civility" v-slot="{ field }">
        <el-radio-group v-model="registerForm.civility" v-bind="field">
          <el-radio :value="'man'">M.</el-radio>
          <el-radio :value="'woman'">Mme</el-radio>
        </el-radio-group>
        <ErrorMessage name="civility" />
      </Field>

      <FormInput
        id="firstname"
        name="firstname"
        label="Prénom"
        placeholder="Prénom"
        type="text"
        v-model="registerForm.firstname"
      />

      <FormInput
        id="lastname"
        name="lastname"
        label="Nom de famille"
        placeholder="Nom de famille"
        type="text"
        v-model="registerForm.lastname"
      />

      <FormInput
        id="phone"
        name="phone"
        label="Téléphone"
        placeholder="Téléphone"
        type="text"
        v-model="registerForm.phone"
      />

      <el-button
        type="primary"
        size="large"
        native-type="submit"
        :disabled="isSubmitting || hasEmptyFields()"
      >
        S'inscrire
      </el-button>

      <div class="custom-divider">
        <el-divider />
        <span>OU</span>
        <el-divider />
      </div>

      <RouterLink to="/login" class="link-login">Se connecter</RouterLink>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import toastHandler from '@/utils/toastHandler'
import localStorageHandler from '@/utils/localStorageHandler'
import { useRouter } from 'vue-router'
import { ToastType } from '@/utils/types/toast-type.enum'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { Field, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerFormSchema } from '@/utils/validation/schema'
import type { RegisterForm } from '@/utils/types/interfaces/register-form.interface'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'
import type { ResultAuth } from '@/utils/types/interfaces/result-auth.interface'

const isSubmitting = ref(false)
const router = useRouter()

const registerForm: RegisterForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  civility: 'man',
  firstname: 'first',
  lastname: '',
  phone: ''
})

const validationSchema = toTypedSchema(registerFormSchema)

const hasEmptyFields = () => {
  return Object.values(registerForm).some((value) => value === '')
}

const submitForm = async () => {
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

    const { errors, data }: ResponseApi<ResultAuth> = await responseRegisterForm.json()

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
