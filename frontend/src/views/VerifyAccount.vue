<template>
  <h1>Verifie ton compte</h1>
</template>

<script setup lang="ts">
import localStorageHandler from '@/utils/localStorageHandler'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys, ToastType } from '@/utils/types'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const user = localStorageHandler().get(LocalStorageKeys.USER)

  if (user.isVerified) {
    router.push('/')
  }

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

      const data = await response.json()

      if (data.success) {
        toastHandler('Compte validé avec succès', ToastType.SUCCESS)
        router.push('/')
      } else {
        throw new Error()
      }
    } catch (error) {
      toastHandler('Erreur lors de la validation du compte, veuillez réessayer.', ToastType.ERROR)
    }
  }

  verifyAccount()
})
</script>

<style></style>
