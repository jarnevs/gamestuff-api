/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input GameInput {
    name: String
    description: String
    price: Float
    platform: Platform
    categories: [CategoryIdInput]
    image: String
  }

  input CategoryInput {
    name: String
  }

  input CategoryIdInput {
    id:ID
  }

  input UserInput {
    email: String
    password: String
  }
`