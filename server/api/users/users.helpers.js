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

async function checkUsername(type, username, userFound) {
  switch (type) {
    case "login":
      return {
        found: {
          valid: userFound !== null,
          msg: "This user was not found in the DYOM website database.",
        },
      };
    case "register":
      return {
        regex: {
          valid: /^[a-zA-Z0-9_]{3,20}$/.test(username),
          msg: "Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.",
        },
        taken: {
          valid: userFound === null,
          msg: "Username is already taken by another user.",
        },
        forbidden: {
          valid: username !== "admin",
          msg: "Username is forbidden.",
        },
      };
  }
}

async function checkPassword(type, password, userFound) {
  switch (type) {
    case "login":
      return {
        match: {
          valid: await doPasswordsMatch(password, userFound.password),
          msg: "Username and password combination doesn't match.",
        },
      };
    case "register":
      return {
        regex: {
          valid: /^(?=.*\d).{8,}$/.test(password),
          msg: "Password must be between 8 and 20 characters and must contain at least one uppercase letter, one lowercase letter, and one number.",
        },
      };
  }
}

async function checkEmail(email) {
  const users = await User.find({});
  return {
    regex: {
      valid:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        ),
      msg: "Email must be a valid email address.",
    },
    taken: {
      valid: users.some((user) => user.email === email),
      msg: "Email is already taken by another user.",
    },
  };
}

function checkLocation(location) {
  return {
    regex: {
      valid: /^[a-zA-Z0-9_]{0,24}$/.test(location),
      msg: "Location must be between 0 and 24 characters.",
    },
  };
}

function checkAboutMe(aboutMe) {
  return {
    regex: {
      valid: /^.{0,1000}$/.test(aboutMe),
      msg: "About me must be between 0 and 1000 characters.",
    },
  };
}

function checkImage(image) {
  const maxSize = 1 * 1024 * 1024;
  const name = image.filename;
  const size = image.size;
  return {
    regex: {
      valid: name.endsWith(".png") || name.endsWith(".jpg"),
      msg: "Profile image must be a .png or .jpg file",
    },
    size: {
      valid: size <= maxSize,
      msg: "Banner must be less than 1MB",
    },
  };
}

module.exports = {
  generateJWT,
  getUserFound,
  checkUsername,
  checkPassword,
  checkEmail,
  checkLocation,
  checkAboutMe,
  checkImage,
};
