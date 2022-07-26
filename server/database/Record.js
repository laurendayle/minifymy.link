const mongoose = require('mongoose');
const db = require('./index');
mongoose.Promise = global.Promise;

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  shortened_url: {
    type: String,
    required: true,
  }
});

module.exports.Record = mongoose.model("URL", urlSchema);
