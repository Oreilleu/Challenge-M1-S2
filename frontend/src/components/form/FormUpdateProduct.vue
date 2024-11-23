<template>
  <form v-if="product" @submit.prevent="onSubmit" class="form-product">
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
      v-model="product.idCategory"
      labelDefaultOption="Choisir une catégorie..."
      :defaultSelectedValue="formattedDefaultCategory?.value || ''"
      :options="categoryStore.formattedOptionsCategories"
      :disabledDefaultOption="true"
    />

    <el-divider class="divider" />

    <h2>Variation</h2>

    <ul v-if="product.variations" class="list-variation">
      <li v-for="(variation, index) in product.variations" :key="index" class="item-variation">
        <div v-if="isVariationFromResponse(variation)" class="container-carrousel">
          <h3 v-if="!isInputImageDisplay(variation._id)" class="title-previous-images">
            Images déjà enregistrées :
          </h3>

          <el-carousel
            v-if="!isInputImageDisplay(variation._id)"
            :autoplay="false"
            type="card"
            height="200px"
          >
            <el-carousel-item
              v-for="(image, index) in variation.imagesApi"
              :key="index"
              style="text-align: center"
            >
              <el-image
                :src="formatImageUrl((image as ImageApi).path)"
                fit="cover"
                style="height: 200px"
              />
            </el-carousel-item>
          </el-carousel>

          <FormInputFile
            v-if="isInputImageDisplay(variation._id)"
            :id="`variations[${index}].images`"
            :name="`variations[${index}].images`"
            label="Images"
            v-model="variation.images"
            multiple
          />

          <el-button
            type="primary"
            @click="
              isInputImageDisplay(variation._id)
                ? hideInputImages(variation._id)
                : displayInputImages(variation._id)
            "
            style="width: auto; margin: auto"
          >
            {{
              isInputImageDisplay(variation._id)
                ? 'Garder les anciennes images'
                : 'Changer les images'
            }}
          </el-button>
        </div>

        <FormInputFile
          v-if="!isVariationFromResponse(variation)"
          :id="`variations[${index}].images`"
          :name="`variations[${index}].images`"
          label="Images"
          v-model="variation.images"
          multiple
        />

        <div class="price-quantity">
          <FormInput
            :id="`variations[${index}].price`"
            :name="`variations[${index}].price`"
            label="Prix"
            placeholder="Prix"
            type="number"
            v-model="variation.price"
          />

          <FormInput
            :id="`variations[${index}].quantite`"
            :name="`variations[${index}].quantite`"
            label="Quantité"
            placeholder="Quantité"
            type="number"
            v-model="variation.quantite"
          />
        </div>

        <div class="wrapper-title-filter">
          <h3>Filtre</h3>
          <el-button type="primary" @click="addFilterTodisplay(variation)">
            Ajouter un filtre
          </el-button>
        </div>

        <ul>
          <li
            v-for="(filter, indexFilter) in variation.filters"
            :key="indexFilter"
            class="item-filter"
          >
            <FormInput
              :id="`variations[${index}].filters[${indexFilter}].name`"
              :name="`variations[${index}].filters[${indexFilter}].name`"
              label="Nom"
              placeholder="Nom du filtre"
              type="text"
              v-model="filter.name"
            />

            <FormInput
              :id="`variations[${index}].filters[${indexFilter}].value`"
              :name="`variations[${index}].filters[${indexFilter}].value`"
              label="Valeur"
              placeholder="Valeur du filtre"
              type="text"
              v-model="filter.value"
            />

            <el-button
              v-if="variation.filters.length > 1"
              @click="removeFilter(variation.filters, indexFilter)"
              type="danger"
            >
              X
            </el-button>
          </li>
        </ul>

        <div v-if="index === product.variations.length - 1" class="container-button">
          <el-button type="primary" @click="addVariationToDisplay">Ajouter une variation</el-button>

          <el-button
            v-if="product.variations.length > 1"
            type="danger"
            @click="removeVariation(index)"
          >
            Supprimer la variation
          </el-button>
        </div>

        <el-button
          v-if="index !== product.variations.length - 1"
          type="danger"
          class="remove-variation"
          @click="removeVariation(index)"
        >
          Supprimer la variation
        </el-button>

        <el-divider class="divider" />
      </li>
    </ul>

    <el-button
      type="primary"
      native-type="submit"
      :disabled="Object.keys(errors).length > 0 || isUnmodifiedProduct()"
    >
      Modifier le produit
    </el-button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormInput from '../FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { productSchema } from '@/utils/validation/schema'
import type { Product } from '@/utils/types/interfaces/product.interface'
import type { Variation } from '@/utils/types/interfaces/variation.interface'
import FormInputFile from '../FormInputFile.vue'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { v4 as uuidv4 } from 'uuid'
import useDrawerStore from '@/utils/store/useDrawerStore'
import { fetchProductById } from '@/utils/api/product'
import type { Filter } from '@/utils/types/interfaces/filter.interface'
import type { ImageApi } from '@/utils/types/interfaces/image.interface'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import FormInputSelect from '../FormInputSelect.vue'
import useCategoryStore from '@/utils/store/useCategoryStore'
import type { OptionCategory } from '@/utils/types/interfaces/option-category.interface'
import useProductStore from '@/utils/store/useProductStore'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { NUMBER_ADMIN_PRODUCT_PER_PAGE } from '@/utils/const'

