<template>
  <div class="container-page">
    <h1>Panier</h1>

    <div class="container-stepper">
      <el-steps style="min-width: 1020px; margin: auto" :active="cartStore.activeStep" simple>
        <el-step title="Panier" @click="clickOnStep(StepperCart.CART)" />
        <el-step title="Connexion" @click="clickOnStep(StepperCart.LOGIN)" />
        <el-step title="Livraison" @click="clickOnStep(StepperCart.SHIPPING)" />
        <el-step title="Paiement" @click="clickOnStep(StepperCart.PAYMENT)" />
        <el-step title="Résumé" @click="clickOnStep(StepperCart.REVIEW)" />
      </el-steps>
    </div>

    <div class="step">
      <component
        :is="getCurrentStepComponent"
        redirectTo="/cart"
        :onValidCart="() => onValidCart()"
        :onValidLogin="() => onValidLogin()"
        :onValidDeliveryAddress="() => next(StepperCart.PAYMENT)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CartDrawer from '@/components/CartDrawer.vue'
import FormLogin from '@/components/form/FormLogin.vue'
import ReviewCheckout from '@/components/ReviewCheckout.vue'
import SelectDeliveryAddress from '@/components/SelectDeliveryAddress.vue'
import Sessioncheckout from '@/components/Sessioncheckout.vue'
import localStorageHandler from '@/utils/localStorageHandler'
import useAuthStore from '@/utils/store/useAuthStore'
import useCartStore from '@/utils/store/useCartStore'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import toastHandler from '@/utils/toastHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { StepperCart } from '@/utils/types/stepper-cart.enum'
import { ToastType } from '@/utils/types/toast-type.enum'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

const stepComponents: { [key in StepperCart]: any } = {
  [StepperCart.CART]: CartDrawer,
  [StepperCart.LOGIN]: FormLogin,
  [StepperCart.SHIPPING]: SelectDeliveryAddress,
  [StepperCart.PAYMENT]: Sessioncheckout,
  [StepperCart.REVIEW]: ReviewCheckout
}

const getCurrentStepComponent = computed(() => {
  if (cartStore.activeStep === StepperCart.LOGIN && authStore.isAuthenticatedUser) {
    return stepComponents[StepperCart.SHIPPING]
  }
  return stepComponents[cartStore.activeStep as StepperCart]
})

const clickOnStep = (index: StepperCart) => {
  if (!cartStore.cart.length) {
    toastHandler('Votre panier est vide.', ToastType.WARNING)
    return
  }

  if (authStore.isAuthenticatedUser && index === StepperCart.LOGIN) {
    toastHandler('Vous etes déja connecter.', ToastType.WARNING)
    cartStore.activeStep = StepperCart.SHIPPING
    return
  }

  cartStore.activeStep = index
}

const onValidCart = () => {
  if (authStore.isAuthenticatedUser) {
    next(StepperCart.SHIPPING)
  } else {
    next(StepperCart.LOGIN)
  }
}

const onValidLogin = () => {
  const deliveryAddressStore = useDeliveryAddressStore()
  next(StepperCart.SHIPPING)
  deliveryAddressStore.updateDeliveryAddress()
}

const next = (index?: number) => {
  if (!cartStore.cart.length) return

  if (index) {
    cartStore.activeStep = index
    return
  }

  if (cartStore.activeStep++ > 2) cartStore.activeStep = 0
}

onMounted(() => {
  cartStore.activeStep = StepperCart.CART

  const sessionId = route.query.session_id as string

  if (localStorageHandler().get(LocalStorageKeys.SELECTED_ADDRESS_ID)) {
    cartStore.selectedAddressId = localStorageHandler().get(LocalStorageKeys.SELECTED_ADDRESS_ID)
  }

  if (sessionId) {
    cartStore.activeStep = StepperCart.REVIEW
  }
})

onUnmounted(() => {
  cartStore.activeStep = StepperCart.CART
})
</script>

<style scoped>
h1 {
  margin: 30px 0;
}

.container-page {
  overflow: hidden;
}

.container-stepper {
  overflow-x: auto;
}

.step {
  margin: 30px;
}
</style>
