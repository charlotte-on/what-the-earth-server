const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const processedProductSchema = new Schema(
  {
    image: { type: String, required: true },
    ingredients: { type: Schema.Types.ObjectId, ref: "Ingredient" },
    data: { type: Schema.Types.ObjectId, ref: "Data" },
  },
  { timestamps: true }
);

const ProcessedProduct = mongoose.model(
  "ProcessedProduct",
  processedProductSchema
);

module.exports = ProcessedProduct;
