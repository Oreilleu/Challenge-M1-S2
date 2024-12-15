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

    <div v-if="filteredOrders.length === 0" class="no-orders">
      <PackageIcon :size="48" class="icon-no-orders" />
      <p>Vous n'avez pas encore de commandes.</p>
    </div>

    <div class="orders-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalOrders"
        layout="prev, pager, next"
      />
    </div>

    <!-- <div v-if="filteredOrders.length === 0" class="no-orders">
      <PackageIcon :size="48" class="icon-no-orders" />
      <p>Vous n'avez pas encore de commandes.</p>
    </div> -->

    <!-- <div class="orders-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalOrders"
        layout="prev, pager, next"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PackageIcon } from 'lucide-vue-next'
import useOrderStore from '@/utils/store/useOrderStore'
// @ts-ignore
import OrderCard from './OrderCard.vue'

const selectedStatus = ref('')
const dateRange = ref(null)
const currentPage = ref(1)
const pageSize = ref(5)

const orderStore = useOrderStore()

const orders = ref([
  {
    id: '12345',
    date: new Date('2024-02-15'),
    status: 'in-progress',
    total: 529.98,
    items: [
      {
        productId: 'p1',
        name: 'Casque Bluetooth Sony WH-1000XM5',
        quantity: 1,
        price: 399.99,
        image: 'https://m.media-amazon.com/images/I/61D4Z3yKPAL._AC_SX425_.jpg'
      },
      {
        productId: 'p2',
        name: 'Montre connectée Samsung Galaxy Watch 6',
        quantity: 1,
        price: 129.99,
        image:
          'https://site.glotelho.cm/media/catalog/product/cache/3d5322e2293df1ca8e64a115bdb04917//s/a/samsung_galaxy_watch_6_-_40_mm_prix_cameroun_en_fcfa_-_g.jpg'
      }
    ]
  }
])

const totalOrders = computed(() => orders.value.length)

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const statusMatch = !selectedStatus.value || order.status === selectedStatus.value
    const dateMatch = !dateRange.value || true
    return statusMatch && dateMatch
  })
})

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatPrice = (price: any) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getStatusLabel = (status: any) => {
  const statusLabels = {
    'in-progress': 'En cours',
    delivered: 'Livrée',
    cancelled: 'Annulée'
  }
  return status
}

const getStatusClass = (status: any) => {
  return `status-${status}`
}

const viewOrderDetails = (orderId: any) => {
  // Logique pour afficher les détails de la commande
  console.log(`Voir détails commande ${orderId}`)
}

const cancelOrder = (orderId: any) => {
  // Logique pour annuler une commande
  console.log(`Annuler commande ${orderId}`)
}
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
