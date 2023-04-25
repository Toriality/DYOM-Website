const { generateJWT } = require("./users.helpers");
const bcrypt = require("bcrypt");
const fs = require("fs");
const User = require("./users.model");

// Get a list of all registered users
exports.listUsers = async (req, res) => {
  try {
    const role = req.query.role;
    const id = req.query.id;
    const name = new RegExp(req.query.name, "i");
    const email = req.query.email;
    const filter = {
      ...(role && { role }),
      ...(id && { _id: id }),
      ...(name && { username: name }),
      ...(email && { email }),
    };
    const totalUsers = await User.countDocuments(filter);
    const resultsPerPage = req.query.limit || 20;
    const numberOfPages = Math.ceil(totalUsers / resultsPerPage);
    const page = Math.min(req.query.page, numberOfPages) || 1;

    const select = ["_id", "username", "email", "role"];

    const users = await User.find(filter)
      .select(select)
      .limit(resultsPerPage)
      .skip(resultsPerPage * (page - 1))
      .sort({ updatedAt: "desc" });

    res.json({ users, totalUsers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get information on a specific user
exports.getUser = async (req, res) => {
  try {
    // Populate the projects collection with the following fields:
    const populate = ["title", "updatedAt", "downloads", "views", "ratings", "comments"];

    // Return the user based on their id
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate({ path: "projects", populate: populate });

    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get information of logged user
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ error: "Please enter all the required fields." });

    const user = await User.findOne({
      password: req.body.password,
      email: req.body.email,
    });

    if (!user)
      return res.status(400).json({ error: "Invalid email and password combination" });

    // Generate JWT token
    const token = generateJWT(user);
    res.json({ token, user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle user registration
exports.register = async (req, res) => {
  try {
    // Configure hash and salt
    let hash;
    try {
      const salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(req.newUser.password, salt);
    } catch (e) {
      throw new Error(`Error configuring hash and/or salt - ${e}`);
    }
    req.newUser.password = hash;

    const user = await User.create(req.newUser);

    // Sign JWT token and return
    try {
      const token = generateJWT(user);
      res.json({ token, user });
    } catch (e) {
      throw new Error(`Error signing JWT token - ${e}`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = exports;
