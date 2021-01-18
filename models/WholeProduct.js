const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wholeProductSchema = new Schema(
  {
    name: { type: String, required: true },
    score: Number,
    agriculture: Number,
    processing: Number,
    packaging: Number,
    transport: Number,
    distribution: Number,
    consumption: Number,
    climateChange: Number,
    ozoneLayerDepletion: Number,
    ionizingRadiation: Number,
    photochemicalOzoneFormation: Number,
    particles: Number,
    terrestrialAcidificationAndFreshwater: Number,
    terrestrialEutrophisation: Number,
    freshwaterEutrophication: Number,
    marineEutrophication: Number,
    landUse: Number,
    ecotoxicityForFreshwaterAquaticEcosystems: Number,
    depletionOfWaterResources: Number,
    depletionOfEnergyResources: Number,
    depletionOfMineralResources: Number,
  },
  { timestamps: true }
);

const WholeProduct = mongoose.model("WholeProduct", wholeProductSchema);

module.exports = WholeProduct;
