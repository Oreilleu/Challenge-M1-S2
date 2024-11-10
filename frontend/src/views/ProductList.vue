<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card>
          <!-- <h3>Price</h3> -->
          <!-- <el-slider v-model="priceRange" range :min="0" :max="2000" show-tooltip></el-slider> -->

          <div v-for="(filters, name) in filtersApi" :key="name">
            <h3>{{ name }}</h3>
            <el-checkbox-group v-model="selectedFilters[name]" class="checkbox-group-column">
              <el-checkbox v-for="value in filters" :key="value" :label="value">{{
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
        <section>
          <ul class="listVariation">
            <li
              v-for="(variation, indexVariation) in variationStore.paginateVariation?.paginates"
              :key="indexVariation"
            >
              <ProductCard :product="variation" />
            </li>
          </ul>
        </section>
        <el-pagination
          :page-size="PRODUCT_PER_PAGE"
          layout="prev, pager, next"
          :total="variationStore.paginateVariation?.count"
          :hide-on-single-page="variationStore.paginateVariation?.count < PRODUCT_PER_PAGE"
          @current-change="setCurrentPage"
        />
      </el-col>
    </el-row>
  </div>
</template>

<!-- // La pagination se fait sur tout les produits si l'input de recherche est vide (input.length < 3) ET s'il n'y a pas de filtres actifs

// Si l'input de recherche est actif (input.length >= 3) ET les filtres sont inactif, ca affiche les produits filtrés par la recherche
// -> + les recquêtes de pagination se font sur la route search

// Si les fitres sont actifs, ca affiche les produits filtrés par les filtres
// -> + les requêtes de pagination se font sur la route getByFiltres

// Si la l'input de rechercher est actif (input.length >= 3) ET les filtres sont actifs, ca affiche les produits filtrés par les filtres + par le texte
// -> Les requêtes de pagination se font sur la route getByFiltresAndSearch -->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import useProductStore from '@/utils/store/useProductStore'
import { PRODUCT_PER_PAGE } from '@/utils/const'
import { fetchFilters } from '@/utils/api/filter'
import useVariationStore from '@/utils/store/useVariationStore'

const searchQuery = ref<string>('')
const priceRange = ref<[number, number]>([0, 2000])
const selectedFilters = ref<{ [key: string]: string[] }>({})
const dynamicFilters = ref<{ [key: string]: string[] }>({})
const paginationPage = ref(1)
const filtersApi = ref<Record<string, string[]>>({})

const setCurrentPage = (newPage: number) => {
  paginationPage.value = newPage
  variationStore.updatePaginateVariations(paginationPage.value, PRODUCT_PER_PAGE)
  // productStore.updatePaginateProducts(newPage, PRODUCT_PER_PAGE)
}

const variationStore = useVariationStore()
// const productStore = useProductStore()
console.log(computed(() => filtersApi.value))
onMounted(async () => {
  // productStore.updatePaginateProducts(paginationPage.value, PRODUCT_PER_PAGE)
  variationStore.updatePaginateVariations(paginationPage.value, PRODUCT_PER_PAGE)
  filtersApi.value = await fetchFilters()
})

// const filteredProducts = computed(() => {
//   if (!products.value) return []

//   return products.value.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//     const withinPriceRange = product.variation.some(
//       (variation) =>
//         variation.price >= priceRange.value[0] && variation.price <= priceRange.value[1]
//     )
//     const matchesFilters = Object.keys(selectedFilters.value).every((key) => {
//       if (!selectedFilters.value[key].length) return true
//       return product.variation.some((variation) =>
//         variation.filters.some((filter) => selectedFilters.value[key].includes(filter.value))
//       )
//     })

//     return matchesSearch && withinPriceRange && matchesFilters
//   })
// })
</script>

<style scoped>
.listVariation {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.product-info {
  padding: 10px;
}
.checkbox-group-column {
  display: flex;
  flex-direction: column;
}
</style>
