const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
