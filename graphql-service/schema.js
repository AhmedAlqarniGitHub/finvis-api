const { gql } = require('apollo-server-cloud-functions');

const typeDefs = gql`
  type Transaction {
    id: ID!
    amount: Float!
    date: String!
    description: String
    category: String
  }

  type ExpenseCategory {
    id: ID!
    name: String!
    description: String
  }

  type SavingsTarget {
    id: ID!
    targetAmount: Float!
    currentAmount: Float!
    description: String
  }

  type Query {
    transactions: [Transaction]
    expenseCategories: [ExpenseCategory]
    savingsTargets: [SavingsTarget]
  }

  type Mutation {
    addTransaction(amount: Float!, date: String!, description: String, category: String): Transaction
    addExpenseCategory(name: String!, description: String): ExpenseCategory
    addSavingsTarget(targetAmount: Float!, description: String): SavingsTarget
  }
`;

module.exports = typeDefs;
