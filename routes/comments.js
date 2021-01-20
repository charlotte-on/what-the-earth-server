const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");

// router.get("/", (req, res, next) => {
//   Comments.find()
//     .then((apiResponse) => {
//       console.log(apiResponse);
//       res.status(200).json(apiResponse);
//     })
//     .catch(next);
// });

router.post("/", (req, res, next) => {
  const comment = { ...req.body };
  comment.userId = req.session.currentUser;
  Comments.create(comment)
    .then((apiResponse) => {
      res.status(200).json(apiResponse);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Comments.find({ producerId: req.params.id })
    .populate("userId", "-password")
    .then((apiResponse) => {
      res.status(200).json(apiResponse);
    })
    .catch(next);
});

module.exports = router;
