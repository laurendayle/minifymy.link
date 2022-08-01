const Session = require("../models/Session");
const bcrypt = require("bcryptjs");
const Model = require("../models/User");
const { getLinks } = require("../models/Url");

module.exports = {
  // LINK server/models/User.js:29
  // LINK client/src/components/auth/SignUp.jsx:26
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await Model.createNewUser({
        fullName: req.body.fullName,
        email: req.body.email,
        hash: hashedPassword,
      });
      res.cookie("minifymy.link", user.session.token);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // LINK server/models/User.js:51
  // LINK client/src/components/auth/Login.jsx:25
  login: async (req, res) => {
    let userData = atob(req.get("Authorization").slice(6)).split(":");
    const [ email, password ] = userData;
    try {
      const userData = await Model.login({
        email: email,
        password: password,
      });
      if (userData.authenticated) {
        res.cookie("minifymy.link", userData.session).status(200).send(userData);
      } else {
        res.status(404).send(userData);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("minifymylink");
      const document = await Session.destroySession({ where: { session: req.body.token }});
      if (!document) {
        res.status(500).send({ message: "Error during logout" });
      } else {
        res.status(200).send(document);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUserData: async (req, res) => {
    const token = req.get("Authorization");
    try {
      const userId = await Session.getSession(token);
      const data = await getLinks(userId.id);
      if (data.length) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ message: "Looks like you haven't shortened any links yet! Get started by entering a URL to shorten"});
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
