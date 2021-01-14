const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rateSchema = new Schema({
  rate: { type: String, required: true },
  review: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;
