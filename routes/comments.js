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

router.delete("/delete/:id", (req, res, next) => {
  Comments.findById(req.params.id)
    .then((itemDocument) => {
      if (!itemDocument) {
        return res.status(404).json({ message: "Item not found" });
      }
      if (itemDocument.userId.toString() !== req.session.currentUser) {
        return res.status(403).json({ message: "You can't delete this item" });
      }

      Comments.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
