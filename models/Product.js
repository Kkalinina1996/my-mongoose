import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

export default mongoose.model('Product', productSchema);