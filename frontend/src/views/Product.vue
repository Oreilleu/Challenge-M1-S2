<template>
  <div>
    <el-row style="justify-content: space-between">
      <el-col :span="5">
        <el-card>
          <div v-for="(filters, name) in variationStore.paginateVariation?.filters" :key="name">
            <h3>{{ name }}</h3>

            <el-checkbox-group v-model="selectedFilters" class="checkbox-group-column">
              <el-checkbox
                v-for="value in filters"
                :key="value"
                :label="{ name: name, value: value }"
              >
                {{ value }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>

        <el-card v-if="variationStore.paginateVariation?.categoryFilter.length">
          <h3>Sous catégorie</h3>

          <el-checkbox-group v-model="selectedCategoriesFilters" class="checkbox-group-column">
            <el-checkbox
              v-for="(categoryFilter, index) in variationStore.paginateVariation?.categoryFilter"
              :key="index"
              :label="{ name: categoryFilter.name, value: categoryFilter._id }"
            >
              {{ categoryFilter.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-col>

      <el-col :span="18">
        <section>
          <h2>
            {{ variationStore.selectedCategory?.label || 'Tous les produits' }}
          </h2>

          <el-input
            v-model="searchQuery"
            placeholder="Rechercher un produit"
            clearable
            style="margin-bottom: 20px; margin-top: 10px"
          />

          <el-text v-if="!variationStore.paginateVariation?.paginates.length">
            Pas de produit correspondant aux filtres actifs.
          </el-text>

          <ul v-if="variationStore.paginateVariation?.paginates.length" class="listVariation">
            <li
              v-for="(variation, indexVariation) in variationStore.paginateVariation?.paginates"
              :key="indexVariation"
            >
              <ProductCard :product="variation" />
            </li>
          </ul>
        </section>
        <el-pagination
          :page-size="VARIATION_PER_PAGE"
          layout="prev, pager, next"
          :total="variationStore.paginateVariation?.count"
          :hide-on-single-page="
            (variationStore.paginateVariation?.paginates.length || 0) <= VARIATION_PER_PAGE
          "
          @current-change="setCurrentPage"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { VARIATION_PER_PAGE } from '@/utils/const'
import useVariationStore from '@/utils/store/useVariationStore'
import type { Filter } from '@/utils/types/interfaces/filter.interface'
import type { OptionCategory } from '@/utils/types/interfaces/option-category.interface'

const variationStore = useVariationStore()

const searchQuery = ref<string>('')
const selectedFilters = ref<Filter[]>([])
const selectedCategoriesFilters = ref<OptionCategory[]>([])

const paginationPage = ref(1)

const setCurrentPage = (newPage: number) => {
  paginationPage.value = newPage

  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }

  const idSubCategories =
    selectedCategoriesFilters.value && selectedCategoriesFilters.value.length > 0
      ? selectedCategoriesFilters.value.map((category) => category.value)
      : undefined

  const params = {
    page: paginationPage.value,
    limit: VARIATION_PER_PAGE,
    searchOption: options,
    idSubCategories
  }

  variationStore.updatePaginateVariations(params)
}

watch(selectedFilters, () => {
  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }

  const idSubCategories =
    selectedCategoriesFilters.value && selectedCategoriesFilters.value.length > 0
      ? selectedCategoriesFilters.value.map((category) => category.value)
      : undefined

  const params = {
    page: paginationPage.value,
    limit: VARIATION_PER_PAGE,
    searchOption: options,
    idSubCategories
  }

  variationStore.updatePaginateVariations(params)
})

watch(selectedCategoriesFilters, () => {
  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }

  const idSubCategories =
    selectedCategoriesFilters.value && selectedCategoriesFilters.value.length > 0
      ? selectedCategoriesFilters.value.map((category) => category.value)
      : undefined

  const params = {
    page: paginationPage.value,
    limit: VARIATION_PER_PAGE,
    searchOption: options,
    idSubCategories
  }

  variationStore.updatePaginateVariations(params)
})

watch(searchQuery, () => {
  if (
    searchQuery.value.length < 3 &&
    selectedFilters.value.length === 0 &&
    selectedCategoriesFilters.value.length === 0
  ) {
    variationStore.updatePaginateVariations({
      page: paginationPage.value,
      limit: VARIATION_PER_PAGE
    })
    return
  }

  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }

  const idSubCategories =
    selectedCategoriesFilters.value && selectedCategoriesFilters.value.length > 0
      ? selectedCategoriesFilters.value.map((category) => category.value)
      : undefined

  const params = {
    page: paginationPage.value,
    limit: VARIATION_PER_PAGE,
    searchOption: options,
    idSubCategories
  }
  variationStore.updatePaginateVariations(params)
})

onMounted(async () => {
  variationStore.updatePaginateVariations({ page: paginationPage.value, limit: VARIATION_PER_PAGE })
})
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
}

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
