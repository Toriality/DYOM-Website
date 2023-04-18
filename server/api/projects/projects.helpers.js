const cron = require("node-cron");
const Project = require("./projects.model");
const utils = require("./projects.utils");
const fs = require("fs");

function doesContainLinks(str) {
  return /(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?/i.test(str);
}

function isValidYouTube(url) {
  return /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/i.test(
    url
  );
}

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
      valid: title.length >= 3 && title.length <= 30,
      msg: "Title must be between 3 and 30 characters",
    },
    links: {
      valid: !doesContainLinks(title),
      msg: "Title can't contain links",
    },
  };
}

function checkFile(file) {
  const MAX_SIZE = 8 * 1024 * 1024;
  const DYOM_BYTES = 6;

  const originalName = file.originalname;
  const size = file.size;

  const isDYOM = () => {
    if (!originalName.endsWith(".dat")) return false;

    const fileData = fs.openSync(file.path, "r");
    const buf = Buffer.alloc(4);
    fs.readSync(fileData, buf, 0, 4, 0);
    const num = buf.readUInt32LE(0);
    fs.closeSync(fileData);
    return num === 6;
  };

  return {
    regex: {
      valid: originalName.endsWith(".rar") || originalName.endsWith(".zip") || isDYOM(),
      msg: "File must be a .rar, .zip or a valid DYOM file",
    },
    size: {
      valid: size <= maxSize,
      msg: "File must be less than 8MB",
    },
  };
}

function checkBanner(banner) {
  const MAX_SIZE = 1 * 1024 * 1024;

  const originalName = banner.originalname;
  const size = banner.size;

  return {
    regex: {
      valid: originalName.endsWith(".png") || originalName.endsWith(".jpg"),
      msg: "Banner must be a .png or .jpg file",
    },
    size: {
      valid: size <= MAX_SIZE,
      msg: "Banner must be less than 1MB",
    },
  };
}

function checkGallery(gallery) {
  const MAX_SIZE = 1 * 1024 * 1024;

  return {
    regex: {
      valid: gallery.every(
        (file) => file.originalname.endsWith(".png") || file.originalname.endsWith(".jpg")
      ),
      msg: "Gallery files must be .png or .jpg",
    },
    size: {
      valid: gallery.every((file) => file.size <= MAX_SIZE),
      msg: "Gallery files must be less than 1MB",
    },
    amount: {
      valid: gallery.length <= 5,
      msg: "You cannot upload more than 5 images on gallery",
    },
  };
}

function checkSummary(summary) {
  return {
    size: {
      valid: summary.length <= 70,
      msg: "Summary can't be longer than 70 characters",
    },
    links: {
      valid: !doesContainLinks(summary),
      msg: "Summary can't contain links",
    },
  };
}

function checkDescription(description) {
  return {
    regex: {
      valid: description.length <= 1000,
      msg: "Description can't be longer than 1,000 characters",
    },
  };
}

function checkCredits(credits) {
  return {
    regex: {
      valid: credits.length <= 200,
      msg: "Credits can't be longer than 200 characters",
    },
  };
}

function checkTags(tags) {
  return {
    regex: {
      valid: tags.every((tag) => /^[a-zA-Z0-9_]+$/.test(tag)),
      msg: "A tag cannot contain spaces and special characters",
    },
    size: {
      valid: tags.every((tag) => tag.length <= 12),
      msg: "Tags can't be longer than 12 characters",
    },
    amount: {
      valid: tags.length <= 5,
      msg: "You cannot add more than 5 tags",
    },
  };
}

function checkOriginal(original) {
  return {
    regex: {
      valid: original.length <= 70,
      msg: "Original name can't be longer than 70 characters",
    },
  };
}

function checkTrailer(trailer) {
  return {
    regex: {
      valid: isValidYouTube(trailer),
      msg: "You must insert a valid YouTube URL for the trailer",
    },
  };
}

function checkMotto(motto) {
  return {
    regex: {
      valid: motto.length <= 40,
      msg: "Motto can't be longer than 40 characters",
    },
  };
}

function checkMusic(music) {
  return {
    regex: {
      valid: /^(?:https?:\/\/)?(?:open\.)?spotify\.com\/track\/([\w-]+)(?:\?.*)?$/i.test(
        music
      ),
      msg: "You must insert a valid Spotify URL for the music theme",
    },
  };
}

function checkDifficulty(difficulty) {
  return {
    regex: {
      valid: /^(Easy|Normal|Hard|Insane)$/.test(difficulty),
      msg: "Difficulty field is invalid",
    },
  };
}

function checkMods(mods) {
  return {
    regex: {
      valid: /^(?:true|false)$/.test(mods),
      msg: "Mods field is invalid",
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
  checkTrailer,
  checkMotto,
  checkMusic,
  checkDifficulty,
  checkMods,
};
