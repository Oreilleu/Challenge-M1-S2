import { CartItem } from "./cart-item.interface";
import { DeliveryAddress } from "./delivery-address.interface";

export interface Order {
  cart: CartItem[];
  totalPrice: number;
  address: DeliveryAddress | string;
  billingAddress?: DeliveryAddress;
  statusCheckout: string;
}
