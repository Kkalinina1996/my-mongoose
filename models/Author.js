import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String
});

export default mongoose.model('Author', authorSchema);