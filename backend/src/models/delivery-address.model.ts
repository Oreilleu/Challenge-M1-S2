import mongoose from "mongoose";

const {Schema} = mongoose;

const deliveryAddressSchema = new Schema({
    user: {type: Schema.Types.ObjectId,ref: "User", required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true}
})

const DeliverAdressModel = mongoose.model("DeliveryAddress", deliveryAddressSchema);

export default DeliverAdressModel;