const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const SessionSchema = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

exports.Session = mongoose.model("Session", SessionSchema);

exports.authenticate = async (cookie) => {
  try {
    const user = await Session.findOne(cookie.id);

    if (user) {
      return user;
    } else {
      return new Error('No active session');
    }
  } catch (err) {
    return err;
  }
}
