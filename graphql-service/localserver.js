// localServer.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();

async function startApolloServer(typeDefs, resolvers) {
  // Initialize an Express application
  const app = express();

  // Create a new Apollo server instance with your typeDefs and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // You can add context handling here if needed for authentication, etc.
    }
  });

  // Required: Start ApolloServer before connecting to Express
  await server.start();

  // Apply the Apollo GraphQL middleware and specify the path to '/graphql'
  server.applyMiddleware({ app, path: '/graphql' });

  // Specify a port to listen on
  const port = process.env.PORT || 4000;

  // Start the server
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

// Call startApolloServer to start the server
startApolloServer(typeDefs, resolvers);
