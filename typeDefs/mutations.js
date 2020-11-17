/**
 * The GraphQL mutations
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    addGame(game: GameInput):Game
    updateGame(game: GameInput, gameId: ID):Game
    deleteGame(gameId: ID):Game
    addCategory(category: CategoryInput):Category
    updateCategory(category: CategoryInput, categoryId: ID):Category
    deleteCategory(categoryId: ID):Category
    register(user: UserInput):User
  }
`