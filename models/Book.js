import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publishedDate: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
});

export default mongoose.model('Book', bookSchema);