<template>
  <form v-if="category" @submit.prevent="onSubmit" class="form-product">
    <FormInput
      id="name"
      name="name"
      label="Nom"
      placeholder="Nom de la catégorie"
      type="text"
      v-model="category.name"
    />

    <FormInput
      id="description"
      name="description"
      as="textarea"
      label="Description"
      placeholder="Description de la catégorie"
      type="text"
      v-model="category.description"
    />

    <FormInputSelect
      v-if="!category.masterCategory"
      id="parent"
      name="parent"
      label="Catégorie parente"
      labelDefaultOption="Sélectionnez une option"
      v-model="category.parent"
      :default-selected-value="category.parent || 'Pas de catégorie parente'"
      :options="categoryStore.formattedOptionsMasterCategories"
      :disabledDefaultOption="true"
    />

    <el-image
      v-if="!isShowInputImage"
      :src="formatImageUrl(category.imageApi?.path || '')"
      fit="cover"
      style="height: 200px"
    />

    <h3 v-if="isShowInputImage" class="title-previous-images">Images déjà enregistrées :</h3>

    <FormInputFile
      v-if="isShowInputImage"
      id="image"
      name="image"
      label="Image de la catégorie"
      v-model="category.image"
    />

    <el-button
      type="primary"
      @click="isShowInputImage = !isShowInputImage"
      style="width: auto; margin: auto"
    >
      {{ isShowInputImage ? "Garder l'ancienne image" : "Changer l'image" }}
    </el-button>

    <el-button
      type="primary"
      style="margin: 0"
      native-type="submit"
      :disabled="Object.keys(errors).length > 0"
      >Modifier la catégorie
    </el-button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import FormInput from '../FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { categorySchema } from '@/utils/validation/schema'
import type { Category } from '@/utils/types/interfaces/category.interface'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import { v4 as uuidv4 } from 'uuid'
import useDrawerStore from '@/utils/store/useDrawerStore'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import FormInputSelect from '../FormInputSelect.vue'
import FormInputFile from '../FormInputFile.vue'
import useCategoryStore from '@/utils/store/useCategoryStore'
import { formatImageUrl } from '@/utils/formatImageUrl'
import { getCategoryById } from '@/utils/api/category'

const drawerStore = useDrawerStore()
const categoryStore = useCategoryStore()

const response = ref<Category | null>(null)
const category = ref<Category | null>(null)
const isShowInputImage = ref<boolean>(false)

const validationSchema = toTypedSchema(categorySchema)

const { handleSubmit, errors } = useForm<Category>({
  validationSchema,
  initialValues: category.value || ({} as Category)
})

const onSubmit = handleSubmit(async () => {
  const formData = new FormData()

  if (category.value?.image) {
    const image = category.value.image?.files[0] || ({} as File)

    if (!image) {
      toastHandler("L'image n'a pas été prise en compte", ToastType.ERROR)
      return
    }

    const nameImage = `${uuidv4()}${Date.now()}`

    formData.append('image', new File([image], nameImage, { type: image.type }))

    category.value.nameImage = nameImage
    delete category.value.image
  }

  if (category.value?.masterCategory) {
    category.value.parent = ''
  }

  formData.append('category', JSON.stringify(category.value))

  try {
    const responseUpdateCategory = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/category/${drawerStore.updateId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: formData
      }
    )

    const json = await responseUpdateCategory.json()

    if (json.success) {
      drawerStore.closeDrawer()
      categoryStore.loadCategories()
      toastHandler('Catégorie modifiée avec succès', ToastType.SUCCESS)
    }
  } catch (error) {
    console.error(error)
    toastHandler('Erreur lors de la modification de la catégorie.', ToastType.ERROR)
  }
})

watch(isShowInputImage, () => {
  if (isShowInputImage.value) {
    if (category.value) {
      category.value.imageApi = undefined
      category.value.image = { files: {} as FileList }
    }
  } else {
    if (category.value) {
      category.value.imageApi = response.value?.imageApi
      category.value.image = undefined
    }
  }
})

onMounted(async () => {
  const responseCategory = await getCategoryById(drawerStore.updateId)

  response.value = responseCategory || null

  category.value = responseCategory
    ? {
        name: responseCategory.name,
        description: responseCategory.description,
        masterCategory: responseCategory.masterCategory || false,
        parent: responseCategory.parent || undefined,
        imageApi: responseCategory.imageApi
      }
    : null
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
