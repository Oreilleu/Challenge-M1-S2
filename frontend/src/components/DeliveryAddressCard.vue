<template>
  <article class="container-delivery-address">
    <div>
      <div>
        <el-text>Rue :</el-text>
        <el-text style="font-weight: bold">{{ deliveryAddress.street }}</el-text>
      </div>
      <div>
        <el-text>Ville :</el-text>
        <el-text style="font-weight: bold">{{ deliveryAddress.city }}</el-text>
      </div>
      <div>
        <el-text>Code postal :</el-text>
        <el-text style="font-weight: bold">{{ deliveryAddress.postalCode }}</el-text>
      </div>
      <div>
        <el-text>Pays :</el-text>
        <el-text style="font-weight: bold">{{ deliveryAddress.country }}</el-text>
      </div>
    </div>
    <div class="container-icon">
      <el-button style="margin: 0">
        <el-icon :size="20">
          <CircleX />
        </el-icon>
      </el-button>
      <el-button style="margin: 0">
        <el-icon :size="20">
          <Pencil />
        </el-icon>
      </el-button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { DeliveryAddress } from '@/utils/types/interfaces/delivery-address.interface'
import { CircleX, Pencil } from 'lucide-vue-next'

type Props = {
  deliveryAddress: DeliveryAddress
}

defineProps<Props>()
</script>

<style scoped>
.container-delivery-address {
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container-icon {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}
</style>
