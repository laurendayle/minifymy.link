
const { customAlphabet } = require('nanoid');
const validUrl = require('valid-url');
const alphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz';

exports.getUrlKey = (originalUrl) => {

  if (!originalUrl.startsWith('https://') && !originalUrl.startsWith('http://')) {
    originalUrl = 'http://' + originalUrl;
  }
  if (validUrl.isWebUri(originalUrl)) {
    const nanoid = customAlphabet(alphabet, 11);
    const urlKey = nanoid();
    return 'http://minifymy.link/' + urlKey;
  }
  return new Error('Please enter a valid URL (http(s)://minifymy.link)');
}
