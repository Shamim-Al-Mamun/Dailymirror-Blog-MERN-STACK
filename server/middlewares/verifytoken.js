const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.find({ email: decoded.email });
    if (user) {
      req.email = decoded.email;
      next();
    } else {
      res.status(200).json({
        message: "User not found!",
        access_token: false,
      });
    }
  } else {
    res.status(500).json({
      message: "Unauthorized request!",
    });
  }
};

module.exports = verifyToken;
