<template>
  <div class="favorites-container">
    <h1 class="favorites-title">MES FAVORIS</h1>

    <div class="favorites-filters">
      <el-input v-model="searchQuery" placeholder="Rechercher un produit" class="search-input">
        <template #prefix>
          <SearchIcon :size="16" />
        </template>
      </el-input>

      <el-select
        v-model="selectedCategory"
        placeholder="Toutes les catégories"
        class="category-select"
      >
        <el-option label="Toutes les catégories" value="" />
        <el-option
          v-for="category in categories"
          :key="category"
          :label="category"
          :value="category"
        />
      </el-select>
    </div>

    <div class="favorites-grid">
      <div v-for="product in filteredFavorites" :key="product.id" class="product-card">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <button class="remove-favorite-btn" @click="removeFavorite(product)">
            <XIcon :size="16" />
          </button>
        </div>

        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-category">{{ product.category }}</p>

          <div class="product-actions">
            <span class="product-price">
              {{ formatPrice(product.price) }}
            </span>
            <div class="action-buttons">
              <el-tooltip content="Ajouter au panier" placement="top">
                <button class="cart-btn" @click="addToCart(product)">
                  <ShoppingCartIcon :size="16" />
                </button>
              </el-tooltip>
              <el-tooltip content="Voir le détail" placement="top">
                <button class="view-btn" @click="viewProductDetails(product)">
                  <EyeIcon :size="16" />
                </button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredFavorites.length === 0" class="no-favorites">
      <HeartOffIcon :size="48" class="icon-no-favorites" />
      <p>Vous n'avez pas encore de favoris.</p>
      <el-button type="primary" @click="exploreProducts"> Découvrir nos produits </el-button>
    </div>

    <div class="favorites-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalFavorites"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon, XIcon, ShoppingCartIcon, EyeIcon, HeartOffIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const pageSize = ref(9)

const favorites = ref([
  {
    id: 'p1',
    name: 'Ordinateur portable Dell XPS 15',
    category: 'Électronique',
    price: 1499.99,
    image:
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-5.psd?fmt=pjpg&pscan=auto&scl=1&wid=3481&hei=2067&qlt=100,1&resMode=sharp2&size=3481,2067&chrss=full&imwidth=5000'
  },
  {
    id: 'p2',
    name: 'Écouteurs sans fil Bose QuietComfort',
    category: 'Électronique',
    price: 299.99,
    image: 'https://www.nkclmarket.com/upload/products/thambnail/1778640060571023.png'
  },
  {
    id: 'p3',
    name: 'Caméra GoPro HERO11 Black',
    category: 'Électronique',
    price: 399.99,
    image:
      'https://robeezelectronics.com/image/cache/catalog/1%20new%20images/Cameras/Action%20Cameras/GoPro/Hero11%20Black/Hero%2011%202-500x500.jpg'
  }
])

const categories = computed(() => {
  return [...new Set(favorites.value.map((p) => p.category))]
})

const totalFavorites = computed(() => favorites.value.length)

const filteredFavorites = computed(() => {
  return favorites.value.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const categoryMatch = !selectedCategory.value || product.category === selectedCategory.value
    return nameMatch && categoryMatch
  })
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const removeFavorite = (product) => {
  const index = favorites.value.findIndex((p) => p.id === product.id)
  if (index !== -1) {
    favorites.value.splice(index, 1)
  }
}

const addToCart = (product) => {
  // Logique d'ajout au panier
  console.log('Ajout au panier:', product)
}

const viewProductDetails = (product) => {
  // Logique de navigation vers les détails du produit
  console.log('Voir détails:', product)
}

const exploreProducts = () => {
  // Logique de navigation vers la page des produits
  console.log('Explorer les produits')
}
</script>

<style scoped>
.favorites-container {
  padding: 20px;
}

.favorites-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.favorites-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
}

.search-input {
  flex-grow: 1;
}

.category-select {
  width: 250px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-favorite-btn:hover {
  background-color: #f5f5f5;
}

.product-details {
  padding: 15px;
}

.product-name {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-weight: bold;
  color: #1890ff;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.cart-btn,
.view-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;
}

.cart-btn:hover {
  color: #1890ff;
}

.view-btn:hover {
  color: #52c41a;
}

.no-favorites {
  text-align: center;
  padding: 50px 0;
  color: #999;
}

.icon-no-favorites {
  color: #e0e0e0;
  margin-bottom: 20px;
}

.favorites-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .favorites-filters {
    flex-direction: column;
  }

  .category-select {
    width: 100%;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
