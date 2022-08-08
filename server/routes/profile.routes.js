const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploads");

const {
  postProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");

router.post("/", postProfile);

router.get("/", getProfile);

router.put("/:id", upload, updateProfile);

module.exports = router;
