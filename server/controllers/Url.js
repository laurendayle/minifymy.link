const Model = require("../models/Url");
const { getUrlKey } = require("../utils/urlKey");
const { validateUrl } = require("../utils/validateUrl");

const base = process.env.base;
console.log(base);

module.exports = {
  createShortenedUrl: async (req, res) => {
    if (validateUrl(req.body.url)) {
      const original_url = req.body.url,
        urlKey = getUrlKey(original_url),
        shortened_url = `${base}${urlKey}`;

      try {
        const savedDoc = await Model.createNew({
          url_id: urlKey,
          title: req.body.title || "",
          original_url: original_url,
          shortened_url: shortened_url,
          date: new Date(),
        });
        if (savedDoc) {
          res.status(200).send(savedDoc);
        } else {
          res.status(500).send({ message: "Something went wrong, try again" });
        }

      } catch (err) {
        res.status(404).send(err);
      }
    } else {
      res.status(400).send("Invalid URL");
    }
  },
  getShortenedUrl: (req, res) => {
    const { short_url } = req.params;
    const document = Model.getOriginalUrl(short_url)
      .then((originalUrl) => res.redirect(302, "http://" + originalUrl))
      .catch((err) => res.status(404).send(err));
  },
};
