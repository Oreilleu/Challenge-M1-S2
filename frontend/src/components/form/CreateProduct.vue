<template>
  <form>
    <FormInput
      label="Nom"
      placeholder="Nom du produit"
      v-model="createProductForm.name"
      :error="createProductErrors.name"
      @input="handleInputEvent('name')"
      @blur="handleInputEvent('name')"
      type="text"
      hidden-label
    />
    <FormInput
      label="Description"
      placeholder="Description du produit"
      v-model="createProductForm.description"
      :error="createProductErrors.description"
      @input="handleInputEvent('description')"
      @blur="handleInputEvent('description')"
      type="text"
      hidden-label
    />
    <FormInput
      label="Marque"
      placeholder="Marque du produit"
      v-model="createProductForm.brand"
      :error="createProductErrors.brand"
      @input="handleInputEvent('brand')"
      @blur="handleInputEvent('brand')"
      type="text"
      hidden-label
    />
    <FormInput
      label="Model"
      placeholder="Model"
      v-model="createProductForm.model"
      :error="createProductErrors.model"
      @input="handleInputEvent('model')"
      @blur="handleInputEvent('model')"
      type="text"
      hidden-label
    />
    <FormInput
      label="Catégorie"
      placeholder="Catégorie du produit"
      v-model="createProductForm.category"
      :error="createProductErrors.category"
      @input="handleInputEvent('category')"
      @blur="handleInputEvent('category')"
      type="text"
      hidden-label
    />
  </form>
</template>

<script setup lang="ts">
import type { CreateProductForm } from '@/utils/types'
import FormInput from '../FormInput.vue'
import { reactive } from 'vue'
import { validateField } from '@/utils/validation/validator'
import { createProductSchema } from '@/utils/validation/schema'

const createProductForm: CreateProductForm = reactive({
  name: '',
  description: '',
  brand: '',
  model: '',
  category: undefined,
  variation: [
    {
      images: [''],
      price: 0,
      quantite: 0,
      filter: {
        name: '',
        value: ''
      }
    }
  ]
})

const createProductErrors = reactive({
  name: '',
  description: '',
  brand: '',
  model: '',
  category: '',
  variation: ''
})

const handleInputEvent = (field: keyof typeof createProductForm) => {
  validateField(field, createProductSchema, createProductForm, createProductErrors)
}
</script>

<style scoped></style>
