const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

const ObligationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Obligation', ObligationSchema);
