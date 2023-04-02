module.exports = function () {
  require("./api/daily").startDaily();
  require("./api/projects").startTrending();
};
