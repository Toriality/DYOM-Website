module.exports = function (app) {
  app.use("/api/stats", require("./api/stats").routes);
  app.use("/api/users", require("./api/users").routes);
  app.use("/api/projects", require("./api/projects").routes);
  app.use("/api/missions", require("./api/missions").routes);
  app.use("/api/reviews", require("./api/reviews").routes);
  app.use("/api/daily", require("./api/daily").routes);
};
