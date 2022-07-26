const Record = require('../database/Record.js').Record;
const db = require('../database/index');

module.exports = {
  insertNew: async (urlObj) => {
    const document = new Record(urlObj);
    // document.save()
    //   .then((savedDoc) => {
    //     console.log('Document successfully inserted into MongoDB: ', savedDoc);
    //     return savedDoc;
    //   })
    //   .catch((err) => err);
    try {
      const document = new Record(urlObj);
      await document.save();
      return document;
    } catch (err) {
      return err;
    }
  },
  getOriginalUrl: async () => {
    try {
      console.log('hello from the model getShortenedUrl');
    } catch (err) {
      console.error(err);
    }
  }
}