const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");



router.post("signup", usersController.signUp);
router.post("signin", usersController.signin);

module.exports = router;