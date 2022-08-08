const mongoose = require("mongoose");
const db = require("../database/index");
const Schema = mongoose.Schema;

const ClickSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  urlKey: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    latitude: {
      type: String
    },
    longitude: {
      type: String,
    },
    country: {
      type: String,
    }
  },
  referer: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  language: {
    type: String,
  },
  timestamp: {
    type: String,
    default: Date.now,
  },
  redirected: {
    type: Boolean,
  }
});

const Click = mongoose.model("Click", ClickSchema);

module.exports = Click;