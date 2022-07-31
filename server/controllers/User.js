const Session = require("../models/Session");
const bcrypt = require("bcryptjs");
const Model = require("../models/User");
// const User = Model.User;

module.exports = {
  // LINK server/models/User.js:29
  // LINK client/src/components/auth/SignUp.jsx:26
  register: async (req, res) => {
    try {
      console.log('req.body', req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await Model.createNewUser({
        fullName: req.body.fullName,
        email: req.body.email,
        hash: hashedPassword,
      });
      delete user["hash"];
      res.cookie("minifymy.link", user.session.token);
      console.log(res.cookie(), 'res.cookie');
      res.status(200).send(user);
    } catch (err) {
      console.log('err in register handler', err);
      res.status(500).send(err);
    }
  },
  // LINK server/models/User.js:51
  // LINK client/src/components/auth/Login.jsx:25
  login: async (req, res) => {
    console.log(req);
    try {
      const userData = await Model.login({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(userData, 'userData');
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
    res.clearCookie("minifymy.link");
    const cookies = req.headers.cookie.split(";");
    let cookieValue = null;
    cookies.forEach(element => {
      if (element.split("=")[0].trim() === "minifymy.link") {
        cookieValue = decodeURIComponent(element.split("=")[1].trim());
      }
    })

    try {
      const document = await Session.destroySession({ where: { session: cookieValue }});
      if (!document) {
        res.status(500).send(err);
      }
      res.status(200).send(document);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
