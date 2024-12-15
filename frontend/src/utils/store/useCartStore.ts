import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { AggregateProductOnVariation } from '../types/interfaces/aggregate-product-on-variation.interface'
import type { CartItem } from '../types/interfaces/cart-item.interface'
import { LocalStorageKeys } from '../types/local-storage-keys.enum'
import localStorageHandler from '../localStorageHandler'
import type { DeliveryAddress } from '../types/interfaces/delivery-address.interface'

const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const price = ref<number>(0)
  const billingAddress = ref<DeliveryAddress | null>(null)
  const selectedAddressId = ref<string>('')
  const activeStep = ref<number>(0)

  const addProduct = (product: AggregateProductOnVariation, quantite?: number) => {
    if (outOfStock(product)) return

    const productAlreadyInCart = cart.value.find((p) => p.product._id === product._id)

    if (productAlreadyInCart) {
      const newQuantite = quantite || productAlreadyInCart.quantite + 1

      productAlreadyInCart.quantite = newQuantite

      calculTotal()

      localStorageHandler().set(LocalStorageKeys.CART, cart.value)
      return
    }

    const cartItem = {
      product,
      quantite: quantite || 1
    }

    cart.value.push(cartItem)

    calculTotal()

    localStorageHandler().set(LocalStorageKeys.CART, cart.value)
  }

  const updateQuantity = (product: AggregateProductOnVariation, quantite: number) => {
    if (outOfStock(product)) return

    const productInCart = cart.value.find((p) => p.product._id === product._id)

    if (!productInCart) return

    productInCart.quantite = quantite

    calculTotal()

    localStorageHandler().set(LocalStorageKeys.CART, cart.value)
  }

  const removeProduct = (product: AggregateProductOnVariation) => {
    const index = cart.value.findIndex((p) => p.product._id === product._id)
    cart.value.splice(index, 1)

    calculTotal()

    localStorageHandler().set(LocalStorageKeys.CART, cart.value)
  }

  const clearCart = () => {
    localStorageHandler().remove(LocalStorageKeys.CART)
    cart.value = []
    price.value = 0
  }

  const calculTotal = () => {
    price.value = cart.value.reduce(
      (acc, cartItem) => acc + cartItem.product.variations.price * cartItem.quantite,
      0
    )
  }

  const outOfStock = (product: AggregateProductOnVariation) => {
    return product.variations.quantite === 0
  }

  const formatDescriptionCheckout = () => {
    return cart.value
      .map((cartItem) => {
        return `${cartItem.product.name} x ${cartItem.quantite}`
      })
      .join(', ')
  }

  onMounted(() => {
    const cartItems = localStorageHandler().get(LocalStorageKeys.CART)
    if (cartItems) {
      cart.value = cartItems
    }

    calculTotal()
  })

  return {
    activeStep,
    selectedAddressId,
    billingAddress,
    cart,
    price,
    addProduct,
    updateQuantity,
    removeProduct,
    clearCart,
    calculTotal,
    formatDescriptionCheckout
  }
})

export default useCartStore
