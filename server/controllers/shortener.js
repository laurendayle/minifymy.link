
const { insertNew } = require('../models/shortener');
const { getUrlKey } = require('../utils/urlKey');

module.exports = {
  createShortenedUrl: (req, res) => {
    const original_url = req.body.url;
    const shortened_url = getUrlKey(original_url);

    const document = insertNew({original_url: original_url, shortened_url: shortened_url})
      .then((savedDoc) => res.status(200).send(savedDoc))
      .catch((err) => res.status(404).send(err));
  },
  getShortenedUrl: async (req, res) => {
    try {
      console.log('getShortenedUrl', req.body);
    } catch (err) {
      res.status(404).send(err);
    }
  }
}
