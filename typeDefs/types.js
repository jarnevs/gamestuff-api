/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  enum Platform {
   PlayStation,
   Xbox,
   PC
  }

  type Category {
    id: ID!
    name: String!
  }

  type Game {
    id: ID!
    name: String!
    description: String!
    price: Float!
    platform: Platform!
    categories: [Category!]!
    image: String!
    createdOn: Date
  }

  type Image {
    id: ID!
    filename: String!
    encoding: String!
  }

  type User {
    id: ID
    email: String,
    password: String
    isAdmin: Boolean
  }

  type AuthData {
    userId: ID
    token: String
  }
`