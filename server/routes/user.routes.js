const express = require("express");
const router = express.Router();

const {
  Logout,
  getUser,
  postUser,
  getUsers,
  updateUser,
  deleteUser,
  Authentication,
  resetUserPassword,
} = require("../controllers/user.controller");

const upload = require("../middlewares/uploads");
const verifyMail = require("../middlewares/verifyMail");
const verifyToken = require("../middlewares/verifytoken");
const verifyPassword = require("../middlewares/verifypassword");

router.post("/signup", postUser);

router.get("/", verifyToken, getUser);

router.post("/login", Authentication);

router.get("/all", verifyToken, getUsers);

router.get("/logout", verifyToken, Logout);

router.delete("/:id", verifyToken, deleteUser);

router.put("/update", verifyToken, updateUser);

router.put("/forgotpassword", verifyMail, updateUser);

router.post("/update", verifyToken, upload, updateUser);

router.put("/resetpassword", verifyToken, verifyPassword, resetUserPassword);

module.exports = router;
