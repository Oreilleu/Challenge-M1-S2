<template>
  <div class="container-input">
    <label :for="id" :class="hiddenLabel ? 'visually-hidden' : ''">{{ label }}</label>
    <Field
      :id="id"
      :name="name"
      :type="type"
      v-model:model-value="model"
      :placeholder="placeholder"
      validate-on-input
    />
    <ErrorMessage :name="name" class="error" />
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

type Props = {
  id: string
  name: string
  label: string
  type: string
  placeholder?: string
  hiddenLabel?: boolean
}

defineProps<Props>()

const model = defineModel()
</script>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
}

input {
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid hsla(0, 0%, 7%, 0.43);
  padding-left: 10px;
}

input:hover {
  border-color: var(--primary-hover);
  outline: 1px solid var(--primary-outline);
}

input:focus-within {
  border-color: var(--primary-hover);
  outline: 1px solid var(--primary-outline);
}

.error {
  color: var(--danger);
  align-self: start;
}
</style>
