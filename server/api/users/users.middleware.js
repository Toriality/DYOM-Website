const createStorage = require("../../middleware/upload");
const multer = require("multer");
const helpers = require("./users.helpers");
const { checkErrors, removeFiles } = require("../helpers");

// Use this middleware to create the newly registered user's profile image
function uploadAvatar(req, res, next) {
  try {
    const storage = createStorage(folder, (file) => file.originalname);

    const fields = [{ name: "avatar", maxCount: 1 }];

    const fileFilter = createFileFilter(fields);

    const limits = {
      fileSize: 1 * 1024 * 1024, // 1MB
    };

    const upload = multer({ storage, fileFilter, limits }).single("avatar");

    upload(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Something went wrong while uploading user avatar" });
      } else {
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function validateAvatarFile(req, res, next) {
  const file = req.files?.["avatar"]?.[0];
  if (file) {
    const errors = [helpers.checkAvatar(file)].flatMap((x) => x).filter(Boolean);
    if (errors.length > 0) {
      removeFiles([{ name: req.crc, at: "temp" }]);
      return res.status(400).json(errors);
    }
  }
  next();
}

async function validateRegister(req, res, next) {
  try {
    if (!req.body.username || !req.body.password || !req.body.email)
      return res.status(400).json({ msg: "Please enter all the required fields." });

    const errors = [
      helpers.checkUsername(req.body.username),
      helpers.checkPassword(req.body.password),
      helpers.checkEmail(req.body.email),
      helpers.checkLocation(req.body.location),
      helpers.checkAboutMe(req.body.aboutMe),
    ]
      .flatMap((x) => x)
      .filter(Boolean);

    if (errors.length > 0) {
      return res.status(400).json({ error: "Bad request", errors: errors });
    }

    req.newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      avatar: req.files.avatar?.[0].filename,
      location: req.body.location,
      aboutMe: req.body.aboutMe,
    };

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { uploadAvatar, validateAvatarFile, validateRegister };
