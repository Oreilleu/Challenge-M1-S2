<template>
  <form @submit="onSubmit" class="form-category">
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
      id="idParentCategory"
      name="idParentCategory"
      label="Catégorie parente"
      labelDefaultOption="Sans catégorie parente"
      placeholder="Categorie parente"
      type="text"
      v-model="category.idParent"
      :options="categoryStore.formattedOptionsCategories"
      :disabledDefaultOption="false"
    />

    <FormInputFile id="image" name="image" label="Image de la catégorie" v-model="category.image" />

    <el-button type="primary" native-type="submit" :disabled="Object.keys(errors).length > 0">
      Ajouter la catégorie
    </el-button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormInput from '../FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { categorySchema } from '@/utils/validation/schema'
import type { Category } from '@/utils/types/interfaces/category.interface'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import useDrawerStore from '@/utils/store/useDrawerStore'
import FormInputSelect from '../FormInputSelect.vue'
import FormInputFile from '../FormInputFile.vue'
import useCategoryStore from '@/utils/store/useCategoryStore'
import { v4 as uuidv4 } from 'uuid'

const drawerStore = useDrawerStore()
const categoryStore = useCategoryStore()

const category: Category = reactive({
  name: '',
  description: '',
  image: { files: {} as FileList },
  idParent: ''
})

const validationSchema = toTypedSchema(categorySchema)

const { handleSubmit, errors } = useForm<Category>({
  validationSchema
})

const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData()

  values.idParent = category.idParent

  const image = values.image?.files[0] || ({} as File)

  if (!image) {
    toastHandler("L'image n'a pas été prise en compte", ToastType.ERROR)
    return
  }

  values.idParent = category.idParent || undefined

  const nameImage = `${uuidv4()}${Date.now()}`

  formData.append('image', new File([image], nameImage, { type: image.type }))

  values.nameImage = nameImage
  delete values.image

  formData.append('category', JSON.stringify(values))

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      },
      body: formData
    })

    const json: ResponseApi<Category> = await response.json()

    if (json.success) {
      drawerStore.closeDrawer()
      categoryStore.updateCategorie()
      toastHandler('Catégorie ajoutée avec succès', ToastType.SUCCESS)
    } else {
      toastHandler(json.message || "Erreur lors de l'ajout de la catégorie", ToastType.ERROR)
    }
  } catch (error) {
    console.error(error)
    toastHandler("Erreur lors de l'ajout de la catégorie", ToastType.ERROR)
  }
})
</script>

<style scoped>
.form-category {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
