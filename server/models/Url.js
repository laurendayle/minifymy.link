const mongoose = require("mongoose");
const db = require("../database/index");

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
  },
});

exports.Url = mongoose.model("URL", urlSchema);

exports.createNew = async (userObj) => {
  const { original_url } = urlObj;
  try {
    const url = await Url.findOne({ original_url });
    if (url) return url;

    const document = new Url(urlObj);
    await document.save();
    return document;
  } catch (err) {
    return err;
  }
};

exports.getOriginalUrl = async (url_id) => {
  try {
    const url = await Url.findOne({ url_id });
    if (url) {
      url.clicks++;
      url.save();
      return url.original_url;
    } else {
      return new Error("URL not found");
    }
  } catch (err) {
    return err;
  }
};
