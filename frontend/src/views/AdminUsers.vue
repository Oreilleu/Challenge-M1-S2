<template>
  <AdminLayout>
    <section class="page">
      <h1>Liste des utilisateurs</h1>
      <el-table
        :data="userStore.paginateUser?.paginates"
        :empty-text="'Aucun utilisateur trouvé'"
        style="width: auto; overflow: auto"
      >
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="firstName" label="Prénom"></el-table-column>
        <el-table-column prop="lastName" label="Nom"></el-table-column>
        <el-table-column>
          <template #header>
            <el-input
              v-model="searchInput"
              placeholder="Rechercher"
              style="margin-bottom: 5px"
              @input="onChangeSearch"
            />
            <el-select v-model="searchColumn">
              <el-option
                v-for="item in OPTION_USER_SEARCH_COLUMN"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <!-- <template #default="scope">
          <el-button type="primary" @click="openDrawerUpdate(scope.row._id)">Editer</el-button>
          <el-button type="danger" @click="displayModalDelete(scope.row)">Supprimer</el-button>
        </template> -->
        </el-table-column>
      </el-table>

      <el-pagination
        :page-size="NUMBER_ADMIN_USER_PER_PAGE"
        layout="prev, pager, next"
        :total="userStore.paginateUser?.count || 0"
        :hide-on-single-page="userStore.paginateUser?.count || 0 < NUMBER_ADMIN_USER_PER_PAGE"
        @current-change="setCurrentPage"
      />
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import type { User } from '@/utils/types/interfaces/user.interface'
import useUserStore from '@/utils/store/useUserStore'
import { NUMBER_ADMIN_USER_PER_PAGE, OPTION_USER_SEARCH_COLUMN } from '@/utils/const'

const userStore = useUserStore()
const page = ref(1)
const searchInput = ref('')
const searchColumn = ref(OPTION_USER_SEARCH_COLUMN[0].value)

const createSearchOption = () => {
  return {
    searchInput: searchInput.value,
    column: searchColumn.value
  }
}

const setCurrentPage = (newPage: number) => {
  page.value = newPage

  const searchOption = createSearchOption()

  userStore.updatePaginateUsers(newPage, NUMBER_ADMIN_USER_PER_PAGE, searchOption)
}

const onChangeSearch = (e: string) => {
  searchInput.value = e

  const searchOption = createSearchOption()

  userStore.updatePaginateUsers(page.value, NUMBER_ADMIN_USER_PER_PAGE, searchOption)
}

onMounted(() => {
  const searchOption = createSearchOption()

  userStore.updatePaginateUsers(page.value, NUMBER_ADMIN_USER_PER_PAGE, searchOption)
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
