<template>
  <el-card shadow="hover" style="width: 320px">
    <div style="cursor: pointer" @click="goToDetails">
      <el-image
        style="width: 100%; height: 200px"
        fit="cover"
        :src="formatImageUrl((product.variations.imagesApi || [])[0].path || '')"
        alt="product image"
      ></el-image>
    </div>
    <span>{{ formattedNameProduct(product) }}</span>
    <p><strong>Price:</strong> ${{ product.variations.price }}</p>
    <p><strong>Quantity:</strong> {{ product.variations.quantite }}</p>
    <p v-if="product.variations.quantite > 0" style="color: green">
      <strong>Disponibilité:</strong> Disponible
    </p>
    <p v-else style="color: red">
      <strong>Disponibilité:</strong> Indisponible
      <el-button type="primary" disabled>Ajouter au panier</el-button>
    </p>
    <div class="button-container">
      <el-link type="info" @click="goToDetails"> Voir les détails </el-link>
      <el-button @click="addToCart" type="primary">Add to cart</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { AggregateProductOnVariation } from '@/utils/types/interfaces/aggregate-product-on-variation.interface'
import { formatImageUrl } from '../utils/formatImageUrl'
import useCartStore from '@/utils/store/useCartStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import { useRouter } from 'vue-router'
import { formattedNameProduct } from '@/utils/formattedNameProduct'

const cartStore = useCartStore()
const router = useRouter()

const { product } = defineProps<{
  product: AggregateProductOnVariation
}>()

const addToCart = () => {
  cartStore.addProduct(product)
  toastHandler('Le produit a bien été ajouté au panier.', ToastType.SUCCESS)
}
const goToDetails = () => {
  router.push(`/product-details/${product._id}`)
}
</script>

<style>
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
</style>
