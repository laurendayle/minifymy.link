
const { customAlphabet } = require('nanoid');

const alphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz';

exports.getUrlKey = () => {
  const nanoid = customAlphabet(alphabet, 11);
  const urlKey = nanoid();
  return urlKey;
}
