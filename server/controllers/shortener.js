const Model = require('../models/shortener').URL;

module.exports = {
  createShortenedUrl: async (req, res) => {
    console.log('req.body.url', req.body);
    try {


      // const data = new Model({ original_url: req.body.url, shortened_url: })
      res.status(200).send(req.body);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getShortenedUrl: async (req, res) => {
    try {
      console.log('getShortenedUrl', req.body);
    } catch (err) {
      res.status(404).send(err);
    }
  }
}
