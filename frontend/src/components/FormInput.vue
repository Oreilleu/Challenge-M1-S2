<template>
  <div class="container-input">
    <label :class="hiddenLabel && 'visually-hidden'">{{ label }}</label>
    <el-input
      v-model="model"
      :type="type"
      :show-password="type === 'password'"
      :placeholder="placeholder"
      @input="emits('input')"
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

const emits = defineEmits(['input', 'blur'])
</script>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.el-input {
  height: 40px;
  border-radius: 10px;
  border: 1px solid hsla(0, 0%, 7%, 0.43);
}

.el-input:focus {
  border-color: red;
}

.el-input:hover {
  border-color: var(--primary-hover);
  outline: 1px solid var(--primary-outline);
}

.el-input:focus-within {
  border-color: var(--primary-hover);
  outline: 1px solid var(--primary-outline);
}

.el-input :deep(.el-input__wrapper) {
  background-color: unset !important;
  box-shadow: unset !important;
}

.el-input :deep(.el-input__inner) {
  border: none;
  color: black;
}

.error {
  color: var(--danger);
  align-self: start;
}

.el-input__wrapper {
  box-shadow: unset;
}
</style>
