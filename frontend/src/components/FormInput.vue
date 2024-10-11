<template>
  <div class="container-input">
    <label :class="hiddenLabel && 'visually-hidden'">{{ label }}</label>
    <el-input
      v-model="model"
      :type="type"
      :show-password="type === 'password'"
      :placeholder="placeholder"
      @blur="emits('blur')"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  label: string
  hiddenLabel: boolean
  placeholder: string
  type: string
  error: string
}
defineProps<Props>()

const model = defineModel()

const emits = defineEmits(['blur'])
</script>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-input {
  width: 250px;
}
.error {
  color: var(--danger);
  text-align: center;
}
</style>
