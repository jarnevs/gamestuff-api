/**
 * Importing mongoose
 */

const mongoose = require('mongoose');

/**
 * Importing schemas
 */

const GameSchema = require('./schemas/game');
const CategorySchema = require('./schemas/category');
const UserSchema = require('./schemas/user');

/**
 * Creating mongoose models
 */

const Game = mongoose.model('Game', GameSchema);
const Category = mongoose.model('Category', CategorySchema);
const User = mongoose.model('User', UserSchema);

/**
 * Exporting the models
 */

module.exports = {
  Game,
  Category,
  User
}