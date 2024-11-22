import { defineStore } from 'pinia'

const useBreakpointStore = defineStore('breakpoint', () => {
  const isMobile = window.innerWidth < 991

  return {
    isMobile
  }
})

export default useBreakpointStore
