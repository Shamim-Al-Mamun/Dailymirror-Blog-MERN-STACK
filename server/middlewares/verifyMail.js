const User = require("../models/user.model");

const verifyMail = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      req.email = user[0].email;
      next();
    } else {
      res.status(200).json({
        message: "Email not found!",
        reset: false,
      });
    }
  } catch {
    res.status(500).json({
      message: "Reset password failed!",
    });
  }
};

module.exports = verifyMail;
