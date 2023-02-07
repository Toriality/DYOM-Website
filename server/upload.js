const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.body.type;
    let path;
    let userID;
    switch (type) {
      case "register":
        userID = `new_user-${Math.random().toString(36).slice(-6)}`;
        req.folder = userID;
        path = `./uploads/${userID}`;
        break;
      case "mission":
        userID = req.user.id;
        path = `./uploads/${userID}/${type}/uploading`;
        break;
      default:
        return;
    }
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

module.exports = { storage, upload };
