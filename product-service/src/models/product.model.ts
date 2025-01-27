import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product
