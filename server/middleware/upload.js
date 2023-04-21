const multer = require("multer");
const fs = require("fs");
const crc = require("crc");

/**
 * Creates a disk storage engine for multer to store uploaded files.
 * @return {Object} Multer disk storage engine.
 */
function createStorage() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync("./public/uploads/temp", { recursive: true });
      cb(null, "./public/uploads/temp");
    },
    filename: function (req, file, cb) {
      const random = Math.random().toString(16).substring(2);
      const date = Date.now().toString(16);
      cb(null, `${random}-${date}-${file.originalname}`);
    },
  });

  return storage;
}

/**
 * Creates a filter function for validating file uploads based on specified fields.
 * @param {Array} fields - An array of field objects with name, extensions, and/or mimetypes properties.
 * @returns {Function} - A function that filters file uploads based on the specified fields.
 */
function createFileFilter(fields) {
  return (req, file, cb) => {
    const fileExtension = "." + file.originalname.split(".").pop().toLowerCase();
    const field = fields.find((field) => field.name === file.fieldname);
    const anyMimetype = field.mimetype === undefined;
    const anyExtension = field.extensions === undefined;

    if (!anyExtension && field.extensions.indexOf(fileExtension) === -1) {
      cb(new Error(`File extension must be ${field.extensions} for ${file.fieldname}`));
    } else if (!anyMimetype && field.mimetype.indexOf(file.mimetype) === -1) {
      cb(new Error(`File type must be ${field.mimetype} for ${file.fieldname}`));
    } else {
      cb(null, true);
    }
  };
}

/**
 * Calculates the CRC32 checksum for each file in the request and renames the file with the checksum value.
 */
function makeCRC(req, res, next) {
  req.crc = [];
  for (const field in req.files) {
    const files = req.files[field];
    for (const file of files) {
      const path = file.path;
      const contents = fs.readFileSync(path);
      const crcValue = crc.crc32(contents).toString();
      const crcPath = file.path.substring(0, file.path.lastIndexOf("\\") + 1) + crcValue;
      fs.renameSync(path, crcPath);
      file.path = crcPath;
      file.filename = crcValue;
      req.crc.push(crcValue);
    }
  }
  next();
}

module.exports = { createStorage, createFileFilter, makeCRC };
