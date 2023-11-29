const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingsTargetSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetAmount: {
    type: Number,
    required: true
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  description: String
});

module.exports = mongoose.model('SavingsTarget', SavingsTargetSchema);
