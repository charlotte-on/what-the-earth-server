const express = require("express");
const WholeProduct = require("../models/WholeProduct");
const router = express.Router();

router.get(
  "https://koumoul.com/s/data-fair/api/v1/datasets/agribalyse-synthese/",
  function (req, res, next) {
    WholeProduct.find({})
      .then((wproducts) => res.status(200).json(wproducts))
      .catch(next);
  }
);

module.exports = router;
