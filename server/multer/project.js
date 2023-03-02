const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    userID = req.user.id;
    type = req.body.type;
    path = `./uploads/${userID}/${type}s/uploading`;
    fs.mkdirSync(path, {recursive: true});
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

module.exports = { storage, upload };
