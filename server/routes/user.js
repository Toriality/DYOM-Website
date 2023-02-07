const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();
const User = require("../models/User");
const { upload } = require("../multer/register");
const fs = require("fs");

// Get list of users
router.get("/", (req, res) => {
  User.find({})
    .select("-_id username")
    .then((user) => res.json(user));
});

// Login user
router.post("/login", (req, res) => {
  const { password } = req.body;
  let username;
  const displayname = req.body.username;
  try {
    username = displayname.toLowerCase();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: e });
  }

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check if user exists and complete login
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user)
      return res
        .status(400)
        .json({ msg: "The user you inserted does not exixts!" });

    // Validate the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Invalid username/password combination!" });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "20d" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            data: {
              id: user.id,
              username: user.username,
            },
          });
        }
      );
    });
  });
});

// Register new user
router.post("/register", upload.single("image"), (req, res) => {
  const { password, email, location, aboutme } = req.body;
  let username;
  const displayname = req.body.username;
  try {
    username = displayname.toLowerCase();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: e });
  }

  // Simple validation
  if (!username || !password || !email) {
    return res.status(400).json({
      msg: "Please enter all the required fields.",
    });
  }

  // Check if user exists and complete registration
  User.findOne({ username }).then((user) => {
    // Check for existing user
    if (user)
      return res
        .status(400)
        .json({ msg: "User already exists! Try another name." });

    // If user doesn't exist, continue registration
    const newUser = new User({
      username,
      password,
      email,
      location,
      aboutme,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // Store hash in your password DB
        newUser.password = hash;
        newUser.save((error, user) => {
          fs.rename(
            `./uploads/${req.folder}`,
            `./uploads/${user._id}/`,
            (err) => {
              if (err) console.log(err);
            }
          );
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "20d" },
            (err, token) => {
              if (err) throw err;
              res.json({ token, user });
            }
          );
        });
      });
    });
  });
});

// Get user data
router.get("/profile", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
