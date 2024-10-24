import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  coins: { type: Number, default: 0 },
});

export const Player = mongoose.model('Player', playerSchema);