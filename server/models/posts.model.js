const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  catagory: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  postImage: { type: String, required: true },
  favourite: { type: Boolean, default: false },
  postedBy: { type: String, default: "User" },
  comments: { type: Array, default: [] },
  favouritesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },

  status: { type: Boolean, default: true },
  timestamp: { type: Number, required: true },
});

module.exports = mongoose.model("post", postSchema);
