const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: { type: String, default: "User" },
  email: { type: String, required: true },
  role: {
    type: String,
    default: "General",
    enum: ["Admin", "Moderator", "General"],
    required: true,
  },
  password: { type: String, required: true },
  userImage: { type: String, default: "sample.webp" },
  token: { type: String },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", loginSchema);
