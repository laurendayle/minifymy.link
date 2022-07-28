const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers');

// URL routes
router.post('/shortenurl/new', controller.Shortener.createShortenedUrl);
router.get('/shortenurl/:short_url', controller.Shortener.getShortenedUrl);

// User routes
router.post('/signup', controller.User.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/?error=LoginError', failureFlash: true }), controller.User.login);
router.get('/profile', passport.authenticate('jwt', { session: false }, controller.User.authenticate));
router.get('/logout', controller.User.logout);

module.exports = router;