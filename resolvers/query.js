/**
 * The Query Resolvers
 */

const { AuthenticationError } = require('apollo-server');
const { Category, Game, User } = require('../mongo/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    // e.g. dummies: () => dummies
    categories: async () => await Category.find(),
    category: async (parent, { id }) => await Category.findById(id),
    games: async () =>  await Game.find().populate('categories').exec(),
    game: async (parent, { id }) => await Game.findById(id).populate('categories').exec(),
    login: async (parent, { user }, context) => {
      const { email, password } = user;

      const userExists = await User.exists({ email });
      if (!userExists) throw new Error('User does not exist');

      const foundUser = await User.findOne({ email });
      const isEqual = bcrypt.compareSync(password, foundUser.password);
      if (!isEqual) throw new Error ('Password is incorrect');

      const token = jwt.sign(
        { userId: foundUser._id, email: foundUser.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      return {
        userId: foundUser.id,
        token
      }
    },
    users: (parent, params, context) => {
      if (context.userId === '') throw new AuthenticationError('Must authenticate');
      else return User.find();
    },

    user: (parent, { id }, context) => {
      if (context.userId === '') throw new AuthenticationError('Must authenticate');
      else return User.findOne({ _id: id });
    }
  },
  Game: {
    categories: (parent, args, context) => {
      return parent.categories.map(({_id, name}) => ({id: _id, name}));
    }
  }
}