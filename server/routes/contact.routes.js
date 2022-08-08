const express = require("express");
const router = express.Router();

const {
  postContact,
  getContacts,
} = require("../controllers/contact.controller");

router.post("/", postContact);
router.get("/", getContacts);

module.exports = router;
