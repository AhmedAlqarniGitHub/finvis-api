const User = require('./models/User');
const Obligation = require('./models/Obligation');
const SavingsTarget = require('./models/SavingsTarget');
const Transaction = require('./models/Transaction')

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findById(id).populate("obligations");
      console.log(user); // Check the output
      return user;
    },
    savingsTarget: async (_, { userId }) => {
      return await SavingsTarget.findOne({ user: userId });
    },
    totalSavings: async (_, { userId }) => {
      return calculateTotalSavings(userId);
    },
    // ... other query resolvers ...
  },
  Mutation: {
    updateUser: async (_, { userId, salary, salaryDay, obligations }) => {
      // First, handle the obligations
      await Obligation.deleteMany({ user: userId });

      const newObligations = await Obligation.insertMany(
        obligations.map((obligation) => ({
          ...obligation,
          user: userId,
        }))
      );

      // Get the IDs of the new obligations
      const obligationsIds = newObligations.map((obligation) => obligation._id);

      // Now, update the user with the new salary, salaryDay, and obligations
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          salary,
          salaryDay,
          obligations: obligationsIds,
        },
        { new: true }
      ).populate("obligations");

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    },
    addSavingsTarget: async (_, { userId, targetAmount }) => {
      const existingTarget = await SavingsTarget.findOne({ user: userId });

      if (existingTarget) {
        const updatedTarget = await SavingsTarget.findOneAndUpdate(
          { user: userId },
          {
            user: userId,
            targetAmount,
            currentAmount: await calculateTotalSavings(userId),
          },
          { new: true }
        );
        return updatedTarget;
      } else {
        const newTarget = new SavingsTarget({
          user: userId,
          targetAmount,
          currentAmount: await calculateTotalSavings(userId),
        });
        await newTarget.save();
        return newTarget;
      }
    },
    addTransaction: async (
      _,
      { userId, amount, date, transactionType, description, category }
    ) => {
      const newTransaction = new Transaction({
        user: userId,
        amount,
        date,
        transactionType,
        description,
        category,
      });

      await newTransaction.save();

      return newTransaction;
    },
    // ... other mutation resolvers ...
  },
  // ... other types of resolvers, if any ...
};

async function calculateTotalSavings(userId) {
  const user = await User.findById(userId).populate('obligations');
  if (!user) {
    throw new Error('User not found');
  }

  // Calculate total income and outcome from transactions
  const transactions = await Transaction.find({ user: userId });
  const totalIncome = transactions
    .filter(t => t.transactionType === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOutcome = transactions
    .filter(t => t.transactionType === 'outcome')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate total obligations
  const totalObligations = user.obligations
    .reduce((sum, obligation) => sum + obligation.amount, 0);

  // Calculate total savings
  const totalSavings = user.salary + totalIncome - totalOutcome - totalObligations;

  return totalSavings;
}



module.exports = resolvers;
