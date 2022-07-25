const router = require('express').Router();

const controller = require('./controllers');

router.post('/shortenurl/new', controller.shortener.createShortenedUrl);

router.get('/shortenurl/:short_url', controller.shortener.getShortenedUrl);

module.exports = router;



