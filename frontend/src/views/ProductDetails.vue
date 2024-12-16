<template>
  <div class="product-details-page" v-if="product">
    <div class="product-grid">
      <!-- Galerie d'images - Première colonne -->
      <div class="product-gallery">
        <el-carousel :autoplay="false" height="500px" trigger="hover">
          <el-carousel-item v-for="(image, index) in activeVariation?.imagesApi" :key="index">
            <el-image :src="formatImageUrl(image.path)" :alt="image.name" fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="product-info">
        <div class="header">
          <h1>{{ product.name }}</h1>
          <p>{{ product.description }}</p>
        </div>

        <div class="details">
          <h2>Détails du produit</h2>
          <ul>
            <li><strong>Marque :</strong> {{ product.brand }}</li>
            <li><strong>Modèle :</strong> {{ product.model }}</li>
            <li><strong>Catégorie :</strong> {{ product.idCategory }}</li>
          </ul>

          <!-- Variations -->
          <div class="variations">
            <h3>Variations disponibles</h3>
            <div class="variation-grid">
              <div v-for="(variation, index) in product.variations" :key="index" class="variation-card" :class="{
                'variation-selected': activeVariation?.price === variation.price
              }" @click="selectVariation(index)">
                <el-image :src="formatImageUrl((variation.imagesApi || [])[0].path || '')" alt="variation image"
                  fit="cover" style="width: 100px; height: 100px"></el-image>
                <div class="variation-details">
                  <p>
                    <strong>Couleur :</strong>
                    {{ variation.filters.find((f) => f.name === 'Couleur')?.value }}
                  </p>
                  <p><strong>Prix :</strong> ${{ variation.price }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="price-and-actions">
            <p><strong>Prix :</strong> ${{ activeVariation?.price }}</p>
            <p>
              <strong>Quantité :</strong>
              <span :style="{ color: (activeVariation?.quantite ?? 0) > 0 ? 'green' : 'red' }">
                {{ (activeVariation?.quantite ?? 0) > 0 ? 'Disponible' : 'Indisponible' }}
              </span>
            </p>
            <el-button :disabled="(activeVariation?.quantite ?? 0) <= 0" type="primary" @click="addToCart">
              Ajouter au panier
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="isLoading" class="loading">Chargement en cours...</div>
  <div v-else class="error">Produit introuvable.</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import type { Variation } from '@/utils/types/interfaces/variation.interface'
import { fetchProductById } from '@/utils/api/product'
import type { Product } from '@/utils/types/interfaces/product.interface'
import { formatImageUrl } from '@/utils/formatImageUrl'
import useCartStore from '@/utils/store/useCartStore'
import type { AggregateProductOnVariation } from '@/utils/types/interfaces/aggregate-product-on-variation.interface'

const product = ref<Product | null>(null)
const activeVariation = ref<Variation | null>(null)
const isLoading = ref<boolean>(true)

const route = useRoute()
const cartStore = useCartStore()
const productId = route.params.productId as string

const loadProductDetails = async () => {
  try {
    const fetchedProduct = await fetchProductById(productId)
    product.value = fetchedProduct
    activeVariation.value = fetchedProduct.variations[0] ?? null
  } catch (error) {
    console.error('Erreur lors du chargement du produit :', error)
    toastHandler('Produit introuvable.', ToastType.ERROR)
  } finally {
    isLoading.value = false
  }
}

// Changer la variation active
const selectVariation = (index: number) => {
  if (product.value?.variations[index]) {
    activeVariation.value = product.value.variations[index]
  }
}

const addToCart = () => {
  if (activeVariation.value) {
    const productCart: AggregateProductOnVariation = {
      _id: product?.value?._id || '',
      name: product?.value?.name || '',
      description: product?.value?.description || '',
      brand: product?.value?.brand || '',
      model: product?.value?.model || '',
      idCategory: product?.value?.idCategory || '',
      variations: activeVariation.value
    }

    cartStore.addProduct(productCart)
    toastHandler('Le produit a bien été ajouté au panier.', ToastType.SUCCESS)
  }
}

onMounted(() => {
  loadProductDetails()
})
</script>

<style scoped>
.product-details-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.product-gallery {
  width: 100%;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.header p {
  color: #666;
}

.variation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.variations {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

.variation-card {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
}

.variation-card:hover {
  border-color: #007bff;
}

.variation-selected {
  border: 1px solid #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
}

.variation-details {
  flex-grow: 1;
}

.price-and-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #007bff22;
  padding: 10px;
  border-radius: 4px;
}

.price-and-actions p {
  margin: 0;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .variation-grid {
    grid-template-columns: 1fr;
  }

  .product-gallery {
    order: 1;
  }

  .product-info {
    order: 2;
  }
}
</style>
