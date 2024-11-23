<template>
  <el-dialog :title="title" :width="width" v-model="model" @close="closeModal">
    <slot></slot>
    <template v-if="displayFooter" #footer>
      <el-button @click="closeModal">Annuler</el-button>
      <el-button type="primary" @click="confirmModal"> Confirmer </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
type Props = {
  title: string
  width?: string
  displayFooter?: boolean
}

defineProps<Props>()

const emit = defineEmits(['confirm', 'close'])

const model = defineModel()

const closeModal = () => {
  model.value = false
  emit('close')
}

const confirmModal = () => {
  emit('confirm')
}
</script>
