<template>
  <div class="orders-container">
    <h1>Mes commandes</h1>

    <el-text v-if="!orderStore.orders.length">Vous n'avez pas encore passé de commande.</el-text>

    <div v-if="orderStore.orders.length > 0">
      <ul v-for="order in orderStore.orders" :key="order._id">
        <li>
          <OrderCard :order="order" />
        </li>
      </ul>
    </div>

    <div v-if="!orderStore.orders.length" class="no-orders">
      <PackageIcon :size="48" class="icon-no-orders" />
      <p>Vous n'avez pas encore de commandes.</p>
    </div>

    <div class="orders-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="orderStore.orders.length"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PackageIcon } from 'lucide-vue-next'
import useOrderStore from '@/utils/store/useOrderStore'
// @ts-ignore
import OrderCard from './OrderCard.vue'

const currentPage = ref(1)
const pageSize = ref(5)

const orderStore = useOrderStore()
</script>

<style scoped>
.orders-container {
  /* padding: 15px; */
  max-width: 1200px;
  margin: 0 auto;
}

.orders-filter {
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.order-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  gap: 10px;
}

.order-number {
  font-weight: bold;
  color: #555;
}

.order-status {
  margin-left: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-in-progress {
  background-color: #e6f2ff;
  color: var(--);
}

.status-delivered {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-cancelled {
  background-color: #fff1f0;
  color: #f5222d;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 500;
}

.item-quantity {
  color: #666;
  font-size: 0.9rem;
}

.order-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
  gap: 10px;
}

.order-total strong {
  color: #1890ff;
  font-size: 1.1rem;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.button-icon {
  margin-right: 5px;
}

.no-orders {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.icon-no-orders {
  color: #e0e0e0;
  margin-bottom: 15px;
}

.orders-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .orders-filter {
    margin-bottom: 10px;
  }

  .filter-row {
    flex-direction: column;
    gap: 10px;
  }

  .status-select,
  .date-range {
    width: 100%;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item-content {
    width: 100%;
    justify-content: space-between;
  }

  .order-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-actions {
    width: 100%;
    justify-content: space-between;
  }

  .button-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .orders-container {
    padding: 10px;
  }

  .order-card {
    padding: 10px;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }
}
</style>
