const router = require("express").Router();
const Controller = require("../controllers/RefreshToken");

router.get("/", Controller.handleRefreshToken);

module.exports = router;