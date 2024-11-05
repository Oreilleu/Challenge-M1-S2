<template>
    <el-dialog :title="title" :width="width" v-model="localModalVisible" @close="closeModal">
        <slot></slot>
        <template #footer>
            <el-button @click="closeModal">Annuler</el-button>
            <el-button type="primary" @click="confirmModal">Confirmer</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
        title: String,
        width: {
            type: String,
            default: '50%'
        },
        modalVisible: {
            type: Boolean,
            default: false
        }
})

const emit = defineEmits(['update:modalVisible', 'confirm'])

const localModalVisible = ref(props.modalVisible)

watch(() => props.modalVisible, (newValue) => {
    localModalVisible.value = newValue
})

const closeModal = () => {
    localModalVisible.value = false
    emit('update:modalVisible', false)
}

const confirmModal = () => {
    emit('confirm')
}

</script>
