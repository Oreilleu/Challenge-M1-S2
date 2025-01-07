<template>
  <div class="verify-account">
    <h1>Verifie ton compte</h1>

    <el-button type="primary" @click="verifyAccount">Vérifier mon compte</el-button>
  </div>
</template>

<script setup lang="ts">
import localStorageHandler from '@/utils/localStorageHandler'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { ToastType } from '@/utils/types/toast-type.enum'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const authToken: string = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

const validateAccountToken = route.query.token as string

const verifyAccount = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/verify-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ validateAccountToken })
    })

    if (!response.ok) {
      throw new Error()
    }

    const json = await response.json()

    if (json.success) {
      toastHandler('Compte validé avec succès', ToastType.SUCCESS)
      localStorageHandler().set(LocalStorageKeys.USER, json.data)
      router.push('/')
    } else {
      throw new Error()
    }
  } catch (error) {
    toastHandler('Erreur lors de la validation du compte, veuillez réessayer.', ToastType.ERROR)
    router.push('/account-unvalidated')
  }
}

onMounted(() => {
  if (!validateAccountToken) {
    toastHandler('Token de validation manquant', ToastType.ERROR)
    router.push('/account-unvalidated')
  }

  const user = localStorageHandler().get(LocalStorageKeys.USER)

  if (user.isVerified) {
    toastHandler('Votre compte est déja validé', ToastType.INFO)
    router.push('/')
  }
})
</script>

<style scoped>
.verify-account {
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

.verify-account h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.verify-account p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.verify-account .el-button {
  font-size: 1em;
  padding: 10px 20px;
}
</style>
