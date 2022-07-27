const Record = require('../database/Url.js').Record;
const db = require('../database/index');

module.exports = {
  insertNew: async (urlObj) => {
    try {
      const { original_url } = urlObj;
      const url = await Record.findOne({original_url})
      console.log('url', url);
      if (url) {
        return url;
      }

      const document = new Record(urlObj);
      await document.save();
      return document;

    } catch (err) {
      return err;
    }
  },
  getOriginalUrl: async (url_id) => {
    try {
      const url = await Record.findOne({url_id});
      if (url) {
        url.clicks++;
        url.save();
        return url.original_url;
      } else {
        return new Error('URL not found');
      }
    } catch (err) {
      return err;
    }
  }
}