const User = require("../models/User");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  console.log(req.cookies, 'req.cookies');
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.find({ refreshToken: refreshToken });
    if (!foundUser.length) return res.sendStatus(403); // Forbidden
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser[0].username !== decoded.username) {
      return res.sendStatus(403);
    }
    const roles = Object.values(foundUser[0].roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    )
    res.send({ accessToken });
  });
}

module.exports = { handleRefreshToken };