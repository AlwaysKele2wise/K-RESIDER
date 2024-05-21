const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contact.js");

router.post("/msg", contactsController.contact);

module.exports = router;


