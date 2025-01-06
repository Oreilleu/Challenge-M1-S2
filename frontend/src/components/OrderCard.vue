<template>
  <el-row
    style="
      padding: 15px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
    "
  >
    <el-col
      :span="24"
      style="
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
        gap: 10px;
      "
    >
      <el-text as="span" style="font-weight: bold; margin-right: 10px">
        Commande {{ order._id }}
      </el-text>
      <el-text
        as="span"
        :style="{
          padding: '2px 8px',
          borderRadius: '4px',
          color: 'black',
          fontWeight: 'bold',
          backgroundColor: backgroundStatus[order.status as StatusOrder]
        }"
      >
        {{ order.status }}
      </el-text>

      <div style="display: flex; place-content: end; gap: 5px; flex: 2">
        <el-icon>
          <CalendarIcon :size="16" />
        </el-icon>
        <el-text style="color: black; font-weight: bold">
          {{ new Date(order.createdAt).toLocaleDateString('fr') }}
        </el-text>
      </div>
    </el-col>

    <el-col
      :span="24"
      style="border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 10px"
    >
      <ul
        v-for="(cartItem, index) in order.cart"
        style="display: flex; flex-direction: column"
        :key="index + 'CART'"
      >
        <li class="item-content">
          <el-image
            :src="formatImageUrl((cartItem.product.variations.imagesApi || [])[0].path || '')"
            fit="cover"
            style="width: 60px; height: 60px; border-radius: 4px"
          />
          <div class="item-details">
            <el-text as="span" style="width: 100%; font-weight: bold; color: black; display: block">
              {{ cartItem.product.name }} - {{ cartItem.product.variations.suffix }}
            </el-text>
            <el-text as="span" style="width: 100%">Quantité : {{ cartItem.quantite }}</el-text>
          </div>
          <el-text as="span" style="flex: 2; text-align: end; font-weight: bold; color: black">
            {{ cartItem.product.variations.price }} €
          </el-text>
        </li>
      </ul>
    </el-col>

    <el-col>
      <div>
        <el-text as="span">Total TTC</el-text>
        <el-text style="margin-left: 10px; font-weight: bold; color: black"
          >{{ order.totalPrice }} €</el-text
        >
      </div>
      <div>
        <!-- <el-button type="primary" size="small"> Détails</el-button> -->

        <el-button v-if="order.status === 'in-progress'" type="danger" size="small">
          <XIcon :size="16" class="button-icon" />
          <span class="button-text">Annuler</span>
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { formatImageUrl } from '@/utils/formatImageUrl'
import type { Order } from '@/utils/types/interfaces/order.interface'
import { StatusOrder } from '@/utils/types/status-order.enum'
import { CalendarIcon } from 'lucide-vue-next'

type Props = {
  order: Order
}

defineProps<Props>()

const backgroundStatus: { [key in StatusOrder]: any } = {
  [StatusOrder.PAID]: 'var(--primary-outline)',
  [StatusOrder.PROCESSING]: 'var(--info)',
  [StatusOrder.SHIPPED]: 'var(--info)',
  [StatusOrder.CANCELLED]: 'var(--danger)',
  [StatusOrder.DELIVERED]: 'var(--success)'
}
</script>

<style scoped>
.item-content {
  display: flex;
  align-items: center;
  text-align: 'start';
  gap: 15px;
}
</style>
