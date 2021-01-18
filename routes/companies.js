const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Companies = require("../models/Company");

const salt = 10;

router.get("/", (req, res, next) => {
  Companies.find()
    .then((companiesDocument) => {
      res.status(200).json(companiesDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  Companies.findById(req.params.id)
    .select("-password")
    .then((companiesDocument) => {
      res.status(200).json(companiesDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/edit/:id", (req, res, next) => {
  Companies.findById(req.params.id)
    .select("-password")
    .then((companiesDocument) => {
      res.status(200).json(companiesDocument);
    })
    .catch((error) => {
      next(error);
    });
});

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
      req.session.producer = true;
      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});

router.post("/signup", (req, res, next) => {
  const {
    email,
    password,
    companyName,
    producerFirstName,
    producerLastName,
    phoneNumber,
    schedule,
    field,
    description,
    location,
    formattedAddress,
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
        producerFirstName,
        producerLastName,
        phoneNumber,
        schedule,
        field,
        description,
        location,
        formattedAddress,
      };

      Companies.create(newCompany)
        .then((newUserDocument) => {
          /* Login on signup */
          req.session.currentUser = newUserDocument._id;
          res.redirect("/api/auth/isLoggedIn");
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
