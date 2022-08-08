const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const verifyPassword = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.email });
    if (user && user.length > 0) {
      bcrypt.compare(
        req.body.currentPassword,
        user[0].password,
        function (err, result) {
          if (result) {
            next();
          } else {
            res.status(200).json({
              message: "Incorrect Current password!",
              match: false,
            });
          }
        }
      );
    } else {
      res.status(500).json({
        message: "Email not found!",
        access_token: false,
      });
    }
  } catch {
    res.status(500).json({
      message: "Eeset password failed!",
    });
  }
};

module.exports = verifyPassword;
