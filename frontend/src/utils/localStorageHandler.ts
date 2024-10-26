import type { LocalStorageKeys } from './types/local-storage-keys.enum'

const localStorageHandler = () => {
  const set = (key: LocalStorageKeys, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const get = (key: LocalStorageKeys) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const remove = (key: LocalStorageKeys) => {
    localStorage.removeItem(key)
  }

  return {
    set,
    get,
    remove
  }
}

export default localStorageHandler
