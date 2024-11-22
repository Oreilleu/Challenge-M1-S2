<template>
  <ListCartItem />

  <p>Total panier : {{ cartStore.price }} €</p>

  <el-button @click="cartStore.clearCart" type="danger">Vider le panier</el-button>
  <el-button @click="goToCart" type="primary">Valider le panier</el-button>
</template>

<script setup lang="ts">
import useCartStore from '@/utils/store/useCartStore'
import { useRouter } from 'vue-router'
import useDrawerStore from '@/utils/store/useDrawerStore'
import ListCartItem from './ListCartItem.vue'

const router = useRouter()
const cartStore = useCartStore()
const drawerStore = useDrawerStore()

const goToCart = () => {
  router.push('/cart')
  drawerStore.closeDrawer()
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
