const fs = require("fs");
const crc = require("crc");
const ip = require("ip");

function checkErrors(errors) {
  Object.keys(errors).forEach((key) => {
    const error = errors[key];
    Object.keys(error).forEach((errorKey) => {
      if (error[errorKey].valid) {
        delete error[errorKey];
      }
    });
    if (Object.keys(error).length === 0) {
      delete errors[key];
    }
  });

  const errorsArray = Object.values(errors)
    .flatMap((obj) => Object.values(obj))
    .map((obj) => obj.msg);
  return errorsArray;
}

function generateCRC(filePath) {
  const file = fs.readFileSync(filePath);
  const crc = crc.crc32(file);
  return crc;
}

async function moveFiles(files) {
  files.forEach(({ name, to }) => {
    const names = Array.isArray(name) ? name : [name];

    names.forEach((file) => {
      if (!file) return;

      console.log("moveFiles", file);

      const src = `./public/uploads/temp/${file}`;
      const dest = `./public/uploads//${to}/${file}`;

      if (fs.existsSync(dest))
        if (fs.existsSync(src)) fs.unlinkSync(src);
        else return;
      else fs.renameSync(src, dest);
    });
  });
}

module.exports = {
  checkErrors,
  generateCRC,
  moveFiles,
};
