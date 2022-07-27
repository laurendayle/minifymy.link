const router = require('express').Router();

const controller = require('../controllers');

// URL routes
router.post('/shortenurl/new', controller.Shortener.createShortenedUrl);
router.get('/shortenurl/:short_url', controller.Shortener.getShortenedUrl);

// User routes
router.post('/signup', controller.User.createAccount);
router.post('/login', controller.User.login);

module.exports = router;