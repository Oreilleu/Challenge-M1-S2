import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantite: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryAddress",
    required: true,
  },
  billingAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
