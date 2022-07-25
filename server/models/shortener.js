const Model = require('../database/config').URL;

module.exports = {
  getNewShortenedUrl: async () => {
    try {
      console.log('hello from the model!')

    } catch (err) {
      console.error(err);
    }
  },
  getShortenedUrl: async () => {
    try {
      console.log('hello from the model getShortenedUrl');
    } catch (err) {
      console.error(err);
    }
  }
}