<template>
  <div class="account-unvalidated">
    <h1>Compte non validé</h1>
    <p>Compte non vérifier, veuillez cliqué sur le lien recu après votre inscription.</p>

    <el-button type="primary" @click="sendEmail">Renvoyer un lien </el-button>
  </div>
</template>

<script setup lang="ts">
import localStorageHandler from '@/utils/localStorageHandler'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { ToastType } from '@/utils/types/toast-type.enum'

const sendEmail = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  try {
    await fetch(`${import.meta.env.VITE_BASE_API_URL}/send-verification-email`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    toastHandler('Email de vérification envoyé', ToastType.SUCCESS)
  } catch (error) {
    toastHandler(
      "Une erreur s'est produite lors de l'envoir de l'email de vérification, veuillez réessayer.",
      ToastType.ERROR
    )
  }
}
</script>

<style scoped>
.account-unvalidated {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  margin-top: -50px;
}

.account-unvalidated h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.account-unvalidated p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.account-unvalidated .el-button {
  font-size: 1em;
  padding: 10px 20px;
}
</style>
