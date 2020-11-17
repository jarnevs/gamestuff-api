/**
 * The Subscription Resolvers
 */

module.exports = {
  Subscription: {
    gameAdded: { subscribe: () => pubsub.asyncIterator("GAME_ADDED") }
  }
}