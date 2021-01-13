const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  producer: { type: String, required: true },
  phonenumber: { type: String, required: true },
  schedule: { type: String, required: true },
  formattedAddress: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  field: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rate: {
    rate: { type: Schema.Types.ObjectId, ref: "Rate" },
    review: { type: Schema.Types.ObjectId, ref: "Review" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
