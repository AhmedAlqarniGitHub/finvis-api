const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    savingsTarget(userId: ID!): SavingsTarget
    totalSavings(userId: ID!): Float
    transactions(userId: ID!, transactionType: String!): [Transaction]
  }

  type Mutation {
    updateUser(
      userId: ID!
      salary: Float
      salaryDay: Int
      obligations: [ObligationInput]
    ): User
    addSavingsTarget(userId: ID!, targetAmount: Float!): SavingsTarget
    addTransaction(
      userId: ID!
      amount: Float!
      date: String!
      transactionType: String!
      description: String
      category: String
    ): Transaction
  }

  type SavingsTarget {
    id: ID!
    user: ID!
    targetAmount: Float!
    currentAmount: Float!
  }

  input ObligationInput {
    name: String!
    amount: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    phone: String
    age: Int
    incomeSource: String
    salary: Float
    salaryDay: Int
    obligations: [Obligation]
  }

  type Obligation {
    id: ID!
    user: ID!
    name: String!
    amount: Float!
  }

  type Transaction {
    id: ID!
    user: ID!
    amount: Float!
    date: String!
    transactionType: String!
    description: String
    category: String
  }
`;

module.exports = typeDefs;
