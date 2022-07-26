
const { insertNew, getOriginalUrl } = require('../models/shortener');
const { getUrlKey } = require('../utils/urlKey');
const { validateUrl } = require('../utils/validateUrl');

const base = process.env['base'];

module.exports = {
  createShortenedUrl: (req, res) => {
    if (validateUrl(req.body.url)) {
      const original_url = req.body.url,
            urlKey = getUrlKey(original_url),
            shortened_url = base + urlKey;

      const document = insertNew({
        url_id: urlKey,
        original_url: original_url,
        shortened_url: shortened_url,
        date: new Date()
      })
        .then((savedDoc) => res.status(200).send(savedDoc))
        .catch((err) => res.status(404).send(err));
    } else {
      res.status(400).send('Invalid URL');
    }
  },
  getShortenedUrl: (req, res) => {
    const { short_url } = req.params;
    const document = getOriginalUrl(short_url)
      .then((originalUrl) => res.redirect(302, 'http://' + originalUrl))
      .catch((err) => res.status(404).send(err));
  }
}
