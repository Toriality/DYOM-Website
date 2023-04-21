const { createStorage, createFileFilter } = require("../../middleware/upload");
const multer = require("multer");
const helpers = require("./projects.helpers");
const Project = require("./projects.model");
const { removeFiles } = require("../helpers");

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
        return res
          .status(500)
          .json({ error: "Something went wrong while uploading the files" });
      } else {
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function validateFiles(req, res, next) {
  const files = [];
  const sdFiles = [];
  for (let i = 1; i <= 8; i++) {
    const file = req.files[`mission${i}_file`]?.[0];
    const sd = req.files[`mission${i}_sd`];
    if (sd) sdFiles.push(...sd);
    if (file) files.push(file);
  }

  const errors = [
    helpers.checkFiles(files),
    helpers.checkSD(sdFiles),
    helpers.checkBanner(req.files.banner?.[0]),
    helpers.checkGallery(req.files.gallery),
  ]
    .flatMap((x) => x)
    .filter(Boolean);

  if (errors.length > 0) {
    removeFiles([{ name: req.crc, at: "temp" }]);
    return res.status(400).json({ error: "Bad files request", errors: errors });
  }

  next();
}

function validateProject(req, res, next) {
  try {
    const missions = [];
    for (let i = 1; i <= 8; i++) {
      const missionSlot = req.body[`mission${i}_slot`];
      const missionTitle = req.body[`mission${i}_title`];
      const missionSummary = req.body[`mission${i}_summary`];
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
      if (missionFile) {
        missions.push({
          slot: missionSlot,
          title: missionTitle,
          file: missionFile,
          sd: missionSdFiles,
          summary: missionSummary,
        });
      }
    }

    if (!req.body.title || (!req.update && !missions.length))
      return res.status(400).json({ error: "Please enter all the required fields." });

    req.body.tags = req.body.tags?.split(",").filter((empty) => empty !== "");

    const errors = [
      helpers.checkTitle(req.body.title),
      helpers.checkSummary(req.body.summary),
      helpers.checkDescription(req.body.description),
      helpers.checkCredits(req.body.credits),
      helpers.checkTags(req.body.tags),
      helpers.checkTrailer(req.body.trailer),
      helpers.checkMotto(req.body.motto),
      helpers.checkMusic(req.body.music),
      helpers.checkDifficulty(req.body.difficulty),
      helpers.checkMods(req.body.mods),
    ]
      .flatMap((x) => x)
      .filter(Boolean);

    if (errors.length > 0) {
      return res.status(400).json({ error: "Bad request", errors: errors });
    }

    req.newProject = {
      type: req.body.type,
      title: req.body.title,
      author: req.user.id,
      summary: req.body.summary,
      description: req.body.description,
      banner: req.files.banner?.[0].filename,
      gallery: req.files.gallery?.map((file) => file.filename),
      trailer: req.body.trailer,
      credits: req.body.credits,
      tags: req.body.tags,
      motto: req.body.motto,
      music: req.body.music,
      difficulty: req.body.difficulty,
      mods: req.body.mods,
    };

    req.newMissions = missions;

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error on validating project form" });
  }
}

module.exports = {
  uploadFiles,
  validateFiles,
  validateProject,
};
