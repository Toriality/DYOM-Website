const router = require("express").Router();
const handlers = require("./projects.handlers");
const middleware = require("./projects.middleware");
const auth = require("../../middleware/auth");

router.get("/list/:type", handlers.getList);
router.get("/view/:id", handlers.getSingle);
router.get("/trending", handlers.getTrending);

router.post(
  "/add",
  auth,
  middleware.uploadFiles,
  middleware.validateProject,
  handlers.addProject
);
router.post("/copy", auth, handlers.copyProject);

router.patch(
  "/update/:id",
  auth,
  middleware.validateUpdate,
  middleware.uploadFiles,
  middleware.validateProject,
  handlers.updateProject
);

router.delete("/delete/:id", auth, handlers.deleteProject);

module.exports = router;
