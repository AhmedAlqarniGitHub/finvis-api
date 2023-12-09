const mongoose = require('mongoose').set('debug', true);
require('dotenv').config();


const uri = process.env.MONGO_Ahmed_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;


