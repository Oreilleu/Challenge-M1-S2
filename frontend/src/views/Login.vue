<template>
  <div class="container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <FormInput
        label="Email"
        placeholder="Email"
        v-model="loginForm.email"
        :error="errors.email"
        @blur="handleBlur('email')"
        type="email"
        required
        hidden-label
      />

      <FormInput
        label="Mot de passe"
        placeholder="Mot de passe"
        v-model="loginForm.password"
        :error="errors.password"
        @blur="handleBlur('password')"
        type="password"
        required
        hidden-label
      />

      <el-button type="primary" native-type="submit" :disabled="isSubmitting || hasErrors(errors)">
        Se connecter
      </el-button>
    </form>

    <router-link to="/forgot-password" class="forgot-password-link">
      Mot de passe oublié ?
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { login } from '@/services/authService'
import FormInput from '@/components/FormInput.vue'
import { useRouter } from 'vue-router'
import { validateField } from '@/utils/validation/validator'
import { loginFormSchema } from '@/utils/validation/schema'

const isSubmitting = ref(false)
const router = useRouter()

const loginForm = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const handleBlur = (field: keyof typeof loginForm) => {
  validateField(field, loginFormSchema, loginForm, errors)
}

const hasErrors = (errors) => {
  return Object.values(errors).some((error) => error !== '')
}

const handleLogin = async () => {
  if (hasErrors(errors)) {
    console.error('Form contains errors')
    return
  }

  isSubmitting.value = true
  try {
    const response = await login(loginForm.email, loginForm.password)
    if (response.ok) {
      console.log('Connexion réussie !')
      router.push('/')
    } else {
      console.error('Erreur lors de la connexion : ', response.statusText)
    }
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error)
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
  border-radius: 8px;
}

h1 {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px;
}

button {
  margin-top: 10px;
}

.forgot-password-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--primary);
  text-decoration: none;
}

.forgot-password-link:hover {
  text-decoration: underline;
}
</style>
