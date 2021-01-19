const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Companies = require("../models/Company");

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

router.post("/signup", (req, res, next) => {
  // , upload.single("image")
  const { email, password, firstName, lastName } = req.body; // image

  // const userId = req.session.currentUser;
  // if (req.file) {
  //   req.body.image = req.file.path;
  // how do I update this code for the signup??

  // User.findByIdAndUpdate(userId, req.body, { new: true })
  // how do I update this code for the signup??
  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = {
        //image
        email,
        lastName,
        firstName,
        password: hashedPassword,
      };

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

// http://localhost:4000/api/users/{some-id}
router.patch("/me/password", (req, res, next) => {
  const userId = req.session.currentUser;

  // get passwords
  // comparer ancien password avec actuel
  // if les 2 sont egaux update (statu 200)
  // else pas egaux "wrong password" (statu 400/500)

  // Update a specific passwrod
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
