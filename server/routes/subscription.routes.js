const express = require("express");
const router = express.Router();

const {
  postSubscription,
  getSubscriptions,
} = require("../controllers/subscription.controller");

router.post("/", postSubscription);

router.get("/", getSubscriptions);

module.exports = router;
