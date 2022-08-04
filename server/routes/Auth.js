const router = require("express").Router();
const Controller = require("../controllers/Auth");

router.post("/", Controller.handleLogin);

module.exports = router;