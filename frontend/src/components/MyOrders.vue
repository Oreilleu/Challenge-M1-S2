<template>
  <div class="orders-container">
    <h1 class="orders-title">MES COMMANDES</h1>

    <div class="orders-filter">
      <div class="filter-row">
        <el-select v-model="selectedStatus" placeholder="Tous les statuts" class="status-select">
          <el-option label="Tous les statuts" value="" />
          <el-option label="En cours" value="in-progress" />
          <el-option label="Livrée" value="delivered" />
          <el-option label="Annulée" value="cancelled" />
        </el-select>
        <div class="date-range">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="Au"
            start-placeholder="Date de début"
            end-placeholder="Date de fin"
          />
        </div>
      </div>
    </div>

    <div class="orders-list">
      <div v-for="order in filteredOrders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <span class="order-number">Commande #{{ order.id }}</span>
            <span :class="['order-status', getStatusClass(order.status)]">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>
          <div class="order-date">
            <CalendarIcon :size="16" class="icon-calendar" />
            {{ formatDate(order.date) }}
          </div>
        </div>

        <div class="order-items">
          <div v-for="item in order.items" :key="item.productId" class="order-item">
            <div class="item-content">
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-details">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-quantity">Quantité : {{ item.quantity }}</span>
              </div>
            </div>
            <span class="item-price">{{ formatPrice(item.price) }}</span>
          </div>
        </div>

        <div class="order-summary">
          <div class="order-total">
            <span>Total TTC</span>
            <strong>{{ formatPrice(order.total) }}</strong>
          </div>
          <div class="order-actions">
            <el-button type="primary" size="small" @click="viewOrderDetails(order.id)">
              <EyeIcon :size="16" class="button-icon" />
              <span class="button-text">Détails</span>
            </el-button>
            <el-button
              v-if="order.status === 'in-progress'"
              type="danger"
              size="small"
              @click="cancelOrder(order.id)"
            >
              <XIcon :size="16" class="button-icon" />
              <span class="button-text">Annuler</span>
            </el-button>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarIcon, PackageIcon, EyeIcon, XIcon } from 'lucide-vue-next'
import useOrderStore from '@/utils/store/useOrderStore'

const selectedStatus = ref('')
const dateRange = ref(null)
const currentPage = ref(1)
const pageSize = ref(5)

const orderStore = useOrderStore() // Tu as les commandes de l'utilisateur dans orderStore.orders

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
    const dateMatch =
      !dateRange.value || (order.date >= dateRange.value[0] && order.date <= dateRange.value[1])
    return statusMatch && dateMatch
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getStatusLabel = (status) => {
  const statusLabels = {
    'in-progress': 'En cours',
    delivered: 'Livrée',
    cancelled: 'Annulée'
  }
  return statusLabels[status] || status
}

const getStatusClass = (status) => {
  return `status-${status}`
}

const viewOrderDetails = (orderId) => {
  // Logique pour afficher les détails de la commande
  console.log(`Voir détails commande ${orderId}`)
}

const cancelOrder = (orderId) => {
  // Logique pour annuler une commande
  console.log(`Annuler commande ${orderId}`)
}
</script>

<style scoped>
.orders-container {
  padding: 15px;
  max-width: 1200px;
  margin: 0 auto;
}

.orders-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
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
  color: #1890ff;
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

  .orders-title {
    font-size: 1.2rem;
  }
}
</style>
