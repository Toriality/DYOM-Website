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
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get information on a specific user
exports.getUser = async (req, res) => {
  try {
    // Populate the projects collection with the following fields:
    const populateSelection = [
      "title",
      "updatedAt",
      "downloads",
      "views",
      "ratings",
      "comments",
    ];

    // Return the user based on their id
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate({ path: "projects", populate: populateSelection });

    // loop through files inside project folder
    const userPath = `./public/uploads/${user._id}`;
    const userFiles = {
      image: null,
    };
    const files = fs.readdirSync(userPath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${userPath}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        if (file.endsWith(".png") || file.endsWith(".jpg")) userFiles.image = file;
      }
    }
    res.json({ user, userFiles });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get information of logged user
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { userFound } = req;
    // Generate JWT token
    const token = generateJWT(userFound);
    res.json({ token, userFound });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
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

    if (req.imagePath)
      fs.renameSync(`${req.tempPath}/avatar.${req.imagePath.split(".").pop()}`);
    if (!fs.existsSync(`${req.destPath}/${user._id}`)) {
      if (fs.existsSync(req.tempPath)) {
        fs.renameSync(req.tempPath, `${req.destPath}/${user._id}/`);
      } else {
        fs.mkdirSync(`${req.destPath}/${user._id}`, { recursive: true });
      }
    }

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

// Edit a user's profile
exports.updateUser = async (req, res) => {
  try {
    // Convert req.user.id (number) to string since req.params.id is a string
    const userID = req.user.id.toString();

    // Unauthorized access if user wants to update another user's profile
    if (userID !== req.params.id) {
      return res.status(403).json({ msg: "Unauthorized access." });
    }

    // Get variables from req
    const { location, aboutMe, shouldRemoveAvatar } = req.body;
    const userHasAvatar = req.user.hasAvatar;
    const hasAvatar = !!req.file;

    // Update user
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          location,
          aboutMe,
          // TODO: Test on React website
          // If shouldRemoveAvatar is true, return false
          // If shouldRemoveAvatar is false and user has avatar or input has avatar, return true
          hasAvatar: !shouldRemoveAvatar && (userHasAvatar || hasAvatar),
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (e) {
      throw new Error(`Error updating user - ${e}`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = exports;
