const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");

router.post("/", requireAuth, (req, res, next) => {
  const comment = { ...req.body };
  comment.userId = req.session.currentUser;
  Comments.create(comment)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Comments.find({ producerId: req.params.id })
    .populate("userId", "-password")
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch(next);
});

module.exports = router;
