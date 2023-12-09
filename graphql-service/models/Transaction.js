const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema; // Define Schema

const TransactionSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: String,
  category: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
