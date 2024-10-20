import localStorageHandler from '../localStorageHandler'
import { LocalStorageKeys } from '../types'
// TODO : faire un fetcher
export const fetchIsVerifiedUser = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/is-verified`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.log('not ok')
      return
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log('catch')
    return
  }
}

export const fetchIsAdminUser = async () => {
  const token = localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN)

  if (!token) {
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/is-admin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.log('not ok')
      return
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log('catch')
    return
  }
}
