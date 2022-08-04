const User = require("../models2/User");
const Url = require("../models2/Url");

const getUserData = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(404); // No content
  const refreshToken = cookies.jwt;
  console.log(refreshToken, 'refreshToken');

  try {
    const foundUser = await User.find({ refreshToken: refreshToken });
    const userId = foundUser[0].id;
    const links = await Url.find({ userId: userId });
    if (links.length) {
      res.status(200).send(links);
    } else {
      res.status(404).send({ message: "Looks like you haven't shortened any links yet!"});
    }
  } catch (err) {
    res.status(500).send(err);
  };
}

module.exports = { getUserData };