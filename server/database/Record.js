const mongoose = require('mongoose');
const db = require('./index');
mongoose.Promise = global.Promise;

const urlSchema = new mongoose.Schema({
  url_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  original_url: {
    type: String,
    required: true,
  },
  shortened_url: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  }
});

module.exports.Record = mongoose.model("URL", urlSchema);
