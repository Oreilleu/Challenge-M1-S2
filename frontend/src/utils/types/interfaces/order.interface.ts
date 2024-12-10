import type { CartItem } from './cart-item.interface'
import type { DeliveryAddress } from './delivery-address.interface'

export interface Order {
  _id: string
  cart: CartItem[]
  totalPrice: number
  address: DeliveryAddress | string
  billingAddress?: DeliveryAddress
  status: string
  createdAt: string
}
