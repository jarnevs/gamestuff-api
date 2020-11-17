/**
 * Modelling the playlist
 */

const mongoose = require('mongoose');

const CategorySchema = require('./category');

const GameShema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  platform: String,
  image: String,
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],
  createdOn: Date,
});

module.exports = GameShema;