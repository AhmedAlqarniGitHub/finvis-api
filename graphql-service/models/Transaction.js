const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema; // Define Schema

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['income', 'outcome'] // Only allows 'income' or 'outcome' values
  },
  description: String,
  category: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
