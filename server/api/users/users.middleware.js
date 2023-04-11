const createStorage = require("../../middleware/upload");
const multer = require("multer");
const helpers = require("./users.helpers");
const { checkErrors } = require("../helpers");

// Use this middleware to create the newly registered user's profile image
function uploadAvatar(req, res, next) {
  try {
    const user = `new_user-${Math.random().toString(36).slice(-6)}`;
    const folder = `./public/uploads/${user}`;

    const storage = createStorage(folder, (file) => file.originalname);

    const upload = multer({ storage }).single("image");

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      } else {
        req.userFolder = folder;
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

// Use this middleware to validate the user's registration form
async function validateRegister(req, res, next) {
  try {
    const { username, password, email, location, aboutMe } = req.body;
    const image = req.files ? req.files.image[0] : null;

    if (!username || !password || !email)
      return res
        .status(400)
        .json({ msg: "Please enter all the required fields." });

    const usernameErrors = username
      ? helpers.checkUsername("register", username)
      : {};
    const passwordErrors = password
      ? helpers.checkPassword("register", password)
      : {};
    const emailErrors = email ? helpers.checkEmail(email) : {};
    const locationErrors = location ? helpers.checkLocation(location) : {};
    const aboutMeErrors = aboutMe ? helpers.checkAboutMe(aboutMe) : {};
    const imageErrors = image ? helpers.checkImage(image) : {};

    const errors = checkErrors({
      usernameErrors,
      passwordErrors,
      emailErrors,
      locationErrors,
      aboutMeErrors,
      imageErrors,
    });

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    req.newUser = {
      username,
      password,
      email,
      location,
      aboutMe,
      hasImage: !!image,
    };
    req.tempPath = req.userFolder;
    req.destPath = `./public/uploads`;
    req.imagePath = image ? image.originalname : null;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function validateLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ msg: "Please enter all the required fields." });

    const userFound = await helpers.getUserFound(username);

    const usernameErrors = await helpers.checkUsername(
      "login",
      username,
      userFound
    );

    // Only check these errors if the user was found, otherwise there is no need to check
    const passwordErrors = userFound
      ? await helpers.checkPassword("login", password, userFound)
      : {};

    const errors = checkErrors({ usernameErrors, passwordErrors });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    req.userFound = userFound;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { uploadAvatar, validateRegister, validateLogin };
