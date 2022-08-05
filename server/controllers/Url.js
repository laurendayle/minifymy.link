const Url = require("../models/Url");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const { getUrlKey } = require("../utils/urlKey");
const { parseJWT } = require("../utils/parseJWT");

const getNewShortUrl = async (req, res) => {
  console.log('getNewShortUrl');
  const urlObj = req.body;
  try {
    const url = await Url.findOne({ original_url: urlObj.original_url });
    if (url) return url;

    const urlKey = getUrlKey();
    urlObj.urlKey = urlKey;
    urlObj.shortened_url = `minifymy.link/${urlKey}`;

    const decodedJWT = await parseJWT(req.cookies.jwt);
    const user = await User.find({ username: decodedJWT.username });
    urlObj["userId"] = user[0].id;
    const document = new Url(urlObj);
    await document.save();
    res.status(201).send(document);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const getOriginalUrl = async (req, res) => {
  const { urlKey } = req.params;

  try {
    const url = await Url.find({ urlKey: urlKey });
    const originalUrl = url.original_url;
    url.clicks++;
    url.save();
    res.redirect(302, `http://${originalUrl}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = { getNewShortUrl, getOriginalUrl };