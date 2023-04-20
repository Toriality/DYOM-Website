const { createStorage, createFileFilter } = require("../../middleware/upload");
const multer = require("multer");
const helpers = require("./projects.helpers");
const { checkErrors, report } = require("../helpers");
const Project = require("./projects.model");
const crc = require("crc");
const fs = require("fs");

function uploadFiles(req, res, next) {
  try {
    const storage = createStorage();

    const fields = [];
    for (let i = 1; i <= 8; i++) {
      fields.push({
        name: `mission${i}_file`,
        extensions: [".dat"],
        mimetype: ["application/octet-stream"],
        maxCount: 1,
      });
      fields.push({ name: `mission${i}_sd`, maxCount: 105 });
    }
    fields.push({ name: "banner", maxCount: 1 });
    fields.push({ name: "gallery", maxCount: 5 });
    fields.push({ name: "modloader", maxCount: 100 });

    const fileFilter = createFileFilter(fields);

    const limits = {
      fileSize: 100 * 1024 * 1024, // 100MB
    };

    const upload = multer({ storage, fileFilter, limits }).fields(fields);

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      } else {
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function validateFiles(req, res, next) {
  const DYOM_NUM = 6;
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
  const MAX_BANNER_SIZE = 1 * 1024 * 1024; // 1MB
  const MAX_GALLERY_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_MODS_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_SD_SIZE = 2 * 1024 * 1024; // 2MB

  for (i = 1; i <= 8; i++) {
    const file = req.files[`mission${i}_file`]?.[0];
    const sdFiles = req.files[`mission${i}_sd`];

    // Check if DYOM mission file is valid
    if (file) {
      const fileData = fs.openSync(file.path, "r");
      const buf = Buffer.alloc(4);
      fs.readSync(fileData, buf, 0, 4, 0);
      const fileNum = buf.readUInt32LE(0);
      fs.closeSync(fileData);

      if (file.size > MAX_FILE_SIZE) {
        res.status(400).json({ msg: "File must be less than 1MB" });
      }

      if (fileNum !== DYOM_NUM) {
        res.status(400).json({ msg: "File must be a valid DYOM mission." });
      }
    }

    // Check SD files sizes
    if (sdFiles) {
      sdFiles.forEach((file) => {
        if (file.size > MAX_SD_SIZE) {
          res.status(400).json({ msg: "SD file must be less than 2MB" });
        }
      });
    }
  }

  // Other file size-related checks
  if (req.files.banner?.[0].size > MAX_BANNER_SIZE) {
    res.status(400).json({ msg: "Banner must be less than 1MB" });
  }
  if (req.files.gallery) {
    req.files.gallery.forEach((file) => {
      if (file.size > MAX_GALLERY_SIZE) {
        res.status(400).json({ msg: "Gallery file must be less than 5MB" });
      }
    });
  }
  if (req.files.modloader) {
    req.files.modloader.forEach((file) => {
      if (file.size > MAX_MODS_SIZE) {
        res.status(400).json({ msg: "Modloader file must be less than 2MB" });
      }
    });
  }

  next();
}

async function validateUpdate(req, res, next) {
  const project = await Project.findById(req.params.id);
  if (project) {
    req.update = true;
    next();
  } else res.status(404).json({ msg: "Can't update: Project doesn't exists!" });
}

function validateProject(req, res, next) {
  try {
    const author = req.user.id;
    const {
      type,
      title,
      summary,
      description,
      credits,
      trailer,
      motto,
      music,
      difficulty,
      mods,
    } = req.body;
    const tags = req.body.tags?.split(",").filter((empty) => empty !== "");

    const missions = [];
    for (let i = 1; i <= 8; i++) {
      const missionTitle = req.body[`mission${i}_title`];
      const missionFile = req.files[`mission${i}_file`]?.[0].filename;
      const missionSdFiles = [];
      if (req.files[`mission${i}_sd`]) {
        for (let j = 0; j < req.files[`mission${i}_sd`].length; j++) {
          missionSdFiles.push({
            filename: req.files[`mission${i}_sd`][j].originalname,
            file: req.files[`mission${i}_sd`][j].filename,
          });
        }
      }
      const missionSummary = req.body[`mission${i}_summary`];
      if (missionFile) {
        missions.push({
          title: missionTitle,
          file: missionFile,
          sd: missionSdFiles,
          summary: missionSummary,
        });
      }
    }

    console.log(title, missions.length);
    if (!title || (!req.update && !missions.length))
      return res.status(400).json({ msg: "Please enter all the required fields." });

    const titleErrors = title ? helpers.checkTitle(title) : {};
    const summaryErrors = summary ? helpers.checkSummary(summary) : {};
    const descErrors = description ? helpers.checkDescription(description) : {};
    const creditsErrors = credits ? helpers.checkCredits(credits) : {};
    const tagsErrors = tags ? helpers.checkTags(tags) : {};
    const trailerErrors = trailer ? helpers.checkTrailer(trailer) : {};
    const mottoErrors = motto ? helpers.checkMotto(motto) : {};
    const musicErrors = music ? helpers.checkMusic(music) : {};
    const diffErrors = difficulty ? helpers.checkDifficulty(difficulty) : {};
    const modsErrors = mods ? helpers.checkMods(mods) : {};

    const errors = checkErrors({
      titleErrors,
      summaryErrors,
      descErrors,
      creditsErrors,
      tagsErrors,
      trailerErrors,
      mottoErrors,
      musicErrors,
      diffErrors,
      modsErrors,
    });

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    req.newProject = {
      type,
      title,
      author,
      summary,
      description,
      missions,
      banner: req.files.banner?.[0].filename,
      gallery: req.files.gallery?.map((file) => file.filename),
      trailer,
      credits,
      tags,
      motto,
      music,
      difficulty,
      mods,
    };

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  uploadFiles,
  validateFiles,
  validateProject,
  validateUpdate,
};
