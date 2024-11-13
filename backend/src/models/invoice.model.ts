import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
});

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);

export default InvoiceModel;