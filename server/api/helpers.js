const fs = require("fs");
const crc = require("crc");
const ip = require("ip");
const archiver = require("archiver");

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

async function removeFiles(files) {
  files.forEach(({ name, at }) => {
    const names = Array.isArray(name) ? name : [name];

    names.forEach((file) => {
      if (!file) return;
      const src = `./public/uploads/${at}/${file}`;
      if (fs.existsSync(src)) fs.unlinkSync(src);
    });
  });
}

async function createArchive(files, append) {
  const archive = archiver("zip");
  const randomId = Math.random().toString(36).substring(2);
  const tempFile = `${Date.now()}_${randomId}.zip`;
  const output = fs.createWriteStream(`./public/uploads/temp/${tempFile}`);

  await new Promise((resolve, reject) => {
    output.on("error", reject);
    output.on("close", resolve);
    archive.pipe(output);

    files.forEach(({ name, type, dest }) => {
      archive.file(`./public/uploads/${type}/${name}`, { name: dest });
    });

    if (append) {
      archive.append(append.content, { name: append.name });
    }

    archive.finalize();
  });

  return `./public/uploads/temp/${tempFile}`;
}

const createReadMe = (obj) => {
  let header;
  let content = [];

  if (obj.type !== undefined) {
    header = `# ${obj.title.toUpperCase()}\n# By ${
      obj.project.author.username
    }\n\n------------`;

    switch (obj.type) {
      case 0: {
        content.push(
          `- Extract the .dat file into My Documents/GTA San Andreas User Files`
        );
        break;
      }
      case 1: {
        content.push(
          `- Extract all the .dat files into My Documents/GTA San Andreas User Files`
        );
        break;
      }
      case 2: {
        content.push(
          `- Extract the DSL folder into My Documents/GTA San Andreas User Files`
        );
        break;
      }
    }
    if (obj.missions.some((mission) => mission.sd.length > 0)) {
      content.push(
        `- Extract the SD folder into My Documents/GTA San Andreas User Files`
      );
    }
    if (obj.modloader.length > 0) {
      content.push(
        `- Extract the modloader folder into your GTA San Andreas root directory (Normally located at C:/Program Files (x86)/Rockstar Games/GTA San Andreas/)`
      );
    }
    return `${header}\n\n${content.join("\n")}`;
  }

  header = `# ${obj.title.toUpperCase()}\n# By ${
    obj.project.author.username
  }\n\n------------`;
  content.push(`- Extract the .dat file into My Documents/GTA San Andreas User Files`);
  if (obj.sd.length > 0) {
    content.push(`- Extract the SD folder into My Documents/GTA San Andreas User Files`);
  }
  if (obj.project.modloader.length > 0) {
    content.push(
      `- Extract the modloader folder into your GTA San Andreas root directory (Normally located at C:/Program Files (x86)/Rockstar Games/GTA San Andreas/)`
    );
  }
  return `${header}\n\n${content.join("\n")}`;
};

module.exports = {
  checkErrors,
  generateCRC,
  moveFiles,
  removeFiles,
  createArchive,
  createReadMe,
};
