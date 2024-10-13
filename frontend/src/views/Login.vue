<template>
  <div class="container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <FormInput
        label="Email"
        placeholder="Email"
        v-model="email"
        type="email"
        required
        hidden-label
      />

      <FormInput
        label="Mot de passe"
        placeholder="Mot de passe"
        v-model="password"
        type="password"
        required
        hidden-label
      />

      <el-button type="primary" native-type="submit">Se connecter</el-button>
    </form>

    <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/services/authService'
import FormInput from '@/components/FormInput.vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await login(email.value, password.value)
    if (response.ok) {
      console.log('Connexion réussie !')
      router.push('/')
    } else {
      console.error('Erreur lors de la connexion : ', response.statusText)
    }
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error)
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

h1 {
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
