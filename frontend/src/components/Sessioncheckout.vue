<template>
  <div id="checkout"></div>
</template>

<script setup lang="ts">
import localStorageHandler from '@/utils/localStorageHandler'
import useAuthStore from '@/utils/store/useAuthStore'
import useCartStore from '@/utils/store/useCartStore'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { StepperCart } from '@/utils/types/stepper-cart.enum'
import { ToastType } from '@/utils/types/toast-type.enum'
import { loadStripe, type StripeEmbeddedCheckout } from '@stripe/stripe-js'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

const cartStore = useCartStore()
const authStore = useAuthStore()

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const checkout = ref<StripeEmbeddedCheckout | null>(null)

const initialize = async () => {
  const fetchClientSecret = async () => {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/checkout/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: JSON.stringify({
          price: cartStore.price,
          description: cartStore.formatDescriptionCheckout(),
          email: localStorageHandler().get(LocalStorageKeys.USER).email,
          nameOrder: 'Commande 1',
          cart: cartStore.cart
        })
      }
    )
    const { clientSecret } = await response.json()
    return clientSecret
  }

  const stripe = await stripePromise

  if (!stripe) {
    console.error('Stripe failed to load')
    return
  }

  if (checkout.value) {
    checkout.value.destroy()
  }

  checkout.value = await stripe.initEmbeddedCheckout({
    fetchClientSecret
  })

  checkout.value.mount('#checkout')
}

onMounted(() => {
  initialize()
})

onBeforeUnmount(() => {
  if (checkout.value) {
    checkout.value.destroy()
  }
})

onBeforeMount(() => {
  if (!authStore.isAuthenticatedUser) {
    toastHandler('Vous devez être connecter.', ToastType.WARNING)
    cartStore.activeStep = StepperCart.LOGIN
    return
  }

  if (!cartStore.cart.length) {
    toastHandler('Votre panier est vide.', ToastType.WARNING)
    cartStore.activeStep = StepperCart.CART
    return
  }

  if (!cartStore.selectedAddressId) {
    toastHandler('Veuillez sélectionner une adresse de livraison.', ToastType.WARNING)
    cartStore.activeStep = StepperCart.SHIPPING
    return
  }
})
</script>

<style scoped></style>
