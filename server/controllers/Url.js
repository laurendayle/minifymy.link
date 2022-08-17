const Url = require("../models/Url");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const { getUrlKey } = require("../utils/urlKey");
const { parseJWT } = require("../utils/parseJWT");
const Click = require("../models/Click");
const axios = require("axios");

const getNewShortUrl = async (req, res) => {
  const urlObj = req.body;

  const decodedJWT = await parseJWT(req.cookies.jwt);
  try {
    const url = await Url.findOne({ original_url: urlObj?.original_url });
    if (url) {
      res.send(url[0]?.shortened_url);
    } else {
      urlObj["urlKey"] = getUrlKey();
    }

    urlObj.shortened_url = `minifymy.link/${urlObj.urlKey}`;

    const user = await User.find({ username: decodedJWT.username });
    urlObj["userId"] = user[0].id;

    const document = new Url(urlObj);
    await document.save();
    const { userId, _id, date, ...restProps } = document._doc;
    const result = restProps;

    res.status(201).send(result);
  } catch (err) {
    if (err.status) {
      res
        .status(err.status)
        .send({ message: "Something went wrong", err: err?.message });
    } else {
      res
        .status(500)
        .send({ message: "Something went wrong", err: err?.message });
    }
  }
};

const getOriginalUrl = async (req, res) => {
  const { urlKey } = req.params;

  const clickObj = {
    urlKey: req.params.urlKey,
    origin: req.headers["origin"] || req.headers["Origin"],
    referer: req.headers["referer"] || req.headers["Referer"],
    language: req.headers["accept-language"] || req.headers["Accept-Language"],
    userAgent: req.headers["user-agent"] || req.headers["User-Agent"],
  };

  try {
    const url = await Url.findOneAndUpdate(
      { urlKey: urlKey },
      { $inc: { clicks: 1 } },
      { upsert: true }
    );
    const originalUrl = url.original_url;
    await url.save();

    clickObj["userId"] = url.userId;
    const ipInfo = await axios.get(`https://ipapi.co/${clickObj.origin}/json`);
    if (!ipInfo.data.error) {
      clickObj["location"] = {
        latitude: ipInfo.data.latitude,
        longitude: ipInfo.data.longitude,
        country: ipInfo.data.country,
      };
    }
    const click = new Click(clickObj);
    console.log(click, "click");
    await click.save();

    res.redirect(302, `http://${originalUrl}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getNewCustomUrl = async (req, res) => {
  console.log(req.cookies, 'req.cookies');
  const urlObj = req?.body;

  try {
    const decodedJWT = await parseJWT(req.cookies.jwt);
    const url = await Url.find({
      $or: [{ original_url: urlObj?.original_url }, { urlKey: urlObj?.urlKey }],
    });
    if (url.length) {
      const user = await User.find({ _id: new ObjectId(url[0].userId) });
      if (user[0].username === decodedJWT.username) {
        res
          .status(409)
          .send({ message: "Looks like you've already shortened that link!" });
          return;
      } else {
        res.status(409).send({ message: "That backhalf is already taken" });
        return;
      }
    }

    const user = await User.find({ username: decodedJWT.username });
    urlObj["userId"] = user[0]._id;
    urlObj["shortened_url"] = `minifymy.link/${urlObj.urlKey}`;
    const document = new Url(urlObj);
    await document.save();
    const { userId, _id, date, ...restProps } = document._doc;
    const result = restProps;

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong", err: err.message });
  }
};

const editUrl = async (req, res) => {
  console.log(req.body, 'req.body');
  const urlKey = req?.body?.urlKey;
  const newUrlKey = req?.body?.newUrlKey;
  const newTitle = req?.body?.newTitle;

  console.log(urlKey, 'urlKey', newUrlKey, 'newUrlKey', newTitle, 'newTitle');
  try {
    // const updatedUrl = await Url.findOneAndUpdate({ urlKey: urlKey }, { urlKey: newUrlKey, title: newTitle, shortened_url: `minifymy.link/${newUrlKey}` }, { upsert: true });


    const updatedUrl = await Url.find({ urlKey: urlKey });
    console.log(updatedUrl[0], 'updatedUrl after db');
    if (newUrlKey) {
      updatedUrl[0].urlKey = newUrlKey;
      updatedUrl[0].shortened_url = `minifymy.link/${newUrlKey}`;
    }
    if (newTitle) {
      updatedUrl[0].title = newTitle;
    }

    await updatedUrl[0].save();
    const updatedClicks = await Click.findOneAndUpdate({ urlKey: urlKey }, { urlKey: newUrlKey }, { upsert: true });
    console.log(updatedClicks, 'updatedClicks');
    res.status(201).send(updatedUrl[0]);


  } catch (err) {
    res.status(500).send({ message: "Something went wrong", err: err.message });
  }
}

const deleteUrl = async (req, res) => {

  const urlKey = req?.body?.urlKey;
  console.log(req.body, 'urlKey');
  try {
    const urlDoc = await Url.deleteOne({ urlKey: urlKey });
    const clickDoc = await Click.deleteMany({ urlKey: urlKey });
    console.log(urlDoc, 'urlDoc', clickDoc, 'clickDoc');
    res.status(201).send({ message: "Successfully deleted" })
  } catch (err) {
    res.status(500).send({ message: "Something went wrong", err: err.message });
  }
}

module.exports = { getNewShortUrl, getOriginalUrl, getNewCustomUrl, editUrl, deleteUrl };
