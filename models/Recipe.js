const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipe = new Schema({
  products: [],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Recipe = mongoose.model("Recipe", recipe);

module.exports = Recipe;
