function doesContainLinks(str) {
  return /\b((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi.test(
    str
  );
}

function isTitleValid(title) {
  return title.length >= 3 && title.length <= 50;
}

// TODO: implement
function isFileNameValid(file) {
  return true;
}

function isFileSizeValid(file) {
  return file <= 8000000;
}

function isBannerValid(banner) {
  return banner.endsWith(".png") || banner.endsWith(".jpg");
}

function isBannerSizeValid(banner) {
  return banner <= 2000000;
}

function isGalleryValid(gallery) {
  return gallery.every(
    (file) => file.endsWith(".png") || file.endsWith(".jpg")
  );
}

function isGallerySizeValid(gallery) {
  return gallery.every((file) => file <= 2000000);
}

function isGalleryAmountValid(gallery) {
  return gallery.length <= 5;
}

function isSummarySizeValid(summary) {
  return summary.length <= 100;
}

function isDescriptionValid(description) {
  return description.length <= 1000;
}

function isCreditsValid(credits) {
  return credits.length <= 200;
}

// TODO: test
function isTagsValid(tags) {
  return tags.every((tag) => /^[a-zA-Z0-9_]+$/.test(tag));
}

function isTagsSizeValid(tags) {
  return tags.every((tag) => tag.length <= 16);
}

function isTagsAmountValid(tags) {
  return tags.length <= 5;
}

function isOriginalValid(original) {
  return original.length <= 70;
}
