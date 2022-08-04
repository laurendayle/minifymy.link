const router = require("express").Router();
const Controller = require("../controllers/Url");

router.post("/new", Controller.getNewShortUrl)
router.get("/:urlKey", Controller.getOriginalUrl);

module.exports = router;