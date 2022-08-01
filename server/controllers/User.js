const Session = require("../models/Session");
const bcrypt = require("bcryptjs");
const Model = require("../models/User");
// const User = Model.User;

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
    console.log(req.get('Authorization'), atob('Omxh'), 'req.get');
    let userData = atob(req.get("Authorization").slice(6)).split(":");
    const [ email, password ] = userData;
    console.log('email', email, 'password', password);
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
