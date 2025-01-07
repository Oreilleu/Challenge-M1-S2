<template>
    <form v-if="order" @submit.prevent="onSubmit" class="form-order">
        <h2> Commande n° {{ order._id }} </h2>
        <FormInputSelect
            id="status"
            name="status"
            label="Status"
            labelDefaultOption="Sélectionnez une option"
            v-model="order.status"
            :default-selected-value="order.status || 'Pas de status'"
            :options="[
                { value: StatusOrder.PROCESSING, label: 'En cours de traitement' },
                { value: StatusOrder.PAID, label: 'Payée' },
                { value: StatusOrder.PROCESSING, label: 'Annulée' },
                { value: StatusOrder.SHIPPED, label: 'Expediée' },
                { value: StatusOrder.DELIVERED, label: 'Livrée' },
            ]"
            :disabledDefaultOption="true"
        />
    
        <el-button
            type="primary"
            style="margin:0"
            native-type="submit"
            :disabled="Object.keys(errors).length !== 0"
        >Modifier la commande
        </el-button>
    </form>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import FormInputSelect from '../FormInputSelect.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import { orderSchema } from '@/utils/validation/schema'

import type { Order } from '@/utils/types/interfaces/order.interface'

import { fetchUpdateOrder } from '@/utils/api/order'

import useDrawerStore from '@/utils/store/useDrawerStore';

import useOrderStore from '@/utils/store/useOrderStore';

import toastHandler from '@/utils/toastHandler';

import { ToastType } from '@/utils/types/toast-type.enum';

import { fetchOrderById} from '@/utils/api/order';

import { StatusOrder } from '@/utils/types/status-order.enum';


const drawerStore = useDrawerStore()

const response = ref<Order | null>(null)
const order = ref<Order | null>(null)

const orderStore = useOrderStore()

const schema = toTypedSchema(orderSchema)

const { handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: {
        status: order.value?.status as StatusOrder
    }
})

const onSubmit = handleSubmit(async () => {

    if (!order.value?.status) {
        toastHandler('Le statut de la commande est requis', ToastType.ERROR)
        return
    }

    const responseUpdate = await fetchUpdateOrder(order.value?._id,  order.value?.status)

    if (responseUpdate) {
        toastHandler('Commande modifiée avec succès', ToastType.SUCCESS)
        drawerStore.closeDrawer()
    } else {
        toastHandler('Erreur lors de la modification de la commande', ToastType.ERROR)
    }

    orderStore.updatePaginatedOrders(1, 20, '', 'status')
})

onMounted(async () => {
    const responseOrder = await fetchOrderById(drawerStore.updateId)
    
    response.value = responseOrder || null

    order.value = responseOrder ? responseOrder : null

    console.log(order.value)
})

</script>

<style scoped>
    .form-order {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>