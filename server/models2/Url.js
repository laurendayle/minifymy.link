const mongoose = require("mongoose");
const db = require("../database/index");

const urlSchema = new mongoose.Schema({
  urlKey: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    unique: false,
    index: true,
  },
  title: {
    type: String,
    default: "",
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
  },
});
const Url = mongoose.model("URL", urlSchema);

module.exports = Url;