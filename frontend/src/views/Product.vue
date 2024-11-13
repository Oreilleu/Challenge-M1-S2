<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card>
          <div v-for="(filters, name) in filtersApi" :key="name">
            <h3>{{ name }}</h3>
            <el-checkbox-group v-model="selectedFilters" class="checkbox-group-column">
              <el-checkbox
                v-for="value in filters"
                :key="value"
                :label="{ name: name, value: value }"
                >{{ value }}</el-checkbox
              >
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
          :page-size="VARIATION_PER_PAGE"
          layout="prev, pager, next"
          :total="variationStore.paginateVariation?.count"
          :hide-on-single-page="variationStore.paginateVariation?.count < VARIATION_PER_PAGE"
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
import { fetchFilters } from '@/utils/api/filter'
import useVariationStore from '@/utils/store/useVariationStore'
import type { Filter } from '@/utils/types/interfaces/filter.interface'
import type { FormattedFilters } from '@/utils/types/interfaces/formatedFilters.interface'

const searchQuery = ref<string>('')
const selectedFilters = ref<Filter[]>([])

const paginationPage = ref(1)
const filtersApi = ref<FormattedFilters>({})

watch(selectedFilters, () => {
  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }
  variationStore.updatePaginateVariations(paginationPage.value, VARIATION_PER_PAGE, options)
})

watch(searchQuery, () => {
  if (searchQuery.value.length < 3) {
    variationStore.updatePaginateVariations(paginationPage.value, VARIATION_PER_PAGE)
    return
  }
  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }
  variationStore.updatePaginateVariations(paginationPage.value, VARIATION_PER_PAGE, options)
})

const setCurrentPage = (newPage: number) => {
  paginationPage.value = newPage
  const options = {
    filters: selectedFilters.value,
    searchInput: searchQuery.value
  }
  variationStore.updatePaginateVariations(paginationPage.value, VARIATION_PER_PAGE, options)
}

const variationStore = useVariationStore()

onMounted(async () => {
  variationStore.updatePaginateVariations(paginationPage.value, VARIATION_PER_PAGE)
  filtersApi.value = await fetchFilters()
})
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
