// const Model = require('../models/index').User;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Model = require('../models/User');
const User = Model.User;

module.exports = {
  signup: async (req, res) => {
    try {
      const document = await Model.createNewUser(req.body);
      if (!document) {
        res.status(500).send(new Error('Error registering the user'));
      } else {
        res.status(200).send(document);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    try {
      await req.session.save();
      return res.status(200).send(req.session);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
  authenticate: (req, res) => {
    if (req.user) {
      return res.status(200).send({
        user: req.user,
        authenticated: true,
      })
    } else {
      return res.status(401).send({
        error: 'User is not authenticated',
        authenticated: false,
      })
    }
  },
  logout: (req, res) => {
    req.logout();
    req.session.save((err) => {
      if (err) res.status(500).send(err);
      req.session.destroy();
      res.status(200).send('OK'); // redirect to / ?
    })
  }
}