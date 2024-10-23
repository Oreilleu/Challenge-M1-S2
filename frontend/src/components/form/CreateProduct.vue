<template>
  <form class="container-form" @submit.prevent="postProduct">
    <FormInput
      label="Nom"
      placeholder="Nom du produit"
      v-model="createProductForm.name"
      :error="createProductErrors.name"
      @input="validationCreateProduct('name')"
      @blur="validationCreateProduct('name')"
      type="text"
    />
    <FormInput
      label="Description"
      placeholder="Description du produit"
      v-model="createProductForm.description"
      :error="createProductErrors.description"
      @input="validationCreateProduct('description')"
      @blur="validationCreateProduct('description')"
      type="text"
    />
    <FormInput
      label="Marque"
      placeholder="Marque du produit"
      v-model="createProductForm.brand"
      :error="createProductErrors.brand"
      @input="validationCreateProduct('brand')"
      @blur="validationCreateProduct('brand')"
      type="text"
    />
    <FormInput
      label="Model"
      placeholder="Model"
      v-model="createProductForm.model"
      :error="createProductErrors.model"
      @input="validationCreateProduct('model')"
      @blur="validationCreateProduct('model')"
      type="text"
    />
    <FormInput
      label="Catégorie"
      placeholder="Catégorie du produit"
      v-model="createProductForm.category"
      :error="createProductErrors.category"
      @input="validationCreateProduct('category')"
      @blur="validationCreateProduct('category')"
      type="text"
    />

    <el-divider class="divider" />

    <h2>Variation</h2>

    <ul class="list-variation">
      <li v-for="(variation, index) in variations" :key="index">
        <FormInput
          label="Nom"
          placeholder="Nom"
          v-model="variation.name"
          :error="variationErrors[index].name"
          @input="validationVariation('name', index)"
          @blur="validationVariation('name', index)"
          type="text"
        />
        <FormInput
          label="Valeur"
          placeholder="Valeur"
          v-model="variation.value"
          :error="variationErrors[index].value"
          @input="validationVariation('value', index)"
          @blur="validationVariation('value', index)"
          type="text"
        />
        <FormInput
          label="Images"
          placeholder="Images"
          v-model="variation.images"
          :error="variationErrors[index].images"
          @input="validationVariation('images', index)"
          @blur="validationVariation('images', index)"
          type="file"
        />
        <FormInput
          label="Prix"
          placeholder="Prix"
          v-model.number="variation.price"
          :error="variationErrors[index].price"
          @input="validationVariation('price', index)"
          @blur="validationVariation('price', index)"
          type="number"
        />
        <FormInput
          label="Quantité"
          placeholder="Quantité"
          v-model.number="variation.quantite"
          :error="variationErrors[index].quantite"
          @input="validationVariation('quantite', index)"
          @blur="validationVariation('quantite', index)"
          type="number"
        />

        <div v-if="index === variations.length - 1" class="container-button">
          <el-button type="primary" @click="addVariation">Ajouter une variation</el-button>

          <el-button v-if="variations.length > 1" type="danger" @click="removeVariation(index)"
            >Supprimer
          </el-button>
        </div>

        <el-button
          v-if="variations.length > 1 && index !== variations.length - 1"
          type="danger"
          class="remove-variation"
          @click="removeVariation(index)"
        >
          Supprimer
        </el-button>

        <el-divider class="divider" />
      </li>
    </ul>

    <el-button type="primary" native-type="submit">Créer le produit</el-button>
  </form>
</template>

<script setup lang="ts">
import {
  ToastType,
  type CreateProductErrors,
  type CreateProductForm,
  type Product,
  type VariationErrors
} from '@/utils/types'
import FormInput from '../FormInput.vue'
import { reactive } from 'vue'
import { validateField } from '@/utils/validation/validator'
import { createProductSchema, variationSchema } from '@/utils/validation/schema'
import toastHandler from '@/utils/toastHandler'

const variations = reactive([
  {
    name: '',
    value: '',
    images: '',
    price: 1,
    quantite: 1
  }
])

const variationErrors: Array<VariationErrors> = reactive([
  {
    name: '',
    value: '',
    images: '',
    price: '',
    quantite: ''
  }
])

const createProductForm: CreateProductForm = reactive({
  name: '', // Peut etre pas utile ?
  description: '',
  brand: '',
  model: '',
  category: undefined
})

const createProductErrors: CreateProductErrors = reactive({
  name: '',
  description: '',
  brand: '',
  model: '',
  category: ''
})

const validationCreateProduct = (field: keyof typeof createProductForm) => {
  validateField(field, createProductSchema, createProductForm, createProductErrors)
}

const validationVariation = (field: keyof (typeof variations)[number], index: number) => {
  validateField(field, variationSchema, variations[index], variationErrors[index])
}

const addVariation = () => {
  variations.push({
    name: '',
    value: '',
    images: '',
    price: 1,
    quantite: 1
  })

  variationErrors.push({
    name: '',
    value: '',
    images: '',
    price: '',
    quantite: ''
  })
}

const removeVariation = (index: number) => {
  variations.splice(index, 1)
}

const hasErrors = (data: Product) => {
  const isFormEmpty = Object.entries(data)
    .filter(([key]) => key !== 'variations')
    .every(([, value]) => value === '' || !value)

  const hasProductError = Object.values(createProductErrors).some((error) => error !== '')

  const isVariationEmpty = data.variations.some((variation) => {
    return Object.values(variation).every((value) => {
      value === '' || !value
    })
  })

  const isVariationNull = data.variations.length === 0 || !data.variations

  const hasVariationError = variationErrors.some((error) => {
    return Object.values(error).some((value) => value !== '')
  })

  return isFormEmpty || hasProductError || isVariationEmpty || isVariationNull || hasVariationError
}

const postProduct = async () => {
  const data = {
    name: createProductForm.name,
    description: createProductForm.description,
    brand: createProductForm.brand,
    model: createProductForm.model,
    category: createProductForm.category,
    variations: variations
  }

  if (hasErrors(data)) {
    toastHandler('Le formulaire comporte des erreurs', ToastType.ERROR)
    return
  }

  console.log('haserrors', hasErrors(data))

  console.log('Form is valid')
}
</script>

<style scoped>
.container-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.list-variation {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.list-variation li {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.container-button {
  display: flex;
  justify-content: space-between;
}

.container-button button {
  width: 200px;
}

.remove-variation {
  width: 200px;
  align-self: flex-end;
}

.divider {
  width: 80%;
  border-color: var(--primary);
  align-self: center;
}
</style>
