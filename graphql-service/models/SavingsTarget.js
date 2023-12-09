const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema; // Define Schema

const SavingsTargetSchema = new Schema({
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
