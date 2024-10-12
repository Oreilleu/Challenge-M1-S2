import type { LocalStorageKeys } from './types'

const localStorageHandler = () => {
  const setItem = (key: LocalStorageKeys, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = (key: LocalStorageKeys) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const removeItem = (key: LocalStorageKeys) => {
    localStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    removeItem
  }
}

export default localStorageHandler
