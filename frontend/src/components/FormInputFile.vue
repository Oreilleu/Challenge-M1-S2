<template>
  <div>
    <div class="custom-input-file">
      <button class="button-choose-file" @click.prevent="clickOnInput">Choisir une image</button>
      <span>{{ labelInputFile }}</span>
    </div>

    <ul>
      <li v-for="(file, index) in listFiles" :key="file.name">
        {{ index + 1 }} - {{ formatName(file.name, 50) }}
      </li>
    </ul>
    <FormInput
      :id="id"
      :name="name"
      :label="label"
      type="file"
      v-model="model"
      multiple
      @change="handleFileChange"
      hidden-input
      hidden-label
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormInput from './FormInput.vue'
import { MAX_IMAGES_PRODUCT } from '@/utils/const'

type Props = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
}

const model = defineModel()
const labelInputFile = ref('Choisir une image ... ')
const listFiles = reactive<File[]>([])
const { id } = defineProps<Props>()

const formatName = (name: string, lengthToSlice: number) => {
  return name.length > lengthToSlice ? `${name.slice(0, lengthToSlice)}...` : name
}

const castFileListToArray = (files: FileList) => {
  return Array.from(files).slice(0, MAX_IMAGES_PRODUCT + 1)
}

const getElementById = (id: string) => {
  return document.getElementById(id)
}

const clickOnInput = () => {
  const input = getElementById(id) as HTMLInputElement
  model.value = { files: {} }
  input.click()
}

const handleFileChange = () => {
  const input = getElementById(id) as HTMLInputElement

  labelInputFile.value = 'Choisir une image ...'
  listFiles.splice(0, listFiles.length)

  const files = input.files || ({} as FileList)

  model.value = { files: files }

  if (files.length === 1) {
    labelInputFile.value = formatName(files[0].name, 35)

    return
  }

  labelInputFile.value = `${castFileListToArray(files).length} fichiers`

  castFileListToArray(files).forEach((file) => {
    listFiles.push(file)
  })
}
</script>

<style scoped>
.custom-input-file {
  border: 1px solid hsla(0, 0%, 7%, 0.43);
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.button-choose-file {
  color: white;
  background-color: var(--primary);
  height: 40px;
  border: none;
  border-radius: 9px 0 0 9px;
  cursor: pointer;
  outline-offset: 1px;
  font-weight: 600;
  min-width: 160px;
}
</style>