const drawerStore = useDrawerStore()
const productStore = useProductStore()
const categoryStore = useCategoryStore()

const response = ref<Product | null>(null)
const product = ref<Product | null>(null)
const initialStateProduct = ref<Product | null>(null)
const formattedDefaultCategory = ref<OptionCategory | null>(null)

const visibleInputImageVariation = ref<Array<string>>([])

const displayInputImages = (variationId: string | undefined) => {
  if (!variationId) return
  visibleInputImageVariation.value.push(variationId)

  const variation = product.value?.variations.find((variation) => variation._id === variationId)

  if (variation) {
    variation.images = { files: {} as FileList }
    variation.imagesApi = undefined
  }
}

const hideInputImages = (variationId: string | undefined) => {
  if (!variationId) return

  visibleInputImageVariation.value = visibleInputImageVariation.value.filter(
    (id) => id !== variationId
  )

  const responseVariation = response.value?.variations.find(
    (variation) => variation._id === variationId
  )

  const variation = product.value?.variations.find((variation) => variation._id === variationId)

  if (!responseVariation) return

  if (variation) {
    variation.imagesApi = responseVariation.imagesApi
    variation.images = undefined
  }
}

const isInputImageDisplay = (variationId: string | undefined) => {
  if (!variationId) return false
  return visibleInputImageVariation.value.includes(variationId)
}

const isVariationFromResponse = (variation: Variation) => {
  return !!variation._id
}

const isUnmodifiedProduct = () => {
  return JSON.stringify(product.value) === JSON.stringify(initialStateProduct.value)
}

onMounted(async () => {
  const responseProduct = await fetchProductById(drawerStore.updateId)

  response.value = responseProduct || null

  product.value = responseProduct
    ? {
        name: responseProduct.name,
        description: responseProduct.description,
        brand: responseProduct.brand,
        model: responseProduct.model,
        category: responseProduct.category,
        variations: JSON.parse(JSON.stringify(responseProduct.variations))
      }
    : null

  initialStateProduct.value = responseProduct
    ? {
        name: JSON.parse(JSON.stringify(responseProduct.name)),
        description: JSON.parse(JSON.stringify(responseProduct.description)),
        brand: JSON.parse(JSON.stringify(responseProduct.brand)),
        model: JSON.parse(JSON.stringify(responseProduct.model)),
        category: responseProduct.category
          ? JSON.parse(JSON.stringify(responseProduct.category || {}))
          : undefined,
        variations: JSON.parse(JSON.stringify(responseProduct.variations)),
        idCategory: responseProduct.category
          ? JSON.parse(JSON.stringify(responseProduct.category?._id))
          : ''
      }
    : null

  if (responseProduct.category) {
    formattedDefaultCategory.value = {
      value: responseProduct.category._id as string,
      label: responseProduct.category.name
    }
  }
})

const validationSchema = toTypedSchema(productSchema)

const { handleSubmit, errors } = useForm<Product>({
  validationSchema,
  initialValues: product.value || ({} as Product)
})

const onSubmit = handleSubmit(async () => {
  const formData = new FormData()

  product.value?.variations.forEach((variation: Variation) => {
    if (Array.isArray(variation.images)) return

    const files = variation.images?.files || ({} as FileList)
    const nameFiles: string[] = []

    Object.values(files).forEach((image) => {
      const uniqueNameImage = `${uuidv4()}${Date.now()}`
      nameFiles.push(uniqueNameImage)
      formData.append('images', new File([image], uniqueNameImage, { type: image.type }))
    })

    variation.nameImages = nameFiles
    delete variation.images
  })

  if (product.value?.idCategory === '') {
    product.value.idCategory = null
  }

  formData.append('product', JSON.stringify(product.value))

  try {
    const responseUpdateProduct = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/product/edit/${response.value?._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: formData
      }
    )

    const json = await responseUpdateProduct.json()

    if (json.success) {
      drawerStore.closeDrawer()
      productStore.updatePaginateProducts(1, NUMBER_ADMIN_PRODUCT_PER_PAGE)
      toastHandler('Produit modifié avec succès', ToastType.SUCCESS)
    }
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la modification du produit.', ToastType.ERROR)
  }
})

const addVariationToDisplay = () => {
  product.value?.variations.push({
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
  product.value?.variations.splice(index, 1)
}

const addFilterTodisplay = (variation: Variation) => {
  variation.filters.push({
    name: '',
    value: ''
  })
}

const removeFilter = (filters: Array<Filter>, index: number) => {
  filters.splice(index, 1)
}
</script>

<style scoped>
.form-product {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.title-previous-images {
  font-weight: 600;
  text-decoration: underline;
}

.container-carrousel {
  display: flex;
  flex-direction: inherit;
  gap: 15px;
}
</style>
