const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers");

// URL routes
router.post("/shortenurl/new", controller.Shortener.createShortenedUrl);
router.get("/shortenurl/:short_url", controller.Shortener.getShortenedUrl);

router.post("/user/signup", controller.User.register);
router.get("/user/login", controller.User.login);
router.post("/user/logout", controller.User.logout);
router.get("/user/profile", controller.User.getUserData);

module.exports = router;
