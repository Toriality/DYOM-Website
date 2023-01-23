const router = require("express").Router();
const multer = require("multer");

// Create storage location and filename settings
function createStorage(folder, filetype) {
  // Get current date & time numbers
  const currentTime = new Date().toLocaleString().replace(/\D/g, "");
  // Create storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/" + folder);
    },
    filename: (req, file, cb) => {
      cb(null, currentTime + "-" + file.originalname);
    },
  });
  return storage;
}

// Create upload method
function createUpload(name, storage) {
  const upload = multer({ storage: storage }).single(name);
  return upload;
}

module.exports = { createUpload, createStorage };
