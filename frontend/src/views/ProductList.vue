<!-- <template>
    <el-row :gutter="20"> -->
<!-- Filter Sidebar -->
<!-- <el-col :span="5">
        <el-card>
          <h3>Price</h3>
          <el-slider v-model="priceRange" range :min="0" :max="2000" show-tooltip></el-slider>
  
          <div v-for="(filterGroup, name) in dynamicFilters" :key="name">
            <h3>{{ name }}</h3>
            <el-checkbox-group v-model="selectedFilters[name]" class="checkbox-group-column">
              <el-checkbox
                v-for="value in filterGroup"
                :key="value"
                :label="value"
              >{{ value }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </el-col> -->

<!-- Product Cards -->
<!-- <el-col :span="19">
        <el-input
          v-model="searchQuery"
          placeholder="Rechercher un produit"
          clearable
          style="margin-bottom: 20px;"
        />
  
        <el-row :gutter="20">
          <el-col v-for="product in filteredProducts" :key="product._id" :span="6">
            <el-card shadow="hover">
              <div class="product-info">
                <p><strong>Name:</strong> {{ product.name }}</p>
                <p><strong>Description:</strong> {{ product.description }}</p>
                <p><strong>Brand:</strong> {{ product.brand }}</p>
                <p><strong>Model:</strong> {{ product.model }}</p>
                <p><strong>Variations:</strong></p>
                <ul>
                  <li v-for="variation in product.variation" :key="variation.price">
                    <p><strong>Price:</strong> ${{ variation.price }}</p>
                    <p><strong>Quantity:</strong> {{ variation.quantite }}</p>
                    <p v-if="variation.quantite > 0" style="color: green;">
                      <strong>Disponibilité:</strong> Disponible
                    <el-button type="primary" @click="addToCart(variation) ">Ajouter au panier</el-button>
                    </p>
                    <p v-else style="color: red;">
                      <strong>Disponibilité:</strong> Indisponible
                      <el-button type="primary" disabled>Ajouter au panier</el-button>
                    </p>
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
        </el-row> -->

<!-- Pagination -->
<!-- <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="totalProducts"
          layout="prev, pager, next"
          @current-change="page => currentPage = page"
        />
      </el-col>
    </el-row>
  </template>
   -->
<!-- <script setup lang="ts">
  import localStorageHandler from '@/utils/localStorageHandler'
  import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
  import { onMounted, ref, computed } from 'vue'
  import type { Product } from '@/utils/types/product.interface'
  
  // State variables
  const products = ref<Product[]>([]);
  const searchQuery = ref<string>("");
  const priceRange = ref<[number, number]>([0, 2000]);
  const currentPage = ref(1);
  const pageSize = ref(4); // Number of items per page
  const selectedFilters = ref<{ [key: string]: string[] }>({}); // Holds selected filter values
  const dynamicFilters = ref<{ [key: string]: string[] }>({}); // Holds available filter options
  
  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      });
      const data = await response.json();
      products.value = data.data || [];
      extractDynamicFilters(); // Extract dynamic filters after fetching products
    } catch (error) {
      console.error(error);
    }
  };
  
  const extractDynamicFilters = () => {
    const filters: { [key: string]: string[] } = {};
  
    products.value.forEach(product => {
      product.variation.forEach(variation => {
        variation.filters.forEach(filter => {
          if (!filters[filter.name]) {
            filters[filter.name] = [];
          }
          if (!filters[filter.name].includes(filter.value)) {
            filters[filter.name].push(filter.value);
          }
        });
      });
    });
  
    dynamicFilters.value = filters;
  };
  
  onMounted(fetchProducts);
  
  // Filtered products based on search query, price range, and selected filters
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const withinPriceRange = product.variation.some(variation => variation.price >= priceRange.value[0] && variation.price <= priceRange.value[1]);
      const matchesFilters = Object.keys(selectedFilters.value).every(key => {
        if (!selectedFilters.value[key].length) return true; // If no filter selected, skip
        return product.variation.some(variation =>
          variation.filters.some(filter => selectedFilters.value[key].includes(filter.value))
        );
      });
  
      return matchesSearch && withinPriceRange && matchesFilters;
    }).slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
  });
  
  // Total number of filtered products for pagination
  const totalProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const withinPriceRange = product.variation.some(variation => variation.price >= priceRange.value[0] && variation.price <= priceRange.value[1]);
      const matchesFilters = Object.keys(selectedFilters.value).every(key => {
        if (!selectedFilters.value[key].length) return true; // If no filter selected, skip
        return product.variation.some(variation =>
          variation.filters.some(filter => selectedFilters.value[key].includes(filter.value))
        );
      });
  
      return matchesSearch && withinPriceRange && matchesFilters;
    }).length;
  });
  
  // Add to cart function
  const addToCart = (variation) => {
    console.log('Added to cart:', variation);
  };
  </script>
  
  <style scoped>
  .product-info {
    padding: 10px;
  }
  </style>
   -->
   <template>
    <div>
      <product-card :products="products" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ProductCard from '@/components/ProductCard.vue';
  import localStorageHandler from '@/utils/localStorageHandler';
  import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum';
  import type { Product } from '@/utils/types/product.interface';
  
  const products = ref<Product[] | null>(null);
  
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        }
      });
      const data = await response.json();
      return data.data || [];  
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  onMounted(async () => {
    const responseProducts = await fetchProducts();
    
    if (responseProducts.length > 0) {
      products.value = responseProducts.map(productData => ({
        name: productData.name,
        description: productData.description,
        brand: productData.brand,
        model: productData.model,
        category: productData.category,
        variation: JSON.parse(JSON.stringify(productData.variations)) 
      }));
    } else {
      products.value = null;
    }
  });
  </script>
  
