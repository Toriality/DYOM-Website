const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let userID = `new_user-${Math.random().toString(36).slice(-6)}`;
    let path = `./uploads/${userID}`;
    req.folder = userID;
    fs.mkdirSync(path, {recursive: true});
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, "avatar" + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

module.exports = { storage, upload };
