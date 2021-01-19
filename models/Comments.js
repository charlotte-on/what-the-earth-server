const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rate: { type: Number, required: true },
    review: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    producerId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  },
  { timestamps: true }
);

const Rate = mongoose.model("Comment", commentSchema);

module.exports = Rate;
