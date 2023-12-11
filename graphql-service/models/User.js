const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema; // Define Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false, // Set to true if phone number is mandatory
  },
  age: {
    type: Number,
    required: false,
  },
  incomeSource: {
    type: String,
    required: false,
  },
  salary: {
    type: Number,
    required: false
  },
  salaryDay: {
    type: Number,
    required: false
  },
  obligations: [{
    type: Schema.Types.ObjectId,
    ref: 'Obligation' // Replace with the name of your Obligation model
  }]
});

module.exports = mongoose.model('User', UserSchema);
