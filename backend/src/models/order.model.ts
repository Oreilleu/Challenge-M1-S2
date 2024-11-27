import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  bilingAddress: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryAddress",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
