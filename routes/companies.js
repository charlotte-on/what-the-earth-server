const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Companies = require("../models/Company");

const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  Companies.findOne({ email })
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
      res.redirect("/api/companies/isLoggedIn");
    })
    .catch(next);
});

router.post("/signup", (req, res, next) => {
  const {
    email,
    password,
    companyName,
    producerName,
    phoneNumber,
    schedule,
    field,
    description,
  } = req.body;

  Companies.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newCompany = {
        email,
        password: hashedPassword,
        companyName,
        producerName,
        phoneNumber,
        schedule,
        field,
        description,
      };

      Companies.create(newCompany)
        .then((newUserDocument) => {
          /* Login on signup */
          req.session.currentUser = newUserDocument._id;
          res.redirect("/api/companies/isLoggedIn");
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/isLoggedIn", (req, res, next) => {
  if (!req.session.currentUser)
    return res.status(401).json({ message: "Unauthorized" });

  const id = req.session.currentUser;

  Companies.findById(id)
    .select("-password")
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

module.exports = router;
