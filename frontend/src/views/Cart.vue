<template>
  <div class="container-page">
    <h1>Panier</h1>

    <div class="container-stepper">
      <el-steps
        style="min-width: 950px; margin: auto"
        :active="active"
        finish-status="success"
        simple
      >
        <el-step title="Panier" @click="active = 0" />
        <el-step v-if="!authStore.isAuthenticatedUser" title="Connexion" @click="active = 1" />
        <el-step title="Livraison" @click="active = 2" />
        <el-step title="Paiement" @click="active = 3" />
        <el-step title="Résumé" @click="active = 4" />
      </el-steps>
    </div>

    <component
      :is="handlerStep[active]"
      :useAsComponent="true"
      redirectTo="/cart"
      :nextStep="() => (active = 2)"
    />
  </div>
</template>

<script setup lang="ts">
import FormLogin from '@/components/form/FormLogin.vue'
import ListCartItem from '@/components/ListCartItem.vue'
import useAuthStore from '@/utils/store/useAuthStore'
import { computed, ref } from 'vue'

const active = ref(0)

const authStore = useAuthStore()

const handlerStep = computed<{ [key: number]: any }>(() => ({
  0: ListCartItem,
  1: FormLogin,
  2: null,
  3: null,
  4: null
}))

const prev = () => {
  if (active.value-- < 0) active.value = 0
}

const next = () => {
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
</style>
