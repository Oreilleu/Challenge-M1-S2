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

    
  
      <el-button type="primary" native-type="submit" :disabled="Object.keys(errors).length > 0"
        >Ajouter le produit
      </el-button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import FormInput from '../FormInput.vue'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { updateProductschema } from '@/utils/validation/schema'
  import type { Category } from '@/utils/types/interfaces/category.interface'
//   import FormInputFile from '../FormInputFile.vue'
  import localStorageHandler from '@/utils/localStorageHandler'
  import { LocalStorageKeys } from '@/utils/types/local-storage-keys.enum'
//   import { v4 as uuidv4 } from 'uuid'
  import useDrawerStore from '@/utils/store/useDrawerStore'
//   import type { ImageApi } from '@/utils/types/interfaces/image.interface'
  import toastHandler from '@/utils/toastHandler'
  import { ToastType } from '@/utils/types/toast-type.enum'
  import type { ResponseApi } from '@/utils/types/interfaces/response-api.interface'
  import FormSelect from '../FormSelect.vue'
  


  
  const drawerStore = useDrawerStore()
  const response = ref<Category | null>(null)
  const categories = ref<Category[]>([])

  const category = ref<Category>({
    name: '',
    description: '',
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

const getCategoryById = async (id: string | null) => {
  if (!id) {
    toastHandler("Erreur lors de la récupération de la catégorie", ToastType.ERROR)
    return {} as Category
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)}`
      }
    })

    if (!res.ok) {
      toastHandler('Erreur lors de la récupération de la catégorie', ToastType.ERROR)
      return {} as Category
    }

    const json: ResponseApi<Category> = await res.json()

    if (!json.success) {
      toastHandler(json.message || 'Erreur lors de la récupération du produit', ToastType.ERROR)
      return {} as Category
    }

    if (!json.data) {
      toastHandler('Erreur lors de la récupération du produit', ToastType.ERROR)
      return {} as Category
    }

    return json.data
  } catch (error) {
    toastHandler('Erreur lors de la récupération du produit', ToastType.ERROR)
    return {} as Category
  }
}

  
//   const getImageUrl = (path: string) => `${import.meta.env.VITE_BASE_API_URL}/${path}`
  
  onMounted(async () => {
    const responseCategory = await getCategoryById(drawerStore.updateId)

    response.value = responseCategory || null

    category.value = responseCategory ?
    {
      name: responseCategory.name,
      description: responseCategory.description,
      parent: responseCategory.parent ? responseCategory.parent : ''
    } : ({} as Category)
  })
  
  const validationSchema = toTypedSchema(updateProductschema)
  
  const { handleSubmit, errors } = useForm<Category>({
    validationSchema,
    initialValues: category.value || ({} as Category)
  })
  
  const onSubmit = handleSubmit(async () => {
    const formData = new FormData()
  
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
        console.log('Je passe dans le succes')
        drawerStore.closeDrawer()
        toastHandler('Produit modifié avec succès', ToastType.SUCCESS)
      }
    } catch (error) {
      console.error(error)
      toastHandler('Erreur lors de la modification du produit.', ToastType.ERROR)
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
  