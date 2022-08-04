const router = require("express").Router();
const Controller = require("../controllers/Register");

router.post("/", Controller.handleNewUser);

module.exports = router;