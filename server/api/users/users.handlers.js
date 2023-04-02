const { generateJWT } = require("./users.helpers");
const bcrypt = require("bcrypt");
const User = require("./users.model");

// Get a list of all registered users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("_id username");
    res.json(users);
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
      .select("-password -email")
      .populate({ path: "projects", populate: populateSelection })
      .then((user) => {
        res.json(user);
      });

    res.json(user);
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
    const { username, password, email, location, aboutMe } = req.body;
    let hash, user;

    // Check if avatar were uploaded
    // TODO: Check on React website if this works
    const hasAvatar = !!req.file;

    // Configure hash and salt
    try {
      const salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(password, salt);
    } catch (e) {
      throw new Error(`Error configuring hash and/or salt - ${e}`);
    }

    // Save user to the database
    try {
      const newUser = new User({
        username,
        password: hash,
        email,
        location,
        aboutMe,
        hasAvatar,
      });
      user = await newUser.save();
    } catch (e) {
      throw new Error(`Error saving user to DB - ${e}`);
    }

    // Move avatar from temp folder to this user's folder
    try {
      if (hasAvatar) {
        await fs.rename(`./uploads/${req.folder}`, `./uploads/${user._id}/`);
      }
    } catch (e) {
      throw new Error(`Error moving avatar from temp folder - ${e}`);
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
