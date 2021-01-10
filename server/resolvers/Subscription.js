const { withFilter } = require('apollo-server');

const Subscription = {
  message: {
    subscribe: withFilter(
      (parent, args , { pubsub }, info) => pubsub.asyncIterator('message'),
      (payload, variables) => {
        const sender = payload.message.data.sender
        const receiver = payload.message.data.receiver
        const user = variables.data.receiver
        return receiver === user || sender === user;
      }
    )
  }
}

export { Subscription as default }
