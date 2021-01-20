const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const list = new Schema({
  listedProducts: [Object],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const List = mongoose.model("List", list);

module.exports = List;
