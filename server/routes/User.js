const router = require("express").Router();
const Controller = require("../controllers/UserProfile");

router.get("/", Controller.getUserData);

module.exports = router;