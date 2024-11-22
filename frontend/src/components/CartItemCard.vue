<template>
  <el-card style="position: relative; height: 180px">
    <el-button
      style="position: absolute; top: 10px; right: 10px; z-index: 99"
      @click="removeProduct"
    >
      <el-icon :size="20">
        <X />
      </el-icon>
    </el-button>
    <el-row style="gap: 15px; width: 100%">
      <el-col :span="6">
        <el-image
          :src="formatImageUrl((cartItem.product.variations.imagesApi || [])[0].path || '')"
          fit="cover"
          style="height: 120px; width: 100%; margin: auto"
        />
      </el-col>
      <el-col
        :span="16"
        style="display: flex; flex-direction: column; justify-content: space-between"
      >
        {{ cartItem.product.name }}
        <p>Prix: {{ cartItem.product.variations.price }} €</p>
        <p>Quantité:</p>
        <el-input-number v-model="quantite" :min="1" :max="100" @change="changeQuantite" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { formatImageUrl } from '@/utils/formatImageUrl'
import useCartStore from '@/utils/store/useCartStore'
import type { CartItem } from '@/utils/types/interfaces/cart-item.interface'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

type Props = {
  cartItem: CartItem
}

const cartStore = useCartStore()

const { cartItem } = defineProps<Props>()

const quantite = ref(cartItem.quantite)

const changeQuantite = (value: number) => {
  quantite.value = value
  cartStore.updateQuantity(cartItem.product, value)
}

const removeProduct = () => {
  cartStore.removeProduct(cartItem.product)
}
</script>

<style scoped></style>
