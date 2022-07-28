const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Session = require("./Session");
const { validatePassword } = require("../utils/validatePassword");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
});

User.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken;
    return ret;
  },
});

const options = {
  usernameField: "email",
  usernameCaseInsensitive: true,
};
UserSchema.plugin(passportLocalMongoose, options);

const User = mongoose.model("User", UserSchema);

exports.createNewUser = async (userObj) => {
  if (validatePassword(userObj)) {
    try {
      const user = new User({ username: userObj.email });

      user.firstName = userObj.firstName;
      user.lastName = userObj.lastName;
      user.email = userObj.email;
      await user.setPassword(userObj.password);
      await user.save();

      const { newUser } = await User.authenticate()(user, userObj.password);
      console.log(newUser, "newUser");
      return newUser;
    } catch (err) {
      return err;
    }
  } else {
    return new Error("Passwords do not match");
  }
};

exports.User = User;
