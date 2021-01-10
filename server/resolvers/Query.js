const Query = {
  messages(parent, args, { Message }, info) {
    const user = args.data.receiver

    const messages = Message.find({ $or: [{ sender: user }, { receiver: user }] });
    return messages
  }
}

export { Query as default }
