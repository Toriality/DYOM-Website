const fs = require("fs");
const crc = require("crc");
const ip = require("ip");
const archiver = require("archiver");

//TODO: Remove function
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

/**
 * Move files to a specified directory.
 *
 * @param {Array<{name: string | Array<string>, to: string}>} files - The files to move.
 * @returns {Promise<void>}
 */
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

/**
 * Removes files from the './public/uploads' directory.
 * @async
 * @param {Array<{name: string | Array<string>, at: string}>} files - An array of objects
 * with 'name' and 'at' properties. 'name' can be a string or an array of strings,
 * and 'at' is a string representing a subdirectory of the './public/uploads' directory.
 * @returns {Promise<void>} - A promise that resolves when all files have been removed.
 */
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

/**
 * Create a zip archive of given files and append additional content if provided.
 * @async
 * @param {Object[]} files - List of files to be included in the archive.
 * @param {string} files[].name - Name of the file.
 * @param {string} files[].type - Type of the file
 * @param {string} files[].dest - Destination directory for the file in the archive.
 * @param {Object} [append] - Optional additional content to append to the archive.
 * @param {string} append.content - Content to append to the archive.
 * @param {string} append.name - Name of the appended content in the archive.
 * @returns {string} - Path to the created archive.
 */
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

/**
 * Generates a README file content based on the given object.
 * @param {Object} obj - The object containing information about the project/mission.
 * @returns {string} - The generated README file content.
 */
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
  moveFiles,
  removeFiles,
  createArchive,
  createReadMe,
};
