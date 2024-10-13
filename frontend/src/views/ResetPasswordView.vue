<template>
  <div class="container">
    <h1>Réinitialisation du mot de passe</h1>
    <form @submit.prevent="resetPassword">
      <FormInput
        label="Nouveau mot de passe"
        placeholder="Nouveau mot de passe"
        v-model="password"
        type="password"
        :error="errors.password"
      />

      <FormInput
        label="Confirmer le mot de passe"
        placeholder="Confirmer le mot de passe"
        v-model="confirmPassword"
        type="password"
        :error="errors.confirmPassword"
      />

      <el-button
        type="primary"
        native-type="submit"
        :disabled="isSubmitting || hasErrors(errors)"
      >
        Réinitialiser le mot de passe
      </el-button>
    </form>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="success">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { resetPasswordService } from "@/services/authService";
import FormInput from "@/components/FormInput.vue";

const route = useRoute();

const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const errors = {
  password: "",
  confirmPassword: "",
};

const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const response = await resetPasswordService(
      route.params.token,
      password.value
    );
    if (response.success) {
      successMessage.value = response.message;
      errorMessage.value = "";
    } else {
      errorMessage.value =
        response.message ||
        "Erreur lors de la réinitialisation du mot de passe.";
      successMessage.value = "";
    }
  } catch (error) {
    errorMessage.value = "Erreur interne du serveur.";
    successMessage.value = "";
  }
};

const hasErrors = (errors) => {
  return Object.values(errors).some((error) => error !== "");
};
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
