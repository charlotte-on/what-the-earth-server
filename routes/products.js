const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

router.post("/simulator", function (req, res, next) {
  const recipe = { ...req.body };
  const user = req.session.currentUser;
  Recipe.create({ products: recipe, user: user })
    .then((recipe) => res.status(200).json(recipe))
    .catch(next);
});

router.get("/simulator/result/:id", function (req, res, next) {
  Recipe.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

module.exports = router;
