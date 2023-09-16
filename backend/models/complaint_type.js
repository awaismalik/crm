const mongoose = require("mongoose");
const { Schema } = mongoose;

const complaintTypeSchema = new Schema(
  {
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ComplaintType",
  complaintTypeSchema,
  "complaintType"
);
