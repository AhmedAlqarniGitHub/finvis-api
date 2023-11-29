// index.js

const { ApolloServer } = require('apollo-server-cloud-functions');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add context handling here if needed
  },
  introspection: true,  // Set to false in production for security
  playground: true,     // Set to false in production for security
});

exports.graphqlFunction = server.createHandler({
  cors: {
    origin: '*', // Configure CORS policy for your needs
    credentials: true,
  },
});