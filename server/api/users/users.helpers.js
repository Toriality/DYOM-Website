const User = require("./users.model");
const utils = require("./users.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Compare password input with found user's hashed password
async function doPasswordsMatch(password, userFoundPassword) {
  return await bcrypt.compare(password, userFoundPassword);
}

function generateJWT(user) {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      hasAvatar: user.hasAvatar,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "20d",
    }
  );

  return token;
}

async function getUserFound(username) {
  const userRegex = new RegExp(`^${username}$`, "i");
  const userFound = await User.findOne({
    username: { $regex: userRegex },
  });
  return userFound;
}

async function checkUsername(username) {
  if (!username) return [];

  const validRegex = /^[a-zA-Z0-9_]{3,20}$/.test(username);
  const isForbidden = username === "admin";
  const isTaken = await User.findOne({ username });

  return [
    !validRegex &&
      "Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.",
    isForbidden && "Username is forbidden.",
    isTaken && "Username is already taken.",
  ];
}

async function checkPassword(password) {
  if (!password) return [];

  const validRegex = /^(?=.*\d).{8,}$/.test(password);

  return [!validRegex && "Password must be between 8 and 32 characters."];
}

async function checkEmail(email) {
  if (!email) return [];

  const validRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const isTaken = await User.findOne({ email });

  return [
    !validRegex && "Email must be a valid email address.",
    isTaken && "Email is already taken.",
  ];
}

function checkLocation(location) {
  if (!location) return [];

  const validRegex = /^[a-zA-Z0-9_]{0,24}$/.test(location);

  return [!validRegex && "Location must be between 0 and 24 characters."];
}

function checkAboutMe(aboutMe) {
  if (!aboutMe) return [];

  const validRegex = /^.{0,1000}$/.test(aboutMe);

  return [!validRegex && "About me must be between 0 and 1000 characters."];
}

function checkAvatar(avatar) {
  if (!avatar) return [];

  const validSize = avatar.size <= 1 * 1024 * 1024;

  return [!validSize && "Avatar must be less than 1MB."];
}

module.exports = {
  generateJWT,
  getUserFound,
  checkUsername,
  checkPassword,
  checkEmail,
  checkLocation,
  checkAboutMe,
  checkAvatar,
};
