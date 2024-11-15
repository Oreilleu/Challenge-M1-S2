<template>
  <form @submit="onSubmit" class="form-product">
    <FormInput
      id="name"
      name="name"
      label="Nom"
      placeholder="Nom du produit"
      type="text"
      v-model="product.name"
    />

    <FormInput
      id="description"
      name="description"
      as="textarea"
      label="Description"
      placeholder="Description du produit"
      type="text"
      v-model="product.description"
    />

    <FormInput
      id="brand"
      name="brand"
      label="Marque"
      placeholder="Marque du produit"
      type="text"
      v-model="product.brand"
    />

    <FormInput
      id="model"
      name="model"
      label="Modèle"
      placeholder="Modèle du produit"
      type="text"
      v-model="product.model"
    />

    <FormInputSelect
      id="idCategory"
      name="idCategory"
      label="Catégorie"
      labelDefaultOption="Choisir une catégorie..."
      v-model="product.idCategory"
      :options="categoryStore.formattedOptionsCategories"
      :disabledDefaultOption="true"
    />

    <el-divider class="divider" />

    <h2>Variation</h2>

    <ul class="list-variation">
      <li
        v-for="(variation, indexVariation) in product.variations"
        :key="indexVariation"
        class="item-variation"
      >
        <FormInputFile
          :id="`variations[${indexVariation}].images`"
          :name="`variations[${indexVariation}].images`"
          label="Images"
          v-model="variation.images"
          multiple
        />

        <div class="price-quantity">
          <FormInput
            :id="`variations[${indexVariation}].price`"
            :name="`variations[${indexVariation}].price`"
            label="Prix"
            placeholder="Prix"
            type="number"
            v-model="variation.price"
          />

          <FormInput
            :id="`variations[${indexVariation}].quantite`"
            :name="`variations[${indexVariation}].quantite`"
            label="Quantité"
            placeholder="Quantité"
            type="number"
            v-model="variation.quantite"
          />
        </div>

        <div class="wrapper-title-filter">
          <h3>Filtre</h3>
          <el-button type="primary" @click="addFilter(variation)">Ajouter un filtre</el-button>
        </div>

        <ul>
          <li
            v-for="(filter, indexFilter) in product.variations[indexVariation].filters"
            :key="indexFilter"
            class="item-filter"
          >
            <FormInput
              :id="`variations[${indexVariation}].filters[${indexFilter}].name`"
              :name="`variations[${indexVariation}].filters[${indexFilter}].name`"
              label="Nom"
              placeholder="Nom du filtre"
              type="text"
              v-model="filter.name"
            />

            <FormInput
              :id="`variations[${indexVariation}].filters[${indexFilter}].value`"
              :name="`variations[${indexVariation}].filters[${indexFilter}].value`"
              label="Valeur"
              placeholder="Valeur du filtre"
              type="text"
              v-model="filter.value"
            />

            <el-button
              v-if="variation.filters.length > 1"
              @click="removeFilter(variation, indexFilter)"
              type="danger"
            >
              X
            </el-button>
          </li>
        </ul>

        <div v-if="indexVariation === product.variations.length - 1" class="container-button">
          <el-button type="primary" @click="addVariation">Ajouter une variation</el-button>

          <el-button
            v-if="product.variations.length > 1"
            type="danger"
            @click="removeVariation(indexVariation)"
          >
            Supprimer la variation
          </el-button>
        </div>

        <el-button
          v-if="product.variations.length > 1 && indexVariation !== product.variations.length - 1"
          type="danger"
          class="remove-variation"
          @click="removeVariation(indexVariation)"
        >
          Supprimer la variation
        </el-button>

        <el-divider class="divider" />
      </li>
    </ul>
    <el-button type="primary" native-type="submit" :disabled="Object.keys(errors).length > 0">
      Ajouter le produit
    </el-button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormInput from '../FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { Product } from '@/utils/types/interfaces/product.interface'
import type { Variation } from '@/utils/types/interfaces/variation.interface'
import FormInputFile from '../FormInputFile.vue'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { v4 as uuidv4 } from 'uuid'
import useDrawerStore from '@/utils/store/useDrawerStore'
import useCategoryStore from '@/utils/store/useCategoryStore'
import FormInputSelect from '../FormInputSelect.vue'
import useProductStore from '@/utils/store/useProductStore'
import { NUMBER_ADMIN_PRODUCT_PER_PAGE } from '@/utils/const'
import { productSchema } from '@/utils/validation/schema'

const drawerStore = useDrawerStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

const product: Product = reactive({
  name: '',
  description: '',
  brand: '',
  model: '',
  idCategory: undefined,
  variations: [
    {
      images: { files: {} as FileList },
      nameImages: [] as string[],
      price: 1,
      quantite: 1,
      filters: [
        {
          name: '',
          value: ''
        }
      ]
    }
  ]
})

const addVariation = () => {
  product.variations.push({
    images: { files: {} as FileList },
    price: 1,
    quantite: 1,
    filters: [
      {
        name: '',
        value: ''
      }
    ]
  })
}

const removeVariation = (index: number) => {
  product.variations.splice(index, 1)
}

const addFilter = (variation: Variation) => {
  variation.filters.push({
    name: '',
    value: ''
  })
}

const removeFilter = (variation: Variation, index: number) => {
  variation.filters.splice(index, 1)
}

const validationSchema = toTypedSchema(productSchema)

const { handleSubmit, errors } = useForm<Product>({
  validationSchema
})

const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData()

  values.variations.forEach((variation: Variation) => {
    const files = variation.images?.files || ({} as FileList)
    const nameFiles: string[] = []

    Object.values(files).forEach((value) => {
      const uniqueNameImage = `${uuidv4()}${Date.now()}`
      nameFiles.push(uniqueNameImage)
      formData.append('images', new File([value], uniqueNameImage, { type: value.type }))
    })

    variation.nameImages = nameFiles
    delete variation.images
  })

  formData.append('product', JSON.stringify(values))

  try {
    const postProduct = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/product/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: formData
      })

      const json: ResponseApi<null> = await response.json()

      if (json.success) {
        drawerStore.closeDrawer()
        productStore.updatePaginateProducts(1, NUMBER_ADMIN_PRODUCT_PER_PAGE)
        toastHandler('Produit ajouté avec succès', ToastType.SUCCESS)
      } else {
        toastHandler(json.message || "Erreur lors de l'ajout du produit", ToastType.ERROR)
      }
    }
    await postProduct()
  } catch (error) {
    console.error(error)
    toastHandler("Erreur lors de l'ajout du produit", ToastType.ERROR)
  }
})
</script>

<style scoped>
.form-product {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-product {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.list-variation {
  width: 100%;
}

.item-variation {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.divider {
  width: 80%;
  border-color: var(--primary);
  align-self: center;
}

.item-filter,
.price-quantity {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
}

.wrapper-title-filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}
</style>
