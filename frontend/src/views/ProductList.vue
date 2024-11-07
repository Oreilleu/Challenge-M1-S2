<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card>
          <h3>Price</h3>
          <el-slider v-model="priceRange" range :min="0" :max="2000" show-tooltip></el-slider>

          <div v-for="(filterGroup, name) in dynamicFilters" :key="name">
            <h3>{{ name }}</h3>
            <el-checkbox-group v-model="selectedFilters[name]" class="checkbox-group-column">
              <el-checkbox v-for="value in filterGroup" :key="value" :label="value">{{
                value
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-input
          v-model="searchQuery"
          placeholder="Rechercher un produit"
          clearable
          style="margin-bottom: 20px"
        />

        <product-card :products="paginatedProducts" />

        <el-pagination
          v-if="filteredProducts.length > itemsPerPage"
          :current-page="currentPage"
          :page-size="itemsPerPage"
          layout="prev, pager, next"
          :total="filteredProducts.length"
          @current-change="handlePageChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import type { Product } from '@/utils/types/product.interface'

const products = ref<Product[] | null>(null)
const searchQuery = ref<string>('')
const priceRange = ref<[number, number]>([0, 2000])
const selectedFilters = ref<{ [key: string]: string[] }>({})
const dynamicFilters = ref<{ [key: string]: string[] }>({})
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(8)

const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error(error)
    return []
  }
}

const extractDynamicFilters = () => {
  const filters: { [key: string]: string[] } = {}

  products.value.forEach((product) => {
    product.variation.forEach((variation) => {
      variation.filters.forEach((filter) => {
        if (!filters[filter.name]) {
          filters[filter.name] = []
        }
        if (!filters[filter.name].includes(filter.value)) {
          filters[filter.name].push(filter.value)
        }
      })
    })
  })

  dynamicFilters.value = filters
}

onMounted(async () => {
  const responseProducts = await fetchProducts()

  if (responseProducts.length > 0) {
    products.value = responseProducts.map((productData) => ({
      name: productData.name,
      description: productData.description,
      brand: productData.brand,
      model: productData.model,
      category: productData.category,
      variation: JSON.parse(JSON.stringify(productData.variations))
    }))
    extractDynamicFilters()
  } else {
    products.value = null
  }
})

const filteredProducts = computed(() => {
  if (!products.value) return []

  return products.value.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const withinPriceRange = product.variation.some(
      (variation) =>
        variation.price >= priceRange.value[0] && variation.price <= priceRange.value[1]
    )
    const matchesFilters = Object.keys(selectedFilters.value).every((key) => {
      if (!selectedFilters.value[key].length) return true
      return product.variation.some((variation) =>
        variation.filters.some((filter) => selectedFilters.value[key].includes(filter.value))
      )
    })

    return matchesSearch && withinPriceRange && matchesFilters
  })
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
.product-info {
  padding: 10px;
}
.checkbox-group-column {
  display: flex;
  flex-direction: column;
}
</style>
