import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const FavoriteModel = mongoose.model('Favorite', favoriteSchema);
export default FavoriteModel;