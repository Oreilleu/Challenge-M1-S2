<template>
  <el-text v-if="!cartStore.cart.length" tag="p">Le panier est vide.</el-text>

  <ListCartItem />

  <div v-if="cartStore.cart.length > 0">
    <el-text tag="p" style="display: inline-block">Total panier :</el-text>
    <el-text style="font-weight: bold">{{ ' ' }}{{ cartStore.price }} €</el-text>
  </div>

  <el-button v-if="cartStore.cart.length > 0" @click="cartStore.clearCart" type="danger">
    Vider le panier
  </el-button>
  <el-button v-if="cartStore.cart.length > 0" @click="onvalid" type="primary">
    Valider le panier
  </el-button>
</template>

<script setup lang="ts">
import useCartStore from '@/utils/store/useCartStore'
import { useRouter } from 'vue-router'
import useDrawerStore from '@/utils/store/useDrawerStore'
import ListCartItem from './ListCartItem.vue'

type Props = {
  onValidCart?: () => void
}

const { onValidCart } = defineProps<Props>()

const router = useRouter()
const cartStore = useCartStore()
const drawerStore = useDrawerStore()

const goToCart = () => {
  router.push('/cart')
  drawerStore.closeDrawer()
}

const onvalid = () => {
  if (onValidCart) {
    onValidCart()
  } else {
    goToCart()
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
