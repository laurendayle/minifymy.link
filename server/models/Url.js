const mongoose = require("mongoose");
const db = require("../database/index");
const ObjectId = require("mongoose").Types.ObjectId;

const urlSchema = new mongoose.Schema({
  url_id: {
    type: String,
    required: true,
    unique: true,
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

module.exports = {
  getOriginalUrl: async (userObj) => {
    const { original_url } = urlObj;
    console.log(userObj, 'userObj');
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
  },
  createNew: async (userObj) => {
    const { original_url } = userObj;
    try {
      const url = await Url.findOne({ original_url });
      if (url) return url;
      const document = new Url(userObj);
      await document.save();
      return document;
    } catch (err) {
      return err;
    }
  },
  getLinks: async (userId) => {
    console.log(userId, 'userId from getLinks');
    try {
      const data = await Url.find({ "_id" : ObjectId(userId) });
      return data;
      console.log(data, 'data');
    } catch (err) {
      return { message: "Unable to retrieve user data", }
    }
  },
  Url: Url,
}