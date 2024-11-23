import { defineStore } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

const useBreakpointStore = defineStore('breakpoint', () => {
  const isMobile = ref(window.innerWidth < 768)
  const isTablet = ref(window.innerWidth >= 768 && window.innerWidth < 991)

  const updateBreakpoints = () => {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 991
  }
  onMounted(() => {
    window.addEventListener('resize', updateBreakpoints)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoints)
  })

  return {
    isMobile,
    isTablet
  }
})

export default useBreakpointStore
