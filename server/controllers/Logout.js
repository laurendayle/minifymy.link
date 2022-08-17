const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req?.cookies;
  if (!cookies?.jwt) return res.sendStatus(404); // No content
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: "" }, { upsert: true });
    console.log(foundUser, 'foundUser');
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500).send({ message: err.message });
  }
}

module.exports = { handleLogout };