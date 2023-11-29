const Transaction = require('./models/Transaction.js');
const SavingsTarget = require('./models/SavingsTarget.js');

const resolvers = {
  Query: {
    transactions: async () => await Transaction.find({}),
    expenseCategories: async () => await ExpenseCategory.find({}),
    savingsTargets: async () => await SavingsTarget.find({})
  },
  Mutation: {
    addTransaction: async (_, { amount, date, description, category }) => {
      const newTransaction = new Transaction({ amount, date, description, category });
      await newTransaction.save();
      return newTransaction;
    },
    addSavingsTarget: async (_, { targetAmount, description }) => {
      const newTarget = new SavingsTarget({ targetAmount, currentAmount: 0, description });
      await newTarget.save();
      return newTarget;
    }
  }
};

module.exports = resolvers;