// const Transaction = require('./models/Transaction.js');
// const SavingsTarget = require('./models/SavingsTarget.js');

// const resolvers = {
//   Query: {
//     transactions: async () => await Transaction.find({}),
//     expenseCategories: async () => await ExpenseCategory.find({}),
//     savingsTargets: async () => await SavingsTarget.find({})
//   },
//   Mutation: {
//     addTransaction: async (_, { amount, date, description, category }) => {
//       const newTransaction = new Transaction({ amount, date, description, category });
//       await newTransaction.save();
//       return newTransaction;
//     },
//     addSavingsTarget: async (_, { targetAmount, description }) => {
//       const newTarget = new SavingsTarget({ targetAmount, currentAmount: 0, description });
//       await newTarget.save();
//       return newTarget;
//     }
//   }
// };

// module.exports = resolvers;

const User = require('./models/User'); // Adjust the path to your User model
const Obligation = require('./models/Obligation'); // Adjust the path to your Obligation model

const resolvers = {
  Mutation: {
    updateUser: async (_, { userId, salary, salaryDay, obligations }) => {
      const user = await User.findById(userId);
      if (!user) {
        console.log(`No user found with ID: ${userId}`);
        throw new Error('User not found');
      }
    
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { salary, salaryDay },
        { new: true }
      );
    
      if (!updatedUser) {
        console.log(`Failed to update user with ID: ${userId}`);
        throw new Error('Error updating user');
      }
    
      // Convert the updated user document to a plain JavaScript object
      const updatedUserObject = updatedUser.toObject();
    
      // Ensure the id field is populated
      if (!updatedUserObject.id) {
        updatedUserObject.id = updatedUser._id;
      }
    
        // Remove existing obligations
  await Obligation.deleteMany({ user: userId });

  // Create new obligations
  const newObligations = obligations.map(obligation => ({
    ...obligation,
    user: userId
  }));
  await Obligation.insertMany(newObligations);

  // Retrieve updated obligations to return with the user
  const updatedObligations = await Obligation.find({ user: userId });

 

  // Ensure the id field is populated
  if (!updatedUserObject.id) {
    updatedUserObject.id = updatedUser._id;
  }
    
      return {
        ...updatedUserObject,
        obligations: updatedObligations
      };
    },
  }
  // ... other resolvers ...
};

module.exports = resolvers;
