<template>
  <form @submit.prevent="onSubmit" class="form-product">
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


    <FormSelect
      id="parentCategory"
      name="parentCategory"
      label="Catégorie parente"
      labelDefaultOption="Sélectionnez une option"
      placeholder="Categorie parente"
      type="text"
      v-model="category.parent"
      :options="categories.map(category => ({ value: category.name, label: category.name }))"
    />

    <!-- <FormInputFile
      id="image"
      name="image"
      label="Image de la catégorie"
      v-model="category.image"
    /> -->

    <el-button type="primary" native-type="submit">
      Ajouter la catégorie
    </el-button> 
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import FormInput from '../FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { categorySchema } from '@/utils/validation/schema'
import type { Category } from '@/utils/types/interfaces/category.interface'
// import FormInputFile from '../FormInputFile.vue'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'
import localStorageHandler from '@/utils/localStorageHandler'
import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
import useDrawerStore from '@/utils/store/useDrawerStore'
import FormSelect from '../FormSelect.vue'

console.log("bonjour")

const drawerStore = useDrawerStore()
const categories = ref<Category[]>([]);
  const category: Category = reactive({
  name: '',
  description: '',
  // image: { file: {} as File },
  parent: ''
})

onMounted(() => {
  fetchCategories()
})

const fetchCategories = async() => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category`);
        if (!response.ok) throw new Error();
        const json = await response.json();
        if (json.success) {
            categories.value = json.data;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error(error);
    }
};

const validationSchema = toTypedSchema(categorySchema)

const { handleSubmit, errors } = useForm<Category>({
  validationSchema
})

const onSubmit = handleSubmit(async(values) => {
  const formData = new FormData()

  formData.append('category', JSON.stringify(values))


  try {
    const postCategory = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
        },
        body: formData
      })

      const json: ResponseApi<null> = await response.json()

      console.log(json)
      if (json.success) {
        drawerStore.closeDrawer()
        toastHandler('Catégorie ajoutée avec succès', ToastType.SUCCESS)
      } else {
        toastHandler(json.message || "Erreur lors de l'ajout de la catégorie", ToastType.ERROR)
      }
    }
    await postCategory()
  } catch (error) {
    console.error(error)
    toastHandler("Erreur lors de l'ajout de la catégorie", ToastType.ERROR)
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
