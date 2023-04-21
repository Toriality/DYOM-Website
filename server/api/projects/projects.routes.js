const router = require("express").Router();
const handlers = require("./projects.handlers");
const middleware = require("./projects.middleware");
const auth = require("../../middleware/auth");
const { makeCRC } = require("../../middleware/upload");

router.get("/list", handlers.getList);
router.get("/view/:id", handlers.getSingle);
router.get("/random", auth, handlers.getRandom);
router.get("/download/:id", handlers.download);

router.post(
  "/add",
  auth,
  middleware.uploadFiles,
  makeCRC,
  middleware.validateFiles,
  middleware.validateProject,
  handlers.addProject
);

module.exports = router;
