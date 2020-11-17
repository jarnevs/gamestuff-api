/**
 * The Mutation Resolvers
 */

const { Category, Game, User } = require('../mongo/models');
const { ApolloError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const pubsub = require('./pubsub');


module.exports = {
  Mutation: {
    addCategory: async (parent, { category }, { userId }) => {
      try {
        if (!userId) throw new Error('User is not allowed to do this!');
        return await Category.create({
          ...category,
        });
      } catch(e) {
        throw new Error(e.message);
      }
    },
    updateCategory: async (parent, { category, categoryId }, { userId }) => {
      try {
        if (!userId) throw new Error('User is not allowed to do this!');

        const { name } = category;

        const categoryExists = await Category.exists({ _id: categoryId });
        if (!categoryExists) throw new Error('Category doesn\'t exist');

        const categoryDb = await Category.findOne({ _id: categoryId });

        categoryDb.name = name;
        return await categoryDb.save();
      } catch(e) {
        throw new Error(e.message);
      }
    },
    deleteCategory: async (parent, { categoryId }, { userId }) => {
      try {
        if (!userId) throw new Error('User is not allowed to do this!');

        const categoryExists = await Category.exists({ _id: categoryId });
        if (!categoryExists) throw new Error('Category doesn\'t exist');
        const category = await Category.findOne({ _id: categoryId });
        await Category.deleteOne({ _id: categoryId });

        return category;
      } catch(e) {
        throw new Error(e.message);
      }
    },
    addGame: async (parent, { game }, { userId }) => {
      try {
        if (!userId) throw new Error('User is not allowed to do this!');

        if (game.categories && game.categories.length > 0) {
          const categoryIds = game.categories.map(({id}) => id);
          game.categories = await Category.find({ _id: { $in: categoryIds }});
        }

        const newGame = await Game.create({
          ...game,
          createdOn: new Date(),
        });

        pubsub.publish('GAME_ADDED', { gameAdded: newGame });

        return await Game.findById(newGame._id).populate('categories').exec();
      } catch(e) {
        throw new Error(e.message);
      }
    },
    updateGame: async (parent, { game, gameId }, { userId }) => {
      try {
        if (!userId) throw new Error('User is not allowed to do this!');

        const gameExists = await Game.exists({ _id: gameId });
        if (!gameExists) throw new Error('Game doesn\'t exist');
        
        if (game.categories && game.categories.length > 0) {
          const categoryIds = game.categories.map(({id}) => id);
          game.categories = await Category.find({ _id: { $in: categoryIds }});
        }

        await Game.findOneAndUpdate(
          {_id: gameId},
          game,
          {new: true}
        )

        return await Game.findById(gameId).populate('categories').exec();
      } catch(e) {
        throw new Error(e.message);
      }
    },
    deleteGame: async (parent, { gameId }, { userId }) => {
      try {
        if (!userId) throw new Error('User is not allowed to do this!');

        const gameExists = await Game.exists({ _id: gameId });
        if (!gameExists) throw new Error('Game doesn\'t exist');
        const game = await Game.findOne({ _id: gameId });
        await Game.deleteOne({ _id: gameId });

        return game;
      } catch(e) {
        throw new Error(e.message);
      }
    },
    register: async (parent, { user }, context) => {
      try {
        const { email, password } = user;

        const userExists = await User.exists({ email });
        if (userExists) throw new Error('User already exists');

        const hashedPassword = bcrypt.hashSync(password, 12);

        const newUser = await User.create({
          email,
          password: hashedPassword,
          isAdmin: false,
        });

        newUser.password = null;

        return newUser;
      } catch(e) {
        throw new Error(e.message);
      }
    },
  }
}