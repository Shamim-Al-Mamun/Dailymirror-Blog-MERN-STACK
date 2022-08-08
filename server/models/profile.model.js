const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: { type: String },
  title: { type: String },
  bio: { type: String },
  profileImage: { type: String },
  displayImage: { type: String },
  passion: { type: Array, default: [] },
  links: { type: Array, default: [] },
  status: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("profile", profileSchema);
