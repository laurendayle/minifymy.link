const router = require("express").Router();
const Controller = require("../controllers/Url");

// router.post("/new", Controller.getNewShortUrl)
router.post("/new", (req, res) => {
  if (!req?.body?.urlKey) {
    Controller.getNewShortUrl(req, res);
  } else {
    Controller.getNewCustomUrl(req, res);
  }
})
router.get("/:urlKey", Controller.getOriginalUrl);
router.put("/", Controller.editUrl);
router.delete("/", Controller.deleteUrl);

module.exports = router;