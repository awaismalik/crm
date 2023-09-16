const mongoose = require("mongoose");
const { Schema } = mongoose;

const complaintStatus = new Schema(
  {
    open: { type: String },
    pending: { type: String },
    progress: { type: String },
    close: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ComplaintStatus",
  complaintStatus,
  "complaint_status"
);
