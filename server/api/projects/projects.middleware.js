const createStorage = require("../../middleware/upload");
const multer = require("multer");
const helpers = require("./projects.helpers");
const { checkErrors } = require("../helpers");

function uploadProject(req, res, next) {
  const storage = createStorage(
    `./public/uploads/${req.user._id}/${req.body.type}s/uploading`,
    (file) => file.originalname
  );

  const upload = multer({ storage }).fields([
    { name: "file", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    } else {
      next();
    }
  });
}

function validateProject(req, res, next) {
  try {
    const { title, summary, description, credits, original } = req.body;
    const { file, banner } = req.files;
    const gallery = req.files.gallery || [];
    const tags = req.body.tags.split(",").filter((empty) => empty !== "");

    if (!title || !file)
      return res
        .status(400)
        .json({ msg: "Please enter all the required fields." });

    const titleErrors = helpers.checkTitle(title);
    const fileErrors = helpers.checkFile(file);
    const bannerErrors = banner ? helpers.checkBanner(banner) : {};
    const galleryErrors = gallery ? helpers.checkGallery(gallery) : {};
    const summaryErrors = summary ? helpers.checkSummary(summary) : {};
    const descErrors = description ? helpers.checkDescription(description) : {};
    const creditsErrors = credits ? helpers.checkCredits(credits) : {};
    const tagsErrors = tags ? helpers.checkTags(tags) : {};
    const originalErrors = original ? helpers.checkOriginal(original) : {};

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
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { uploadProject, validateProject };
