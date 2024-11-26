<template>
  <h1>Review</h1>

  <div v-if="isCompleteCheckout">
    <h2>Commande terminée</h2>
    <p>
      Votre commande a été finalisée avec succès. Vous recevrez un email de confirmation à l'adresse
      suivante : {{ emailCustomer }}
    </p>
  </div>

  <div v-if="!isCompleteCheckout">
    <h2>Une erreur s'est produite</h2>
    <p>
      Une erreur s'est produite lors de la finalisation de votre commande. Veuillez réessayer ou
      contacter le support.
    </p>
  </div>
</template>

<script setup lang="ts">
import localStorageHandler from '@/utils/localStorageHandler'
import useAuthStore from '@/utils/store/useAuthStore'
import useCartStore from '@/utils/store/useCartStore'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { StepperCart } from '@/utils/types/stepper-cart.enum'
import { ToastType } from '@/utils/types/toast-type.enum'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

const isCompleteCheckout = ref(false)
const emailCustomer = ref<string | null>(null)

onMounted(async () => {
  const sessionId = route.query.session_id

  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/checkout/session-status?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    }
  )
  const data: { status: string; customer_email: string } = await response.json()

  if (data.status === 'complete') {
    isCompleteCheckout.value = true
    emailCustomer.value = data.customer_email
  } else {
    isCompleteCheckout.value = false
    emailCustomer.value = null
  }
})

onBeforeMount(() => {
  if (!authStore.isAuthenticatedUser) {
    toastHandler('Vous devez être connecter..', ToastType.WARNING)
    cartStore.activeStep = StepperCart.LOGIN
    return
  }

  if (!cartStore.cart.length) {
    toastHandler('Votre panier est vide.', ToastType.WARNING)
    cartStore.activeStep = StepperCart.CART
    return
  }

  const sessionId = route.query.session_id

  if (!sessionId) {
    toastHandler("Le paiement n'est pas finaliser.", ToastType.WARNING)
    cartStore.activeStep = StepperCart.PAYMENT
    return
  }
})
</script>
