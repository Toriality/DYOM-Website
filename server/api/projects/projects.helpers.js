const cron = require("node-cron");
const Project = require("./projects.model");
const utils = require("./projects.utils");
const fs = require("fs");

const DYOM_NUM = 6;
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_BANNER_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_GALLERY_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_MODS_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_SD_SIZE = 2 * 1024 * 1024; // 2MB

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

function checkFiles(files) {
  if (!files) return [];

  const validFile = files.every((file) => {
    const fileData = fs.openSync(file.path, "r");
    const buf = Buffer.alloc(4);
    fs.readSync(fileData, buf, 0, 4, 0);
    const fileNum = buf.readUInt32LE(0);
    fs.closeSync(fileData);
    return fileNum === DYOM_NUM;
  });
  const validSize = files.every((file) => file.size <= MAX_FILE_SIZE);
  const uniqueFile = files.every(
    (file) => !fs.existsSync(`./public/uploads/missions/${file.filename}`)
  );

  return [
    !validFile && "File must be a valid DYOM mission",
    !validSize && "File must be less than 1MB",
    !uniqueFile && "This mission already exists. Please don't upload duplicates",
  ];
}

function checkSD(sd) {
  if (!sd) return [];

  const validSize = sd.every((file) => file.size <= MAX_SD_SIZE);

  return [!validSize && "SD file must be less than 2MB"];
}

function checkBanner(banner) {
  if (!banner) return [];

  const validSize = banner.size <= MAX_BANNER_SIZE;

  return [!validSize && "Banner must be less than 1MB"];
}

function checkGallery(gallery) {
  if (!gallery) return [];

  const validSize = gallery.every((file) => file.size <= MAX_GALLERY_SIZE);

  return [!validSize && "Gallery must be less than 5MB"];
}

function checkMods(mods) {
  if (!mods) return [];

  const validSize = mods.every((file) => file.size <= MAX_MODS_SIZE);

  return [!validSize && "Mods must be less than 2MB"];
}

function checkTitle(title) {
  if (!title) return [];

  const validLength = title.length >= 3 && title.length <= 30;
  const validLinks = !doesContainLinks(title);

  return [
    !validLength && "Title must be between 3 and 30 characters",
    !validLinks && "Title can't contain links",
  ];
}

function checkSummary(summary) {
  if (!summary) return [];

  const validLength = summary.length <= 70;
  const validLinks = !doesContainLinks(summary);

  return [
    !validLength && "Summary must be between 3 and 70 characters",
    !validLinks && "Summary can't contain links",
  ];
}

function checkDescription(description) {
  if (!description) return [];

  const validLength = description.length <= 1000;

  return [!validLength && "Description must be between 3 and 1000 characters"];
}

function checkCredits(credits) {
  if (!credits) return [];

  const validLength = credits.length <= 200;

  return [!validLength && "Credits must be between 3 and 200 characters"];
}

function checkTags(tags) {
  if (!tags) return [];

  const validLength = tags.every((tag) => tag.length <= 12);
  const validTags = tags.every((tag) => /^[a-zA-Z0-9_]+$/.test(tag));
  const validAmount = tags.length <= 5;

  return [
    !validLength && "Tags can't be longer than 12 characters",
    !validTags && "Tags can't contain spaces and special characters",
    !validAmount && "You cannot add more than 5 tags",
  ];
}

function checkTrailer(trailer) {
  if (!trailer) return [];

  const validYouTube = isValidYouTube(trailer);

  return [!validYouTube && "You must insert a valid YouTube URL for the trailer"];
}

function checkMotto(motto) {
  if (!motto) return [];

  const validLength = motto.length <= 40;

  return [!validLength && "Motto must be between 3 and 40 characters"];
}

function checkMusic(music) {
  if (!music) return [];

  const validSpotify =
    /^(?:https?:\/\/)?(?:open\.)?spotify\.com\/track\/([\w-]+)(?:\?.*)?$/i.test(music);

  return [!validSpotify && "You must insert a valid Spotify URL for the music theme"];
}

function checkDifficulty(difficulty) {
  if (!difficulty) return [];

  const validField = /[0-3]/.test(difficulty);

  return [!validField && "Difficulty is invalid"];
}

function checkMods(mods) {
  if (!mods) return [];

  const validField = /^(?:true|false)$/.test(mods);

  return [!validField && "Mods field is invalid"];
}

module.exports = {
  startTrending,
  resetWeekViews,
  checkTitle,
  checkSummary,
  checkDescription,
  checkCredits,
  checkTags,
  checkTrailer,
  checkMotto,
  checkMusic,
  checkDifficulty,
  checkMods,
  checkFiles,
  checkSD,
  checkBanner,
  checkGallery,
};
