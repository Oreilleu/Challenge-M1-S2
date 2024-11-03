<template>
  <div class="container-input">
    <label :for="id" :class="hiddenLabel ? 'visually-hidden' : ''">{{ label }}</label>
    <Field
      :id="id"
      :as="as"
      :name="name"
      :type="type"
      v-model:model-value="model"
      :placeholder="placeholder"
      validate-on-input
      :class="as === 'textarea' ? 'textarea' : hiddenInput ? 'visually-hidden' : ''"
      :multiple="multiple"
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
  as?: string
  placeholder?: string
  hiddenLabel?: boolean
  hiddenInput?: boolean
  multiple?: boolean
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

.textarea {
  height: 100px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100px;
  max-height: 400px;
  border-radius: 10px;
  border: 1px solid hsla(0, 0%, 7%, 0.43);
  padding-left: 10px;
  font-family: var(--main-font);
  font-size: 13px;
}
</style>
