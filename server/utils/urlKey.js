
const { customAlphabet } = require('nanoid');

const alphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz';

exports.getUrlKey = (originalUrl) => {
  const nanoid = customAlphabet(alphabet, 11);
  const urlKey = nanoid();
  return urlKey;
}
