/**
 * Modelling the song
 */

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
});

module.exports = CategorySchema;