const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  username: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  roles: {
    type: Schema.Types.Mixed,
    default: { User: 0240 },
  },
  refreshToken: {
    type: String,
    default: "",
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;