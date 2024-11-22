<template>
  <el-card shadow="hover" style="width: 320px">
    <el-image
      style="width: 100%; height: 200px"
      fit="cover"
      :src="formatImageUrl((product.variations.imagesApi || [])[0].path || '')"
      alt="product image"
    ></el-image>
    <span>{{ product.name }}</span>
    <p><strong>Price:</strong> ${{ product.variations.price }}</p>
    <p><strong>Quantity:</strong> {{ product.variations.quantite }}</p>
    <p v-if="product.variations.quantite > 0" style="color: green">
      <strong>Disponibilité:</strong> Disponible
    </p>
    <p v-else style="color: red">
      <strong>Disponibilité:</strong> Indisponible
      <el-button type="primary" disabled>Ajouter au panier</el-button>
    </p>
    <el-button @click="addToCart" type="primary">Add to cart</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { AggregateProductOnVariation } from '@/utils/types/interfaces/aggregate-product-on-variation.interface'
import { formatImageUrl } from '../utils/formatImageUrl'
import useCartStore from '@/utils/store/useCartStore'

const cartStore = useCartStore()

const { product } = defineProps<{
  product: AggregateProductOnVariation
}>()

const addToCart = () => {
  cartStore.addProduct(product)
}
</script>
