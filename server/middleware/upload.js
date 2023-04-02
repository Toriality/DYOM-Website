const multer = require("multer");
const fs = require("fs");

function createStorage(destinationPath, filenameFn) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(destinationPath, { recursive: true });
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, filenameFn(file));
    },
  });

  return storage;
}

module.exports = createStorage;
