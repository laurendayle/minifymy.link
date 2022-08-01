const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const SessionSchema = new Schema({
  token: {
    type: String,
    default: "",
  },
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = {
  Session: Session,
  createSession: async (userObj) => {
    try {
      let cookie = await bcrypt.hash(process.env.SECRET, 10);
      const newSession = await Session.findOneAndUpdate(
        { _id: userObj._id },
        { token: cookie },
        { upsert: true, new: true }
      );

      return newSession;
    } catch (err) {
      return err;
    }
  },
  destroySession: async (cookie) => {
    try {
      const document = await Session.findOneAndDelete({ session: cookie });
      console.log(document);
      return document;
    } catch (err) {
      return err;
    }
  },
  getSession: async (token) => {
    try {
      const user = await Session.findOne({session: token});
      return user;
    } catch (err) {
      return err;
    }
  }
};
