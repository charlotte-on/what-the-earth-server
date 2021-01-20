const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Companies = require("../models/Company");
const upload = require("../config/cloudinary");

const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        userDocument.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      req.session.currentUser = userDocument._id;
      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});

router.post("/signup", upload.single("image"), (req, res, next) => {
  const { image, email, password, firstName, lastName } = req.body;
  console.log(req.body);
  if (req.file) {
    req.body.image = req.file.path;
    console.log("toto");
  }

  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = {
        image: req.body.image,
        email,
        lastName,
        firstName,
        password: hashedPassword,
      };

      console.log(newUser);
      // res.sendStatus(200);
      User.create(newUser)
        .then((newUserDocument) => {
          /* Login on signup */
          req.session.currentUser = newUserDocument._id;
          res.redirect("/api/auth/isLoggedIn");
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/isLoggedIn", (req, res, next) => {
  const id = req.session.currentUser;
  if (!req.session.currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (req.session.producer) {
    Companies.findById(id)
      .select("-password")
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  } else {
    User.findById(id)
      .select("-password")
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

// http://localhost:4000/api/users/{some-id}/password
router.patch("/me/password", (req, res, next) => {
  const userId = req.session.currentUser;

  // get one specific user
  User.findById(userId).then((userDocument) => {
    // console.log(userDocument.password);
    // console.log(req.body);
    const isValidPassword = bcrypt.compareSync(
      req.body.old_password,
      userDocument.password
    );
    // console.log(isValidPassword);
    if (isValidPassword) {
      const hashedPassword = bcrypt.hashSync(req.body.new_password, salt);
      const newUser = {
        password: hashedPassword,
      };

      User.findByIdAndUpdate(userId, newUser, { new: true })
        .then((userDocument) => {
          res.status(200).json(userDocument);
        })
        .catch((error) => {
          next(error);
        });
    } else {
      res
        .status(400)
        .json({ message: "Error, the password has to be different" });
    }
  });
});

// confirmed where to put the route with Franck: user or path?

module.exports = router;
