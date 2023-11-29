const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('User', UserSchema);
