<template>
  <el-card shadow="hover" style="width: 300px; padding: 10px; margin-bottom: 20px; cursor: pointer;">
    <el-image
      style="width: 100%; height: 200px; margin-bottom: 10px;"
      fit="cover"
      :src="formatImageUrl((product.variations.imagesApi || [])[0].path || '')"
      alt="product image"
    ></el-image>
    <span><strong>{{ product.name }}</strong></span>
    <p>${{ product.variations.price }}</p>
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
import type { AggregateProductOnVariation } from '@/utils/types/interfaces/aggregate-product-on-variation.interface'
import { formatImageUrl } from '../utils/formatImageUrl'
import useCartStore from '@/utils/store/useCartStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'

const cartStore = useCartStore()

const { product } = defineProps<{
  product: AggregateProductOnVariation
}>()

const addToCart = () => {
  cartStore.addProduct(product)
  toastHandler('Le produit a bien été ajouté au panier.', ToastType.SUCCESS)
}
</script>
