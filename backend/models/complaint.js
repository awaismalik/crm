const mongoose = require("mongoose");
const { Schema } = mongoose;

const complaintSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photoPath: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    userAdmin: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema, "complaints");
