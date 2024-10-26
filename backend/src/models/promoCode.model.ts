import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
});