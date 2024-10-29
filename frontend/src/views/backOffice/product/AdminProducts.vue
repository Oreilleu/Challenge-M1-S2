<template>
  <AdminLayout>
    <section>
      <h1>Liste des produits</h1>
      <el-table-v2 :columns="columns" :data="data" :width="700" :height="400" fixed />
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { onMounted, ref } from 'vue'

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150
  }))

const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    )
  })

const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return
  }
}

const products = ref([])

onMounted(async () => {
  const resProducts = await fetchProducts()
  products.value = await resProducts.data
})

const columns = generateColumns(10)
const data = generateData(columns, 1000)
</script>

<style scoped></style>
