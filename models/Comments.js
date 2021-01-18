const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rate: { type: Number, required: true },
    review: String,
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    producerId: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

const Rate = mongoose.model("Comment", commentSchema);

module.exports = Rate;
