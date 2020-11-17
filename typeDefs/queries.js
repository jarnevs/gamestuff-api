/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    games:[Game]
    game(id: ID):Game
    categories:[Category]
    category(id: ID):Category
    login(user: UserInput):AuthData,
    users:[User]
    user(id:ID):User
  }
`