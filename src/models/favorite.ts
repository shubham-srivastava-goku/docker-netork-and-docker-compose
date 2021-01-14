import { Schema, model } from 'mongoose';

const favoriteSchema = new Schema({
  type: String, // 'movie' | 'character'
  name: String,
  url: String
}); 

const Favorite = model('Favorite', favoriteSchema);

export = Favorite;
