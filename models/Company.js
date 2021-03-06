const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bannerImg: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
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
    bannerImg: { type: String, default: "/media/fruits-veggies.jpg" },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
