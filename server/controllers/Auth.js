const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const handleLogin = async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).send({ message: "Username and password are required" });

  try {
    const foundUser = await User.find({ username: username });

    if (!foundUser.length) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(password, foundUser[0].password);
    if (match) {
      const roles = Object.values(foundUser[0].roles);
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            "username": foundUser[0].username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      const refreshToken = jwt.sign(
        { "username": foundUser[0].username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const updatedUser = await User.findOneAndUpdate({ username: foundUser[0].username }, { refreshToken: refreshToken }, { upsert: true });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      res.send({ accessToken, refreshToken, roles, username: foundUser[0].username, id: foundUser[0].id, });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = { handleLogin };