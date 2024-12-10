import mongoose from "mongoose";
import { variationSchema } from "./product.model";

const Schema = mongoose.Schema;

const aggregateProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  idCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  variations: {
    type: variationSchema,
    required: true,
  },
});

const cartItemSchema = new Schema({
  product: {
    type: aggregateProductSchema,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [cartItemSchema],
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
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
