<template>
  <ul>
    <li v-for="cart in cartStore.cart" :key="cart.product._id">
      <CartItemCard :cartItem="cart" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import useCartStore from '@/utils/store/useCartStore'
import CartItemCard from './CartItemCard.vue'

const cartStore = useCartStore()
</script>

<style scoped></style>
