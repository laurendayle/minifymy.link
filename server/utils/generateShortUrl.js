
const nanoid = require('nanoid');
const validUrl = require('valid-url');

module.exports = {
  generateShortUrl: function(originalUrl) {
    if (validUrl.isUri(originalUrl)) {
      // ! use dns.lookup(host, cb) from the dns core module to verify a submitted url
      model.id = nanoid();
      console.log(model.id);
    } else {
      return new Error('Invalid URL string');
    }
  }
}