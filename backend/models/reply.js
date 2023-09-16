const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  reply: { type: String, require: true },
  complaint: { type: mongoose.SchemaTypes.ObjectId, ref: "Complaint" },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Reply", replySchema, "reply");
