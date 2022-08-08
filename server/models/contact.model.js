const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: Boolean, default: true },
  timestamp: { type: Number, required: true },
});

module.exports = mongoose.model("contact", contactSchema);
