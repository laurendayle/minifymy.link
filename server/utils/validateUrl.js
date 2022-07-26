
const validUrl = require('valid-url');

exports.validateUrl = (originalUrl) => {
  if (!originalUrl.startsWith('https://') && !originalUrl.startsWith('http://')) {
    originalUrl = 'http://' + originalUrl;
  }

  if (validUrl.isWebUri(originalUrl)) {
    return true;
  }

  return false;
}
