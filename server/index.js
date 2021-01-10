require('dotenv-defaults').config()
import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'

const express = require('express')
const mongoose = require('mongoose')

const Message = require('./models/message')

const pubsub = new PubSub()

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    Message,
    pubsub
  }
})

db.on('error', (error) => {
    console.error(error)
})

db.once('open', () => {
    console.log('MongoDB connected!')
})

server.start({ port: 4000 }, () => {
    console.log('The server is up on port 4000!')
})
