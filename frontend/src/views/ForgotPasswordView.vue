<template>
  <div class="container">
    <h2>Réinitialiser le mot de passe</h2>
    <form @submit.prevent="submitEmail">
      <FormInput
        label="Entrez votre email :"
        placeholder="Email"
        v-model="email"
        type="email"
        required
        hidden-label
      />
      <el-button type="primary" native-type="submit"
        >Envoyer le lien de réinitialisation</el-button
      >
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { forgotPassword } from "@/services/authService";
import FormInput from "@/components/FormInput.vue";

const email = ref("");
const message = ref("");

const submitEmail = async () => {
  try {
    const response = await forgotPassword(email.value);
    message.value = response.message;
  } catch (error) {
    console.error(error);
    message.value = "Erreur lors de l'envoi de l'email.";
  }
};
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
