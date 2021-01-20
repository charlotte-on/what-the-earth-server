const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

router.post("/simulator", function (req, res, next) {
  Recipe.create(req.body)
    .then((recipe) => res.status(200).json(recipe))
    .catch(next);
});

router.get("/simulator/result", function (req, res, next) {
  Recipe.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
