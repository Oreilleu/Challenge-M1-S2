<template>
  <div class="container-page">
    <h1>Panier</h1>

    <div class="container-stepper">
      <el-steps style="min-width: 1020px; margin: auto" :active="active" simple>
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
        :useAsComponent="true"
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
import SelectDeliveryAddress from '@/components/SelectDeliveryAddress.vue'
import useAuthStore from '@/utils/store/useAuthStore'
import useCartStore from '@/utils/store/useCartStore'
import useDeliveryAddressStore from '@/utils/store/useDeliveryAddressStore'
import toastHandler from '@/utils/toastHandler'
import { StepperCart } from '@/utils/types/stepper-cart.enum'
import { ToastType } from '@/utils/types/toast-type.enum'
import { computed, ref } from 'vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const deliveryAddressStore = useDeliveryAddressStore()

const active = ref(0)

const stepComponents: { [key in StepperCart]: any } = {
  [StepperCart.CART]: CartDrawer,
  [StepperCart.LOGIN]: FormLogin,
  [StepperCart.SHIPPING]: SelectDeliveryAddress,
  [StepperCart.PAYMENT]: null, // Payment component
  [StepperCart.REVIEW]: null // Review component
}

const getCurrentStepComponent = computed(() => {
  if (active.value === StepperCart.LOGIN && authStore.isAuthenticatedUser) {
    return stepComponents[StepperCart.SHIPPING]
  }
  return stepComponents[active.value as StepperCart]
})

const clickOnStep = (index: StepperCart) => {
  if (!cartStore.cart.length) return

  if (index === StepperCart.PAYMENT && !cartStore.selectedAddressId) {
    toastHandler('Veuillez sélectionner une adresse de livraison', ToastType.WARNING)
    return
  }

  if (index === StepperCart.LOGIN && authStore.isAuthenticatedUser) {
    index = StepperCart.SHIPPING
  }

  active.value = index
}

const onValidCart = () => {
  if (authStore.isAuthenticatedUser) {
    next(StepperCart.SHIPPING)
  } else {
    next(StepperCart.LOGIN)
  }
}

const onValidLogin = () => {
  next(StepperCart.SHIPPING)
  deliveryAddressStore.updateDeliveryAddress()
}
// const { test } = useCartStore()
const onValidDeliveryAddress = () => {
  next(StepperCart.PAYMENT)
}

const next = (index?: number) => {
  if (!cartStore.cart.length) return

  if (index) {
    active.value = index
    return
  }

  if (active.value++ > 2) active.value = 0
}
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
