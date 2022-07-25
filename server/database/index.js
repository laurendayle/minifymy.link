require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb+srv://ldanders:laplaya15@urlshortener.rftvzgu.mongodb.net/test';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});

module.exports = db;