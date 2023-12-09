const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('./db');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the schema file
const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf-8'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  },
  context: ({ req }) => {
    console.log('Context function called');
    // Add context handling here if needed
  
  },
  introspection: true,  // Useful for development
  playground: true,     // Useful for development
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
