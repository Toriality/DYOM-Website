const createStorage = require("../../middleware/upload");
const multer = require("multer");
const helpers = require("./projects.helpers");
const { checkErrors } = require("../helpers");
const Project = require("./projects.model");

function uploadFiles(req, res, next) {
  try {
    const { id } = req.user;
    const projectFolder = `new_project-${Math.random().toString(36).slice(-6)}`;

    const storage = createStorage(
      `./public/uploads/${id}/temp/${projectFolder}`,
      (file) => file.originalname
    );

    const upload = multer({ storage }).fields([
      { name: "file" },
      { name: "banner" },
      { name: "gallery" },
    ]);

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      } else {
        req.projectFolder = projectFolder;
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function validateUpdate(req, res, next) {
  const project = await Project.findById(req.params.id);
  if (project) {
    //req.oldProject = project;
    req.update = true;
    next();
  } else res.status(404).json({ msg: "Can't update: Project doesn't exists!" });
}

function validateProject(req, res, next) {
  try {
    const {
      title,
      summary,
      description,
      credits,
      original,
      trailer,
      motto,
      music,
      difficulty,
      mods,
    } = req.body;
    const file = req.files.file ? req.files.file[0] : null;
    const banner = req.files.banner ? req.files.banner[0] : null;
    const gallery = req.files?.gallery || [];
    const tags = req.body.tags.split(",").filter((empty) => empty !== "");
    if (!title || (!req.update && !file))
      return res
        .status(400)
        .json({ msg: "Please enter all the required fields." });

    const titleErrors = title ? helpers.checkTitle(title) : {};
    const fileErrors = file ? helpers.checkFile(file) : {};
    const bannerErrors = banner ? helpers.checkBanner(banner) : {};
    const galleryErrors = gallery ? helpers.checkGallery(gallery) : {};
    const summaryErrors = summary ? helpers.checkSummary(summary) : {};
    const descErrors = description ? helpers.checkDescription(description) : {};
    const creditsErrors = credits ? helpers.checkCredits(credits) : {};
    const tagsErrors = tags ? helpers.checkTags(tags) : {};
    const originalErrors = original ? helpers.checkOriginal(original) : {};
    const trailerErrors = trailer ? helpers.checkTrailer(trailer) : {};
    const mottoErrors = motto ? helpers.checkMotto(motto) : {};
    const musicErrors = music ? helpers.checkMusic(music) : {};
    const diffErrors = difficulty ? helpers.checkDifficulty(difficulty) : {};
    const modsErrors = mods ? helpers.checkMods(mods) : {};

    const errors = checkErrors({
      titleErrors,
      fileErrors,
      bannerErrors,
      galleryErrors,
      summaryErrors,
      descErrors,
      creditsErrors,
      tagsErrors,
      originalErrors,
      trailerErrors,
      mottoErrors,
      musicErrors,
      diffErrors,
      modsErrors,
    });

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // if (req.update) {
    //   if (req.body.tags) req.body.tags = req.body.tags.split(",");
    //   else req.body.tags = [];

    //   let newProject = {};
    //   Object.keys(req.body).forEach((element) => {
    //     if (req.oldProject[element] !== req.body[element]) {
    //       newProject[element] = req.body[element];
    //     }
    //   });
    //   res.status(400).json({ newProject });
    // }
    req.newProject = {
      type: req.body.type,
      title: req.body.title,
      author: req.user.id,
      summary: req.body.summary,
      description: req.body.description,
      banner: !!req.files.banner,
      gallery: !!req.files.gallery,
      trailer: req.body.trailer,
      credits: req.body.credits,
      tags: req.body.tags ? req.body.tags.split(",") : [],
      original: req.body.original,
      motto: req.body.motto,
      music: req.body.music,
      difficulty: req.body.difficulty,
      mods: req.body.mods,
      num: req.body.num,
    };
    req.tempPath = `./public/uploads/${req.user.id}/temp/${req.projectFolder}`;
    req.destPath = `./public/uploads/${req.user.id}/${req.body.type}s`;
    req.bannerPath = req.files.banner ? req.files.banner[0].originalname : null;
    req.galleryPath = req.files.gallery
      ? req.files.gallery.map((f) => f.originalname)
      : null;
    req.filePath = req.files.file ? req.files.file[0].originalname : null;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  uploadFiles,
  validateProject,
  validateUpdate,
};
