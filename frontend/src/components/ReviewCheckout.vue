<template>
  <h1>Review</h1>

  <div v-if="statusCheckout === 'complete'">
    <h2>Commande terminée</h2>
    <p>
      Votre commande a été finalisée avec succès. Vous recevrez un email de confirmation à l'adresse
      suivante : {{ emailCustomer }}
    </p>
  </div>

  <div v-if="statusCheckout !== 'complete'">
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

const statusCheckout = ref('')
const emailCustomer = ref<string | null>(null)

const createOrder = async (statusCheckout: string) => {
  try {
    await fetch(`${import.meta.env.VITE_BASE_API_URL}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      },
      body: JSON.stringify({
        cart: cartStore.cart,
        totalPrice: cartStore.price,
        addressId: localStorageHandler().get(LocalStorageKeys.SELECTED_ADDRESS_ID),
        statusCheckout: statusCheckout,
        billingAddress: localStorageHandler().get(LocalStorageKeys.BILLING_ADDRESS) || null
      })
    })
  } catch (error) {
    console.error('Error creating order', error)
  }
}

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
      statusCheckout.value = data.status
      emailCustomer.value = data.customer_email
    } else {
      statusCheckout.value = data.status
      emailCustomer.value = null
    }
  } catch (error) {
    toastHandler(
      "Une erreur s'est produite lors de la finalisation de votre commande.",
      ToastType.ERROR
    )
    statusCheckout.value = 'error'
    cartStore.activeStep = StepperCart.CART
    router.push('/cart')
  } finally {
    createOrder(statusCheckout.value)

    if (statusCheckout.value === 'complete') {
      cartStore.clearCart()
      cartStore.selectedAddressId = ''
      localStorageHandler().remove(LocalStorageKeys.CART)
      localStorageHandler().remove(LocalStorageKeys.SELECTED_ADDRESS_ID)
      localStorageHandler().remove(LocalStorageKeys.BILLING_ADDRESS)
    }
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
