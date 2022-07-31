const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { createSession } = require("./Session");
const { validatePassword } = require("../utils/validatePassword");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    default: "",
  },
  hash: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  // LINK server/controllers/User.js:8
  // LINK client/src/components/auth/SignUp.jsx:
  createNewUser: async (userObj) => {
    try {
      const user = await new User(userObj);
      await user.save();
      const cookie = await createSession(user);

      return {
        user: user.email,
        message: "Account creation successful",
        authenticated: true,
        session: cookie,
      };
    } catch (err) {
      return {
        user: user.email,
        message: "Error creating account" + err,
        authenticated: false,
        session: null,
      }
    }
  },
  // LINK server/controllers/User.js:24
  // LINK client/src/components/auth/Login.jsx:25
  login: async (userObj) => {
    try {
      const user = await User.findOne({ where: { email: userObj.email } });
      if (!user) {
        return {
          user: userObj.email,
          message: "No user exists with that email",
          authenticated: false,
          session: null,
        };
      }

      if (await bcrypt.compare(userObj.password, user.hash)) {
        const cookie = await createSession(user);
        console.log(cookie, "cookie");
        return {
          user: user.email,
          message: "Authentication successful",
          authenticated: true,
          session: cookie,
        };
      } else {
        return {
          user: userObj.email,
          message: "Incorrect password",
          authenticated: false,
          session: null,
        };
      }
    } catch (err) {
      return {
        user: user.email,
        message: "An error occured during authentication: " + err,
        authenticated: false,
        session: null,
      }
    }
  },
  User: User,
};
