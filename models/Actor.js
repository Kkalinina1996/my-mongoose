import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: Date,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
});

export default mongoose.model('Actor', actorSchema);