const express = require("express");
const router = express.Router();
const User = require("../models/User");

// http://localhost:4000/api/users
router.get("/", (req, res, next) => {
  // Get all the users
  User.find()
    .then((userDocuments) => {
      res.status(200).json(userDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/users/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific user
  User.findById(req.params.id)
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/users/{some-id}
router.patch("/:id", (req, res, next) => {
  // Update a specific user
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/users
router.post("/", (req, res, next) => {
  // Create a user
  User.create(req.body)
    .then((userDocument) => {
      res.status(201).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/users/{some-id}
router.delete("/:id", (req, res, next) => {
  // Deletes a user
  User.findByIdAndRemove(req.params.id)
    .then((userDocument) => {
      res.status(204).json({
        message: "User deleted",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
