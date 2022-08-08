const Url = require("../models/Url");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const { getUrlKey } = require("../utils/urlKey");
const { parseJWT } = require("../utils/parseJWT");
const Click = require("../models/Click");
const axios = require("axios");

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

  const clickObj = {
    urlKey: req.params.urlKey,
    origin: req.headers["origin"] || req.headers["Origin"],
    referer: req.headers["referer"] || req.headers["Referer"],
    language: req.headers["accept-language"] || req.headers["Accept-Language"],
    userAgent: req.headers["user-agent"] || req.headers["User-Agent"],
  }

  try {

    const url = await Url.findOneAndUpdate({ urlKey: urlKey }, { $inc: {"clicks": 1 } }, { upsert: true });
    const originalUrl = url.original_url;
    await url.save();

    clickObj["userId"]  = url.id;
    const ipInfo = await axios.get(`https://ipapi.co/${clickObj.origin}/json`);
    if (!ipInfo.data.error) {
      clickObj["location"] = {
        latitude: ipInfo.data.latitude,
        longitude: ipInfo.data.longitude,
        country: ipInfo.data.country,
      }
    }
    const click = new Click(clickObj);
    await click.save();

    res.redirect(302, `http://${originalUrl}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = { getNewShortUrl, getOriginalUrl };