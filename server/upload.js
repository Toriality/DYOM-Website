const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userID = req.user.id;
    const type = req.body.type;
    const path = `./uploads/${userID}/${type}/uploading`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

module.exports = { storage, upload };
