import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { DrawerType } from '../types/drawer-type.enum'

const useDrawerStore = defineStore('drawer', () => {
  const opennedDrawer = ref<DrawerType>(DrawerType.NONE)
  const updateId = ref<string | null>(null)

  const isOpen = ref(false)

  const openDrawer = (drawerType: DrawerType) => {
    opennedDrawer.value = drawerType
    isOpen.value = true
  }

  const openDrawerUpdateForm = (drawerType: DrawerType, id: string) => {
    opennedDrawer.value = drawerType
    updateId.value = id
    isOpen.value = true
  }

  const destroyUpdateId = () => {
    updateId.value = null
  }

  const closeDrawer = () => {
    isOpen.value = false
  }

  watch(isOpen, (value) => {
    if (!value) {
      opennedDrawer.value = DrawerType.NONE
      destroyUpdateId()
    }
  })

  return {
    opennedDrawer,
    updateId,
    isOpen,
    openDrawer,
    openDrawerUpdateForm,
    closeDrawer,
    destroyUpdateId
  }
})

export default useDrawerStore
