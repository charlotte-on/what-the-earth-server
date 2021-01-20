const express = require("express");
const WholeProduct = require("../models/WholeProduct");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");

router.get(
  "https://koumoul.com/s/data-fair/api/v1/datasets/agribalyse-synthese/",
  requireAuth,
  function (req, res, next) {
    WholeProduct.find({})
      .then((wproducts) => res.status(200).json(wproducts))
      .catch(next);
  }
);

module.exports = router;
