const router = require("express").Router();
const Controller = require("../controllers/Logout");

router.post("/", Controller.handleLogout);

module.exports = router;