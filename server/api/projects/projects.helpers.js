const cron = require("node-cron");
const Project = require("./projects.model");
const utils = require("./projects.utils");

function resetWeekViews() {
  Project.updateMany({}, { $set: { weekViews: 0 } })
    .then(() => {
      console.log("Week Views has been reset");
    })
    .catch((err) => console.log(err));
}

// Reset week views of all projects every week
function startTrending() {
  cron.schedule(
    // (debug) "*/5 * * * * *",
    "0 0 * * 0",
    () => {
      resetWeekViews();
    },
    {
      scheduled: true,
      timezone: "America/Los_Angeles",
    }
  );
  console.log("Week Views cron job has been started");
}

function checkTitle(title) {
  return {
    regex: {
      valid: utils.isTitleValid(title),
      msg: "Title must be between 3 and 50 characters",
    },
    links: {
      valid: utils.doesContainLinks(title),
      msg: "Title can't contain links",
    },
  };
}

function checkFile(file) {
  return {
    regex: {
      valid: utils.isFileNameValid(file),
      msg: "File must be a .rar, .zip or a valid DYOM.dat file",
    },
    size: {
      valid: utils.isFileSizeValid(file),
      msg: "File must be less than 8MB",
    },
  };
}

function checkBanner(banner) {
  return {
    regex: {
      valid: utils.isBannerValid(banner),
      msg: "Banner must be a .png or .jpg file",
    },
    size: {
      valid: utils.isBannerSizeValid(banner),
      msg: "Banner must be less than 2MB",
    },
  };
}

function checkGallery(gallery) {
  return {
    regex: {
      valid: utils.isGalleryValid(gallery),
      msg: "Gallery files must be .png or .jpg",
    },
    size: {
      valid: utils.isGallerySizeValid(gallery),
      msg: "Gallery files must be less than 2MB",
    },
    amount: {
      valid: utils.isGalleryAmountValid(gallery),
      msg: "You cannot upload more than 5 images on gallery",
    },
  };
}

function checkSummary(summary) {
  return {
    size: {
      valid: utils.isSummarySizeValid(summary),
      msg: "Summary can't be longer than 100 characters",
    },
    links: {
      valid: utils.doesContainLinks(summary),
      msg: "Summary can't contain links",
    },
  };
}

function checkDescription(description) {
  return {
    regex: {
      valid: utils.isDescriptionValid(description),
      msg: "Description can't be longer than 1,000 characters",
    },
  };
}

function checkCredits(credits) {
  return {
    regex: {
      valid: utils.isCreditsValid(credits),
      msg: "Credits can't be longer than 200 characters",
    },
  };
}

function checkTags(tags) {
  return {
    regex: {
      valid: utils.isTagsValid(tags),
      msg: "A tag cannot contain spaces and special characters",
    },
    size: {
      valid: utils.isTagsSizeValid(tags),
      msg: "Tags can't be longer than 16 characters",
    },
    amount: {
      valid: utils.isTagsAmountValid(tags),
      msg: "You cannot add more than 5 tags",
    },
  };
}

function checkOriginal(original) {
  return {
    regex: {
      valid: utils.isOriginalValid(original),
      msg: "Original name can't be longer than 70 characters",
    },
  };
}

module.exports = {
  startTrending,
  resetWeekViews,
  checkTitle,
  checkFile,
  checkBanner,
  checkGallery,
  checkSummary,
  checkDescription,
  checkCredits,
  checkTags,
  checkOriginal,
};
