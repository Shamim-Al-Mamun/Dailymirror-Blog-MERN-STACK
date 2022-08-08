const express = require("express");
const router = express.Router();

const {
  getPosts,
  postPost,
  updatePost,
  deletePost,
  getPost,
} = require("../controllers/posts.controller");

const upload = require("../middlewares/uploads");

router.post("/", upload, postPost);

router.get("/", getPosts);

router.get("/:id", getPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
