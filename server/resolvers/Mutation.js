const Mutation = {
  createMessage(parent, args, { Message, pubsub }, info) {
    const message = {
      ...args.data
    }

    Message.create(message, function (err) {
      if (err) return handleError(err);
    });

    pubsub.publish('message', {
      message: {
        mutation: 'CREATED',
        data: message
      }
    })
    
    const messages = Message.find();
    return messages
  },
  deleteMessage(parent, args, { Message, pubsub }, info) {
    const message = {
      ...args.data
    }
    
    Message.deleteMany(message, function (err) {
      if (err) return handleError(err);
    });

    pubsub.publish('message', {
      message: {
        mutation: 'DELETED',
        data: message
      }
    })
    
    const messages = Message.find();
    return messages
  }
}

export { Mutation as default }
