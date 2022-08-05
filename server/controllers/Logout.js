const User = require("../models/User");

const handleLogout = async (req, res) => {
  // const cookies = req.cookies;
  // if (!cookies?.jwt) return res.sendStatus(404); // No content
  // const refreshToken = cookies.jwt;

  const cookies = req.body;
  if (!cookies?.refreshToken) return res.sendStatus(404); // No content
  const refreshToken = cookies.refreshToken;

  try {
    const foundUser = await User.find({ refreshToken: refreshToken }, { refreshToken: null }, {upsert: true});
    console.log(foundUser, 'foundUser');
    // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500).send({ message: err.message });
  }
}

module.exports = { handleLogout };