<template>
  <AdminLayout>
    <Table
      title="Liste des commandes"
      :table-data="orderStore.paginatedOrders.data"
      empty-text="Aucune commande trouvée"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :totalItems="orderStore.paginatedOrders.total"
      @openDrawerUpdate="openDrawerUpdate"
      @displayModalDelete="displayModalDelete"
      @deleteSelectedData="deleteSelectedOrders"
      @changePage="HandleChangePage"
      @changeSizePage="HandleChangeSizePage"
      @search="HandleSearch"
    >
    </Table>
    <Modal
        :model-value="!!orderToDelete"
        :title="'Êtes-vous sur de vouloir supprimer la commande : ' + orderToDelete?.createdAt"
        :displayFooter="true"
        @close="orderToDelete = null"
        @confirm="deleteOrder(orderToDelete?._id)"
      >
      </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import type { Order } from '@/utils/types/interfaces/order.interface'
import { DrawerType } from '@/utils/types/drawer-type.enum'
import useDrawerStore from '@/utils/store/useDrawerStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import useOrderStore from '@/utils/store/useOrderStore'
import Modal from '@/components/Modal.vue'
import { fetchDeleteOrder } from '@/utils/api/order'
import Table from '@/components/Table.vue'

const orderStore = useOrderStore()
const drawerStore = useDrawerStore()
const currentPage = ref<number>(1)
const pageSize = ref<number>(20)
const searchInput = ref('')
const searchOption = ref('status')

const orderToDelete = ref<Order | null>(null)

const loadPaginatedOrders = () => {
  orderStore.updatePaginatedOrders(currentPage.value, pageSize.value, searchInput.value, searchOption.value)
}

const HandleChangePage = (page: number) => {
  currentPage.value = page
  loadPaginatedOrders()
}

const HandleChangeSizePage = (size: number) => {
  pageSize.value = size
  loadPaginatedOrders()
}

const HandleSearch = (search: string, searchKey: string) => {
  if(search === '') {
    searchOption.value = 'status'
  }
  searchInput.value = search
  searchOption.value = searchKey
  loadPaginatedOrders()
}

const openDrawerUpdate = (order: Order) => {
  if(!order?._id){
    toastHandler('Impossible de trouver la commande', ToastType.ERROR)
    return
  }
  drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_ORDER, order._id)
}

const displayModalDelete = (order: Order) => {
  orderToDelete.value = order
}

const deleteOrder = async (orderId: string | undefined) => {
  const isDeleted = await fetchDeleteOrder()

  if(isDeleted) {
    toastHandler('Commande supprimée avec succès', ToastType.SUCCESS)
    loadPaginatedOrders()
    orderToDelete.value = null
    return
  }

  orderToDelete.value = null
}

const deleteSelectedOrders = async (selectedOrders: Order[]) => {
  const isDeleted = await fetchDeleteOrder()

  if(isDeleted) {
    toastHandler('Commandes supprimées avec succès', ToastType.SUCCESS)
    loadPaginatedOrders()
    return
  }
}

onMounted(() => {
  loadPaginatedOrders()
})

</script>

<style scoped></style>
