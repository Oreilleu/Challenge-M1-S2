<template>
  <div class="container-select">
    <label :for="id" :class="hiddenLabel ? 'visually-hidden' : ''">{{ label }}</label>
    <Field
      :id="id"
      :name="name"
      v-model:model-value="model"
      as="select"
      validate-on-input
      class="select"
      :disabled="!options.length"
    >
      <option value="" :selected="!defaultSelectedValue" disabled>
        {{ !options.length ? "Pas d'options disponible" : labelDefaultOption }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="defaultSelectedValue === option.value"
      >
        {{ option.label }}
      </option>
    </Field>
    <ErrorMessage :name="name" class="error" />
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

type Props = {
  id: string
  name: string
  label: string
  labelDefaultOption: string
  defaultSelectedValue?: string
  options: Array<{
    value: string
    label: string
  }>
  hiddenLabel?: boolean
}

const { defaultSelectedValue } = defineProps<Props>()

const model = defineModel()
model.value = defaultSelectedValue
</script>

<style scoped>
.select {
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid hsla(0, 0%, 7%, 0.43);
  padding-left: 10px;
  background: unset;
}
.error {
  color: var(--danger);
  align-self: start;
}
</style>
