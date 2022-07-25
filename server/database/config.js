const mongoose = require('mongoose');

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

const URL = mongoose.model("URL", urlSchema);

module.exports = {
  URL: URL,
}