<template>
  <div class="container">
    <h1>Création de compte :</h1>
    <form @submit.prevent="submitForm">
      <h2>Vos identifiants :</h2>

      <FormInput
        label="Email"
        placeholder="Email"
        v-model="registerForm.email"
        :error="errors.email"
        @blur="handleBlur('email')"
        type="text"
        hidden-label
      />

      <FormInput
        label="Mot de passe"
        placeholder="Mot de passe"
        v-model="registerForm.password"
        :error="errors.password"
        @blur="handleBlur('password')"
        type="password"
        hidden-label
      />

      <el-divider />

      <h2>Vos informations personnelles :</h2>

      <el-radio-group v-model="registerForm.civility" @blur="handleBlur('civility')">
        <el-radio :value="'man'">M.</el-radio>
        <el-radio :value="'woman'">Mme</el-radio>
      </el-radio-group>
      <p v-if="errors.civility" class="error">{{ errors.civility }}</p>

      <FormInput
        label="Prénom"
        placeholder="Prénom"
        v-model="registerForm.firstname"
        :error="errors.firstname"
        @blur="handleBlur('firstname')"
        type="text"
        hidden-label
      />

      <FormInput
        label="Nom de famille"
        placeholder="Nom de famille"
        v-model="registerForm.lastname"
        :error="errors.lastname"
        @blur="handleBlur('lastname')"
        type="text"
        hidden-label
      />

      <el-button type="primary" native-type="submit" :disabled="isSubmitting">Valider</el-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { RegisterForm } from '@/utils/types'
import { registerFormSchema } from '@/utils/validation/schema'
import { validateField } from '@/utils/validation/validator'
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'

const isSubmitting = ref(false)

const registerForm: RegisterForm = reactive({
  email: '',
  password: '',
  civility: 'man',
  firstname: '',
  lastname: ''
})

const errors = reactive({
  email: '',
  password: '',
  civility: '',
  firstname: '',
  lastname: ''
})

const handleBlur = (field: keyof typeof registerForm) => {
  console.log('handleBlur')
  console.log(errors)
  validateField(field, registerFormSchema, registerForm, errors)
}

const submitForm = async () => {
  isSubmitting.value = true

  try {
    const registerUser = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerForm)
    })

    console.log(registerUser)
  } catch (error) {
    console.log('Problème')
    console.log(error)
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

h1,
h2 {
  margin: 0;
  text-transform: uppercase;
  text-align: center;
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
</style>
