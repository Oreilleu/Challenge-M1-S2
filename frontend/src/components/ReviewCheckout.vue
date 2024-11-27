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
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const isCompleteCheckout = ref(false)
const emailCustomer = ref<string | null>(null)

// Ici si la commande est finalisé, je supprime le session_id
// + je créer la commande
// + j'envoie un email de confirmation

// Si la commande n'est pas complete, j'affiche le message d'erreur

// Je renvoie une erreur dans le back quand je suis dans le catch et si je tombe dans ce catch je vide les strore et je redirige vers la panier

onMounted(async () => {
  const sessionId = route.query.session_id

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/checkout/session-status?session_id=${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      }
    )

    if (!response.ok) {
      throw new Error()
    }

    const data: { status: string; customer_email: string } = await response.json()

    if (data.status === 'complete') {
      isCompleteCheckout.value = true
      emailCustomer.value = data.customer_email
      // cree la commande
      // envoyer un email avec la facture
      cartStore.clearCart()
      localStorageHandler().remove(LocalStorageKeys.CART)
      localStorageHandler().remove(LocalStorageKeys.SELECTED_ADDRESS_ID)
      localStorageHandler().remove(LocalStorageKeys.BILLING_ADDRESS)
    } else {
      isCompleteCheckout.value = false
      emailCustomer.value = null
    }
  } catch (error) {
    toastHandler(
      "Une erreur s'est produite lors de la finalisation de votre commande.",
      ToastType.ERROR
    )
    cartStore.activeStep = StepperCart.CART
    router.push('/cart')
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
