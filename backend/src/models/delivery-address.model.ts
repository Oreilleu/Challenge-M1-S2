import mongoose from "mongoose";
import User from "./user.model";

const {Schema} = mongoose;

const deliveryAddressSchema = new Schema({
    user: {type: Schema.Types.ObjectId,ref: User},
    street: String,
    city: String,
    postalCode: String,
    country: String,
})

const DeliverAdressModel = mongoose.model("DeliveryAddress", deliveryAddressSchema);

export default DeliverAdressModel;