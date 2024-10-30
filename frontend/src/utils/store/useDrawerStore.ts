import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DrawerType } from '../types/drawer-type.enum'

const useDrawerStore = defineStore('drawer', () => {
  const opennedDrawer = ref<DrawerType>(DrawerType.NONE)

  const isOpen = ref(false)

  const openDrawer = (drawerType: DrawerType) => {
    opennedDrawer.value = drawerType
    isOpen.value = true
  }

  return { opennedDrawer, isOpen, openDrawer }
})

export default useDrawerStore
