const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: mongoose.SchemaType.email, ref: "users" },
    address: { type: String, required: true },
    date: { type: Date.now, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Registration",
  registrationSchema,
  "registration"
);
